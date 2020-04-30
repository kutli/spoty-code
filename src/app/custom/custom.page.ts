import { LanguagePopComponent } from './../language-pop/language-pop.component';
import { CodeService } from './../services/code.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { PopoverController, ToastController, NavController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';


// TODO?
/**
 * Add terms and conditions in the footer
 * should open the following url: https://www.spotifycodes.com/assets/Terms_and_Conditions_for_Spotify_Codes.pdf
 * HINT: https://ionicframework.com/docs/native/in-app-browser
 * 
 */
@Component({
  selector: 'app-custom',
  templateUrl: './custom.page.html',
  styleUrls: ['./custom.page.scss'],
})
export class CustomPage implements OnInit{


  @ViewChild('colorPicker', {static: false}) colorPicker: ElementRef;

  url: string;
  barColor = 'black';
  size = 1024;
  format = 'jpeg';
  color = '#81b71a';
  image: any;
  displayedImage: any;

  constructor(private codeService: CodeService,
              private route: ActivatedRoute,
              private nav: NavController,
              private translate: TranslateService,
              public toastController: ToastController,
              public popoverController: PopoverController,
              private socialSharing: SocialSharing) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.paramMap.get('code');
    this.getCode();
  }

  /**
   * Method used to open the LanguagePopController
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
   * Method used to get the color picker
   */
  openColorPicker() {
    this.colorPicker.nativeElement.dispatchEvent(new MouseEvent('click'));
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
      this.image = null;
      this.displayedImage = null;
      this.getCode();
    } else {
      console.log('error');
    }
  }

  /**
   * Method used to use the refresher
   * @param event event
   */
  doRefresh(event): void {
    this.image = null;
    this.displayedImage = null;
    this.getCode(event.target.complete());
  }

  /**
   * Method used to get the http request
   */
  getCode(callback = () => null): void {
    this.codeService.getCode(this.format, this.color, this.barColor, this.size, this.url)
    .pipe(finalize(() => callback ))
    .subscribe(
      res =>  {
        this.image = this.createImageFromBlob(res, 'spotywave', this.format);
        this.displayedImage = URL.createObjectURL(res);
      },
      () => this.toastError('PERSONALIZATION.TOAST.CODE.ERROR', true)
    );
  }

  /**
   * Creates an blob to an image
   */
  createImageFromBlob(image: Blob, name: string, type: string): File {
    const reader = new FileReader();
    this.image = new File([image], `${name}.${type}`, { type:  `image/${type}` });
    reader.readAsDataURL(this.image);
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
    return this.image;
  }

  /**
   * Method used to share the image to a social media
   * @param social e.j. facebook, instagram
   */
  share(social: string): void {
    this.socialSharing.shareVia(social, 'message', 'subject', this.image).then(() => {
      console.log('done');
    }).catch((e) => {
      console.log(e);
      console.log('error');
      this.toastError('PERSONALIZATION.TOAST.MEDIA.ERROR');
    });
  }

  /**
   * Method used to present a toast error
   * @param message string message to be shown
   * @param help boolean if the help button must be displayed
   */
  async toastError(message: string, navigateHome: boolean = false) {
    const button: any = navigateHome ? {
      side: 'end',
      text: this.translate.instant('PERSONALIZATION.RETURN'),
      handler: () => this.nav.navigateBack('home')
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
