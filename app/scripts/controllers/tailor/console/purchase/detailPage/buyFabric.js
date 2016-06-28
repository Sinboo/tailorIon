/**
 * Created by wxb on 16/6/24.
 */
'use strict';

angular.module('tailorIon.controllers')
.controller('BuyFabricCtrl', function ($rootScope, $scope, zero, one, $state, $ionicPopup, $ionicLoading, $filter, $stateParams, big, toaster, customShopService, commonService, upyun, rfc4122, localStorageService, tailoringTypes, CURRENCY, FABRIC_UNIT, payment, SETTLEMENT_TYPE) {
  $scope.CLOTHING_TYPE = {D: '衬衫', A: '西服', OTHER: '其他'};
  $scope.clothingTypeName = $stateParams.clothingType;
  $scope.CURRENCY = CURRENCY;
  $scope.SETTLEMENT_TYPE = SETTLEMENT_TYPE;
  $scope.FABRIC_UNIT = FABRIC_UNIT;
  $scope.expressFeeStatus = $stateParams.expressFeeStatus;
  $scope.expressFee = $stateParams.expressFee;
  $scope.totalPrice4CNYState = $stateParams.totalPrice4CNY;
  $scope.totalPriceState = $stateParams.totalPrice;
  $scope.fabricFeeState = $stateParams.fabricFee;
  $scope.remarkState = $stateParams.remark;
  $scope.truncateDecimals = commonService.truncateDecimals;
  console.log($stateParams)

  if($stateParams.remark) {
    $scope.remark = $stateParams.remark;
  }

  $scope.payment = payment.data;
  console.log($scope.payment);

  if ($state.params.orderList == undefined) {
    $state.go('tailor.consolePurchaseToBuy');
  }

  $scope.tailoringTypes = tailoringTypes;
  
  $scope.supplierName = $stateParams.supplierName;
  $scope.factoryName = $stateParams.factoryName;


  $scope.orderToBuy = $state.params.orderList;
  console.log($scope.orderToBuy)
  var orderItems = [];
  var totalPrice = [];
  angular.forEach($scope.orderToBuy, function (item) {
    if (item.checked == true) {
      totalPrice.push(item.totalPrice == null ? 0 : item.totalPrice);
      orderItems.push(item.number);
    }
  });
  $scope.orderItems = orderItems;
  $scope.totalPrice = big.sum(totalPrice);
  $scope.totalPrice4CNY = $scope.totalPrice.times($scope.payment.exchangeRate == null ? 1 : $scope.payment.exchangeRate);


  customShopService.factoryPartners().then(function (data) {
    $scope.factoryPartners = data.data;
    $scope.factoryPartner = _.groupBy($scope.factoryPartners, 'number')[$stateParams.factoryNum][0];
    console.log($scope.factoryPartner)
  });

  //choose img
  $scope.openFileDialog = function() {
    ionic.trigger('click', {
      target: document.getElementById('file')
    });
  };

  $(document).on("change", ".uploadImage", function(e){
    e.preventDefault();
    $scope.upload();
  });

  upyun.on('uploading', function(progress) {
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner><br/>' + progress + "%",
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
    if (progress === 100) {
      $ionicLoading.hide();
    }
  });
  

  //upload image
  $scope.upload = function() {
    var merchantNumber = localStorageService.cookie.get('user').merchantNumber;
    var supplierNumber = $stateParams.supplierNumber;
    var uuidString = rfc4122.v4();
    var last = '{.suffix}';
    var imgUrl = '/' + merchantNumber +'/'+ supplierNumber +'/'+ '{year}/{mon}' +'/'+ uuidString + last;
    upyun.set('save-key', imgUrl);
    upyun.upload('uploadForm', function(err, response, image){
      if (err) console.error(err);
      if (image.code === 200 && image.message === 'ok') {
        $scope.image = {};
        $scope.image.ready = true;
        $scope.image.url = image.absUrl;
        console.log($scope.image.url)
      }
      $scope.$apply();
    });
  };

  $scope.deleteImage = function () {
    $ionicPopup.confirm({
      title: '删除图片?',
      template: '您想要删除图片或更换图片?',
      buttons: [{ text: '取消' }, { text: '确认', type: 'button-positive', onTap: function(e) {return 'ok'}}]
    }).then(function(res) {
      console.log(res)
      if(res == 'ok') {
        $scope.image.url = "";
        $scope.image.ready = false;
      }
      else {}
    });
  };

  $scope.submitOrder = function () {
    if ($scope.payment.hasSettleProcess == false) {
      ngDialog.openConfirm({
        template: 'views/provider/orderManage/modal/sendInfoModal.html',
        className: 'ngdialog-theme-default dialogcaseeditor',
        controller: 'SendInfoModalCtrl'
      }).then(
        function(value) {
          var postData = {};
          postData.express = {};
          postData.express.company = value.company;
          postData.express.number = value.number;
          postData.express.remark = value.remark == "" ? undefined : value.remark;
          postData.supplierName = $stateParams.supplierName;
          postData.supplierNumber = $stateParams.supplierNumber;
          postData.items = $scope.orderItems;
          postData.remark = $scope.remark;
          postData.factoryNumber = $scope.factoryPartner.number;
          postData.createTime = new Date().getTime();
          postData = JSON.parse(JSON.stringify(postData));
          customShopService.orderFabricPrivate(postData).then(function (data) {
            if (data && data.success == true) {
              toaster.pop('success', '下单成功!');
              $state.go('tailor.consolePurchaseToBuy', {fromBuyFabric: true}, {reload: true});
            }
          })
        },
        function(value) {
          toaster.pop('warning', '请尽快下单!');
        }
      );
    }
    else {
      if ($stateParams.expressFeeStatus !== 'true') {
        if($scope.orderItems.length == 0) {layer.tips('请勾选要支付的订单', '#check_all'); scrollTo('#check_all'); return false;}

        var postData = {};
        postData.factoryNumber = $scope.factoryPartner.number;
        postData.remark = $scope.remark;
        postData.supplierName = $stateParams.supplierName;
        postData.supplierNumber = $stateParams.supplierNumber;
        postData.totalPrice = commonService.truncateDecimals($scope.totalPrice.toFixed(4), 2); // 保留2位小数
        postData.totalPrice4CNY = commonService.truncateDecimals($scope.totalPrice4CNY.toFixed(4), 2); // 保留2位小数
        postData.fabricFee = commonService.truncateDecimals($scope.totalPrice.toFixed(4), 2); // 保留2位小数
        postData.hasExpressFeeProcess = $scope.payment.hasExpressFeeProcess;
        postData.voucherUrl = $scope.image == undefined ? undefined : $scope.image.url;
        if ($scope.payment && $scope.payment.settlementType) {
          postData.settlementType = $scope.payment.settlementType;
          postData.payment = $scope.payment.payment;
        }
        postData.items = $scope.orderItems;
        var postString = JSON.stringify(postData);
        customShopService.orderFabric(postString).then(function (data) {
          if (data && data.success == true) {
            $state.go('tailor.consolePurchaseToBuy', {fromBuyFabric: true}, {reload: true});
            toaster.pop('success', '下单成功!');
          }
          else {
            toaster.pop('error', data.error.message);
            $state.go('tailor.consolePurchaseToBuy', {fromBuyFabric: true}, {reload: true});
          }
        })
      }
      if ($stateParams.expressFeeStatus == 'true') {
        var queryParams = {};
        queryParams.NUMBER = $stateParams.orderNumber;
        queryParams.voucherUrl = $scope.image == undefined ? undefined : $scope.image.url;
        console.log(queryParams)
        customShopService.confirmExpressFee(queryParams).then(function (data) {
          if (data && data.success == true) {
            $state.go('tailor.consolePurchaseToBuy', {fromBuyFabric: true}, {reload: true});
            toaster.pop('success', '付款成功!');
          }
          if (data && data.success == false) {
            toaster.pop('error', data.error.message);
          }

        })

      }
    }
  };

});