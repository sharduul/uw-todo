import { BoardPage } from './board.po';
import { browser, element, by, protractor } from 'protractor';

describe('Board', function() {
  let page: BoardPage;
  page = new BoardPage();
  let EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page.navigateTo();
    browser.ignoreSynchronization = true;
  });

  afterEach(function() {
    browser.ignoreSynchronization = false;
  });

  it('should display board title', () => {
    expect(page.getBoardTitle()).toEqual('New board');
  });

  it('should add card to the board', function () {
    let cardName = "New Card";

    browser.wait(EC.visibilityOf(page.addCardBtn), 5000);

    var originalCount = 0;
    page.cardList.count().then(function (count) {
        originalCount = count;
    });

    // Add card
    page.addCardBtn.click();
    browser.wait(EC.visibilityOf(page.addCardInp), 5000);
    page.setInput(page.addCardInp, cardName);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    page.cardList.count().then(function (count) {
        expect(count).toEqual(originalCount + 2);
    });

  });

  it('should delete card from the board', function () {
    let cardName = "New Card";

    browser.wait(EC.visibilityOf(page.addCardBtn), 5000);

    var originalCount = 0;
    page.cardList.count().then(function (count) {
        originalCount = count;
    });

    // Add card
    page.addCardBtn.click();
    browser.wait(EC.visibilityOf(page.addCardInp), 5000);
    page.setInput(page.addCardInp, cardName);
    browser.actions().sendKeys(protractor.Key.ENTER).perform();

    // Delete card
    page.deleteCardBtn.click();
    page.cardList.count().then(function (count) {
      expect(count).toEqual(originalCount);
    });

  });


});
