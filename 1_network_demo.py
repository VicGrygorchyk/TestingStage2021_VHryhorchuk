import time

from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

from driver import get_driver


driver = get_driver()
cmd = 'Network.emulateNetworkConditions'
args = {'offline': True, 'latency': 250, 'downloadThroughput': 1, 'uploadThroughput': 1, 'connectionType': 'none'}
driver.execute('executeCdpCommand', {'cmd': cmd, 'params': args})
try:
    driver.get('https://testingstage.com/')
except:
    ActionChains(driver).send_keys(Keys.SPACE).perform()
    pass
time.sleep(7)
driver.close()
