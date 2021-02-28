import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategsComponent } from './categs/categs.component';
import { ProductdescComponent } from './productdesc/productdesc.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { MessageService } from './services/message.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AddcustomerComponent,
    EditcustomerComponent,
    CategoriesComponent,
    AddcategoryComponent,
    EditcategoryComponent,
    ProductsComponent,
    AddproductComponent,
    EditproductComponent,
    NavbarComponent,
    CategsComponent,
    ProductdescComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule,
  ],
  providers: [
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    MessageService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
