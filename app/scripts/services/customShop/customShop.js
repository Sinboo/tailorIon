'use strict';

angular.module('tailorIon')
  .factory('customShopUrl', function (publicFunc) {
    var prefix = '/api/v1/shop/';
    var url = {
      factory_partner: {
        url: 'partner/factory',
        method: 'GET'
      },
      fabric_partner: {
        url: 'partner/fabric',
        method: 'GET'
      },
      add_order: {
        url: 'order/tailoring',
        method: 'POST'
      },
      edit_order: {
        url: 'order/tailoring/{ID}',
        method: 'PUT'
      },
      delete_order: {
        url: 'order/tailoring/{ID}',
        method: 'DELETE'
      },
      get_orders: {
        url: 'order/tailoring/{STATUS}',
        method: 'GET'
      },
      order_detail: {
        url: 'order/tailoring/id/{ID}',
        method: 'GET'
      },
      fabric_query: {
        url: 'partner/fabric/{id}/product',
        method: 'GET'
      },
      fabric_fuzzyQuery: {
        url: 'partner/fabric/{id}/product/search',
        method: 'GET'
      },
      unPurchase_order: {
        url: 'order/fabric/init/{CLOTHING}',
        method: 'GET'
      },
      purchased_order: {
        url: 'order/fabric/item/purchased',
        method: 'GET'
      },
      fabric_orders: {
        url: 'order/fabric/{STATUS}',
        method: 'GET'
      },
      payment: {
        url: 'order/fabric/supplier/{NUMBER}',
        method: 'GET'
      },
      order_fabric: {
        url: 'order/fabric',
        method: 'POST'
      },
      order_fabricPrivate: {
        url: 'order/fabric/private',
        method: 'POST'
      },
      get_bills: {
        url: 'bill/{STATUS}',
        method: 'GET'
      },
      receive_order: {
        url: 'order/fabric/{NUMBER}/receive',
        method: 'PUT'
      },
      get_storage: {
        url:'order/tailoring/storage/{STATUS}',
        method: 'GET'
      },
      produce_record: {
        url: 'order/produce/{STATUS}',
        method: 'GET'
      },
      place_produce: {
        url: 'order/produce/{NUMBER}/place',
        method: 'PUT'
      },
      delivery_produce: {
        url: 'order/produce/{NUMBER}/delivery',
        method: 'PUT'
      },
      upload_paymentImg: {
        url: 'bill/{NUMBER}',
        method: 'PUT'
      },
      receive_cloth: {
        url: 'order/tailoring/storage/{NUMBER}/receive',
        method: 'PUT'
      },
      inform_client: {
        url: 'order/tailoring/storage/{NUMBER}/notify',
        method: 'PUT'
      },
      take_product: {
        url: 'order/tailoring/storage/{NUMBER}/take',
        method: 'PUT'
      },
      return_factory: {
        url: 'order/tailoring/storage/{NUMBER}/repair',
        method: 'POST'
      },
      get_positions: {
        url: 'addressBook/{type}',
        method: 'GET'
      },
      add_position: {
        url: 'addressBook/{type}',
        method: 'POST'
      },
      partnerFabric_oos: {
        url: 'partner/fabric/{NUMBER}/product/oos',
        method: 'GET'
      },
      partnerFabric_halt: {
        url: 'partner/fabric/{NUMBER}/product/halt',
        method: 'GET'
      },
      partner_apply: {
        url: 'partner/apply',
        method: 'GET'
      },
      confirm_expressFee: {
        url: 'order/fabric/{NUMBER}/pay',
        method: 'PUT'
      },
      private_fabrics: {
        url: 'partner/fabric/private',
        method: 'GET'
      },
      factory_specification: {
        url: 'partner/factory/{ID}/specification',
        method: 'GET'
      },
      weChat_orderNumber: {
        url: 'order/tailoring',
        method: 'GET'
      },
      confirm_size: {
        url: 'order/produce/{NUMBER}/confirm',
        method: 'PUT'
      },
      submit_produceOrder: {
        url: 'order/produce/{NUMBER}/place2factory',
        method: 'PUT'
      },
      search_order: {
        url: 'order/tailoring/search',
        method: 'GET'
      },
      orders_number: {
        url: 'home',
        method: 'GET'
      }

    };
    return publicFunc.urlAddPrefix(url, prefix);
  })
  .factory('customShopUrlV2', function (publicFunc) {
    var prefix = '/api/v2/shop/';
    var url = {
      add_order: {
        url: 'order/tailoring',
        method: 'POST'
      }

    };
    return publicFunc.urlAddPrefix(url, prefix);
  })

  .service('customShopService', function (httpService, customShopUrl, customShopUrlV2) {
    this.factoryPartners = function () {
      return httpService.http({}, customShopUrl.factory_partner, {})
    };
    this.fabricPartners = function () {
      return httpService.http({}, customShopUrl.fabric_partner, {})
    };
    this.addOrder = function (postData) {
      return httpService.http(postData, customShopUrl.add_order, {})
    };
    this.addOrderV2 = function (postData) {
      return httpService.http(postData, customShopUrlV2.add_order, {})
    };
    this.editOrder = function (postData, ID) {
      return httpService.http(postData, customShopUrl.edit_order, {ID: ID})
    };
    this.deleteOrder = function (ID) {
      return httpService.http({}, customShopUrl.delete_order, {ID: ID})
    };
    this.getOrders = function (queryParams) {
      return httpService.http({}, customShopUrl.get_orders, queryParams)
    };
    this.orderDetail = function (ID) {
      return httpService.http({}, customShopUrl.order_detail, {ID: ID})
    };
    this.queryFabric = function (queryParams) {
      return httpService.http({}, customShopUrl.fabric_query, queryParams)
    };
    this.fuzzyQueryFabric = function (queryParams) {
      return httpService.http({}, customShopUrl.fabric_fuzzyQuery, queryParams)
    };
    this.unPurchaseOrder = function (CLOTHING) {
      return httpService.http({}, customShopUrl.unPurchase_order, {CLOTHING: CLOTHING})
    };
    this.purchaseOrder = function (queryParams) {
      return httpService.http({}, customShopUrl.purchased_order, queryParams)
    };
    this.fabricOrders = function (queryParams) {
      return httpService.http({}, customShopUrl.fabric_orders, queryParams)
    };
    this.payment = function (NUMBER) {
      return httpService.http({}, customShopUrl.payment, {NUMBER: NUMBER})
    };
    this.orderFabric = function (postData) {
      return httpService.http(postData, customShopUrl.order_fabric, {})
    };
    this.orderFabricPrivate = function (postData) {
      return httpService.http(postData, customShopUrl.order_fabricPrivate, {})
    };
    this.getBills = function (queryParams) {
      return httpService.http({}, customShopUrl.get_bills, queryParams)
    };
    this.receiveOrder = function (NUMBER) {
      return httpService.http({}, customShopUrl.receive_order, {NUMBER: NUMBER})
    };
    this.getStorage = function (queryParams) {
      return httpService.http({}, customShopUrl.get_storage, queryParams)
    };
    this.produceRecords = function (queryParams) {
      return httpService.http({}, customShopUrl.produce_record, queryParams)
    };
    this.placeProduce = function (queryParams) {
      return httpService.http({}, customShopUrl.place_produce, queryParams)
    };
    this.deliveryProduce = function (queryParams) {
      return httpService.http({}, customShopUrl.delivery_produce, queryParams)
    };
    this.uploadPaymentImg = function (queryParams) {
      return httpService.http({}, customShopUrl.upload_paymentImg, queryParams)
    };
    this.receiveCloth = function (queryParams) {
      return httpService.http({}, customShopUrl.receive_cloth, queryParams)
    };
    this.informClient = function (queryParams) {
      return httpService.http({}, customShopUrl.inform_client, queryParams)
    };
    this.takeProduct = function (queryParams) {
      return httpService.http({}, customShopUrl.take_product, queryParams)
    };
    this.returnFactory = function (postData, NUMBER) {
      return httpService.http(postData, customShopUrl.return_factory, {NUMBER: NUMBER})
    };
    this.getPositions = function (queryParams) {
      return httpService.http({}, customShopUrl.get_positions, queryParams)
    };
    this.addPosition = function (postData, type) {
      return httpService.http(postData, customShopUrl.add_position, {type: type})
    };
    this.getPartenFabricOos = function (NUMBER) {
      return httpService.http({}, customShopUrl.partnerFabric_oos, {NUMBER: NUMBER})
    };
    this.getPartenFabricHalt = function (NUMBER) {
      return httpService.http({}, customShopUrl.partnerFabric_halt, {NUMBER: NUMBER})
    };
    this.getPartnerApply = function (queryParams) {
      return httpService.http({}, customShopUrl.partner_apply, queryParams)
    };
    this.confirmExpressFee = function (queryParams) {
      return httpService.http({}, customShopUrl.confirm_expressFee, queryParams)
    };
    this.privateFabrics = function () {
      return httpService.http({}, customShopUrl.private_fabrics, {})
    };
    this.factorySpecification = function (queryParams) {
      return httpService.http({}, customShopUrl.factory_specification, queryParams)
    };
    this.getWeChatOrderNumber = function (queryParams) {
      return httpService.http({}, customShopUrl.weChat_orderNumber, queryParams)
    };
    this.confirmSize = function (postData, NUMBER) {
      return httpService.http(postData, customShopUrl.confirm_size, {NUMBER: NUMBER})
    };
    this.submitProduceOrder = function (NUMBER) {
      return httpService.http({}, customShopUrl.submit_produceOrder, {NUMBER: NUMBER})
    };
    this.searchOrder = function (queryParams) {
      return httpService.http({}, customShopUrl.search_order, queryParams)
    };
    this.ordersNumber = function () {
      return httpService.http({}, customShopUrl.orders_number, {})
    };




  });
