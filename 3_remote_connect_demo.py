from selen_kaa.waits import Wait

import requests
from pyppeteer import connect

from driver import get_remote_driver
from find_ws import find_webSocketDebuggerUrl, find_proxy_ip


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


def main():
    selenium_grid_url = 'http://127.0.0.1:4444'
    driver = get_remote_driver(f'{selenium_grid_url}/wd/hub')

    logs = driver.get_log('driver')
    devtools_url = ''
    for log in logs:
        devtools_url = find_webSocketDebuggerUrl(log['message'])
        if devtools_url:
            break
    webSocketDebuggerUrl = devtools_url.replace('"webSocketDebuggerUrl": "', '').replace('"', '')

    debug_port = webSocketDebuggerUrl.split('/')[2].replace('localhost:', '')
    session_id = driver.session_id
    response = requests.get(f'{selenium_grid_url}/grid/api/testsession?session={session_id}')
    resp_json = response.json()
    proxy_id = resp_json['proxyId']
    proxy_ip = find_proxy_ip(proxy_id)

    webSocketDebuggerUrl = webSocketDebuggerUrl.replace('localhost', proxy_ip)

    speaker_css = '[href="https://testingstage.com/speakers/"]'
    driver.get('https://testingstage.com/')

    Wait(driver).element_to_be_visible(speaker_css)

    proxy_port = 4738
    webSocketDebuggerUrl = webSocketDebuggerUrl.replace(debug_port, str(proxy_port))
    print(webSocketDebuggerUrl)

main()
