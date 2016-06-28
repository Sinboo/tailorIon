/**
 * Created by wxb on 16/6/24.
 */
'use strict';

angular.module('tailorIon.controllers')
.controller('BillDetailCtrl', function ($scope, big, toaster, BILL_CYCLE, dataSetterGetter, appModalService, $state, commonService, tailoringTypes, SHOP_TYPE, providerService, ORDER_STATUS, CURRENCY, FABRIC_UNIT) {
  dataSetterGetter.set('detailBill', undefined);
  $scope.BILL_CYCLE = BILL_CYCLE;

  $scope.ORDER_STATUS = ORDER_STATUS;
  $scope.CURRENCY = CURRENCY;
  $scope.FABRIC_UNIT = FABRIC_UNIT;
  $scope.tailoringTypes = tailoringTypes;
  $scope.truncateDecimals = commonService.truncateDecimals;

  if ($state.params.order == undefined) {
    $state.go('provider.billINIT');
  }

  $scope.bill = $state.params.order;
  $scope.STATUS = $state.params.order.status;

  providerService.billDetail($state.params.order.number).then(function (data) {
    if (data && data.success == true) {
      $scope.items = data.data;
    }
    else if (data && data.success == false) {
      toaster.pop('error', data.error.message);
    }
  });

  $scope.deliverBill = function (NUMBER) {
    providerService.deliverBill(NUMBER).then(function (data) {
      if (data && data.success == true) {
        toaster.pop('success', '发送对账单成功!');
        dataSetterGetter.set('detailBill', $state.params.order);
        $state.go('provider.billINIT', {inherit: false});

      }
      else if (data && data.error) {
        toaster.pop('warning', data.error.message);
      }
    })
  }

  $scope.confirmBill = function (NUMBER) {
    providerService.confirmBill(NUMBER).then(function (data) {
      if (data && data.success == true) {
        toaster.pop('success', '确认收款成功!')
        dataSetterGetter.set('detailBill', $state.params.order);
        $state.go('provider.billPAYED', {inherit: false});
      }
      else if (data && data.error) {
        toaster.pop('warning', data.error.message);
      }
    })
  }
  
  




});