/**
 * Created by wxb on 16/6/25.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('SendOrderModalCtrl', function ($scope, $filter, parameters, ionicDatePicker, EXPRESS_COM) {
    var vm = this;
    vm.EXPRESS_COM = EXPRESS_COM;
    vm.formData = {};

    vm.confirm = function(formData) {
      $scope.closeModal(formData);
    };
    vm.cancel = function() {
      $scope.closeModal(null);
    };
    
  });