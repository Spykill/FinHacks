(function(){
    angular
        .module('finApp')
        .controller('DashCtrl', DashCtrl)

    function DashCtrl(){
      
        this.welcome_message = "Budget Buddy!";

        // Function Bindings
        this.change_tab = change_tab;

        function change_tab(active) {
          if (active == "tab1") {
            $("#tab1").addClass("active")
            $("#tab2").removeClass("active")
            $("#tab3").removeClass("active")
              $("#tab4").removeClass("active")
          }
          else if (active == "tab2") {
            $("#tab2").addClass("active")
            $("#tab1").removeClass("active")
            $("#tab3").removeClass("active")
              $("#tab4").removeClass("active")
          }
          else if (active == "tab3") {
            $("#tab3").addClass("active")
            $("#tab1").removeClass("active")
            $("#tab2").removeClass("active")
              $("#tab4").removeClass("active")
          }
            else if (active == "tab4"){
              $("#tab4").addClass("active")
              $("#tab1").removeClass("active")
              $("#tab2").removeClass("active")
              $("#tab3").removeClass("active")
          }
        }
    }
})();
