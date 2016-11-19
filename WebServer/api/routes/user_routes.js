var express 	 = require('express');
var router 		 = express.Router();
var child_process = require("child_process");

// Calculate the category from a given transaction_list
function compute_category(transaction_list, callback)
{
	var trans_cats = [0,0,0,0,0,0,0,0,0,0,0,0];
	var sum = 0;
	for(var i = 0; i < transaction_list.length; i++)
	{
		trans_cats[transaction_list[i].category] += 1;//transaction_list[i].amount;
		sum += 1;//transaction_list[i].amount;
	}
	if(sum != 0)
	{
		for(var i = 0; i < 12; i++)
		{
			trans_cats[i] /= sum;
		}
	}

	// Call python code and return the category to the callback
	var spawn = child_process.spawn;
	var proc = spawn('python', ['main.py', "\"" + JSON.stringify(transaction_list).split("\"").join("\\\"") + "\""]);
	proc.stdout.on('data', function(data){ callback(parseInt(data.toString().trim())); });
}

// Calculates the average for each category of item
function calculate_average(people)
{
	var sums = {};
	var denoms = {};
	// For all the given people
	for(var i = 0; i < people.length; i++)
	{
		// Loop through all the defined averages for this person
		Object.keys(people[i].averages).forEach(function(key)
		{
			// Make sure the sum is defined
			if(sums[key] == undefined)
			{
				sums[key] = 0;
				denoms[key] = 0;
			}
			// Add to the total
			sums[key] += people[i].averages[key];
			denoms[key] += 1;
		});
	}
	// Divide all the sums by their denominators to get the averages
	Object.keys(sums).forEach(function(key)
	{
		if(denoms[key] != 0)
		{
			sums[key] /= denoms[key];
		}
	});
	return sums;
}

// Get's the difference between the given user and the average
function get_deltas(me, average)
{
	var deltas = {};
	// For each element in the user's averages
	Object.keys(me.averages).forEach(function(key)
	{
		// As long as there is a corresponding key in the averages
		if(average[key] != undefined)
		{
			// Calculate the delta
			deltas[key] = me.averages[key] - average[key];
		}
	});

	return deltas;
}

router.get('/login',function(req,res){
	res.json({value:'You have reached a GET endpoint for login'});
})

router.post('/login', function(req, res, next) {
	// Get vars
	var username = req.body.username;
	var password = req.body.password;

	var db = req.db;

	// Find the user
	var coll = db.get('users');
	coll.findOne({username: username}, {}, function(err, doc){
		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!");
		}
		// Did they use the wrong password?
		else if (doc.password != password)
		{
	    	res.status(200).send("Bad!");
		}
		// They used the right password! :D
		else
		{
	    	res.status(200).send("Good!");
	    }
	});
});

router.get('/signup',function(req,res){
	res.json({value:'You have reached a GET endpoint for signup'});
});

router.post('/signup', function(req, res, next) {
	// Get vars
	var username = req.body.username;
	var password = req.body.password;

	var db = req.db;

	// Add a new empty user with only the username and password filled in.
	var coll = db.get('users');
	coll.insert({"username": username, "password": password, "transaction": [], "category": 0, "averages": {}}, function(err, doc){
		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!");
		}
		// Adding worked!
		else
		{
	    	res.status(200).send("Good!");
	    }
	});
});

router.post('/addtransaction', function(req, res, next) {
	// Get vars
	var username = req.body.username;

	var db = req.db;

	// Get more vars
	var transaction = {};
	transaction.name = req.body.name;
	transaction.amount = parseFloat(req.body.amount);
	transaction.category = parseInt(req.body.category);

	// Find the desired user to update.
	var coll = db.get('users');
	coll.findOne({"username": username}, function(err, doc){

		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!");
		}
		// Found the user
		else
		{
			// Update the averages
			// Make sure the average is defined
			if (doc.averages[transaction.category] == undefined)
			{
				doc.averages[transaction.category] = 0;
			}
			// Get this back to a sum form
			doc.averages[transaction.category] *= doc.transaction.length;
			// Add the new value
			doc.averages[transaction.category] += transaction.amount;
			// Add the transaction to the list of transactions
			doc.transaction.push(transaction);
			// Divide by the number of transactions in total (get the average)
			doc.averages[transaction.category] /= doc.transaction.length;
			// Calculate the category that this user is in with this new transaction
			compute_category(doc.transaction, function(category){				// Update the user to add the transaction to the list, replace the category and replace the averages
				coll.update({"username": username}, {$push: {"transaction": transaction}, $set: {"category": category, "averages": doc.averages}}, function(err, doc){
					if(err)
					{
						res.status(500).send("Oh no! Something went wrong!");
					}
					// This succeeded
					else
					{
				    	res.status(200).send("Good!");
				    }
				});
			});
		}
	});
});

router.post('/getdata', function(req, res, next) {
	// Get vars
	var username = req.body.username;

	var db = req.db;

	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!");
		}
		// Respond with all the user's data
		else
		{
	    	res.status(200).send(doc);
	    }
	});
});

router.post('/compare', function(req, res, next){
	// Get vars
	var username = req.body.username;

	var db = req.db;

	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!" + err);
		}
		else
		{
			// Find all the people in the user's category
			coll.find({"category": doc.category}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("Oh no! Something went wrong!" + err);
				}
				else
				{
					// Get the deltas (the difference between the selected user and the average)
					var deltas = get_deltas(doc, calculate_average(docs));
					// Send back the deltas
					res.status(200).send(deltas);
				}
			});
	    }
	});
});


module.exports = router;