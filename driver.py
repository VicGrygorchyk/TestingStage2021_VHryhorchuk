from selenium import webdriver
from selenium.webdriver.chrome import webdriver as chromedriver
from selenium.webdriver import DesiredCapabilities

DRIVER_LOG = "driver"
BROWSER_LOG = "browser"
LOGS_LEVEL = "DEBUG"
LOGS_SETUP = {DRIVER_LOG: LOGS_LEVEL, BROWSER_LOG: LOGS_LEVEL}

BROWSER_WIDTH = 1280
BROWSER_HEIGHT = 1024


def get_driver() -> webdriver.Chrome:
    cap = DesiredCapabilities.CHROME.copy()
    cap['goog:loggingPrefs'] = LOGS_SETUP
    cap['goog:chromeOptions'] = { 'args': [
        '--remote-debugging-port=7070',
        f'--window-size={BROWSER_WIDTH},{BROWSER_HEIGHT}',
    ]}
    return chromedriver.WebDriver(desired_capabilities=cap)


def get_remote_driver(selenium_grid_url) -> webdriver.Remote :
    cap = DesiredCapabilities.CHROME.copy()
    cap['goog:loggingPrefs'] = LOGS_SETUP
    cap['goog:chromeOptions'] = { 'args': [
        f'--window-size={BROWSER_WIDTH},{BROWSER_HEIGHT}',
    ]}
    return webdriver.Remote(command_executor=selenium_grid_url, desired_capabilities=cap)
