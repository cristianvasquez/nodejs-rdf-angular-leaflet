'use strict';

angular.module('app.master', ['ngRoute', 'leaflet-directive'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/master', {
            templateUrl: './master/master.html',
            controller: 'MasterCtrl'
        });
    }])

    .controller('MasterCtrl', ["$scope", "$http", function ($scope, $http) {
        angular.extend($scope, {
            belgium: {
                //autodiscover: true,
                lat: 50.84410451978967,
                lng: 4.581298828125,
                zoom: 8
            },
            layers: {
                baselayers: {
                    "osm": {
                        name: "OpenStreetMap",
                        url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        type: "xyz",
                        layerParams: {},
                        layerOptions: {}
                    },
                    cycle: {
                        name: 'OpenCycleMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                        layerOptions: {
                            subdomains: ['a', 'b', 'c'],
                            continuousWorld: true
                        }
                    },
                },
                overlays: {
                    //hillshade: {
                    //    name: 'Hillshade Europa',
                    //    type: 'wms',
                    //    url: 'http://129.206.228.72/cached/hillshade',
                    //    visible: true,
                    //    layerOptions: {
                    //        layers: 'europe_wms:hs_srtm_europa',
                    //        format: 'image/png',
                    //        opacity: 0.25,
                    //        attribution: 'Hillshade layer by GIScience http://www.osm-wms.de',
                    //        crs: L.CRS.EPSG900913
                    //    }
                    //},

                    // @TODO handle this stuff dynamically
                    //organization: {
                    //    type: 'http://openthings.org/organization',
                    //    name: 'Organization',
                    //    visible: true
                    //}
                }
            },
            controls: {},
            markers: {}
        });

        function forceFloat(value) {
            if (typeof value == 'string') {
                return parseFloat(value);
            }
            return value;
        }

        /** Load the markers */
        $http.get("api/nodes").success(function (markersData) {
            /**
             *  The filter function
             */
            var i=0;
            markersData['@graph'].filter(function (current) {
                //var id = current['@id'];
                //console.log(current['@id']);
                //console.log(current['@type']);
                $scope.markers[i++] = {
                    lat: forceFloat(current.latitude),
                    lng: forceFloat(current.longitude),
                    // enable clustering
                    //group: 'Brussels',
                    //layer: current['@type'],
                    message: "<div ng-include src=\"'detail/detail.html'\"></div>",
                    getMessageScope: function() {
                        $scope.current=current;
                        // $scope.current['@context']=markersData['@context'];
                        return $scope;
                    },
                }
            });
            //$scope.markers = markersData;
        });

        // @TODO
        // Expand the UI to search for terms in agrovoc
        // Results should be persisted
        // @TODO
        // Do some faceted browsing in this map
        // @TODO
        // The vocabularies to support hydra navigation
    }]);