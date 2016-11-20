(function(){
    angular
        .module('finApp')
        .controller('CategoryCtrl', CategoryCtrl)

    function CategoryCtrl($scope, apiService, $stateParams){
      this.category = $stateParams.category;
      var self = this;
      console.log(this.category);
      apiService.get_category_data(this.category, function(data){
        self.data = data;
      });
      console.log(self.data);
    }

})();
