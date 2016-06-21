'use strict';

angular.module('tailorIon')
  .factory('factoryUrl', function (publicFunc) {
    var prefix = '/api/v1/';
    var url = {
      newApply_count: {
        url: 'factory/partner/apply/new/count',
        method: 'GET'
      },
      new_applies: {
        url: 'factory/partner/apply/new',
        method: 'GET'
      },
      unassigned_partners: {
        url: 'account/factory/opPartner',
        method: 'GET'
      },
      accept_apply: {
        url: 'factory/partner/apply/{id}/accept',
        method: 'PUT'
      },
      add_account: {
        url: 'account',
        method: 'POST'
      },
      get_accounts: {
        url: 'account',
        method: 'GET'
      },
      modify_accounts: {
        url: 'account/{ID}',
        method: 'PUT'
      },
      delete_account: {
        url: 'account/{ID}',
        method: 'DELETE'
      },
      fabrics: {
        url: 'factory/fabric/{STATUS}',
        method: 'GET'
      },
      receive_fabric: {
        url: 'factory/fabric/{ID}/receive',
        method: 'PUT'
      },
      add_specification: {
        url: 'factory/specification',
        method: 'POST'
      },
      get_specifications: {
        url: 'factory/specification',
        method: 'GET'
      },
      produce_orders: {
        url: 'factory/produce',
        method: 'GET'
      },
      get_crafts: {
        url: 'factory/quotation/craft',
        method: 'GET'
      },
      delete_craft: {
        url: 'factory/quotation/craft',
        method: 'DELETE'
      },
      add_craft: {
        url: 'factory/quotation/craft',
        method: 'POST'
      },
      get_shops: {
        url: 'factory/produce/overview',
        method: 'GET'
      },
      add_standardPrice: {
        url: 'factory/quotation',
        method: 'POST'
      },
      add_specialPrice: {
        url: 'factory/quotation/spec',
        method: 'POST'
      },
      get_prices: {
        url: 'factory/quotation',
        method: 'GET'
      },
      delete_standardPrice: {
        url: 'factory/quotation/{ID}',
        method: 'DELETE'
      },
      delete_specialPrice: {
        url: 'factory/quotation/spec/{ID}',
        method: 'DELETE'
      },
      update_standardPrice: {
        url: 'factory/quotation/{ID}',
        method: 'PUT'
      },
      update_specialPrice: {
        url: 'factory/quotation/spec/{ID}',
        method: 'PUT'
      },
      add_Task: {
        url: 'factory/schedule',
        method: 'POST'
      },
      get_Task: {
        url: 'factory/schedule',
        method: 'GET'
      },
      edit_Task: {
        url: 'factory/schedule/{ID}',
        method: 'PUT'
      },
      partner: {
        url: 'factory/partner',
        method: 'GET'
      },
      search_partner: {
        url: 'factory/partner/search',
        method: 'GET'
      }

    };
    return publicFunc.urlAddPrefix(url, prefix);
  })
  .service('factoryService', function (httpService, factoryUrl) {
    this.newApplyCount = function () {
      return httpService.http({}, factoryUrl.newApply_count, {})
    };
    this.newApplies = function () {
      return httpService.http({}, factoryUrl.new_applies, {})
    };
    this.unassignedPartners = function () {
      return httpService.http({}, factoryUrl.unassigned_partners, {})
    };
    this.acceptApply = function (queryParams) {
      return httpService.http({}, factoryUrl.accept_apply, queryParams)
    };
    this.addSubAccount = function (postData) {
      return httpService.http(postData, factoryUrl.add_account, {})
    };
    this.subAccounts = function () {
      return httpService.http({}, factoryUrl.get_accounts, {})
    };
    this.modifySubAccount = function (params, ID) {
      return httpService.http(params, factoryUrl.modify_accounts, {ID: ID})
    };
    this.deleteSubAccount = function (ID) {
      return httpService.http({}, factoryUrl.delete_account, {ID: ID})
    };
    this.fabrics = function (queryParams) {
      return httpService.http({}, factoryUrl.fabrics, queryParams)
    };
    this.receiveFabric = function (ID) {
      return httpService.http({}, factoryUrl.receive_fabric, {ID: ID})
    };
    this.addSpecification = function (postData) {
      return httpService.http(postData, factoryUrl.add_specification, {})
    };
    this.getSpecifications = function () {
      return httpService.http({}, factoryUrl.get_specifications, {})
    };
    this.produceOrders = function (queryParams) {
      return httpService.http({}, factoryUrl.produce_orders, queryParams)
    };
    this.getCrafts = function () {
      return httpService.http({}, factoryUrl.get_crafts, {})
    };
    this.deleteCraft = function (queryParams) {
      return httpService.http({}, factoryUrl.delete_craft, queryParams)
    };
    this.addCraft = function (queryParams) {
      return httpService.http({}, factoryUrl.add_craft, queryParams)
    };
    this.getShops = function (status) {
      return httpService.http({}, factoryUrl.get_shops, {status: status})
    };
    this.addStandardPrice = function (postData) {
      return httpService.http(postData, factoryUrl.add_standardPrice, {})
    };
    this.addSpecialPrice = function (postData) {
      return httpService.http(postData, factoryUrl.add_specialPrice, {})
    };
    this.getPrices = function () {
      return httpService.http({}, factoryUrl.get_prices, {})
    };
    this.deleteStandardPrices = function (ID) {
      return httpService.http({}, factoryUrl.delete_standardPrice, {ID: ID})
    };
    this.deleteSpecialPrices = function (ID) {
      return httpService.http({}, factoryUrl.delete_specialPrice, {ID: ID})
    };
    this.updateStandardPrices = function (postData, ID) {
      return httpService.http(postData, factoryUrl.update_standardPrice, {ID: ID})
    };
    this.updateSpecialPrices = function (postData, ID) {
      return httpService.http(postData, factoryUrl.update_specialPrice, {ID: ID})
    };
    this.addTask = function (postData) {
      return httpService.http(postData, factoryUrl.add_Task, {})
    };
    this.getTask = function () {
      return httpService.http({}, factoryUrl.get_Task, {})
    };
    this.editTask = function (data, ID) {
      return httpService.http(data, factoryUrl.edit_Task, {ID: ID})
    };
    this.getAllPartners = function (queryParams) {
      return httpService.http({}, factoryUrl.partner, queryParams)
    };
    this.searchPartner = function (key) {
      return httpService.http({}, factoryUrl.search_partner, {key: key})
    };
    





  });
