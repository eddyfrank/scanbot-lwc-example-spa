import { LightningElement } from 'lwc';
import ScanbotSDK from 'scanbot-web-sdk';
import { BarcodeScannerConfiguration } from 'scanbot-web-sdk/@types/model/configuration/barcode-scanner-configuration';
import { BarcodeResult } from 'scanbot-web-sdk/@types/model/barcode/barcode-result';

export default class HelloWorldApp extends LightningElement {
    private sdk: ScanbotSDK;
    private sdkInitialized = false;

    scannedBarcode = '';

    renderedCallback() {
        if (this.sdkInitialized) {
            return;
        }
        this.sdkInitialized = true;
        this.initSdk();
    }

    async initSdk() {
        // this trial key only valid for localhost!
        // get a free trial key for your test domain name at https://scanbot.io/trial/
        const LICENSE_KEY =
            "NJFVOlixyIwwAOw+YGSspQO6Pr81bN" +
            "V6vI+qeVD6NOaPNOTUZ7g/k+Rj5qhn" +
            "4uHB6bCbdg4jYtG+rw8t+UwVOPoOlC" +
            "pGNnmhpRYFoD5XaTtvZcLyjeoFaOOX" +
            "BlaIPTfwge10YztEABkae835rm7rL6" +
            "He1yVg8n70YuOeHPVGC2dFy2Ysfrzk" +
            "7JfVIF7vB6ie5kA/eIbLHQzlWVc7eI" +
            "LM2UJBBjmww1jvpbch+tyjpODoYpVI" +
            "OdLpqCtrDpKF5/dg0EpBJY9hjg96TP" +
            "xGUYvFH5NM+pCI6Zr/K0HTLKelXP1G" +
            "Z4WwZwhcVaomkLNCzx63yOyFWcdMQa" +
            "xDo9d9ZtMZGw==\nU2NhbmJvdFNESw" +
            "psb2NhbGhvc3QKMTcxOTc5MTk5OQo1" +
            "MTIKOA==\n";
        this.sdk = await ScanbotSDK.initialize({
            licenseKey: LICENSE_KEY,
            engine: '/public/assets/js/' // path to the Scanbot SDK files hosted as assets in the public folder
        });
    }

    async startBarcodeScanner() {
        const configs: BarcodeScannerConfiguration = {
            onBarcodesDetected: (result) => this.handleBarcodeResult(result),
            onError: (e) => {
                alert('ERROR: ' + JSON.stringify(e));
            },
            // !Note: In LWC, we can't use document to query for DOM elements. Instead, we have to use this.template.
            // Also, make sure the HTML container element uses lwc:dom="manual"!
            // See https://lwc.dev/guide/javascript_third_party_library
            container: this.template.querySelector('#scanner-view'),
            //containerId: 'scanner-view', // doesn't work in LWC!
            style: {
                window: {
                    aspectRatio: 2.5,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                },
            },
            videoConstraints: {
                facingMode: 'environment',
                resizeMode: 'none',
                width: { min: 1024, ideal: 1280, max: 1920 },
                height: { min: 576, ideal: 720, max: 1080 },
                experimental: {
                    focusMode: 'continous',
                    focusDistance: 0,
                },
            },
            engineMode: 'NEXT_GEN',
            //barcodeFormats: ['EAN_8', 'EAN_13'],
        };

        try {
            const scanner = await this.sdk.createBarcodeScanner(configs);
        } catch (e) {
            console.error(e);
            alert('ERROR: ' + JSON.stringify(e));
        }
    }

    handleBarcodeResult(result: BarcodeResult) {
        this.scannedBarcode = `${result.barcodes[0].text} (${result.barcodes[0].format})`;
    }
}
