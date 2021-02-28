import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {

  public category = {
    name: null,
    description: null,
    image: {
      src: null
    }
  };

  imageName:any;
  file:any;

  constructor(
    private router: Router,
    private Token: TokenService
  ) { }

  ngOnInit(): void {
  }

  addCategory(){
    this.category.image.src = "http://localhost/wordpress/wp-content/uploads/2021/02/"+this.imageName;
    this.Token.getWooCommerce().post("products/categories", this.category)
    .then((response) => {
      this.router.navigateByUrl('categories');
    })
    .catch((error) => {
      console.log(error.response.data);
    });
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
