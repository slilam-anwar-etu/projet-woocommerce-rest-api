import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import * as XLSX from 'xlsx';
import { SnotifyService } from 'ng-snotify'; 

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {


  public product = {
    name: null,
    regular_price: null,
    sale_price: null,
    description: null,
    categories: [
      {
        id: null
      }
    ],
    images: [
      {
        src: null
      }
    ]
  };

  categories:any;
  imageName:any;
  file:any;
  empty = true;
  data: [][];

  constructor(
    private router: Router,
    private Token: TokenService,
    private notify: SnotifyService,
  ) { }

  ngOnInit(): void {
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

  addProduct(){
    this.product.images[0].src = "http://localhost/wordpress/wp-content/uploads/2021/02/"+this.imageName;
    this.Token.getWooCommerce().post("products", this.product)
    .then((response) => {
      this.router.navigateByUrl('products');
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }

  onFileChange(evt: any) {
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

    };

    reader.readAsBinaryString(target.files[0]);
    this.empty = false;

  }

  addProductExcel(){
    let x = this.data.slice(1);
    for (let i = 0; i < x.length; i++)
      {
        let j=0;
        this.product.name = x[i][j];
        this.product.regular_price = String(x[i][j+1]);
        this.product.sale_price = String(x[i][j+2]);
        this.product.description = x[i][j+3];
        this.product.categories[0].id = x[i][j+4];
        this.product.images[0].src = x[i][j+5];
        
        this.Token.getWooCommerce().post("products", this.product)
        .then((response) => {
          console.log("product has been inserted");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
          
      }

     this.handleResponse();
  }

  handleResponse(){

    let _router = this.router;
    this.notify.confirm('Done!, Products are inserted', {
      buttons:[
        {text: 'Okay', 
        action: toster =>{
           _router.navigateByUrl('/products'),
           this.notify.remove(toster.id)
          }
      },
      ]
    })
    
  }


  imageUpload(event){
    this.imageName = event.target.files[0].name;
    console.log(this.imageName);

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      this.file=event.target.result;
    }
 }

}
