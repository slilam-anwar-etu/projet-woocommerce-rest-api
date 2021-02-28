import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {

  id = this.route.snapshot.params['id'];

  public category = {
    name: null,
    description: null,
    image: {
      id: null,
      src: null
    }
  };

  file:any;
  imageName:any;
  imageChanged = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private Token: TokenService
  ) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(){
    this.Token.getWooCommerce().get("products/categories/"+this.id)
    .then((response) => {
      this.category = response.data;
      if(this.category.image!=null){
        this.file=this.category.image.src;
      }else{
        this.file='assets/images/no-image.png';
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }

  updateCategory(){
    this.category.image.id = 0;
    if(this.imageChanged){
      this.category.image.src = "http://localhost/wordpress/wp-content/uploads/2021/02/"+this.imageName;
    }
    else{
      this.category.image.src = this.category.image.src.replace("https","http");
    }
    
    this.Token.getWooCommerce().put("products/categories/"+this.id, this.category)
    .then((response) => {
      this.router.navigateByUrl('categories');
      console.log("category has been updated");
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
