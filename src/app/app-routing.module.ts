import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdPageComponent } from './ad-page/ad-page.component';

const routes: Routes = [

  {
    path:'',
    component:AdPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
