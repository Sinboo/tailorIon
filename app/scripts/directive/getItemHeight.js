/**
 * Created by wxb on 16/6/22.
 */
'use strict';

angular.module('tailorIon.directives')
  .directive('heightBind', function() {
    return {
      scope: {
        heightValue: '='
      },
      link: function($scope, $element) {
        $scope.$watch(function() {
          $scope.heightValue = $element.height();
        });
      }
    }
})