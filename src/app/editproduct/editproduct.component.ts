import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

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
        id: null,
        src: null
      }
    ]
  };

  id = this.route.snapshot.params['id'];

  categories:any;

  file:any;
  imageName:any;
  imageChanged = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private Token: TokenService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getProduct();
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

  getProduct(){
    this.Token.getWooCommerce().get("products/"+this.id)
      .then((response) => {
        this.product = response.data;
        this.product.description = this.product.description.replace(/<\/?[^>]+(>|$)/g, "");
        if(this.product.images[0]!=null){
          this.file=this.product.images[0].src;
        }else{
          this.file='assets/images/no-image.png';
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  updateProduct(){
    this.product.images[0].id = 0;
    if(this.imageChanged){
      this.product.images[0].src = "http://localhost/wordpress/wp-content/uploads/2021/02/"+this.imageName;
    }
    else{
      this.product.images[0].src = this.product.images[0].src.replace("https","http");
    }
    
    this.Token.getWooCommerce().put("products/"+this.id, this.product)
      .then((response) => {
        this.router.navigateByUrl('productdesc/'+this.id); 
        console.log("product has been updated");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  imageUpload(event){
    this.imageName = event.target.files[0].name;
    this.imageChanged = true;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      this.file=event.target.result;
    }
 }

}
