import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {



  constructor() { }

  handle(data) {
    this.set(data);
  }

  set(data) {
    localStorage.setItem('url', data.url);
    localStorage.setItem('consumerKey', data.consumerKey);
    localStorage.setItem('consumerSecret', data.consumerSecret);
    localStorage.setItem('version', data.version);
  }
  
  remove() {
    localStorage.removeItem('url');
    localStorage.removeItem('consumerKey');
    localStorage.removeItem('consumerSecret');
    localStorage.removeItem('version');
  }

  loggedIn() {
    return this.isValid();
  }

  isValid() {
    const token = this.get();
    if (token) {
      return true;
    }
    return false;
  }

  get() {
    return localStorage.getItem('consumerKey');
  }



  WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;


  getWooCommerce(){
      var WooCommerce = new this.WooCommerceRestApi({
      url: localStorage.getItem('url'),
      consumerKey: localStorage.getItem('consumerKey'),
      consumerSecret: localStorage.getItem('consumerSecret'),
      version: localStorage.getItem('version'),
      queryStringAuth: true // Force Basic Authentication as query string true and using under HTTPS
    });
    return WooCommerce;
  }

}
