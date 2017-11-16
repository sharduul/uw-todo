import { BoardPage } from './board.po';
import { browser, element, by } from 'protractor';

describe('Board', function() {
  let page: BoardPage;
  page = new BoardPage();

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
});
