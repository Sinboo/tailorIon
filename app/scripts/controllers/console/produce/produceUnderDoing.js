/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('ProduceUnderDoingCtrl', function($scope, PAGE_SIZE, customShopService, toaster, FABRIC_UNIT, tailoringTypes, $ionicPopup, appModalService) {
		$scope.tailoringTypes = tailoringTypes;
		$scope.FABRIC_UNIT = FABRIC_UNIT;
		$scope.orders = [];
		$scope.noMoreItemsAvailable = false;
		var pageIndex = 0;

		var param = {};
		$scope.getOrders = function (pageIndex) {
			param.page = pageIndex;
			param.pageSize = PAGE_SIZE;
			param.STATUS = 'PRODUCE';
			var queryParams = JSON.parse(JSON.stringify(param));
			customShopService.produceRecords(queryParams).then(function (data) {
				if (data && data.success == true) {
					var newOrders = data.data.content;
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
			$scope.noMoreItemsAvailable = false;
		};
		
		$scope.updateOrderDeliver = function (number) {
			appModalService.show(
				'templates/console/produce/modal/updateOrderDeliver.html',
				'UpdateOrderDeliverModalCtrl as vm'
			).then(
				function (value) {
					if(value) {
						console.log(value)
						var parameter = value;
						parameter.NUMBER = number;
						parameter = JSON.parse(JSON.stringify(parameter));
						console.log(parameter)
						customShopService.deliveryProduce(parameter).then(function (data) {
							if(data && data.success == true) {
								toaster.pop('success', '订单更新成功！');
								$scope.doRefresh();
							}
							else if (data && data.error) {
								toaster.pop('warning', data.error.message);
							}
						})
					}
				},
				function (err) {
					toaster.pop('warning', err);
				}
			);
		}

	});
