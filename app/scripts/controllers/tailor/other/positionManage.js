/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('PositionManageCtrl', function($scope, PAGE_SIZE, customShopService, toaster, $ionicPopup) {
		$scope.providerType = {};
		$scope.providerType.fullName = '请选择供应商类型';
		$scope.providerTypes = [
			{shortName: 'fabric', fullName: '面料供应商地址'},
			{shortName: 'accessory', fullName: '辅料供应商地址'},
			{shortName: 'factory', fullName: '工厂地址'}
		];

		$scope.noMoreItemsAvailable = true;

		var param = {};
		var pageIndex = 0;
		$scope.providers = [];

		$scope.getData = function (pageIndex) {
			param.page = pageIndex;
			param.type = $scope.providerType.shortName;
			param.pageSize = PAGE_SIZE;
			var queryParams = JSON.parse(JSON.stringify(param));
			customShopService.getPositions(queryParams).then(function(data){
				if (data && data.success == true) {
					var newProviders = data.data.content;
					$scope.providers = $scope.providers.concat(newProviders);
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
			$scope.getData(pageIndex);
			pageIndex = pageIndex + 1;
		};

		$scope.doRefresh = function () {
			if ($scope.providerType.shortName) {
				$scope.providers = [];
				pageIndex = 0;
				$scope.getData(0);
				pageIndex = pageIndex + 1;
				$scope.noMoreItemsAvailable = false;
			}
			else {
				$scope.$broadcast('scroll.refreshComplete');
				$ionicPopup.alert({
					title: '提示',
					template: '请选择供应商类型!'
				});
			}
		};

		$scope.setProviderType = function (providerType) {
			$scope.providerType = providerType;
			if ($scope.providerType.shortName) {
				$scope.doRefresh();
			}
		}
	});
