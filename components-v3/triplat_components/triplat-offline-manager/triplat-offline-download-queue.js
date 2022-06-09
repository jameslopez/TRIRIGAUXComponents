/*
@license
IBM Confidential - OCO Source Materials - (C) COPYRIGHT IBM CORP. 2018 - The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
*/

TriplatOfflineDownloadQueue = function () {
	this.queue = [];
	this.active = 0;
	this.maxActive = 3;
};

TriplatOfflineDownloadQueue.prototype.add = function (worker) {
	return new Promise(function(resolve, reject) {
		worker._resolve = resolve;
		worker._reject = reject;
		this.queue.push(worker);
		this._run();
	}.bind(this));
};

TriplatOfflineDownloadQueue.prototype._run = function () {
	if (this.queue.length == 0 || this.active >= this.maxActive) {
		return;
	}
	var worker = this.queue.shift();
	++this.active;
	worker()
		.then(function(result) {
			--this.active;
			worker._resolve(result);
			this._run();
		}.bind(this))
		.catch(function(error) {
			--this.active;
			worker._reject(error);
			this._run();
		}.bind(this));
};