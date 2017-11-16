import { browser, element, by } from 'protractor';

export class BoardPage {
  navigateTo() {
    return browser.get('b/5a0c571d6b5b743454fac770');
  }

  getBoardTitle(){
    return element(by.css('.board-title span')).getText();
  }
}
