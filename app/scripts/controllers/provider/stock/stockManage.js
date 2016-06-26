/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('StockManageCtrl', function($scope, customShopService, $ionicPopup, toaster) {
		$scope.fabric = {};
		$scope.fabric.shortName = '请选择供应商';

		$scope.setFabric = function (fabric) {
			console.log(fabric);
			customShopService.getPartenFabricOos(fabric.number).then(function (data) {
				if (data && data.success == true) {
					$scope.items = data.data;
					if ($scope.items.length == 0) {
						$ionicPopup.alert({
							title: '提示',
							template: '没有查询到相关产品!'
						});
					}
				}
				else if (data && data.success == false) {
					toaster.pop('error', data.error.message);
				}
			})
		}
		
		customShopService.fabricPartners().then(function (data) {
			$scope.fabrics = data.data;
		});
		
		

	});
