var express 	 = require('express');
var router 		 = express.Router();


function compute_category(transaction_list)
{
	return 0;
}

function calculate_average(people)
{
	var sums = {};
	var denoms = {};
	for(var i = 0; i < people.length; i++)
	{
		Object.keys(people[i].averages).forEach(function(key)
		{
			if(sums[key] == undefined)
			{
				sums[key] = 0;
				denoms[key] = 0;
			}
			sums[key] += people[i].averages;
			denoms[key] += 1;
		});
	}
	Object.keys(sums).forEach(function(key)
	{
		if(denoms[key] != 0)
		{
			sums[key] /= denoms[key];
		}
	});
	return sums;
}

function get_deltas(me, average)
{
	var deltas = {};
	Object.keys(me.averages).forEach(function(key)
	{
		if(average[key] != undefined)
		{
			deltas[key] = me.averages[key] - average[key];
		}
	});

	return deltas;
}

router.get('/login',function(req,res){
	res.json({value:'You have reached a GET endpoint for login'});
})

router.post('/login', function(req, res, next) {
	var un = req.body.username;
	var pw = req.body.password;

	var db = req.db;

	var coll = db.get('users');
	coll.findOne({un: un}, {}, function(err, doc){
		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!");
		}
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
	var un = req.body.username;
	var pw = req.body.password;

	var db = req.db;

	var coll = db.get('users');
	coll.insert({"un": un, "pw": pw, "transaction": [], "category": 0, "averages": {}}, function(err, doc){
		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!");
		}
		else
		{
	    	res.status(200).send("Good! " + un + " | " + pw);
	    }
	});
});

router.post('/addtransaction', function(req, res, next) {
	var un = req.body.username;

	console.log(un);

	var db = req.db;

	// DO STUFF HERE
	var transaction = {};
	transaction.name = req.body.t_name;
	transaction.amount = req.body.t_amount;
	transaction.category = req.body.t_category;

	var coll = db.get('users');
	coll.findOne({"un": un}, function(err, doc){

		if(err)
		{
			res.status(500).send("Oh no! Something went wrong! Couldn't find user");
		}
		else
		{
			doc.averages[transaction.category] *= doc.transaction.length;
			doc.averages[transaction.category] += doc.transaction.amount;

			doc.transaction.push(transaction);
			category = compute_category(doc.transaction);
			doc.averages[transaction.category] /= doc.transaction.length;

			coll.updateOne({"un": un}, {$push: {"transaction": transaction}, $set: {"category": category, "averages": doc.averages}}, function(err, doc){
				if(err)
				{
					res.status(500).send("Oh no! Something went wrong! Couldn't update the user");
				}
				else
				{
			    	res.status(200).send("Good!");
			    }
			});
		}
	});
});

router.post('/getdata', function(req, res, next) {
	var un = req.body.username;

	var db = req.db;

	var coll = db.get('users');
	coll.findOne({"un": un}, function(err, doc){
		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!");
		}
		else
		{
	    	res.status(200).send(doc);
	    }
	});
});

router.post('/compare', function(req, res, next){
	var un = req.body.username;

	var db = req.db;

	var coll = db.get('users');
	coll.findOne({"un": un}, function(err, doc){
		if(err)
		{
			res.status(500).send("Oh no! Something went wrong!");
		}
		else
		{
			coll.find({"category": doc.category}, function(err, docs)
			{
				if(err)
				{
					res.status(500).send("Oh no! Something went wrong!");
				}
				else
				{
					docs = docs.toArray();
					var deltas = get_deltas(doc, calculate_average(docs));

					res.status(200).send(deltas);
				}
			});
	    }
	});
});


module.exports = router;