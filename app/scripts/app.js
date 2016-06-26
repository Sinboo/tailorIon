// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('tailorIon.controllers', []);
angular.module('tailorIon.directives', []);

angular.module('gitdao', []);

angular
  .module('tailorIon', [
    'ionic',
    'toaster',
    'gitdao',
    'Big',
    'upyun',
    'uuid',
    'ionic.ui.modalService',
    'ionic-datepicker',
    'ionic-modal-select',
    'tailorIon.controllers',
    'tailorIon.directives',
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
  .config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: '确定',
      todayLabel: "今天",
      closeLabel: "取消",
      mondayFirst: false,
      weeksList: ["日", "一", "二", "三", "四", "五", "六"],
      monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: false,
      dateFormat: 'yyyy MM dd',
      closeOnSelect: true,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
  .config(function (localStorageServiceProvider, $httpProvider) {
    localStorageServiceProvider
      .setPrefix('tailorIon');

    $httpProvider.interceptors.push('myHttpInterceptor');
    $httpProvider.interceptors.push('myHttpHeader');
  })
  .config(['upyunProvider',function(upyunProvider) {
    upyunProvider.config({
      form_api_secret: 'ZeJhPE68fuX7jRkPMeFXOOyBl40=',
      bucket: 'imtailor'
    });
  }])
  
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
      url: '/consolePurchaseToBuy/:fromBuyFabric',
      views: {
        'console-purchase-toBuy': {
          templateUrl: 'templates/console/purchase/purchaseToBuy.html',
          controller: 'PurchaseToBuyCtrl'
        }
      }
    })
    .state('tailor.buyFabric', {
      url: '/buyFabric/:supplierName?supplierNumber?factoryName?clothingType?factoryNum?expressFeeStatus?remark?orderNumber?expressFee?fabricFee?totalPrice4CNY?totalPrice',
      views: {
        'console-purchase-toBuy': {
          templateUrl: 'templates/console/purchase/detailPage/buyFabric.html',
          controller: 'BuyFabricCtrl'
        }
      },
      params: {orderList: null},
      resolve: {
        payment: function ($stateParams, customShopService) {
          return customShopService.payment($stateParams.supplierNumber);
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

    .state('tailor.consoleProduceToOrder', {
      url: '/consoleProduceToOrder',
      views: {
        'console-produce-toOrder': {
          templateUrl: 'templates/console/produce/produceToOrder.html',
          controller: 'ProduceToOrderCtrl'
        }
      }
    })
    .state('tailor.consoleProduceUnderDoing', {
      url: '/consoleProduceUnderDoing',
      views: {
        'console-produce-underDoing': {
          templateUrl: 'templates/console/produce/produceUnderDoing.html',
          controller: 'ProduceUnderDoingCtrl'
        }
      }
    })

    .state('tailor.consoleStorageToAdd', {
      url: '/consoleStorageToAdd',
      views: {
        'console-storage-toAdd': {
          templateUrl: 'templates/console/storage/storageToAdd.html',
          controller: 'StorageToAddCtrl'
        }
      }
    })
    .state('tailor.consoleStorageNotNotified', {
      url: '/consoleStorageNotNotified',
      views: {
        'console-storage-notNotified': {
          templateUrl: 'templates/console/storage/storageNotNotified.html',
          controller: 'StorageNotNotifiedCtrl'
        }
      }
    })
    .state('tailor.consoleStorageNotified', {
      url: '/consoleStorageNotified',
      views: {
        'console-storage-notified': {
          templateUrl: 'templates/console/storage/storageNotified.html',
          controller: 'StorageNotifiedCtrl'
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
    .state('tailor.quickQueryResult', {
      url: '/quickQueryResult',
      views: {
        'provider-stock-quickQuery': {
          templateUrl: 'templates/provider/stock/detailPage/quickQueryResult.html',
          controller: 'QuickQueryResultCtrl'
        }
      },
      params: {itemList: null}
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

    .state('tailor.providerOrderList', {
      url: '/providerOrderList',
      views: {
        'provider-order-list': {
          templateUrl: 'templates/provider/order/orderList.html',
          controller: 'OrderListCtrl'
        }
      }
    })

    .state('tailor.otherFeedback', {
      url: '/otherFeedback',
      views: {
        'other-feedback': {
          templateUrl: 'templates/other/feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })

    .state('tailor.otherPositionManage', {
      url: '/otherPositionManage',
      views: {
        'other-position': {
          templateUrl: 'templates/other/positionManage.html',
          controller: 'PositionManageCtrl'
        }
      }
    })
    





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


