import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HelpSlideComponent } from './help-slide.component';
import { HelpSlideRoutingModule } from './help-slide-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ColorPickerModule,
    HelpSlideRoutingModule
  ],
  declarations: [HelpSlideComponent],
  providers: [SocialSharing]
})
export class HelpSlideModule {}
