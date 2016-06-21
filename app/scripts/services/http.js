'use strict';

angular.module('gitdao')
    .factory('myHttpInterceptor', function ($q) {
        return {
            'response': function (response) {
                return response || $q.when(response);
            },
            'responseError': function (rejection) {
                switch (rejection.status) {
                    case 0:
                        return $q.reject('请求超时');
                    case 401:
                        return $q.reject('没有授权');
                    case 403:
                        return $q.reject('没有权限');
                    default :
                        return $q.reject(rejection);
                }
            }
        };
    })
    .factory('myHttpHeader', function($q, localStorageService){
      return {
        'request': function(config) {
          config.headers['Token'] = localStorageService.cookie.get('user').token;
          return config;
        }
      };
    })
  .factory('httpService', ['$http', '$q', '$window', 'toaster', '$log', '$state',
    function ($http, $q, $window, toaster, $log, $state) {
      var httpFunc = function (data, type, params) {
        var deferred = $q.defer();

        type = type || {};
        if (type.data) {
          deferred.resolve(type.data);
        }
        else {
          if (angular.isObject(params)) {
            var url = type.url.replace(/{(\w+)}/g, function (match) {
              var key = match.substring(1, match.length - 1).trim();
              var result = params[key];
              delete params[key];
              return result;
            });
            angular.forEach(params, function (value, key) {
              var prefix = (url.indexOf('?') < 0) ? '?' : '&';
              url = url + prefix + key + '=' + value;
            });
          } else {
            var url = type.url;
          }
          data = data || {};
          url = type.prefix + url;
          console.log(url);
          //data.refer = $window.location.href;
          var timeout = type.timeout || 100000;
          var method = type.method || 'POST';

          deferred.resolve(
            $http({method: method, data: data, url: url, timeout: timeout})
              .then(function (res) {
                $log.debug('=========Request==========');
                $log.debug(data);
                $log.debug('=========Response==========');
                $log.debug(res.data);
                return res.data;
              },
              function (rejection) {
                if (angular.isString(rejection)) {
                  toaster.pop('error', rejection);
                  if (rejection == '没有授权') {
                    $state.go('login');
                  }
                } else {
                  return $q.reject(rejection);
                }
              })
          );
        }
        return deferred.promise;
      };

      return {
        http: httpFunc
      };
    }]);
