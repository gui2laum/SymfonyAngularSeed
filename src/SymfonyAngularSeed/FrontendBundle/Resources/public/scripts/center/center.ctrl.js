'use strict';

angular.module('symfonyAngularSeedApp').controller('CenterCtrl', [ '$scope', '$http', 'Profile', '$stateParams', 'uiGmapGoogleMapApi', '$log',
                                                       function($scope, $http, Profile, $stateParams, uiGmapGoogleMapApi, $log) {
	$scope.latitude = $stateParams.latitude;
	$scope.longitude = $stateParams.longitude;
	$scope.zoom = $stateParams.zoom;
	$scope.map = { center: { latitude: $scope.latitude, longitude: $scope.longitude }, zoom: parseInt($scope.zoom), bounds: {} };
	$scope.options = { scrollwheel: false };
	$scope.activeMarker = 0;
	
    var createRandomMarker = function (i, bounds, idKey) {
        var lat_min = bounds.southwest.latitude,
            lat_range = bounds.northeast.latitude - lat_min,
            lng_min = bounds.southwest.longitude,
            lng_range = bounds.northeast.longitude - lng_min;

        if (idKey == null) {
            idKey = "id";
        }

        var latitude = lat_min + (Math.random() * lat_range);
        var longitude = lng_min + (Math.random() * lng_range);
        var ret = {
            latitude: latitude,
            longitude: longitude,
            title: 'm' + i,
            show: false,
            info_content: i,
        };
        
        ret[idKey] = i;
        
        ret.onClickToMarker = function() {
            ret.show = !ret.show;
            $scope.activeMarker = ret[idKey];
        };
        return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
        // Only need to regenerate once
        if (!ov.southwest && nv.southwest) {
            var markers = [];
            for (var i = 0; i < 50; i++) {
                markers.push(createRandomMarker(i, $scope.map.bounds))
            }
            $scope.randomMarkers = markers;
        }
    }, true);

	uiGmapGoogleMapApi.then(function(maps) {
		
    });
}]).controller('controlCtrl', [ '$scope', '$state', '$log', function ($scope, $state, $log) {
    $scope.controlChange = function () {
    	$log.log($scope.zone);
        $scope.go($scope.zone);
    };
    
    $scope.go = function(id) {
		switch(id) {
		case "1":
			$state.go('center', {latitude: 48.816363000000000000, longitude: 2.317383999999947300, zoom: 13 });
			break;
		case "2":
			$state.go('center', {latitude: 48.889735900000000000, longitude: 2.241842799999972000, zoom: 13 });
			break;
		default:
			$state.go('home');
			break;
		}
	}
}]);;