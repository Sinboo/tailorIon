// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('tailorIon.controllers', []);
angular.module('gitdao', []);

angular
  .module('tailorIon', [
    'ionic',
    'toaster',
    'gitdao',
    'tailorIon.controllers',
    'ionic-table',
    'LocalStorageModule',
    'config'
  ])

.run(function($ionicPlatform, $rootScope, localStorageService, loginService, $location, $state, $ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
      //$activityIndicator.stopAnimating();
      $ionicLoading.hide();
      // console.log(fromState, toState)
      // $rootScope.fromLogin = fromState.name == 'tailor.consoleOrderDoing' && toState.name == 'tailor.providerStockQuickQuery';

    });

  $rootScope.$on('$stateChangeError',
    function (event, toState, toParams, fromState, fromParams, error) {
      if (error.state) {
        $state.go('error');
      }
      if (error == "Not Authorized") {
        $state.go("notAuthorized");
      }
    });

  $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {
      // console.log(fromState, toState)

      if (toState.name == 'login') return;

      if (localStorageService.cookie.get('user') == undefined || localStorageService.cookie.get('user').anonymous) {
        event.preventDefault();
        $state.go("login", {from: fromState.name});
      }

      $ionicLoading.hide();
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });


    });

  loginService.initUser()

})
  .config(function (localStorageServiceProvider, $httpProvider) {
    localStorageServiceProvider
      .setPrefix('tailorIon');

    $httpProvider.interceptors.push('myHttpInterceptor');
    $httpProvider.interceptors.push('myHttpHeader');
  })
  // .config(['upyunProvider',function(upyunProvider) {
  //   upyunProvider.config({
  //     form_api_secret: 'ZeJhPE68fuX7jRkPMeFXOOyBl40=',
  //     bucket: 'imtailor'
  //   });
  // }])
  
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tailor', {
      url: '/1',
      abstract: true,
      templateUrl: 'templates/common/tailor/tailorMenu.html',
      controller: 'TailorMenuCtrl',
      resolve: {
        security:function($q, localStorageService) {
          if(localStorageService.cookie.get('user').merchantType !== 'SHOP'){
            return $q.reject("Not Authorized");
          }
        }
      }
    })
    
    .state('tailor.consoleOrderDoing', {
      url: '/consoleOrderDoing',
      views: {
        'console-order-doing': {
          templateUrl: 'templates/console/order/order.html',
          controller: 'OrderDoingCtrl'
        }
      }
    })
    .state('tailor.detailPage', {
      url: '/detailPage',
      views: {
        'console-order-doing': {
          templateUrl: 'templates/console/order/detailPage.html',
          controller: 'DetailPageCtrl'
        }
      }
    })
    .state('tailor.consoleOrderFinish', {
      url: '/consoleOrderFinish',
      views: {
        'console-order-finish': {
          templateUrl: 'templates/console/order/order.html',
          controller: 'OrderFinishCtrl'
        }
      }
    })
    
    .state('tailor.consolePurchaseToBuy', {
      url: '/consolePurchaseToBuy',
      views: {
        'console-purchase-toBuy': {
          templateUrl: 'templates/console/purchase/purchaseToBuy.html',
          controller: 'PurchaseToBuyCtrl'
        }
      }
    })
    .state('tailor.consolePurchaseToSend', {
      url: '/consolePurchaseToSend',
      views: {
        'console-purchase-toSend': {
          templateUrl: 'templates/console/purchase/purchaseToSend.html',
          controller: 'PurchaseToSendCtrl'
        }
      }
    })
    .state('tailor.consolePurchaseOnTheWay', {
      url: '/consolePurchaseOnTheWay',
      views: {
        'console-purchase-onWay': {
          templateUrl: 'templates/console/purchase/purchaseOnTheWay.html',
          controller: 'PurchaseOnTheWayCtrl'
        }
      }
    })
    
    .state('tailor.providerStockQuickQuery', {
      url: '/providerStockQuickQuery',
      views: {
        'provider-stock-quickQuery': {
          templateUrl: 'templates/provider/stock/quickQuery.html',
          controller: 'StockQuickQueryCtrl'
        }
      }
    })
    .state('tailor.providerStockManage', {
      url: '/providerStockManage',
      views: {
        'provider-stock-manage': {
          templateUrl: 'templates/provider/stock/stockManage.html',
          controller: 'StockManageCtrl'
        }
      }
    })
    .state('tailor.providerStockOutStock', {
      url: '/providerStockOutStock',
      views: {
        'provider-stock-outStock': {
          templateUrl: 'templates/provider/stock/outStock.html',
          controller: 'OutStockCtrl'
        }
      }
    })


  // .state('tailor.provider', {
  //   url: '^/1/provider',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/provider/providerNav.html',
  //       controller: 'ProviderNavCtrl'
  //     }
  //   }
  // })
  // .state('tailor.provider.stock', {
  //   url: '/quickQuery',
  //   templateUrl: 'templates/provider/quickQuery.html',
  //   controller: 'QuickQueryCtrl'
  // })
  //
  // .state('tailor.other', {
  //   url: '^/1/other',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/other/otherNav.html',
  //       controller: 'OtherNavCtrl'
  //     }
  //   }
  // })
  // .state('tailor.other.feedback', {
  //   url: '/feedback',
  //   templateUrl: 'templates/other/feedback.html',
  //   controller: 'FeedbackCtrl'
  // })

  .state('error', {
    url: '^/err',
    templateUrl: 'templates/error.html'
  })
  .state('notAuthorized', {
    url: '^/notAuthorized',
    templateUrl: 'templates/notAuthorized.html'
  })
  .state('login', {
    url: '^/login',
    templateUrl: 'templates/login/login.html',
    controller: 'LoginCtrl'
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});


