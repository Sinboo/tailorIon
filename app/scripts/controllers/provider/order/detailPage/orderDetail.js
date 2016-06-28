/**
 * Created by wxb on 16/6/24.
 */
'use strict';

angular.module('tailorIon.controllers')
.controller('OrderDetailCtrl', function ($scope, big, toaster, dataSetterGetter, appModalService, $state, commonService, tailoringTypes, SHOP_TYPE, providerService, ORDER_STATUS, CURRENCY, FABRIC_UNIT) {
  dataSetterGetter.set('detailOrder', undefined);

  $scope.ORDER_STATUS = ORDER_STATUS;
  $scope.CURRENCY = CURRENCY;
  $scope.FABRIC_UNIT = FABRIC_UNIT;
  $scope.tailoringTypes = tailoringTypes;
  $scope.truncateDecimals = commonService.truncateDecimals;

  if ($state.params.order == undefined) {
    $state.go('provider.orderFreight');
  }
  
  $scope.STATUS = $state.params.order.status;
  $scope.orders = $state.params.order.items;
  $scope.totalPrice = $state.params.order.totalPrice;
  $scope.totalPrice4CNY = $state.params.order.totalPrice4CNY;
  $scope.shopName = $state.params.order.shopName;

  $scope.orderInfo = $state.params.order.items[0].orderItem;
  $scope.remark = $state.params.order.remark;
  $scope.currency = $state.params.order.currency;
  $scope.exchangeRate = $state.params.order.exchangeRate;
  $scope.fabricFee = $state.params.order.fabricFee;
  $scope.expressFee = $state.params.order.expressFee;
  $scope.hasExFeeFlag = $state.params.order.expressFee !== 0;
  $scope.settlementType = $state.params.order.settlementType;
  $scope.hasExpressFeeProcess = $state.params.order.hasExpressFeeProcess;

  $scope.orderId = $state.params.order.number;

  $scope.setExpressFee = function (expressFee) {
    var expressFeeNum = isNaN(expressFee) || expressFee == "" ? 0 : Number(expressFee);
    $scope.expressFee = expressFeeNum;
    var totalPrice = [];
    totalPrice.push($scope.fabricFee);
    totalPrice.push(expressFeeNum);
    $scope.totalPrice = big.sum(totalPrice).toFixed(4);
    $scope.totalPrice4CNY = big.sum(totalPrice).times($scope.exchangeRate).toFixed(4);
  };


  $scope.images = [
    {
      'url': $state.params.order.voucherUrl,
      'thumbUrl': $state.params.order.voucherUrl
    }
  ];

  $scope.openLightboxModal = function (index) {
    Lightbox.openModal($scope.images, index);
  };

  $scope.sendExpressFee = function () {
    var params = {};
    params.NUMBER = $state.params.order.number;
    params.expressFee = $scope.expressFee;
    console.log(params)
    providerService.setExpressFee(params).then(function (data) {
      if (data && data.success == true) {
        toaster.pop('success', '运费设置成功!');
        dataSetterGetter.set('detailOrder', $state.params.order);
        $state.go('provider.orderFreight', {inherit: false});
      }
    })
  };

  $scope.send = function () {
    appModalService.show(
      'templates/provider/order/modal/sendOrderModal.html',
      'SendOrderModalCtrl as vm'
    ).then(
      function(value) {
        if (value) {
          var postData = {}
          postData.company = value.company;
          postData.number = value.number;
          postData.remark = value.remark == "" ? undefined : value.remark;
          var ID = $scope.orderId;
          postData = JSON.parse(JSON.stringify(postData));
          providerService.sendOrder(postData, ID).then(function (data) {
            if (data && data.success == true) {
              toaster.pop('success', '发货成功!');
              dataSetterGetter.set('detailOrder', $state.params.order);
              $state.go('provider.orderNotSend', {inherit: false});
            }
            else if (data && data.success == false) {
              toaster.pop('warning', data.error.message);
            }
          })
        }
        else {
          toaster.pop('warning', '请尽快发货!');
        }
      },
      function(err) {
        toaster.pop('warning', err);
      }
    );
  }

});