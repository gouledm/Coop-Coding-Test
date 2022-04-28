const { link } = require('fs');
const puppeteer = require('puppeteer');
async function start(){
    //slowMo is too slow
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    // opens condoworks site
    await page.goto("https://app-dev.condoworks.co");
    // finds email and password id then types them
    await page.type("#Email", "coop.test@condoworks.co");
    await page.type("#Password", "MyTesting711");
    // clicks button
    await page.click("#btnSubmit");
    // needs a buffer between commands, otherwise they run before the page loads properly
    await page.waitForTimeout(500);
    await page.click('body > nav > button');
    await page.waitForTimeout(1000);
    // finds the first button on the page
    await page.click('[role="button"]');
    await page.waitForTimeout(1000);
    // finds nth child of same type and clicks
    await page.click('#navbarNavDropdown > ul.navbar-nav.mr-auto > li > div > a:nth-child(1)');
    await page.waitForTimeout(1000);
    // types 123 into the invoice number box
    await page.type('[name="invoices.InvoiceNumber"]', "123");
    await page.waitForTimeout(1000);
    let link = await page.$x('//*[@id="2"]/td[1]/a');
    // clicks magnefying glass
    await link[0].click();
    await page.waitForTimeout(1000);
    // scrolls down so the download button is visible
    await page.mouse.wheel({ deltaY: 10000 });
    await page.waitForTimeout(1000);
    // sets the download path
    const path = require('path');
    await page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: path.resolve(__dirname, "Invoice")
      });
    // downloads the pdf
    await page.click('#thumb-InvoiceFile-init-0 > div.file-thumbnail-footer > div.file-actions > div > a');
    await page.waitForTimeout(1000);
    // outputs the path of the saved file
    console.log("Saved to: " + __dirname + "\\Invoice");
    await browser.close();
}

start();
