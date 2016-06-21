/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('OrderDoingCtrl', function($scope, $state, customShopService, PAGE_SIZE, tailoringTypes, toaster) {
    $scope.orders = [];
    $scope.noMoreItemsAvailable = false;
    var pageIndex = 0;

    customShopService.ordersNumber().then(function (data) {
      if (data && data.success == true) {
        $scope.orderNumber = data.data;
      }
      else if (data && data.success == false) {
        toaster.pop('error', data.error.message);
      }
    });

    var param = {};
    $scope.getOrders = function (pageIndex) {
      param.page = pageIndex;
      param.pageSize = PAGE_SIZE;
      param.STATUS = 'DOING';
      var queryParams = JSON.parse(JSON.stringify(param));
      customShopService.getOrders(queryParams).then(function (data) {
        if (data && data.success == true) {
          var newOrders = data.data.content;
          angular.forEach(newOrders, function (order) {
            var consumingProduct = '';
            angular.forEach(order.items, function (d) {
              var clothingType = d.clothingTypes=='OTHER'?d.otherClothes:tailoringTypes[d.clothingTypes.toString()];
              consumingProduct = consumingProduct + '+' + clothingType;
            });
            order.consumingProduct = consumingProduct.substring(1, consumingProduct.length);
          });
          $scope.orders = $scope.orders.concat(newOrders);
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

    $scope.loadMore();

    $scope.doRefresh = function () {
      $scope.orders = [];
      pageIndex = 0;
      $scope.getOrders(0);
      pageIndex = pageIndex + 1;
    };
    
    $scope.detailPage = function (order) {
      console.log('yes');
      $state.go('tailor.detailPage')
    }


    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

	});
