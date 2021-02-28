import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { CategsComponent } from './categs/categs.component';
import { ProductdescComponent } from './productdesc/productdesc.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';

const routes: Routes = [
  {path: '', redirectTo: 'connexion', pathMatch:'full'},
  {path: 'products', canActivate: [AfterLoginService], component:ProductsComponent},
  {path: 'addproduct', canActivate: [AfterLoginService], component:AddproductComponent},
  {path: 'editproduct/:id', canActivate: [AfterLoginService], component:EditproductComponent},
  {path: 'categories', canActivate: [AfterLoginService], component:CategoriesComponent},
  {path: 'addcategory', canActivate: [AfterLoginService], component:AddcategoryComponent},
  {path: 'editcategory/:id', canActivate: [AfterLoginService], component:EditcategoryComponent},
  {path: 'categs/:id', canActivate: [AfterLoginService], component:CategsComponent},
  {path: 'productdesc/:id', canActivate: [AfterLoginService], component:ProductdescComponent},
  {path: 'customers', canActivate: [AfterLoginService], component:CustomersComponent},
  {path: 'connexion', canActivate: [BeforeLoginService], component:ConnexionComponent},

];



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})

export class AppRoutingModule { }
