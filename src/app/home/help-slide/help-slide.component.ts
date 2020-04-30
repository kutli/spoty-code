import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';

// TODO
/**
 * 
 * 
 * Add slides to show the process to get the url code.
 * 
 *
 * Add slides to show the correct formats,
 * FORMATS MUST START WITH:
 * spotify:playlist:xxxxxxxx
 * spotify:track:xxxxxx
 * https://open.spotify.com/track/xxxxxxx
 */


 /**
  * HINT
  * To use the translator check the slides array, the first element
  * to add the others set the texts in assets/i18n/es.json|en.json
  */

@Component({
  selector: 'app-help-slide',
  templateUrl: './help-slide.component.html',
  styleUrls: ['./help-slide.component.scss'],
})
export class HelpSlideComponent implements OnInit {

  @ViewChild('slider', { static: false }) slider: IonSlides;

  hasSkip = true;

  slides: {img: string, title: string, desc: string}[] = [
    {
      img: 'assets/images/en.png',
      title: 'HOME.HELP.SLIDE.SLIDE1.TITLE',
      desc: 'HOME.HELP.SLIDE.SLIDE1.DESC'
    },
    {
      img: 'assets/images/es.png',
      title: 'title 2',
      desc: 'Description 1'
    },
    {
      img: 'assets/images/back-image.png',
      title: 'title 3',
      desc: 'Description 1'
    }
  ];

  constructor(private nav: NavController) { }

  ngOnInit() {}

  /**
   * Method used to check if it is the last slide
   * if true, then skip button will appear with hasSkip=true
   * if false, then skip button will disappear with hasSkip=false
   */
  doCheck() {
    this.slider.isEnd().then(res => {
      this.hasSkip = res ? false : true;
    });
  }

  /**
   * Method used to redirecto to home component
   */
  onClick(): void {
    this.nav.navigateBack('/home');
  }
}
