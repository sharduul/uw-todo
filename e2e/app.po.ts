import { browser, element, by } from 'protractor';

export class A2gtmPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getBoardTitle(){
    return element(by.css('.boards-wrapper h2')).getText();
  }
}
