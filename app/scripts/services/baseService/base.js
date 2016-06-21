'use strict';

angular.module('tailorIon')
  .factory('baseUrl', function (publicFunc) {
    var prefix = '/api/v1/';
    var url = {
      division: {
        url: 'gdata/division',
        method: 'GET'
      }
    };
    return publicFunc.urlAddPrefix(url, prefix);
  })
  .service('baseService', function (httpService, baseUrl) {
    this.getDivision = function () {
      return httpService.http({}, baseUrl.division, {})
    };

  });
