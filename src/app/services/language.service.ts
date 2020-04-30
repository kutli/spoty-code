import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';


const LNG_KEY = 'SELECTED_LANGUAJE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService,
              private storage: Storage) { }


  setInitialAppLanguaje() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguages() {
    return [
      {text: 'English', value: 'en', img: 'assets/images/en.png'},
      {text: 'Español', value: 'es', img: 'assets/images/es.png'}
    ];
  }

  setLanguage(language: string): void {
    this.translate.use(language);
    this.selected = language;
    this.storage.set(LNG_KEY, language);
  }

  getLanguage(): string {
    return this.selected;
  }
}
