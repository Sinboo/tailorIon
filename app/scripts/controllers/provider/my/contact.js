/**
 * Created by wxb on 15/12/20.
 */
'use strict';

angular.module('tailorIon.controllers')
	.controller('MyContactCtrl', function ($scope, providerService, commonService, $http, $state, toaster) {
		$scope.formData = {};
		
		var initData = function () {
			providerService.nowContact().then(function (data) {
				$scope.formData.nowPerson = data.data.person;
				$scope.formData.nowPhone = data.data.phone;
				console.log($scope.formData)
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}
		
		$scope.$on("$ionicView.enter", function(event, data){
			initData();
		});

		$scope.doRefresh = function () {
			initData();
		};
		

		$scope.confirm = function () {
			var queryParams = {};
			queryParams.person = $scope.formData.newPerson;
			queryParams.phone = $scope.formData.newPhone;
			providerService.newContact(queryParams).then(function (data) {
				if (data.success == true) {
					toaster.pop('success', '联系人修改成功!');
					$scope.formData.nowPerson = $scope.formData.newPerson;
					$scope.formData.nowPhone = $scope.formData.newPhone;
					$scope.formData.newPerson = "";
					$scope.formData.newPhone = "";
				}
				else {
					toaster.pop('error', data.error.message);
				}
			})
		};


		$scope.validate = function () {
			if(!$scope.formData.newPerson) {toaster.pop('error', '请输入新联系人'); return false;}
			if(!$scope.formData.newPhone) {toaster.pop('error', '请输入新的手机号');  return false;}
			if(!commonService.regMobile($scope.formData.newPhone)) { toaster.pop('error', '请输入正确的手机号'); return false;}
			return true;
		}


	});
