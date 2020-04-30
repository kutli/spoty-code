import { LanguagePopModule } from './../language-pop/language-pop.module';
import { CodeService } from './../services/code.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePopComponent } from '../language-pop/language-pop.component';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    TranslateModule,
    LanguagePopModule,
  ],
  declarations: [HomePage],
  providers: [CodeService],
  entryComponents: [
    LanguagePopComponent
  ]
})
export class HomePageModule {}
