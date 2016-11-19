(function(){
    angular
        .module('finApp')
        .controller('DashCtrl', DashCtrl)

    function DashCtrl(){
        // function htmlbodyHeightUpdate(){
        //     var height3 = $( window ).height();
        //     var height1 = $('.nav').height()+50;
        //     height2 = $('.main').height();
        //     if(height2 > height3){
        //         $('html').height(Math.max(height1,height3,height2)+10);
        //         $('body').height(Math.max(height1,height3,height2)+10);
        //     }
        //     else
        //     {
        //         $('html').height(Math.max(height1,height3,height2));
        //         $('body').height(Math.max(height1,height3,height2));
        //     }
        //
        // }
        // angular.element(document).ready(function(){
        //     htmlbodyHeightUpdate();
        //     $( window ).resize(function() {
        //         htmlbodyHeightUpdate()
        //     });
        //     $( window ).scroll(function() {
        //         height2 = $('.main').height();
        //         htmlbodyHeightUpdate()
        //     });
        // });
        this.welcome_message = "Budget Buddy!";

        // Function Bindings
        this.change_tab = change_tab;

        function change_tab(active) {
          if (active == "tab1") {
            $("#tab1").addClass("active")
            $("#tab2").removeClass("active")
            $("#tab3").removeClass("active")
          }
          else if (active == "tab2") {
            $("#tab2").addClass("active")
            $("#tab1").removeClass("active")
            $("#tab3").removeClass("active")
          }
          else if (active == "tab3") {
            $("#tab3").addClass("active")
            $("#tab1").removeClass("active")
            $("#tab2").removeClass("active")
          }
        }
    }
})();
