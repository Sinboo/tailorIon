'use strict';

angular.module('gitdao')
    .factory('cache', function ($cacheFactory) {
        return $cacheFactory('cache');
    })
    .factory('tailorCache', function ($cacheFactory) {
        return $cacheFactory('tailorCache');
    })
    .factory('regionCache', function ($cacheFactory) {
        return $cacheFactory('regionCache');
    })
    .factory('dataSetterGetter', function () {
      var savedData = {}
      function set(key, value) {
        savedData[key] = value;
      }
      function get(key) {
        return savedData[key];
      }
      return {
        set: set,
        get: get
      }
    })
    .service('commonService', function (regionCache, httpService, $http, EXPRESS, localStorageService, publicFunc, $q, $timeout, $state, $stateParams) {
        this.convertDate = function (d) {
            var date = new Date(d);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate();

            return Y + M + D ;
        };
        this.getDaysInOneMonth =  function(year, month){
          month = parseInt(month, 10);
          var d= new Date(year, month, 0);
          return d.getDate();
        };
        this.reload = function(hideContent) {
            return $state.transitionTo($state.current, $stateParams, {
                reload: true
            }).then(function() {
                hideContent = false;
                return $timeout(function() {
                    return hideContent = true;
                },1);
            });
        };
        this.regMobile = function(mobile) {
          return RegExp(/^0?(17[6-7]|13[0-9]|15[0-9]|18[02356789]|14[57])[0-9]{8}$/).test(mobile)
        };
        this.regTel = function(tel) {
          return RegExp(/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/).test(tel)
        };
        this.truncateDecimals = function (num, digits) {
          var numS = num.toString(),
            decPos = numS.indexOf('.'),
            substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
            trimmedResult = numS.substr(0, substrLength),
            finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

          return parseFloat(finalResult);
        };
        this.queryExpress = function (express) {
          var postData = {};
          postData.logisticCode = express.number;
          postData.shipperCode = EXPRESS[express.company];
          $http.post("/api/v1/express/query", postData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: function(data){return $.param(data);}
          }).success(function(data) {
            console.log(data);
            if (data && data.success == true){
              var expressData = JSON.parse(data.data);
              if (expressData.Traces.length == 0) {
                layer.alert(expressData.Reason);
              }
              if (expressData.Traces.length > 0) {
                var html = '';
                angular.forEach(expressData.Traces, function (item) {
                  html = html + '&nbsp;&nbsp;&nbsp;&nbsp;' + item.AcceptStation + '&nbsp;&nbsp;&nbsp;&nbsp;' + item.AcceptTime + '&nbsp;&nbsp;&nbsp;&nbsp;' + item.Remark + '<br/><br/>';
                });
                layer.open({
                  type: 1,
                  skin: 'layui-layer-rim', //加上边框
                  area: ['1000px', '600px'], //宽高
                  content: html
                });
              }
            }
          })
        }
    })

