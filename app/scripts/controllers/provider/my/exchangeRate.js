/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('MyExchangeRateCtrl', function ($scope, providerService, $http, $state, toaster) {
		$scope.modalData = {};
		var initData = function () {
			providerService.nowExchangeRate().then(function (data) {
				$scope.modalData.nowExchangeRate = data.data;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		};
		
		$scope.$on("$ionicView.enter", function(event, data){
			initData();
		});

		$scope.doRefresh = function () {
			initData();
		};

		$scope.confirm = function () {
			var queryParams = {};
			queryParams.rate = $scope.modalData.newExchangeRate;
			providerService.newExchangeRate(queryParams).then(function (data) {
				if (data.success == true) {
					toaster.pop('success', '汇率修改成功!');
					$scope.modalData.nowExchangeRate = $scope.modalData.newExchangeRate;
					$scope.modalData.newExchangeRate = 0;
				}
				else {
					toaster.pop('error', data.error.message);
				}
			})
		};


		$scope.validate = function () {
			if(!$scope.modalData.newExchangeRate) { toaster.pop('error', '请输入新汇率'); return false;}
			return true;
		}
	});
