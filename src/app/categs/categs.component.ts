import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
import { combineLatest } from 'rxjs';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-categs',
  templateUrl: './categs.component.html',
  styleUrls: ['./categs.component.scss']
})
export class CategsComponent implements OnInit {

  id = this.route.snapshot.params['id'];

  categories:any;
  category :any;
  subcategories:any;
  products:any;

  constructor(
    private route: ActivatedRoute,
    private activeRoute: ActivatedRoute,
    private Token: TokenService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.id=routeParams.id;
      this.getAllProducts();
      this.getAllCategories();
      this.getCategory();
     });
  }

  getAllCategories(){
    this.Token.getWooCommerce().get("products/categories")
      .then((response) => {
      this.categories = response.data;
      })
      .catch((error) => {
      console.log(error.response.data);
      });
  }

  getCategory(){
    this.Token.getWooCommerce().get("products/categories/"+this.id)
      .then((response) => {
      this.category = response.data;
      })
      .catch((error) => {
      console.log(error.response.data);
      });
  }
 
  getAllProducts(){
    this.Token.getWooCommerce().get("products?category="+this.id)
      .then((response) => {
      this.products = response.data;
      this.cleanDesc();
      })
      .catch((error) => {
      console.log(error.response.data);
      });
  }

  cleanDesc(){
    this.products.forEach(element => {
      element.description = element.description.replace(/<\/?[^>]+(>|$)/g, "");
    });
  }

  recentlyAdded(){
    this.products.sort((a,b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));

      $('#menu1').addClass("active");
      $('#menu2').removeClass("active");
      $('#menu3').removeClass("active");
      $('#menu4').removeClass("active");

      this.getAllCategories();
  }

  lessExpensive(){
    this.products.sort((a,b) => (parseInt(a.sale_price) > parseInt(b.sale_price)) ? 1 : ((parseInt(b.sale_price) > parseInt(a.sale_price)) ? -1 : 0));

    $('#menu4').addClass("active");
    $('#menu1').removeClass("active");
    $('#menu2').removeClass("active");
    $('#menu3').removeClass("active");

    this.getAllCategories();
  }

}
