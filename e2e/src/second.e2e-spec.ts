import { AppPage } from './app.po';
import { browser, logging, by, protractor, element } from 'protractor';
var appPage = new AppPage();

describe('Test my app - the second spec', function() {

  it(`Open 'testapp'`, async () => {
    appPage.navigateTo();
    await browser.sleep(1000);
  });

  it('click New Component', async () => {
    var res = element.all(by.css('div.card.card-small > span')).get(0);
    await res.click();
    var text = await element(by.css('div.terminal > pre')).getText();
    await expect(text).toContain('ng generate component xyz');
  });

  it('click ng add @angular/material', async () => {
    var res = element.all(by.css('div.card.card-small > span')).get(2);
    await res.click();
    var text = await element(by.css('div.terminal > pre')).getText();
    await expect(text).toContain('ng add @angular/material');
  });

  it('click Add dependency', async () => {
    var res = element.all(by.css('div.card.card-small > span')).get(3);
   // debugger;
    await res.click();
    var text = await element(by.css('div.terminal > pre')).getText();
    await expect(text).toContain('ng add _____');
  });

  it('click Run and Watch Tests', async () => {
    var res = element.all(by.css('div.card.card-small > span')).get(4);
    await res.click();
    var text = await element(by.css('div.terminal > pre')).getText();
    await expect(text).toContain('ng test');
  });

  it('click Build for Production', async () => {
    var res = element.all(by.css('div.card.card-small > span')).get(5);
    await res.click();
    var text = await element(by.css('div.terminal > pre')).getText();
    await expect(text).toContain('ng build --prod');
  });

});
