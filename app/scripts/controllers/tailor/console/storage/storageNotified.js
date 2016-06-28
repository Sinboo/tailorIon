/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('StorageNotifiedCtrl', function($scope, PAGE_SIZE, commonService, customShopService, toaster, FABRIC_UNIT, tailoringTypes, $ionicPopup, appModalService) {
		$scope.tailoringTypes = tailoringTypes;
		$scope.covertDate = commonService.convertDate;
		$scope.FABRIC_UNIT = FABRIC_UNIT;
		$scope.orders = [];
		$scope.noMoreItemsAvailable = false;
		var pageIndex = 0;

		var param = {};
		$scope.getOrders = function (pageIndex) {
			param.page = pageIndex;
			param.pageSize = PAGE_SIZE;
			param.STATUS = 'IN';
			param.notified = 'true';
			var queryParams = JSON.parse(JSON.stringify(param));
			customShopService.getStorage(queryParams).then(function (data) {
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

		$scope.takeProduct = function (NUBMBER) {
			appModalService.show(
				'templates/tailor/console/storage/modal/takeProductModal.html',
				'TakeProduceModalCtrl as vm'
			).then(
				function (value) {
					if(value) {
						var queryParam = {};
						queryParam.NUMBER = NUBMBER;
						queryParam.feedback = value.feedback;
						queryParam.remark = value.remark;
						queryParam.takeAwayDate = value.takeAwayDate;
						customShopService.takeProduct(queryParam).then(function (data) {
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
		};

		customShopService.factoryPartners().then(function (data) {
			$scope.factories = data.data;
		});

		$scope.returnFactory = function (NUBMBER) {
			appModalService.show(
				'templates/tailor/console/storage/modal/returnFactoryModal.html',
				'ReturnFactoryModalCtrl as vm',
				$scope.factories
			).then(
				function (value) {
					console.log(value)
					if(value) {
						var postData = {};
						angular.copy(value, postData);
						postData.orderItem = {};
						postData.orderItem.factoryNumber = value.orderItem.number;
						postData.detailPicUrl = postData.image.url;
						delete postData.image;
						customShopService.returnFactory(postData, NUBMBER).then(function (data) {
							if (data && data.success == true) {
								toaster.pop('success', '返厂成功!');
								$scope.doRefresh();
							}
							else if (data && data.success == false) {
								toaster.pop('warning', data.error.message);
							}
						})
					}
				},
				function (err) {
					toaster.pop('warning', err);
				}
			)
		}

	});
