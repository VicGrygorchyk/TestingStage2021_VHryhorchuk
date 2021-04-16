const { getDriver } = require('./driver');
const { Command } = require('selenium-webdriver/lib/command');

(async () => {
    driver = getDriver();
    const cmdName = 'setNetworkConditions';
    const args = {'offline': true, 'latency': 250, 'download_throughput': 1, 'upload_throughput': 1, 'throughput': 1};
    try {
        const cmd = new Command(cmdName);
        cmd.setParameter('network_conditions', args);
        await driver.schedule(cmd, 'test');
        await driver.schedule(cmd);
        await driver.get('https://testingstage.com/');
    } catch (err) {
        // pass
        console.log(err)
    } finally {
        await new Promise(r => setTimeout(r, 7000));
        await driver.close();
    }

})();
