import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ArticlesComponent } from './articles/articles.component';
import { SuppliersComponent } from './Fournisseur/Fournisseur.component';
import { BonDeCommandeComponent } from './bon-de-commande/bon-de-commande.component';
import { FamilleComponent } from './famille/famille.component';
import { HomeComponent } from './home/home.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ArticlesByFamilleComponent } from './articles-by-famille/articles-by-famille.component'; // Import this
import { AuthGuard } from './auth.guard'; // Import the AuthGuard

export const routes: Routes = [
    { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "article", component: ArticlesComponent, canActivate: [AuthGuard] },
    { path: "fournisseur", component: SuppliersComponent, canActivate: [AuthGuard] },
    { path: "bondecommande", component: PurchaseOrderComponent, canActivate: [AuthGuard] },
    { path: "famille", component: FamilleComponent, canActivate: [AuthGuard] },
    { path: "articles/:familleId", component: ArticlesByFamilleComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "/home" }
];
