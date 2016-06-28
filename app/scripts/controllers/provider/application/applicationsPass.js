/**
 * Created by wxb on 16/6/27.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('ApplicationsPassCtrl', function ($scope, localStorageService, $stateParams, providerService, baseService, PAGE_SIZE, SHOP_TYPE, toaster) {
    $scope.SHOP_TYPE = SHOP_TYPE;
    $scope.APPLY_STATUS = {NORMAL: '合作中'};
    var pageIndex;

    var param = {};
    $scope.getApplies = function (pageIndex) {
      param.page = pageIndex;
      param.pageSize = PAGE_SIZE;
      var queryParams = JSON.parse(JSON.stringify(param));
      providerService.getAllPartners(queryParams).then(function (data) {
        if (data && data.success == true) {
          var newApplies = data.data.content;
          $scope.totalNumber = data.data.totalElements;
          $scope.applies = $scope.applies.concat(newApplies);
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
      $scope.getApplies(pageIndex);
      pageIndex = pageIndex + 1;
    };

    $scope.doRefresh = function () {
      $scope.applies = [];
      pageIndex = 0;
      $scope.getApplies(0);
      pageIndex = pageIndex + 1;
      $scope.noMoreItemsAvailable = false;
    };

    $scope.doRefresh();


  });