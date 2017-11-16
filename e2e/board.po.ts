import { browser, element, by } from 'protractor';

export class BoardPage {
  navigateTo() {
    return browser.get('b/:id');
  }

  getBoardTitle(){
    return element(by.css('.boards-wrapper h2')).getText();
  }
}
