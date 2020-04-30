import { LanguageService } from './../services/language.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-language-pop',
  templateUrl: './language-pop.component.html',
  styleUrls: ['./language-pop.component.scss'],
})
export class LanguagePopComponent implements OnInit {

  languages = [];
  selectedLanguage: string;

  constructor(private popoverController: PopoverController,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    this.languages = this.languageService.getLanguages();
    this.selectedLanguage = this.languageService.selected;
  }

  select(lng: string): void {
    this.languageService.setLanguage(lng);
    this.popoverController.dismiss();
  }

}
