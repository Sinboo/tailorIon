/**
 * Created by wxb on 16/6/25.
 */
'use strict';

angular.module('tailorIon.controllers')
  .controller('ReturnFactoryModalCtrl', function ($scope, $filter, parameters, localStorageService, upyun, ionicDatePicker, EXPRESS_COM, $ionicLoading, $ionicPopup) {
    var vm = this;
    vm.EXPRESS_COM = EXPRESS_COM;
    vm.formData = {};
    vm.formData.image = {};
    vm.formData.image.url = [];
    vm.formData.orderItem = {};
    vm.factories = parameters;
    console.log(vm.factories)

    var ipObj1 = {
      callback: function (val) {
        vm.formData.expectDeliveryDay = $filter('date')(val, 'yyyy-MM-dd');
      }
    };

    vm.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };

    vm.confirm = function(formData) {
      $scope.closeModal(formData);
    };
    vm.cancel = function() {
      $scope.closeModal(null);
    };


    //choose img
    vm.openFileDialog = function() {
      ionic.trigger('click', {
        target: document.getElementById('file')
      });
    };

    $(document).on("change", ".uploadImage", function(e){
      event.preventDefault();
      vm.upload();
    });

    upyun.on('uploading', function(progress) {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner><br/>' + progress + "%",
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
      if (progress === 100) {
        $ionicLoading.hide();
      }
    });

    //upload image
    vm.upload = function() {
      var merchantNumber = localStorageService.cookie.get('user').merchantNumber;
      var productNumber = '返厂附图';
      var last = '{filename}{.suffix}';
      var imgUrl = '/' + merchantNumber +'/'+ productNumber +'/'+ last;
      upyun.set('save-key', imgUrl);
      upyun.upload('uploadForm', function(err, response, image){
        if (err) console.error(err);
        if (image.code === 200 && image.message === 'ok') {
          vm.formData.image.ready = true;
          vm.formData.image.url.push(image.absUrl);
          console.log(vm.formData.image.url)
        }
        $scope.$apply();
      });
    };

    vm.deleteImage = function (index) {
      $ionicPopup.confirm({
        title: '删除图片?',
        template: '您想要删除图片或更换图片?',
        buttons: [{ text: '取消', onTap: function(e) {return 'cancel'} }, { text: '确认', type: 'button-positive', onTap: function(e) {return 'ok'}}]
      }).then(function(res) {
        if(res == 'ok') {
          vm.formData.image.url.splice(index, 1);
          if (vm.formData.image.url.length == 0) {
            vm.formData.image.ready = false;
          }
        }
        else {}
      });
    };
  });