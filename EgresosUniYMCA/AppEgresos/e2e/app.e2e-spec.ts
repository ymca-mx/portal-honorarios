import { AppEgresosPage } from './app.po';

describe('app-egresos App', () => {
  let page: AppEgresosPage;

  beforeEach(() => {
    page = new AppEgresosPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
