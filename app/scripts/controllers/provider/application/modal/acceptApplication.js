/**
 * Created by wxb on 16/6/27.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('AcceptApplicationModalCtrl', function ($scope, providerService, SETTLEMENT_TYPE, toaster) {
    var vm = this;
    
    vm.formData = {};
    vm.businesses = [];
    $.each(SETTLEMENT_TYPE, function (key, value) {
      var typeItem = {};
      typeItem.shortName = key;
      typeItem.fullName = value;
      vm.businesses.push(typeItem);
    });

    vm.formData.settlementType = [];
    vm.choose = function (business) {
      if (vm.formData.settlementType.indexOf(business) === -1) {
        vm.formData.settlementType = [];
        vm.formData.settlementType.push(business.shortName);
      }
      else {
        vm.formData.settlementType.pop();
      }
    };

    providerService.getPriceSystems().then(function (priceSystems) {
      vm.priceSystems = priceSystems.data;
      vm.priceSystems.push({name: '零剪价格'})
    });

    vm.formData.pricingPackageNumber = [];
    vm.choosePrice = function (ps) {
      if (vm.formData.pricingPackageNumber.indexOf(ps) === -1) {
        vm.formData.pricingPackageNumber = [];
        vm.formData.pricingPackageNumber.push(ps.number);
      }
      else {
        vm.formData.pricingPackageNumber.pop();
      }
    };

    vm.ExpressProcesses = [{fullName: '需要处理运费', shortName: true}, {fullName: '不需要处理运费', shortName: false}];
    vm.formData.hasExpressProcess = [];
    vm.chooseExpressProcess = function (ExpressProcess) {
      if (vm.formData.hasExpressProcess.indexOf(ExpressProcess) === -1) {
        vm.formData.hasExpressProcess = [];
        vm.formData.hasExpressProcess.push(ExpressProcess.shortName);
      }
      else {
        vm.formData.hasExpressProcess.pop();
      }
      console.log(vm.formData.hasExpressProcess)
    };

    vm.validate = function () {
      if (vm.formData.pricingPackageNumber.length === 0) {toaster.pop('error', '请选择结算价格'); return false;}
      if (vm.formData.settlementType.length === 0) {toaster.pop('error', '请选择结算方式'); return false;}
      if (vm.formData.hasExpressProcess.length === 0) {toaster.pop('error', '请选择订单运费'); return false;}
      return true;
    };

    vm.confirm = function(formData) {
      $scope.closeModal(formData);
    };
    vm.cancel = function() {
      $scope.closeModal(null);
    };

  });