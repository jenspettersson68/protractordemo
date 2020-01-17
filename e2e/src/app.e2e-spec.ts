import { AppPage } from './app.po';
import { browser, logging, by, protractor, element } from 'protractor';
var appPage = new AppPage();

describe('Test my app - the first spec', function() {

  it(`should have as title 'testapp'`, async () => {
    appPage.navigateTo();
    await browser.sleep(1000);
    var EC = protractor.ExpectedConditions;
    var p = element.all(by.css('div.content > p')).first();   
    await browser.wait(EC.visibilityOf(p), 5000);
    debugger;
    await expect(browser.getTitle()).toEqual('Testapp');
  });

  it('It should render testapp running', async () => {
    await expect(appPage.getTitleText()).toEqual('testapp app is running!');
  });

  it('should render Resources', async () => {
    var res = element(by.id("resource"));
    var test = await res.getText();
    await expect(test).toContain('Resources');
  });

});
