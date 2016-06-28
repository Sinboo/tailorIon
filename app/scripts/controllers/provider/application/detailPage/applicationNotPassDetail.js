/**
 * Created by wxb on 16/6/27.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('ApplicationNotPassDetailCtrl', function ($scope, $state, dataSetterGetter, SHOP_TYPE, providerService, toaster, appModalService) {
    dataSetterGetter.set('application', undefined);
    
    if ($state.params.apply == undefined) {
      $state.go('provider.applicationNotPass', {inherit: false});
    }

    $scope.SHOP_TYPE = SHOP_TYPE;
    $scope.apply = $state.params.apply.shop;
    $scope.applyNumber = $state.params.apply.number;


    $scope.refuse = function (applyNumber) {
      providerService.refuseApply(applyNumber).then(function (data) {
        if(data && data.success == true) {
          toaster.pop('success', ' 拒绝成功！');
          dataSetterGetter.set('application', $state.params.apply);
          $state.go('provider.applicationNotPass', {inherit: false})
        }
        else if (data && data.success == false) {
          toaster.pop('error', data.error.message);
        }
      })
    };

    $scope.accept = function (applyNumber) {
      appModalService.show(
        'templates/provider/application/modal/acceptApplicationModal.html',
        'AcceptApplicationModalCtrl as vm'
      ).then(function (value) {
        console.log(value);
        if (value) {
          var queryParams = {};
          queryParams.id = applyNumber;
          queryParams.pricingPackageNumber = value.pricingPackageNumber.number || value.pricingPackageNumber.name;
          queryParams.settlementType = value.settlementType.shortName;
          queryParams.hasExpressProcess = value.hasExpressProcess.shortName;
          queryParams = JSON.parse(JSON.stringify(queryParams));
          console.log(queryParams);
          providerService.acceptApply(queryParams).then(function (data) {
            if(data && data.success == true) {
              toaster.pop('success', ' 建立业务合作成功！');
              dataSetterGetter.set('application', $state.params.apply);
              $state.go('provider.applicationNotPass', {inherit: false});
            }
            else if (data && data.success == false) {
              toaster.pop('error', data.error.message);
            }
          })
        }
      }, function (err) {
        toaster.pop('warning', err);
      })

    }

  });