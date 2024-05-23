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

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "article", component: ArticlesComponent },
    { path: "fournisseur", component: SuppliersComponent },
    { path: "bondecommande", component: PurchaseOrderComponent },
    { path: "famille", component: FamilleComponent },
    { path: "articles/:familleId", component: ArticlesByFamilleComponent }, // Add this line
    { path: "**", redirectTo: "/home" }
];
