import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories:any;
  fileName= 'Categories.xlsx';

  constructor(
    private Token: TokenService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.Token.getWooCommerce().get("products/categories")
      .then((response) => {
      this.categories = response.data;
      this.categories.sort((a,b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
      })
      .catch((error) => {
      console.log(error.response.data);
      });
  }

  deleteCategory(id){
    this.Token.getWooCommerce().delete("products/categories/"+id, {
      force: true
    })
      .then((response) => {
        console.log("Category has been deleted");
        this.getAllCategories();
      })
      .catch((error) => {
        console.log(error.response.data);
      });

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
