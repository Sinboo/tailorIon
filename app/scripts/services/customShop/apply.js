'use strict';

angular.module('tailorIon')
  .factory('applyProviderUrl', function (publicFunc) {
    var prefix = '/api/v1/apply/';
    var url = {
      partner: {
        url: 'partner',
        method: 'POST'
      }
    };
    return publicFunc.urlAddPrefix(url, prefix);
  })
  .service('applyProviderService', function (httpService, applyProviderUrl) {
    this.applyProviderPartner = function (postData) {
      return httpService.http(postData, applyProviderUrl.partner, {})
    };

  });
