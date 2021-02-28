import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  data = {
    name: "Product x",
    regular_price: "100",
    sale_price: "80",
    description: "Desc",
    categories: [
      {
        id: 18
      }
    ],
    images: [
      {
        src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg"
      }
    ]
  };

  constructor(
    private Token: TokenService
  ) { }

  ngOnInit(): void {
    /*
    this.Token.getWooCommerce().post("products", this.data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  */
  
  }

  

}
