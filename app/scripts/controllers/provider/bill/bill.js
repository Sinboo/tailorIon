/**
 * Created by wxb on 16/6/27.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('BillCtrl', function($scope, $state, $location, BILL_CYCLE, dataSetterGetter, PAGE_SIZE, providerService, tailoringTypes, toaster) {
    $scope.$on("$ionicView.enter", function(event, data){
      if (dataSetterGetter.get('detailBill')) {
        $scope.orders = _.without($scope.orders, dataSetterGetter.get('detailBill'))
      }
    });
    
    $scope.BILL_CYCLE = BILL_CYCLE;

    var param = {};
    $scope.getOrders = function () {
      if ($location.path().indexOf('INIT') !== -1) {
        param.STATUS = 'INIT';
      }
      else if ($location.path().indexOf('DELIVERED') !== -1) {
        param.STATUS = 'DELIVERED';
      }
      else if ($location.path().indexOf('PAYED') !== -1) {
        param.STATUS = 'PAYED';
      }
      else if ($location.path().indexOf('SQUAREDUP') !== -1) {
        param.STATUS = 'SQUAREDUP';
      }
      var queryParams = JSON.parse(JSON.stringify(param));
      console.log(queryParams);
      providerService.getBills(queryParams).then(function (data) {
        if (data && data.success == true) {
          var newOrders = data.data;
          $scope.orders = $scope.orders.concat(newOrders);
          $scope.totalElements = data.data.length;
        }
        else if (data && data.success == false) {
          toaster.pop('error', data.error.message);
        }
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });
    };


    $scope.doRefresh = function () {
      $scope.orders = [];
      $scope.getOrders();
    };

    $scope.doRefresh();
    
    $scope.orderDetail = function (order) {
      var stateStr = $location.path().replace('/2/', '').replace('/', '');
      $state.go('provider.' + stateStr + 'Detail', {order: order})
    }

  });