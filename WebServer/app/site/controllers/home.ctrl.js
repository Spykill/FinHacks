(function(){
    angular
        .module('finApp')
        .controller('HomeCtrl', HomeCtrl)

    function HomeCtrl($scope, ngDialog, apiService, $state){
        this.welcome_message = "Welcome to Budget Buddy!"
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
        this.signup_submit = signup_submit;
        this.login_submit = login_submit;
        this.signout = signout;

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
          this.loggedin = true;
          this.name = "";
          this.age = 0;
          this.username = "";
          this.email = "";
          this.password = "";
          this.gender = "";
          this.income = 0;
          this.location = "";
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
          open_login();
        }

        function login_submit() {
          logged = apiService.login(this.username, this.password);
          if (logged) {
            this.loggedin = true;
            ngDialog.close();
            $state.go("dash.overview");
          }
          else {
            alert("Your username or password is incorrect. Please try again.");
          }
          this.username = "";
          this.password = "";
        }

        function signout() {
          this.loggedin = false;
          this.name = "";
          this.age = 0;
          this.username = "";
          this.email = "";
          this.password = "";
          this.gender = "";
          this.income = 0;
          this.location = "";
          ngDialog.close();
          $state.go("home");
        }
        angular.element(document).ready(function () {
          this.loggedin = false;
          console.log("READY!")
        });
      }

})();
