/**
 * Created by wxb on 16/6/27.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('ApplicationPassDetailCtrl', function ($scope, $state, dataSetterGetter, SHOP_TYPE, providerService, toaster, appModalService) {
    dataSetterGetter.set('application', undefined);
    
    $scope.passFlag = true;
    
    if ($state.params.apply == undefined) {
      $state.go('provider.applicationNotPass', {inherit: false});
    }

    $scope.SHOP_TYPE = SHOP_TYPE;
    $scope.apply = $state.params.apply;
    $scope.applyNumber = $state.params.apply.number;
    

  });