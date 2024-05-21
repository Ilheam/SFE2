import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SuppliersComponent } from './Fournisseur/Fournisseur.component'; 
import { FamilleComponent } from './famille/famille.component'; 
import { ArticlesComponent } from './articles/articles.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'fournisseurs', component: SuppliersComponent },
  { path: 'familles', component: FamilleComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'bon-de-commande', component: PurchaseOrderComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
