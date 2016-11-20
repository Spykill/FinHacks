(function(){
    angular
        .module('finApp')
        .controller('CategoryCtrl', CategoryCtrl)

    function CategoryCtrl($scope, apiService, $stateParams, ngDialog){
      this.category = $stateParams.category;
      var self = this;
      apiService.get_category_data(this.category, function(data){
        self.data = data;
        self.purchases = data.purchases;
        console.log(self.data);
        console.log(self.data.purchases);
      });

      this.pageSize = 10;
      this.currentPage = 1;
      this.addPurchase = addPurchase;
      this.purchase_submit = purchase_submit

      this.name = "";
      this.amount = 0;
      this.category = 0;

      function addPurchase() {
        open_window = function() {
          ngDialog.open({template: '/site/partials/purchase.html',
          scope: $scope,
          className: 'ngdialog-theme-default'
          })
        };
        open_window();
      }

      function purchase_submit() {
        apiService.addtransaction(this.name, this.amount, this.category);
        ngDialog.close();
        $state.reload();
      }
    }

})();
