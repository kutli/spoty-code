import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LanguagePopComponent } from './language-pop.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [LanguagePopComponent],
  exports: [LanguagePopComponent]
})
export class LanguagePopModule {}
