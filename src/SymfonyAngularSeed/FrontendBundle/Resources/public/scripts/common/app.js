'use strict';

var symfonyAngularSeedApp = angular.module('symfonyAngularSeedApp', ['ui.router', 'ui.bootstrap', 'restangular', 'uiGmapgoogle-maps'])
	.constant('DadSettings', { apiBase: 'api/' })
	.constant('Profile', { DAD_ADMIN: "DAD_ADMIN", DAD_USER: "DAD_USER" })
	.config(function($urlRouterProvider, $httpProvider, $stateProvider, RestangularProvider, DadSettings, Profile) {
		RestangularProvider.setBaseUrl(DadSettings.apiBase);
		
	  	$httpProvider.defaults.xsrfHeaderName = 'X-Requested-By';
	    $httpProvider.defaults.xsrfCookieName = 'Requested-By';
	    
	    $stateProvider
		  .state('redirection', {
			  url: '/redirection',
		    resolve : {
		  	  redirect : ['$location', '$rootScope', '$window', function($location, $rootScope, $window) {
		  		  $rootScope.user = { profiles: ['DAD_USER']};
				  if(angular.isDefined($rootScope.user) && $rootScope.user.profiles[0] == Profile.DAD_ADMIN) {
					  $location.path('/home');
				  } else if(angular.isDefined($rootScope.user) && $rootScope.user.profiles[0] == Profile.DAD_USER) {
					  $location.path('/home');
				  } else {
					  $window.location.href = 'login/403';
				  }
			  }]
		    }
		});
		
		$urlRouterProvider.otherwise('/redirection');
  }).config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
  }).run(['$rootScope', 'DadSettings', '$http', '$log', function($rootScope, DadSettings, $http, $log){
  
  }]).controller('AppController', [ '$rootScope', '$scope', '$log',
			  function($rootScope, $scope, $log) {
				
  }]);



symfonyAngularSeedApp.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

symfonyAngularSeedApp.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);

symfonyAngularSeedApp.value('version', '0.0.1');