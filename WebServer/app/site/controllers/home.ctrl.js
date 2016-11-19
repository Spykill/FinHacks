(function(){
    angular
        .module('finApp')
        .controller('HomeCtrl', HomeCtrl)

    function HomeCtrl($scope, ngDialog){
        this.loggedin = false;

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
