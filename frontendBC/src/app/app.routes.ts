import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ArticlesComponent } from './articles/articles.component';
import { SuppliersComponent } from './Fournisseur/Fournisseur.component';
import { BonDeCommandeComponent } from './bon-de-commande/bon-de-commande.component';
import { FamilleComponent } from './famille/famille.component';
import { HomeComponent } from './home/home.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ArticlesByFamilleComponent } from './articles-by-famille/articles-by-famille.component';
import { CommentsComponent } from './comments/comments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { authGuardAdmin } from './auth.guard.admin';

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "article", component: ArticlesComponent, canActivate: [authGuardAdmin] },
  { path: "fournisseur", component: SuppliersComponent, canActivate: [authGuardAdmin] },
  { path: "bondecommande", component: PurchaseOrderComponent, canActivate: [authGuard] },
  { path: "famille", component: FamilleComponent, canActivate: [authGuardAdmin] },
  { path: "articles/:familleId", component: ArticlesByFamilleComponent, canActivate: [authGuard] },
  { path: "comments", component: CommentsComponent, canActivate:[authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuardAdmin] },
  { path: "**", redirectTo: "/home" }

];
