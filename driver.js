require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

const LOGS_LEVEL = "ALL";
const LOGS_SETUP = {driver: LOGS_LEVEL, browser: LOGS_LEVEL};

const BROWSER_WIDTH = 1280;
const BROWSER_HEIGHT = 1024;


exports.getDriver = () => {
    return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new Options().addArguments('--remote-debugging-port=4009'))
    .build();
}

exports.getRemoteDriver = () => {
    return new Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();
}