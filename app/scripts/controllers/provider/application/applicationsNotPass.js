/**
 * Created by wxb on 16/6/27.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('ApplicationsNotPassCtrl', function ($scope, providerService, dataSetterGetter, SHOP_TYPE, toaster, APPLY_STATUS) {
    $scope.$on("$ionicView.enter", function(event, data){
      if (dataSetterGetter.get('application')) {
        $scope.applies = _.without($scope.orders, dataSetterGetter.get('application'))
      }
    });

    providerService.newApplyCount().then(function (data) {
      $scope.newApplyCount = data.data.newApply;
    });
    providerService.newApplies().then(function (data) {
      $scope.applies = data.data;
    });
    
    $scope.APPLY_STATUS = APPLY_STATUS;

    $scope.SHOP_TYPE = SHOP_TYPE;

  });