'use strict';

angular.module('symfonyAngularSeedApp').config(
		function($stateProvider) {
			$stateProvider.state('home', {
				url : "/home",
				templateUrl : "/bundles/frontend/views/home/home.tpl.html",
				controller: 'HomeCtrl'
			})
		});