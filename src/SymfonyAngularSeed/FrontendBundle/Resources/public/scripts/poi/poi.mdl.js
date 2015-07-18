'use strict';

angular.module('symfonyAngularSeedApp').config(
	function($stateProvider) {
		$stateProvider.state('poi', {
			url : "/poi/:id",
			templateUrl : "/bundles/frontend/views/poi/poi.tpl.html",
			controller: 'PoiCtrl'
		})
	});