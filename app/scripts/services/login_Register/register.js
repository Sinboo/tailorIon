'use strict';

angular.module('tailorIon')
  .factory('registerUrl', function (publicFunc) {
    var prefix = '/api/v1/apply/';
    var url = {
      factory_apply: {
        url: 'factory',
        method: 'POST'
      },
      accessory_apply: {
        url: 'accessory',
        method: 'POST'
      },
      fabric_apply: {
        url: 'fabric',
        method: 'POST'
      },
      shop_apply: {
        url: 'shop',
        method: 'POST'
      }
    };
    return publicFunc.urlAddPrefix(url, prefix);
  })
  .service('registerService', function (httpService, registerUrl) {
    this.factoryApply = function (postData) {
      return httpService.http(postData, registerUrl.factory_apply, {})
    };
    this.accessoryApply = function (postData) {
      return httpService.http(postData, registerUrl.accessory_apply, {})
    };
    this.fabricApply = function (postData) {
      return httpService.http(postData, registerUrl.fabric_apply, {})
    };
    this.shopApply = function (postData) {
      return httpService.http(postData, registerUrl.shop_apply, {})
    };


  });
