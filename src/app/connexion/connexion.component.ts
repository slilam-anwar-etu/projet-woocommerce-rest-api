import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  public form = {
    url: null,
    consumerKey: null,
    consumerSecret: null,
    version: null
  };

  constructor(
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService,
  ) { }

  onSubmit() {
    this.Token.handle(this.form);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('products');
  }

  ngOnInit(): void {
  }

}
