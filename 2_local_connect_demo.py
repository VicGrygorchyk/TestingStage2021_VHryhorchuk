import time
import asyncio

from selenium.webdriver.chrome import webdriver as chromedriver
from selenium.webdriver import DesiredCapabilities
from selen_kaa.waits import Wait

import requests
from pyppeteer import connect

DEBUG_PORT = 4009


def get_websocket():
    resp = requests.get(f"http://127.0.0.1:{DEBUG_PORT}/json/version")
    _json = resp.json()
    _websocket = _json["webSocketDebuggerUrl"]
    return _websocket


async def connect_puppeteer_instance(websocket_url):
    return await connect(browserWSEndpoint=websocket_url,
                         args=["--window-position=0,0",
                               '--start-maximized'],
                         defaultViewport=None)


cap = DesiredCapabilities.CHROME.copy()
cap['goog:chromeOptions'] = {
    'args': [f'--remote-debugging-port={DEBUG_PORT}'],
}
driver = chromedriver.WebDriver(desired_capabilities=cap)


async def main():
    speaker_css = '[href="https://testingstage.com/speakers/"]'
    driver.get('https://testingstage.com/')
    Wait(driver).element_to_be_visible(speaker_css)
    websocket_url = get_websocket()
    puppeteer = await connect_puppeteer_instance(websocket_url)
    pages = await puppeteer.pages()
    page = pages[0]
    speaker_btn = await page.querySelector(speaker_css)
    await speaker_btn.click()

    time.sleep(5)
    driver.close()


asyncio.get_event_loop().run_until_complete(main())
