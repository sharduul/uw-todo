import { BoardPage } from './board.po';

describe('Board', function() {
  let page: BoardPage;

  beforeEach(() => {
    page = new BoardPage();
  });

  it('should display board title', () => {
    page.navigateTo();
    expect(page.getBoardTitle()).toEqual('New Board');
  });
});
