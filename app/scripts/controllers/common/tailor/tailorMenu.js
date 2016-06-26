/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('TailorMenuCtrl', function($scope, $state, $location) {

    $scope.getClass = function (path) {
      return $location.path().indexOf(path) !== -1  ? 'active' : '';
    };

    $scope.getState = function (path) {
      return $location.path().indexOf(path) !== -1;
    };

    $scope.shouldHide = function () {
      switch ($state.current.name) {
        case 'tailor.detailPage':
          return true;
        case 'tailor.buyFabric':
          return true;
        case 'tailor.quickQueryResult':
          return true;
        case 'tailor.providerOrderList':
          return true;
        default:
          return false;
      }
    }

  });
