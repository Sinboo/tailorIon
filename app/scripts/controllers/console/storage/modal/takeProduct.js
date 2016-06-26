/**
 * Created by wxb on 16/6/25.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('TakeProduceModalCtrl', function ($scope, $filter, parameters, ionicDatePicker) {
    var vm = this;
    vm.formData = {};
    vm.feedbacks = ['非常满意', '较满意', '一般', '不满意,退货'];

    var ipObj1 = {
      callback: function (val) {
        vm.formData.takeAwayDate = $filter('date')(val, 'yyyy-MM-dd');
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