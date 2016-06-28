/**
 * Created by wxb on 16/6/25.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('ReceiveClothModalCtrl', function ($scope, $filter, parameters, ionicDatePicker) {
    var vm = this;
    vm.formData = {};

    var ipObj1 = {
      callback: function (val) {
        vm.formData.receiveDate = $filter('date')(val, 'yyyy-MM-dd');
      }
    };

    vm.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

    vm.confirm = function(formData) {
      $scope.closeModal(formData);
    };
    vm.cancel = function() {
      $scope.closeModal(null);
    };
    
  });