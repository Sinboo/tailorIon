/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('StockQuickQueryCtrl', function($scope, customShopService, $state, $ionicPopup) {
		$scope.formData = {};
		
		customShopService.fabricPartners().then(function (data) {
			$scope.fabrics = data.data;
		});

		$scope.queryFabric = function (formData) {
			var param = {};
			param.id = formData.fabric.number == "" ? undefined : formData.fabric.number;
			param.color = formData.color == "" ? undefined : formData.color;
			param.productNumber = formData.productNumber == "" ? undefined : formData.productNumber;
			param = JSON.parse(JSON.stringify(param));
			customShopService.queryFabric(param).then(function(data){
				if (data && data.success == true) {
					$scope.queriedProducts = data.data;
					if ($scope.queriedProducts.length > 0) {
						$state.go('tailor.quickQueryResult', {itemList: $scope.queriedProducts})
					}
					else {
						$ionicPopup.alert({
							title: '提示',
							template: '没有查询到相关产品!'
						});
					}
				}
				else if (data && data.success == false) {
					toaster.pop('error', data.error.message);
				}
			});
		};
		
	});
