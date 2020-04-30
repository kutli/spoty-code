import { LanguagePopComponent } from './../language-pop/language-pop.component';
import { CodeService } from './../services/code.service';
import { LanguagePopModule } from '../language-pop/language-pop.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomPageRoutingModule } from './custom-routing.module';
import { CustomPage } from './custom.page';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomPageRoutingModule,
    TranslateModule,
    ColorPickerModule,
    LanguagePopModule
  ],
  declarations: [CustomPage],
  providers: [CodeService, SocialSharing],
  entryComponents: [LanguagePopComponent]
})
export class CustomPageModule {}
