'use strict';

angular.module('symfonyAngularSeedApp').controller('PoiCtrl', [ '$scope', '$http', 'Profile', '$stateParams', '$log',
                                                       function($scope, $http, Profile, $stateParams, $log) {
	$scope.id = $stateParams.id;

}]);