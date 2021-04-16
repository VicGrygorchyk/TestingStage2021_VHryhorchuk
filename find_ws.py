import re

log = {
    'level': 'DEBUG',
    'message': 'DevTools HTTP Response: {\n   '
               '"Browser": "Chrome/88.0.4324.96",\n   '
               '"Protocol-Version": "1.3",\n   '
               '"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) '
               'Chrome/88.0.4324.96 Safari/537.36",\n  '
               ' "V8-Version": "8.8.278.14",\n   '
               '"WebKit-Version": "537.36 (@68dba2d8a0b149a1d3afac56fa74648032bcf46b)",\n   '
               '"webSocketDebuggerUrl": "ws://localhost:44311/devtools/browser/650245ab-e1f5-47cc-b323-f68e8bd66594"\n}'
               '\n\n',
    'timestamp': 1617657251012
}


def find_webSocketDebuggerUrl(logMessage):
    pattern = re.compile(
        r'"webSocketDebuggerUrl": "ws://localhost:[0-9]+/devtools/browser/([A-Za-z0-9]+-)+[A-Za-z0-9]+"'
    )
    matched = pattern.search(logMessage)
    if matched:
        return log['message'][matched.start():matched.end()]
    return False


def find_proxy_ip(proxy_id):
    proxy_match = re.compile(r'([0-9]{1,3}\.){3}[0-9]:')
    matched = proxy_match.search(proxy_id)
    return proxy_id[matched.start(): matched.end()].replace(':', '')

# print(find_webSocketDebuggerUrl(log['message']))
