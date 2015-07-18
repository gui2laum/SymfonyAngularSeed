'use strict';

angular.module('symfonyAngularSeedApp').config(
		function($stateProvider) {
			$stateProvider.state('home', {
				url : "/home",
				templateUrl : "/views/home/home.tpl.html",
				controller: 'HomeCtrl'
			})
		});
