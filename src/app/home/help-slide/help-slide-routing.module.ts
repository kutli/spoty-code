import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpSlideComponent } from './help-slide.component';

const routes: Routes = [
  {
    path: '',
    component: HelpSlideComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpSlideRoutingModule {}
