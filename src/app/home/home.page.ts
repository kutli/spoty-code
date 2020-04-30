import { LanguagePopComponent } from './../language-pop/language-pop.component';
import { Component } from '@angular/core';
import { PopoverController, ToastController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

// TODO
/**
 * In the method VALIDATE URI ADD:
 * From a cellphone https://open.spotify.com/track/0x5ReG7WBJpo8gJGny8snN?si=fSK9CIBnS4iJGr2QQuuu1w
 * but the spotify uri just accepts the following format so...
 * Expected format = spotify:track:0x5ReG7WBJpo8gJGny8snN
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  url: string;

  constructor(private nav: NavController,
              private translate: TranslateService,
              public toastController: ToastController,
              private popoverController: PopoverController) {}


  /**
   * Method used to open the PopOverComponent
   * @param ev event
   */
  async chageLanguage(ev: any) {
    const popover = await this.popoverController.create({
      component: LanguagePopComponent,
      event: ev,
      translucent: true,
      showBackdrop: true,
      mode: 'ios'
    });
    return await popover.present();
  }

  /**
   * Method used to validate the spotify URI
   */
  validateUrl(): boolean {
    const pattern = /^(spotify:playlist:|spotify:track:)/;
    return pattern.test(this.url) ? true : false;
  }

  /**
   * Method use to validate the URL
   * if it is correct it will proceed to get the code
   * if not it will throw an error
   */
  onSubmit(): void {
    if (this.validateUrl()) {
      this.nav.navigateForward(`/custom/${this.url}`);
      this.url = null;
    } else {
      this.toastError('HOME.TOAST.HELP', true);
    }
  }

  /**
   * Method used to open the slider
   */
  openHelp(): void {
    this.nav.navigateForward('help');
  }

  /**
   * Method used to present a toast error
   * @param message string message to be shown
   * @param help boolean if the help button must be displayed
   */
  async toastError(message: string, help: boolean = false) {
    const button: any = help ? {
      side: 'end',
      text: this.translate.instant('HOME.HELP'),
      handler: () => this.openHelp()
    } : {};
    const toast = await this.toastController.create({
      message: this.translate.instant(message),
      duration: 2500,
      mode: 'ios',
      color: 'danger',
      buttons: [button]
    });
    toast.present();
  }
}
