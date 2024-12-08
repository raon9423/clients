import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private isEnglish = new BehaviorSubject<boolean>(false);
  currentLanguage = this.isEnglish.asObservable();

  toggleLanguage() {
    this.isEnglish.next(!this.isEnglish.value);
  }

  setLanguage(isEnglish: boolean) {
    this.isEnglish.next(isEnglish);
  }
}