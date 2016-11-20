var express 	 = require('express');
var router 		 = express.Router();
var child_process = require("child_process");

// Calculate the category from a given transaction_list
function compute_category(transaction_list, callback)
{
	var trans_cats = [{v:0},{v:0},{v:0},{v:0},{v:0},{v:0},{v:0},{v:0},{v:0},{v:0},{v:0},{v:0}];
	var sum = 0;
	for(var i = 0; i < transaction_list.length; i++)
	{
		trans_cats[transaction_list[i].category].v += 1;//transaction_list[i].amount;
		sum += 1;//transaction_list[i].amount;
	}
	if(sum != 0)
	{
		for(var i = 0; i < 12; i++)
		{
			trans_cats[i].v /= sum;
		}
	}

	// console.log(trans_cats);

	// Call python code and return the category to the callback
	var spawn = child_process.spawn;
	var proc = spawn('python', ['Classification/main.py', "\"" + JSON.stringify(trans_cats).split("\"").join("\\\"") + "\""]);
	// console.log("\"" + JSON.stringify(trans_cats).split("\"").join("\\\"") + "\"");
	proc.stdout.on('data', function(data){ if(data.toString().trim() != "ERROR!"){callback(parseInt(data.toString().trim()));}else{console.log("There was an error! :'(");} });
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
	var username = req.body.username.toLowerCase();
	var password = req.body.password;

	var db = req.db;

	// Find the user
	var coll = db.get('users');
	coll.findOne({username: username}, {}, function(err, doc){
		if(err)
		{
			res.status(500).send([err.toString(), doc]);
		}
		// Did they use the wrong password?
		else if (doc.password != password)
		{
	    	res.status(200).send("0");
		}
		// They used the right password! :D
		else
		{
	    	res.status(200).send("1");
	    }
	});
});

router.get('/signup',function(req,res){
	res.json({value:'You have reached a GET endpoint for signup'});
});

router.post('/signup', function(req, res, next) {
	// Get vars
	var username = req.body.username.toLowerCase();
	var password = req.body.password;
	var age = req.body.age;
	var gender = req.body.gender;
	var name = req.body.name;
	var income = req.body.income;
	var location = req.body.location;
	var email = req.body.email.toLowerCase();

	var db = req.db;

	var coll = db.get('users');

	coll.findOne({"username": username}, function(err, doc)
	{
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			if(!doc)
			{
				// Add a new empty user with only the username and password filled in.
				coll.insert({"username": username, "password": password, "transaction": [], "category": 0, "averages": {}, "age": age, "gender": gender, "name": name, "income": income, "location": location, "email": email, savings: 0, rent: 0, utilities: 0 }, function(err, doc){
					if(err)
					{
						res.status(500).send("-1");
					}
					// Adding worked!
					else
					{
				    	res.status(200).send("1");
				    }
				});
			}
			else
			{
	    		res.status(200).send("0");
			}
		}
	});
});

router.post('/addtransaction', function(req, res, next) {
	// Get vars
	var username = req.body.username.toLowerCase();

	var db = req.db;

	// Get more vars
	var transaction = {};
	transaction.name = req.body.name;
	transaction.amount = parseFloat(req.body.amount);
	transaction.category = parseInt(req.body.category);
	transaction.date = parse

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
						res.status(500).send("-1");
					}
					// This succeeded
					else
					{
				    	res.status(200).send("1");
				    }
				});
			});
		}
	});
});

router.post('/getdata', function(req, res, next) {
	// Get vars
	var username = req.body.username.toLowerCase();

	console.log(username);

	var db = req.db;

	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("-1");
		}
		// Respond with all the user's data
		else
		{
	    	res.status(200).send(doc);
	    }
	});
});

router.post('/average', function(req, res, next){
	var db = req.db;
	var coll = db.get('users');
	coll.find({}, function(err, docs)
	{
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			var sum = 0;
			for(var i = 0; i < docs.length; i++)
			{
				for(var j = 0; j < docs[i].transaction; j++)
				{
					sum += docs[i].transaction[j].amount;
				}
			}
			if(docs.length != 0)
			{
				sum /= docs.length;
			}

			res.status(200).send(sum);
		}
	});
});

router.post('/average_demo', function(req, res, next){
	var username = req.body.username.toLowerCase();

	var db = req.db;
	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			// Find all the people in the user's category
			coll.find({"category": doc.category}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("-1");
				}
				else
				{
					var sum = 0;
					for(var i = 0; i < docs.length; i++)
					{
						for(var j = 0; j < docs[i].transaction; j++)
						{
							sum += docs[i].transaction[j].amount;
						}
					}
					if(docs.length != 0)
					{
						sum /= docs.length;
					}

					res.status(200).send(sum);
				}
			});
	    }
	});
});

router.post('/average_loc', function(req, res, next){
	var username = req.body.username.toLowerCase();

	var db = req.db;
	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			var loc = doc.location;
			if (possible_locations.indexOf(loc) == -1)
			{
				loc = "Toronto";
			}

			// Find all the people in the user's category
			coll.find({"location": loc}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("-1");
				}
				else
				{
					var sum = 0;
					for(var i = 0; i < docs.length; i++)
					{
						for(var j = 0; j < docs[i].transaction; j++)
						{
							sum += docs[i].transaction[j].amount;
						}
					}
					if(docs.length != 0)
					{
						sum /= docs.length;
					}

					res.status(200).send(sum);
				}
			});
	    }
	});
});

router.post('/average_category', function(req, res, next){
	var db = req.db;
	var coll = db.get('users');
	coll.find({}, function(err, docs)
	{
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			var c_sum = new Array(11);

			for(var i = 0; i < docs.length; i++)
			{
				for(var j = 0; j < docs[i].transaction; j++)
				{
					c_sum[docs[i].transaction[j].category] += docs[i].transaction[j].amount;
				}
			}
			if(docs.length != 0)
			{
				for(var i = 0; i < c_sum.length; i++)
				{
					c_sum[i] /= docs.length;
				}
			}

			res.status(200).send(c_sum);
		}
	});
});

router.post('/average_category_demo', function(req, res, next){
	var username = req.body.username.toLowerCase();

	var db = req.db;
	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			// Find all the people in the user's category
			coll.find({"category": doc.category}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("-1");
				}
				else
				{
					var c_sum = new Array(11);

					for(var i = 0; i < docs.length; i++)
					{
						for(var j = 0; j < docs[i].transaction; j++)
						{
							c_sum[docs[i].transaction[j].category] += docs[i].transaction[j].amount;
						}
					}
					if(docs.length != 0)
					{
						for(var i = 0; i < c_sum.length; i++)
						{
							c_sum[i] /= docs.length;
						}
					}

					res.status(200).send(c_sum);
				}
			});
	    }
	});
});

router.post('/average_category_loc', function(req, res, next){
	var username = req.body.username.toLowerCase();

	var db = req.db;
	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			var loc = doc.location;
			if (possible_locations.indexOf(loc) == -1)
			{
				loc = "Toronto";
			}

			// Find all the people in the user's category
			coll.find({"location": loc}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("-1");
				}
				else
				{
					var c_sum = new Array(11);

					for(var i = 0; i < docs.length; i++)
					{
						for(var j = 0; j < docs[i].transaction; j++)
						{
							c_sum[docs[i].transaction[j].category] += docs[i].transaction[j].amount;
						}
					}
					if(docs.length != 0)
					{
						for(var i = 0; i < c_sum.length; i++)
						{
							c_sum[i] /= docs.length;
						}
					}

					res.status(200).send(c_sum);
				}
			});
	    }
	});
});

router.post('/compare', function(req, res, next){
	// Get vars
	var username = req.body.username.toLowerCase();

	var db = req.db;

	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			// Find all the people in the user's category
			coll.find({}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("-1");
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

router.post('/compare_demo', function(req, res, next){
	// Get vars
	var username = req.body.username.toLowerCase();

	var db = req.db;

	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			// Find all the people in the user's category
			coll.find({"category": doc.category}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("-1");
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

var possible_locations = ["Toronto", "Montreal", "Vancouver", "Edmenton", "Calgary"]

router.post('/compare_loc', function(req, res, next){
	// Get vars
	var username = req.body.username.toLowerCase();

	var db = req.db;

	var coll = db.get('users');
	// Find the user
	coll.findOne({"username": username}, function(err, doc){
		if(err)
		{
			res.status(500).send("-1");
		}
		else
		{
			var loc = doc.location;
			if (possible_locations.indexOf(loc) == -1)
			{
				loc = "Toronto";
			}
			// Find all the people in the user's category
			coll.find({"location": loc}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("-1");
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
