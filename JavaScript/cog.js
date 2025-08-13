const { Camunda8 } = require('@camunda8/sdk');

async function connect() {

    const c8 = new Camunda8({ /*
        CAMUNDA_OAUTH_URL: 'https://login.cloud.camunda.io/oauth/token',
        ZEEBE_REST_ADDRESS: 'https://bru-2.zeebe.camunda.io:443/f87892ff...',
        ZEEBE_CLIENT_ID: 'R.ufF...',
        ZEEBE_CLIENT_SECRET: 'R6QNUyss...' */
        CAMUNDA_AUTH_STRATEGY: 'BEARER',
        ZEEBE_REST_ADDRESS: 'https://bru-2.zeebe.camunda.io:443/f87892ff...',
        CAMUNDA_OAUTH_TOKEN: 'eyJhbGciOiJSUzI1NiIsInR...'
    });

    return c8;
}

(async () => {

    const c8 = await connect();

    client = c8.getCamundaRestClient();

    const topology = await client.getTopology();

    console.log(topology);

    client.createJobWorker({
        type: 'credit-deduction',
        timeout: 20000,
        maxJobsToActivate: 1,
        worker: 'credit-deduction-worker',
        jobHandler: job => { creditDeduction(job) }
    })

    client.createJobWorker({
        type: 'credit-card-charging',
        timeout: 20000,
        maxJobsToActivate: 1,
        worker: 'credit-card-worker',
        jobHandler: job => { creditCardCharging(job) }
    })

})()

function creditDeduction(job) {

    console.log("Deducting customer credit...");

    job.complete();
}

function creditCardCharging(job) {

    console.log("Charging card...");

    job.complete();
}

function getCustomerCredit(customerId) {

    var credit = 0.0;

    const regEx = /\d+/;

    const match = customerId.match(regEx);

    if (match) { credit = parseFloat(match); }

    return credit;
}

function deductCredit(amount, credit) {

    var openAmount = 0.0;

    if (credit < amount) { openAmount = amount - credit; }

    return openAmount;
}

function isInvalidExpiryDate(expiryDate) {

    if (expiryDate.length != 5) {
        return true;
    } else {
        return false;
    }
}
