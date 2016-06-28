/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('PurchaseToBuyCtrl', function($scope, $state, $stateParams, $window, customShopService, commonService, FABRIC_UNIT, big, $ionicPopup) {
		console.log($stateParams.fromBuyFabric)
		if ( $stateParams.fromBuyFabric == true) {
			$window.location.reload(true)
		}
		$scope.FABRIC_UNIT = FABRIC_UNIT;
		$scope.CLOTHING_TYPE = {D: '衬衫', A: '西服', OTHER: '其他'};
		$scope.groupe = {};
		$scope.groupe.A = [];
		$scope.groupe.D = [];
		$scope.groupe.Other = [];


		var initData = function () {
			customShopService.unPurchaseOrder('A').then(function (data) {
				$scope.fabricCount = Object.keys(data.data).length;
				$scope.fabricAList = [];
				$.each(data.data, function (key, value) {
					var fabric = {}
					fabric.supplierNumber = key;
					fabric.orderList = value;
					angular.forEach(fabric.orderList, function (item) {
						item.createDate = commonService.convertDate(item.createTime);
						item.deliveryDate = commonService.convertDate(item.orderItem.deliveryDate);
						item.factoryNum = item.orderItem.factoryNumber;
						fabric.supplierName = item.supplierName;
					});
					fabric.orderList = _.groupBy(fabric.orderList, 'factoryNum');
					fabric.factoryList = Object.keys(fabric.orderList);
					$scope.fabricAList.push(fabric);
				})
				console.log($scope.fabricAList);
				$scope.groupe.A.factory = $scope.fabricAList.factoryList;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});

			customShopService.unPurchaseOrder('D').then(function (data) {
				$scope.fabricCount = Object.keys(data.data).length;
				$scope.fabricDList = [];
				$.each(data.data, function (key, value) {
					var fabric = {}
					fabric.supplierNumber = key;
					fabric.orderList = value;
					angular.forEach(fabric.orderList, function (item) {
						item.createDate = commonService.convertDate(item.createTime);
						item.deliveryDate = commonService.convertDate(item.orderItem.deliveryDate);
						item.factoryNum = item.orderItem.factoryNumber;
						fabric.supplierName = item.supplierName;
					});
					fabric.orderList = _.groupBy(fabric.orderList, 'factoryNum');
					fabric.factoryList = Object.keys(fabric.orderList);
					$scope.fabricDList.push(fabric);
				})
				console.log($scope.fabricDList);
				$scope.groupe.D.factory = $scope.fabricDList.factoryList;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});

			customShopService.unPurchaseOrder('OTHER').then(function (data) {
				$scope.fabricCount = Object.keys(data.data).length;
				$scope.fabricOtherList = [];
				$.each(data.data, function (key, value) {
					var fabric = {}
					fabric.supplierNumber = key;
					fabric.orderList = value;
					angular.forEach(fabric.orderList, function (item) {
						item.createDate = commonService.convertDate(item.createTime);
						item.deliveryDate = commonService.convertDate(item.orderItem.deliveryDate);
						item.factoryNum = item.orderItem.factoryNumber;
						fabric.supplierName = item.supplierName;
					});
					fabric.orderList = _.groupBy(fabric.orderList, 'factoryNum');
					fabric.factoryList = Object.keys(fabric.orderList);
					$scope.fabricOtherList.push(fabric);
				});
				console.log($scope.fabricOtherList);
				$scope.groupe.Other.factory = $scope.fabricOtherList.factoryList;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		};

		initData();

		$scope.doRefresh = function () {
			initData();
		};

		$scope.checkAll = function (factory) {
			console.log($scope.groupe)
			if ($scope.groupe.D[factory] == true || $scope.groupe.D[factory] == false) {
				angular.forEach($scope.fabricDList, function (fabric) {
					$.each(fabric.orderList, function (k, v) {
						if (k == factory) {
							angular.forEach(v, function (item) {
								item.checked = $scope.groupe.D[factory];
							})
						}
					})
				})
			}
			if ($scope.groupe.A[factory] == true || $scope.groupe.A[factory] == false) {
				angular.forEach($scope.fabricAList, function (fabric) {
					$.each(fabric.orderList, function (k, v) {
						if (k == factory) {
							angular.forEach(v, function (item) {
								item.checked = $scope.groupe.A[factory];
							})
						}
					})
				})
			}
			if ($scope.groupe.Other[factory] == true || $scope.groupe.Other[factory] == false) {
				angular.forEach($scope.fabricOtherList, function (fabric) {
					$.each(fabric.orderList, function (k, v) {
						if (k == factory) {
							angular.forEach(v, function (item) {
								item.checked = $scope.groupe.Other[factory];
							})
						}
					})
				})
			}
		};

		$scope.itemCheck = function (order) {
			if (order.checked == false && $.inArray('D', order.orderItem.clothingTypes) !== -1) {
				$scope.groupe.D = false;
			}
			if (order.checked == false && $.inArray('OTHER', order.orderItem.clothingTypes) !== -1) {
				$scope.groupe.OTHER = false;
				return;
			}
			if (order.checked == false && $.inArray('D', order.orderItem.clothingTypes) == -1) {
				$scope.groupe.A = false;
			}
		};


		$scope.buyFabric = function (fabricList, fabric, factory, clothingType) {
			var hasChecked = false;
			angular.forEach(fabricList, function (fabric) {
				$.each(fabric.orderList, function (k, v) {
					angular.forEach(v, function (item) {
						if (item.checked == true) {
							hasChecked = true;
						}
					})
				})
			});

			if (hasChecked == false) {
				$ionicPopup.alert({
					title: '未选订单',
					template: '请选择至少一个订单!'
				});
			}

			if (hasChecked == true) {
				$state.go('tailor.buyFabric', {supplierName: fabric.supplierName, supplierNumber: fabric.supplierNumber, factoryName: fabric.orderList[factory][0].orderItem.factoryName, clothingType: clothingType, factoryNum: factory, orderList: fabric.orderList[factory]})
			}
		}




		

	});
