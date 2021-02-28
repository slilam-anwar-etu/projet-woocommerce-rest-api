import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { TokenService } from '../services/token.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories:any;
  subcategories:any;
  products:any;
  fileName= 'Products.xlsx';

  constructor(
    private Token: TokenService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
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
 
  getAllProducts(){
    this.Token.getWooCommerce().get("products?per_page=50")
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
  }

  lessExpensive(){
    this.products.sort((a,b) => (parseInt(a.sale_price) > parseInt(b.sale_price)) ? 1 : ((parseInt(b.sale_price) > parseInt(a.sale_price)) ? -1 : 0));

    $('#menu2').addClass("active");
    $('#menu1').removeClass("active");
  }


  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

}
