'use strict';

angular.module('symfonyAngularSeedApp').controller('HomeCtrl', [ '$scope', '$http', 'Profile',
                                                       function($scope, $http, Profile) {
	$scope.isAdmin = false;
	$scope.isUser = false;
	
//	if($scope.user.profiles[0] == Profile.DAD_ADMIN) {
//	  	$scope.isAdmin = true;
//		$scope.isUser = true;
//	} else if($scope.user.profiles[0] == Profile.DAD_USER) {
//		$scope.isUser = true;
//	}
	
}]);