/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('QuickQueryResultCtrl', function($scope, $state, $ionicPopup) {
		$scope.items = $state.params.itemList;

		$scope.checkStock = function (selectFabric) {
			var alertMsg;
			if (selectFabric.salesStatus === 'NORMAL') {
				alertMsg = '货源充足，请放心购买!';
			}
			else if (selectFabric.salesStatus === 'tailor.buyFabric') {
				alertMsg = '暂时缺货，预计' + selectFabric.deliveryDateFormatStr + '日到货。';
			}
			else if (selectFabric.salesStatus === 'tailor.quickQueryResult') {
				alertMsg = '已注销，将来不再生产。';
			}

			if (alertMsg) {
				$ionicPopup.alert({
					title: '提示',
					template: alertMsg
				});
			}
			else {
				$ionicPopup.alert({
					title: '提示',
					template: '暂时没有该产品的库存情况。'
				});
			}

		}

	});
