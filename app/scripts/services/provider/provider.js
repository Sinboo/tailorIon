'use strict';

angular.module('tailorIon')
  .factory('providerUrl', function (publicFunc) {
    var prefix = '/api/v1/supplier/';
    var url = {
      fabric: {
        url: 'fabric',
        method: 'GET'
      },
      fabric_detail: {
        url: 'fabric/{id}',
        method: 'GET'
      },
      factory: {
        url: 'factory',
        method: 'GET'
      },
      factory_detail: {
        url: 'factory/{id}',
        method: 'GET'
      },
      partner: {
        url: 'partner',
        method: 'GET'
      },
      search_partner: {
        url: 'partner/search',
        method: 'GET'
      },
      newApply_count: {
        url: 'partner/apply/new/count',
        method: 'GET'
      },
      new_applies: {
        url: 'partner/apply/new',
        method: 'GET'
      },
      refuse_apply: {
        url: 'partner/apply/{id}/refuse',
        method: 'PUT'
      },
      accept_apply: {
        url: 'partner/apply/{id}/accept',
        method: 'PUT'
      },
      brand_list: {
        url: 'product/brand',
        method: 'GET'
      },
      add_product: {
        url: 'product',
        method: 'POST'
      },
      edit_product: {
        url: 'product',
        method: 'PUT'
      },
      delete_product: {
        url: 'product/{NUMBER}',
        method: 'DELETE'
      },
      get_products: {
        url: 'product',
        method: 'GET'
      },
      quickQuery_Product: {
        url: 'product/{productNumber}',
        method: 'GET'
      },
      stock_products: {
        url: 'product/oos',
        method: 'GET'
      },
      outStock_products: {
        url: 'product/halt',
        method: 'GET'
      },
      set_stock: {
        url: 'product/{productNumber}/oos',
        method: 'PUT'
      },
      set_outStock: {
        url: 'product/{productNumber}/halt',
        method: 'PUT'
      },
      set_repertory: {
        url: 'product/{productNumber}/stock',
        method: 'PUT'
      },
      get_orders: {
        url: 'order/{STATUS}',
        method: 'GET'
      },
      send_order: {
        url: 'order/{ID}',
        method: 'PUT'
      },
      get_bill: {
        url: 'bill/{STATUS}',
        method: 'GET'
      },
      deliver_bill: {
        url: 'bill/{NUMBER}/deliver',
        method: 'PUT'
      },
      confirm_bill: {
        url: 'bill/{NUMBER}/confirmPayment',
        method: 'PUT'
      },
      get_priceSystems: {
        url: '/product/pricing',
        method: 'GET'
      },
      create_priceSystem: {
        url: '/product/pricing',
        method: 'POST'
      },
      update_priceSystem: {
        url: '/product/pricing/{NUMBER}',
        method: 'PUT'
      },
      now_exchangeRate: {
        url: 'exchangeRate',
        method: 'GET'
      },
      new_exchangeRate: {
        url: 'exchangeRate',
        method: 'PUT'
      },
      now_contact: {
        url: 'notifyInfo',
        method: 'GET'
      },
      new_contact: {
        url: 'notifyInfo',
        method: 'PUT'
      },
      set_expressFee: {
        url: 'order/{NUMBER}/expressFee',
        method: 'PUT'
      },
      bill_detail: {
        url: 'bill/{NUMBER}/detail',
        method: 'GET'
      }

    };
    return publicFunc.urlAddPrefix(url, prefix);
  })
  .service('providerService', function (httpService, providerUrl) {
    this.getAllFabrics = function (queryParams) {
      return httpService.http({}, providerUrl.fabric, queryParams)
    };
    this.getFabricDetailById = function (id) {
      return httpService.http({}, providerUrl.fabric_detail, {id: id})
    };
    this.getAllFactories = function (queryParams) {
      return httpService.http({}, providerUrl.factory, queryParams)
    };
    this.getFactoryDetailById = function (id) {
      return httpService.http({}, providerUrl.factory_detail, {id: id})
    };
    this.getAllPartners = function (queryParams) {
      return httpService.http({}, providerUrl.partner, queryParams)
    };
    this.searchPartner = function (key) {
      return httpService.http({}, providerUrl.search_partner, {key: key})
    };
    this.newApplyCount = function () {
      return httpService.http({}, providerUrl.newApply_count, {})
    };
    this.newApplies = function () {
      return httpService.http({}, providerUrl.new_applies, {})
    };
    this.refuseApply = function (id) {
      return httpService.http({}, providerUrl.refuse_apply, {id: id})
    };
    this.acceptApply = function (queryParams) {
      return httpService.http({}, providerUrl.accept_apply, queryParams)
    };
    this.getBrandList = function () {
      return httpService.http({}, providerUrl.brand_list, {})
    };
    this.addProduct = function (postData) {
      return httpService.http(postData, providerUrl.add_product, {})
    };
    this.editProduct = function (postData) {
      return httpService.http(postData, providerUrl.edit_product, {})
    };
    this.deleteProduct = function (NUMBER) {
      return httpService.http({}, providerUrl.delete_product, {NUMBER: NUMBER})
    };
    this.getProducts = function (queryParams) {
      return httpService.http({}, providerUrl.get_products, queryParams)
    };
    this.getStockProducts = function () {
      return httpService.http({}, providerUrl.stock_products, {})
    };
    this.quickQueryProduct = function (queryParams) {
      return httpService.http({}, providerUrl.quickQuery_Product, queryParams)
    };
    this.getOutStockProducts = function () {
      return httpService.http({}, providerUrl.outStock_products, {})
    };
    this.setStock = function (queryParams) {
      return httpService.http({}, providerUrl.set_stock, queryParams)
    };
    this.setOutStock = function (productNumber) {
      return httpService.http({}, providerUrl.set_outStock, {productNumber: productNumber})
    };
    this.setRepertory = function (queryParams) {
      return httpService.http({}, providerUrl.set_repertory, queryParams)
    };
    this.getOrders = function (queryParams) {
      return httpService.http({}, providerUrl.get_orders, queryParams)
    };
    this.sendOrder = function (postData, ID) {
      return httpService.http(postData, providerUrl.send_order, {ID: ID})
    };
    this.getBills = function (queryParams) {
      return httpService.http({}, providerUrl.get_bill, queryParams)
    };
    this.deliverBill = function (NUMBER) {
      return httpService.http({}, providerUrl.deliver_bill, {NUMBER: NUMBER})
    };
    this.confirmBill = function (NUMBER) {
      return httpService.http({}, providerUrl.confirm_bill, {NUMBER: NUMBER})
    };
    this.getPriceSystems = function () {
      return httpService.http({}, providerUrl.get_priceSystems, {})
    };
    this.createPriceSystem = function (postData) {
      return httpService.http(postData, providerUrl.create_priceSystem, {})
    };
    this.updatePriceSystem = function (postData, NUMBER) {
      return httpService.http(postData, providerUrl.update_priceSystem, {NUMBER: NUMBER})
    };
    this.nowExchangeRate = function () {
      return httpService.http({}, providerUrl.now_exchangeRate, {})
    };
    this.newExchangeRate = function (queryParams) {
      return httpService.http({}, providerUrl.new_exchangeRate, queryParams)
    };
    this.setExpressFee = function (queryParams) {
      return httpService.http({}, providerUrl.set_expressFee, queryParams)
    };
    this.nowContact = function () {
      return httpService.http({}, providerUrl.now_contact, {})
    };
    this.newContact = function (queryParams) {
      return httpService.http({}, providerUrl.new_contact, queryParams)
    };
    this.billDetail = function (number) {
      return httpService.http({}, providerUrl.bill_detail, {NUMBER: number})
    }


  });
