const { By } = require('selenium-webdriver');
const lighouse = require('lighthouse');

const { getDriver } = require('./driver');

const DEVTOOLS_INFO_MATCH = /"webSocketDebuggerUrl": "ws:\/\/localhost:[0-9]+\/devtools\/page\/[A-Z0-9]+"/;
// Lighthouse start options
const LIGHTHAUSE_OPTIONS = {
    logLevel: 'info',
    screenEmulation: {disabled: true},
    formFactor: 'desktop',
    output: 'html',
    disableNetworkThrottling: true,
    disableCpuThrottling: true,
    throttlingMethod: 'provided',
};
// metrics to gather via Lighthouse
const AUDIT_KEYS = [
    'viewport',
    'first-contentful-paint',
    'largest-contentful-paint',
    'first-meaningful-paint',
    'speed-index',
    'screenshot-thumbnails',
    'final-screenshot',
    'estimated-input-latency',
    'total-blocking-time',
    'max-potential-fid',
    'cumulative-layout-shift',
    'server-response-time',
    'interactive',
    'user-timings',
    'critical-request-chains',
    'redirects',
    'installable-manifest',
    'apple-touch-icon',
    'splash-screen',
    'themed-omnibox',
    'maskable-icon',
    'content-width',
    'image-aspect-ratio',
    'image-size-responsive',
    'preload-fonts',
    'deprecations',
    'mainthread-work-breakdown',
    'bootup-time',
    'uses-rel-preload',
    'uses-rel-preconnect',
    'font-display',
    'diagnostics',
    'network-requests',
    'network-rtt',
    'network-server-latency',
    'main-thread-tasks',
    'metrics',
    'performance-budget',
    'timing-budget',
    'resource-summary',
    'third-party-summary',
    'third-party-facades',
    'largest-contentful-paint-element',
    'layout-shift-elements',
    'long-tasks',
    'no-unload-listeners',
    'non-composited-animations',
    'unsized-images',
    'valid-source-maps',
    'preload-lcp-image',
    'accesskeys',
    'aria-allowed-attr',
    'aria-command-name',
    'aria-hidden-body',
    'aria-hidden-focus',
    'aria-input-field-name',
    'aria-meter-name',
    'aria-progressbar-name',
    'aria-required-attr',
    'aria-required-children',
    'aria-required-parent',
    'aria-roles',
    'aria-toggle-field-name',
    'aria-tooltip-name',
    'aria-treeitem-name',
    'aria-valid-attr-value',
    'aria-valid-attr',
    'button-name',
    'bypass',
    'color-contrast',
    'definition-list',
    'dlitem',
    'document-title',
    'duplicate-id-active',
    'duplicate-id-aria',
    'form-field-multiple-labels',
    'frame-title',
    'heading-order',
    'html-has-lang',
    'html-lang-valid',
    'image-alt',
    'input-image-alt',
    'label',
    'link-name',
    'list',
    'listitem',
    'meta-refresh',
    'meta-viewport',
    'object-alt',
    'tabindex',
    'td-headers-attr',
    'th-has-data-cells',
    'valid-lang',
    'video-caption',
    'custom-controls-labels',
    'custom-controls-roles',
    'focus-traps',
    'focusable-controls',
    'interactive-element-affordance',
    'logical-tab-order',
    'managed-focus',
    'offscreen-content-hidden',
    'use-landmarks',
    'visual-order-follows-dom',
    'uses-long-cache-ttl',
    'total-byte-weight',
    'offscreen-images',
    'render-blocking-resources',
    'unminified-css',
    'unminified-javascript',
    'unused-css-rules',
    'unused-javascript',
    'uses-webp-images',
    'uses-optimized-images',
    'uses-text-compression',
    'uses-responsive-images',
    'efficient-animated-content',
    'duplicated-javascript',
    'legacy-javascript',
    'appcache-manifest',
    'doctype',
    'charset',
    'dom-size',
    'external-anchors-use-rel-noopener',
    'inspector-issues',
    'no-document-write',
    'no-vulnerable-libraries',
    'js-libraries',
    'notification-on-start',
    'password-inputs-can-be-pasted-into',
    'uses-http2',
    'uses-passive-event-listeners',
    'meta-description',
    'http-status-code',
    'font-size',
    'link-text',
    'crawlable-anchors',
    'is-crawlable',
    'robots-txt',
    'tap-targets',
    'hreflang',
    'plugins',
    'canonical',
    'structured-data',
];

const PERFORMANCE_KEYS = [
    'first-contentful-paint',
    'first-meaningful-paint',
    'largest-contentful-paint',
    'cumulative-layout-shift',
    'speed-index',
    'total-blocking-time',
    'server-response-time',
    'interactive',
    'network-server-latency',
];

const CONFIGS_LIGHTHOUSE = {
    extends: 'lighthouse:default',
    settings: {
        onlyAudits: AUDIT_KEYS,
    },
};



(async () => {
    driver = getDriver();
    try {
        const url = 'https://www.w3schools.com/';
        const options_ = LIGHTHAUSE_OPTIONS;
        const port = 4009;

        options_.port = port;
        await driver.get(url);

        await lighouse(url, options_, CONFIGS_LIGHTHOUSE);
       
    } catch (err) {
        // pass
        console.log(err)
    } finally {
        await driver.sleep(10000);
        await driver.close();
    }
})();
