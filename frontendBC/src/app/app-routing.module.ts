import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FournisseursComponent } from './Fournisseur/Fournisseur.component'; // Adjust path as necessary

const routes: Routes = [
  { path: 'Fournisseur', component: FournisseursComponent },
  { path: '', redirectTo: '/Fournisseur', pathMatch: 'full' } // Ensure this is correctly set
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
