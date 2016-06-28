/**
 * Created by wxb on 16/6/17.
 */

'use strict';

angular.module('tailorIon.controllers')
  .controller('LoginCtrl', function($scope, $state, $stateParams, $http, localStorageService, toaster) {
    // if ($stateParams.logout == true) {
    //   window.location.reload();
    // }

    $scope.formData = {};

    $scope.login = function (loginData) {
      if(!(loginData.number)) {
        toaster.pop('warning', '请输入账号.');
        return;
      }
      if(!(loginData.passwd)) {
        toaster.pop('warning', '请输入密码.');
        return;
      }

      $http.post("/api/v1/login", loginData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: function(data){return $.param(data);}
      }).success(function(data) {
        console.log(data);
        if (data && data.success == false) {
          toaster.pop('error', '登录失败，请重新登录.');
          toaster.pop('warning', data.error.message);
        }
        else if (data && data.success == true) {
          localStorageService.cookie.set('user', data.data);
          toaster.pop('success', '登录成功!');
          if (localStorageService.cookie.get('user').merchantType == 'SHOP') {
            $state.go("tailor.consoleOrderDoing");
          }
          if (localStorageService.cookie.get('user').merchantType == 'FABRIC') {
            $state.go("provider.orderFreight");
          }
        }
      });
    };

    


  });