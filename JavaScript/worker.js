const ZB = require('zeebe-node');

const zbc = new ZB.ZBClient();

(async () => {

	const topology = await zbc.topology()

	console.log(JSON.stringify(topology, null, 2))

	zbc.createWorker({
		taskType: 'some-worker-name-1',
		taskHandler: job => { creditDeduction(job) },
	})

  zbc.createWorker({
    taskType: 'some-worker-name-2',
    taskHandler: job => { creditCardCharging(job) },
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

    if (credit < amount) {
        openAmount = amount - credit;
    }

    return openAmount;
}
