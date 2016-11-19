(function(){
    angular
        .module('finApp')
        .controller('HomeCtrl', HomeCtrl)
    
    function HomeCtrl($scope, ngDialog, apiService){
        this.loggedin = true;

        this.name = "";
        this.age = 0;
        this.username = "";
        this.email = "";
        this.password = "";
        this.gender = "";
        this.income = 0;
        this.location = "";

        this.login = login;
        this.signup = signup;
        this.getLocation = getLocation;
        this.signup_submit = signup_submit

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);

            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
        function showPosition(position) {
            var location = "(" + position.coords.latitude +
            ", " + position.coords.longitude + ")";
            $("#location").val(location);
            $("#location").prop('disabled', true);
        }

        function signup() {
          open_signup = function() {
            ngDialog.open({template: '/site/partials/signup.html',
            scope: $scope,
            className: 'ngdialog-theme-default'
            })
          };
          open_signup();
        }

        function signup_submit() {
          apiService.signup(this.username, this.password, this.name, this.age, this.email, this.gender,
          this.income, this.location);
          apiService.login(this.username, this.password);
          this.loggedin = true;
          this.name = "";
          this.age = 0;
          this.username = "";
          this.email = "";
          this.password = "";
          this.gender = "";
          this.income = 0;
          this.location = "";
          this.user = apiService.user_data;
          ngDialog.close();
          $state.go("dash.overview");
        }

        function login() {
          open_login = function() {
            ngDialog.open({template: '/site/partials/login.html',
            scope: $scope,
            className: 'ngdialog-theme-default'
            })
          };
        }
      }

})();
