const axios = require('axios');

exports.getWebsocket = () => {
    const config = {
        method: 'get',
        url: `http://127.0.0.1:4009/json/version`,
    };

    return axios(config).then((response) => response.data.webSocketDebuggerUrl).catch((error) => console.log(error));
}