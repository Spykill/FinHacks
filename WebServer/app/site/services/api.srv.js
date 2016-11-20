(function(){

    angular
        .module('finApp')
        .service('apiService', apiService);

    function apiService($http)
    {
    	var user_data = undefined;

		function toParam(obj)
		{
			var str = "";
			Object.keys(obj).forEach(function(key)
			{
				str += key + "=" + obj[key] + '&';
				console.log(key);
			});

			return str.substring(0, str.length-1);
		}

    	//Function Binding

		this.get_user = function(cb) {
			if(user_data == undefined)
			{
				$http.post('/api/users/getdata', {username: localStorage.getItem('username')}).then(function(data){ user_data = data.data; cb(user_data); }, function(data){ console.log(data); });
			}
			else
			{
				cb(user_data);
			}
		}
    this.addtransaction = function(name, amount, category, cb) {
      $http.post('/api/users/addtransaction', {
        name: name,
        amount: amount,
        category: category
      }).then(function(data){
        if (data.data == "1")
        {
          cb(true);
        }
        else
        {
          cb(false);
        }
      }, function(err){
        console.log("OH NO EVERYONE PANIC");
        console.log(err);
      });
    }
    	this.is_empty = function (cb)
    	{
			if(user_data == undefined)
			{
				$http.post('/api/users/getdata', {username: localStorage.getItem('username')}).then(function(data){ user_data = data.data; cb(user_data.transaction_list.length == 0); }, function(data){ console.log(data); });
			}
			else
			{
				cb(user_data.transaction_list.length == 0);
			}
    	};

    	this.get_transaction_list = function(cb)
    	{
    		if(localStorage.getItem('username'))
    		{
				if(user_data == undefined)
				{
					$http.post('/api/users/getdata', {username: localStorage.getItem('username')}).then(function(data){ user_data = data.data; cb(user_data.transaction); }, function(data){ console.log(data); });
				}
				else
				{
					cb(user_data.transaction);
				}
			}
    	};

    	this.get_comparison = function(cb)
    	{
    		if(localStorage.getItem('username'))
    		{
	    		$http.post('/api/users/compare', {username: localStorage.getItem('username')}).then(function(data){
		    		var comparison = data.data;
		    		var comparison_out = [{title: "Education", val: comparison[0]},
		    						{title: "Entertainment", val: comparison[1]},
		    						{title: "Clothing", val: comparison[2]},
		    						{title: "Electronics", val: comparison[3]},
		    						{title: "Restaurants", val: comparison[4]},
		    						{title: "Groceries", val: comparison[5]},
		    						{title: "Hardware", val: comparison[6]},
		    						{title: "Art", val: comparison[7]},
		    						{title: "Sports", val: comparison[8]},
		    						{title: "Alchohol", val: comparison[9]},
		    						{title: "Household", val: comparison[10]},
		    						{title: "Grooming", val: comparison[11]},
		                // Hisham adding these.
		                {title: "Rent", val: comparison[12]},
		                {title: "Transportation", val: comparison[13]},
		                {title: "Utilities", val: comparison[14]},
		                {title: "All", val: comparison[15]},
		                {title: "Savings", val: comparison[16]},
		                {title: "Miscellaneous", val: comparison[17]}];
		            cb(comparison_out);
		    	}, function(data){ console.log(data); });
	    	}
    	};

    	this.get_comparison_demo = function(cb)
    	{
    		if(localStorage.getItem('username'))
    		{
	    		$http.post('/api/users/compare_demo', {username: localStorage.getItem('username')}).then(function(data){
		    		var comparison = data.data;
		    		var comparison_out = [{title: "Education", val: comparison[0]},
		    						{title: "Entertainment", val: comparison[1]},
		    						{title: "Clothing", val: comparison[2]},
		    						{title: "Electronics", val: comparison[3]},
		    						{title: "Restaurants", val: comparison[4]},
		    						{title: "Groceries", val: comparison[5]},
		    						{title: "Hardware", val: comparison[6]},
		    						{title: "Art", val: comparison[7]},
		    						{title: "Sports", val: comparison[8]},
		    						{title: "Alchohol", val: comparison[9]},
		    						{title: "Household", val: comparison[10]},
		    						{title: "Grooming", val: comparison[11]},
		                // Hisham adding these.
		                {title: "Rent", val: comparison[12]},
		                {title: "Transportation", val: comparison[13]},
		                {title: "Utilities", val: comparison[14]},
		                {title: "All", val: comparison[15]},
		                {title: "Savings", val: comparison[16]},
		                {title: "Miscellaneous", val: comparison[17]}];
		            cb(comparison_out);
		    	}, function(data){ console.log(data); });
	    	}
    	};

    	this.get_comparison_loc = function(cb)
    	{
    		if(localStorage.getItem('username'))
    		{
	    		$http.post('/api/users/compare_loc', {username: localStorage.getItem('username')}).then(function(data){
		    		var comparison = data.data;
		    		var comparison_out = [{title: "Education", val: comparison[0]},
		    						{title: "Entertainment", val: comparison[1]},
		    						{title: "Clothing", val: comparison[2]},
		    						{title: "Electronics", val: comparison[3]},
		    						{title: "Restaurants", val: comparison[4]},
		    						{title: "Groceries", val: comparison[5]},
		    						{title: "Hardware", val: comparison[6]},
		    						{title: "Art", val: comparison[7]},
		    						{title: "Sports", val: comparison[8]},
		    						{title: "Alchohol", val: comparison[9]},
		    						{title: "Household", val: comparison[10]},
		    						{title: "Grooming", val: comparison[11]},
		                // Hisham adding these.
		                {title: "Rent", val: comparison[12]},
		                {title: "Transportation", val: comparison[13]},
		                {title: "Utilities", val: comparison[14]},
		                {title: "All", val: comparison[15]},
		                {title: "Savings", val: comparison[16]},
		                {title: "Miscellaneous", val: comparison[17]}];
		            cb(comparison_out);
		    	}, function(data){ console.log(data); });
	    	}
    	};

    	this.login = function(username, password, cb)
    	{
    		$http.post('/api/users/login', {
    			username: username,
    			password: password
    		}).then(function(data){
    			if (data.data == "1")
    			{
    				localStorage.setItem("username", username);
    				cb(true);
    			}
    			else
    			{
            cb(false);
    			}
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
          console.log(err);
    		});
    	}

    	this.logout = function()
    	{
    		localStorage.setItem("username", null);
    	}

    	this.signup = function(username, password, name, age, email, gender,
      income, location, cb)
    	{
    		$http.post('/api/users/signup', {
    			username: username,
    			password: password,
    			name: name,
    			age: age,
    			email: email,
    			gender: gender,
    			income: income,
    			location: location
    		}).then(function(data){
    			if (data.data == "1")
    			{
    				localStorage.setItem("username", username);
    				cb(true);
    			}
    			else
    			{
    				cb(false);
    			}
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}

    	this.get_average = function(cb)
    	{
    		$http.post('/api/users/average', {}).then(function(data){
    			cb(data.data);
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}

    	this.get_average_demo = function(cb)
    	{
    		$http.post('/api/users/average_demo', {username: localStorage.getItem('username')}).then(function(data){
    			cb(data.data);
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}

    	this.get_average_loc = function(cb)
    	{
    		$http.post('/api/users/average_loc', {username: localStorage.getItem('username')}).then(function(data){
    			cb(data.data);
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}

    	this.get_category_average = function(cb)
    	{
    		$http.post('/api/users/averagecategory', {}).then(function(data){
    			cb(data.data);
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}

    	this.get_category_average_demo = function(cb)
    	{
    		$http.post('/api/users/average_category_demo', {username: localStorage.getItem('username')}).then(function(data){
    			cb(data.data);
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}

    	this.get_category_average_loc = function(cb)
    	{
    		$http.post('/api/users/average_category_loc', {username: localStorage.getItem('username')}).then(function(data){
    			cb(data.data);
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}

    	this.is_logged_in = function()
    	{
    		return (localStorage.getItem("username") != "null");
    	}

    	this.get_categories_data = function(cb)
    	{
    		var t = this;
    		t.get_transaction_list(function(list)
			{
				t.get_category_average(function(cat_avgs)
				{
					var cats = new Array(11);
					for(var i = 0; i < cats.length; i++)
					{
						cats[i] = {delta:0, purchases: [], spending: 0};
					}

					for(var i = 0; i < (list.length-1); i++)
					{
						cats[list[i].category].spending += list[i].amount;
						cats[list[i].category].purchases.push(list[i]);
					}

					for(var i = 0; i < cats.length; i++)
					{
						cats[i].delta = cats[i].spending - cat_avgs[i];
					}

					cats[0].title = "Savings";
					cats[1].title = "Rent";
					cats[2].title = "Groceries";
					cats[3].title = "Transportation";
					cats[4].title = "Restaurants";
					cats[5].title = "Entertainment";
					cats[6].title = "Education";
					cats[7].title = "Clothing";
					cats[8].title = "Electronics";
					cats[9].title = "Utilities";
					cats[10].title = "Miscellaneous";

					var c_re = {"Savings": cats[0],
								"Rent": cats[1],
								"Groceries": cats[2],
								"Transportation": cats[3],
								"Restaurants": cats[4],
								"Entertainment": cats[5],
								"Education": cats[6],
								"Clothing": cats[7],
								"Electronics": cats[8],
								"Utilities": cats[9],
								"Miscellaneous": cats[10]};
					cb(c_re);
				});
			});
    	}

    	var self = this;
    	this.get_category_data = function(d, cb)
    	{
    		self.get_categories_data(function(data){ cb(data[d]); });
    	}
    }
})();
