(function(){
	'use strict';

	angular
		.module('finApp',['ui.router']);

	angular
		.module('finApp')
		.config(function($stateProvider, $httpProvider,$urlRouterProvider){

			$urlRouterProvider.otherwise('/');

			$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'site/partials/home.html',
				controller:'HomeCtrl as ctrl'
			})

			.state('dash',{
				url:'/dashboard',
				templateUrl:'site/partials/dash.html',
				controller:'DashCtrl as ctrl'
			})

			.state('dash.overview',{
				url:'/overview',
				templateUrl:'site/partials/overview.html',
				controller:'OverviewCtrl as ctrl'
			})

			.state('dash.demographic',{
				url:'/demo',
				controller:'DemoCtrl as ctrl',
				templateUrl:'site/partials/demo.html'
			})

			.state('dash.location',{
				url:'/location',
				controller:'LocationCtrl as ctrl',
				templateUrl:'site/partials/location.html'
			});

		});
})();
