'use strict';

angular.module('symfonyAngularSeedApp').config(
		function($stateProvider) {
			$stateProvider.state('center', {
				url : "/center/:latitude/:longitude/:zoom",
				templateUrl : "/views/center/center.tpl.html",
				controller: 'CenterCtrl'
			})
		});
