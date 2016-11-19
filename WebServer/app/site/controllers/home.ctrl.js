(function(){
    angular
        .module('finApp')
        .controller('HomeCtrl', HomeCtrl)

    function HomeCtrl(){
        this.loggedin = true;
    }
})();
