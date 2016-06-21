'use strict';

angular.module('gitdao').factory('publicFunc', function () {
    return {
        urlAddPrefix: urlAddPrefix,
        arrayToMap: arrayToMap,
        mapToArray: mapToArray
    };

    function urlAddPrefix (url, prefix) {
        var result = {};
        if (angular.isObject(url)) {
            angular.forEach(url, function (value, key) {
                result[key] = angular.extend({prefix: prefix}, value);
            });
        }
        return result;
    }

    function arrayToMap(arr, key, sub) {
        arr = arr || [];
        key = key || 'id';
        sub = sub || 'children';
        var result = {};
        iteration(arr);
        return result;
        function iteration(arr, parent) {
            angular.forEach(arr, function (item) {
                result[item[key]] = item;
                result[item[key]].parentId = parent;
                if (item[sub]) {
                    iteration(item[sub], item[key]);
                }
            });
        }
    }

    function mapToArray(map) {
      var array = [];
      $.each(map, function (key, value) {
        var item = {};
        item.shortName = key;
        item.fullName = value;
        array.push(item);
      });
      return array;
    }
});
