import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-productdesc',
  templateUrl: './productdesc.component.html',
  styleUrls: ['./productdesc.component.scss']
})
export class ProductdescComponent implements OnInit {

  id = this.route.snapshot.params['id'];

  product:any;

  constructor(
    private route: ActivatedRoute,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private Token: TokenService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.id=routeParams.id;
      this.getProduct();
     });
  }

  getProduct(){
    this.Token.getWooCommerce().get("products/"+this.id)
      .then((response) => {
      this.product = response.data;
      this.cleanDesc();
      })
      .catch((error) => {
      console.log(error.response.data);
      });
  }

  cleanDesc(){
      this.product.description = this.product.description.replace(/<\/?[^>]+(>|$)/g, "");
  }

  deleteProduct(id){
    this.Token.getWooCommerce().delete("products/"+id, {
      force: true
    })
      .then((response) => {
        this.router.navigateByUrl('products'); 
        console.log("product has been deleted");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

}
