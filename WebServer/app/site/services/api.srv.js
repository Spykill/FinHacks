(function(){

    angular
        .module('finApp')
        .service('apiService', apiService);

    function apiService($http)
    {
    	var user_data = undefined;
    	var comparison = undefined;

    	if(localStorage.getItem('username') != null)
    	{
	    	var comparison_out = undefined;
	    	var promise = $http.post('/api/users/getdata', {username: localStorage.getItem('username')}).then(function(data){ console.log(data); user_data = JSON.parse(data); }, function(data){ console.log(data); });
	    	var promise2 = $http.post('/api/users/compare', {username: localStorage.getItem('username')}).then(function(data){
	    		console.log(data);
	    		comparison = JSON.parse(data);
	    		comparison_out = [{title: "Education", val: comparison[0]},
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
	    	}, function(data){ console.log(data); });
	    }

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

      this.get_user = function() {
        return user_data;
      }
    	this.is_empty = function ()
    	{
    		return user_data.transaction_list.length == 0;
    	};

    	this.get_transaction_list = function()
    	{
    		// return user_data.transaction_list;
			window.alert("hello");
    	};

    	this.get_comparison = function()
    	{
    		return comparison_out;
    	};

    	this.login = function(username, password)
    	{
    		$http.post('/api/users/login', {
    			username: username,
    			password: password
    		}).then(function(data){
    			if (data.trim() == "1")
    			{
    				localStorage.setItem("username", username);
    				return true;
    			}
    			else
    			{
    				return false;
    			}
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}

    	this.signup = function(username, password, name, age, email, gender,
      income, location)
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
    			if (data == "1")
    			{
    				localStorage.setItem("username", username);
    				return true;
    			}
    			else
    			{
    				return false;
    			}
    		}, function(err){
    			console.log("OH NO EVERYONE PANIC");
    		});
    	}
    }
})();
