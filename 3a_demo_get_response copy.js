const puppeteer = require('puppeteer-core');
const { By } = require('selenium-webdriver');

const { getDriver } = require('./driver');
const { getWebsocket } = require('./getWs');


(async () => {
    driver = getDriver();
    try {
        await driver.get('https://www.w3schools.com/xml/tryit.asp?filename=tryajax_first');

        const webSocketDebuggerUrl = await getWebsocket();

        const puppeteerConnection = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});

        const pages = await puppeteerConnection.pages();
        const page = pages[0];
        await page.setRequestInterception(true);
       
        page.on('request', interceptedRequest => {
            if (interceptedRequest.url() == 'https://www.w3schools.com/xml/ajax_info.txt') {     
                interceptedRequest.respond(
                    {
                        status: 200,
                        contentType: 'text/plain',
                        body: 'I am intercepted'
                    }                     
                );
            } else {
                interceptedRequest.continue();
            }
        });
       
    } catch (err) {
        // pass
        console.log(err)
    } finally {
        await driver.sleep(10000);
        await driver.close();
    }
})();
