/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('ProviderMenuCtrl', function($scope, $state, $location, localStorageService) {

    $scope.getClass = function (path) {
      return $location.path().indexOf(path) !== -1  ? 'active' : '';
    };

    $scope.getState = function (path) {
      return $location.path().indexOf(path) !== -1;
    };

    $scope.shouldHide = function () {
      if ( $location.path().indexOf('Detail') !== -1 ) {return true}

      return false;
    };

    $scope.logout = function () {
      localStorageService.cookie.set('user', {anonymous: true});
      $state.go('login', {reload: true});
    }

  });
