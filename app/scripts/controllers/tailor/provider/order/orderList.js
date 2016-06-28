/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('OrderListCtrl', function($scope, customShopService, toaster, $ionicPopup, appModalService) {
		var params = {};
		var initData = function () {
			params.STATUS = 'DELIVERED';
			customShopService.getBills(params).then(function (data) {
				if (data && data.success == true) {
					$scope.items = data.data;
					$scope.itemNum = $scope.items.length;
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
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
		initData();

		$scope.doRefresh = function () {
			$scope.items = [];
			initData();
		};
		
		$scope.sendPayment = function (bill) {
			customShopService.payment(bill.supplierNumber).then(function (data) {
				var payment = data.data;
				var modalData = {
					payment: payment,
					bill: bill
				};
				console.log(payment)

				appModalService.show(
					'templates/provider/order/modal/sendPaymentModal.html',
					'SendPaymentModalCtrl as vm',
					modalData
				).then(function (value) {
					console.log(value);
					if (value) {
						var param = {};
						param.voucherUrl = value.image.url[0];
						param.NUMBER = bill.number;
						customShopService.uploadPaymentImg(param).then(function (data) {
							if (data && data.success == true) {
								toaster.pop('success', '上传付款凭证成功!');
								$scope.doRefresh();
							}
						})
					}
				}, function (err) {
					toaster.pop('warning', err);
				})
			})

		}

		
	});
