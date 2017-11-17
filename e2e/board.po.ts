import { browser, element, by, protractor } from 'protractor';

export class BoardPage {
  addCardInp: any;
  addCardBtn: any;
  cardList: any;

  constructor() {
    this.addCardInp = element.all(by.css('div.add-card .add-card-input')).first();
    this.addCardBtn = element.all(by.css('div.add-card')).first();
    this.cardList = element.all(by.css('.card-list li'));
  }

  navigateTo() {
    return browser.get('b/5a0c571d6b5b743454fac770');
  }

  getBoardTitle(){
    return element(by.css('.board-title span')).getText();
  }

  getCardWithName(name){
    return element(by.cssContainingText('div.card-name span', name));
  }

  setInput(input, value) {
    input.clear().then(function () {
        input.sendKeys(value).sendKeys(protractor.Key.ENTER);
    });
  }

}
