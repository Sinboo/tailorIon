/**
 * Created by wxb on 16/6/27.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('OrderCtrl', function($scope, $state, $location, dataSetterGetter, PAGE_SIZE, providerService, tailoringTypes, toaster) {
    $scope.$on("$ionicView.enter", function(event, data){
      if (dataSetterGetter.get('detailOrder')) {
        $scope.orders = _.without($scope.orders, dataSetterGetter.get('detailOrder'))
      }
    });

    var pageIndex = 0;
    var param = {};
    $scope.getOrders = function (pageIndex) {
      param.page = pageIndex;
      param.pageSize = PAGE_SIZE;
      if ($location.path().indexOf('orderFreight') !== -1) {
        param.STATUS = 'PLACED';
      }
      else if ($location.path().indexOf('orderNotSend') !== -1) {
        param.STATUS = 'PAYED';
      }
      else if ($location.path().indexOf('orderSend') !== -1) {
        param.STATUS = 'DELIVERED';
      }
      else if ($location.path().indexOf('orderSuccess') !== -1) {
        param.STATUS = 'SUCCESS';
      }
      var queryParams = JSON.parse(JSON.stringify(param));
      console.log(queryParams);
      providerService.getOrders(queryParams).then(function (data) {
        if (data && data.success == true) {
          var newOrders = data.data.content;
          $scope.orders = $scope.orders.concat(newOrders);
          $scope.totalElements = data.data.totalElements;
          if ( data.data.last == true ) {
            $scope.noMoreItemsAvailable = true;
            toaster.pop('warning', '最后一屏数据');
            $scope.$broadcast('scroll.infiniteScrollComplete');
          }
        }
        else if (data && data.success == false) {
          toaster.pop('error', data.error.message);
        }
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.loadMore = function () {
      $scope.getOrders(pageIndex);
      pageIndex = pageIndex + 1;
    };

    $scope.doRefresh = function () {
      $scope.orders = [];
      pageIndex = 0;
      $scope.getOrders(0);
      pageIndex = pageIndex + 1;
      $scope.noMoreItemsAvailable = false;
    };

    $scope.doRefresh();
    
    $scope.orderDetail = function (order) {
      var stateStr = $location.path().replace('/2/', '').replace('/', '').replace('true', '');
      $state.go('provider.' + stateStr + 'Detail', {order: order})
    }

  });