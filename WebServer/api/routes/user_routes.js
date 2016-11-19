var express 	 = require('express');
var router 		 = express.Router();


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
			res.send("Oh no! Something went wrong!");
		}
		else
		{
	    	res.redirect("success.html");
	    }
	});
});
router.post('/signup', function(req, res, next) {
	var un = req.body.username;
	var pw = req.body.password;

	var db = req.db;

	var coll = db.get('users');
	coll.findOne({un: un}, {}, function(err, doc){
		console.log(doc);
	});
    res.redirect("success.html");
});


module.exports = router;