// Prevents any command from being run within x ms of the last command
const throttleTimeout = 700;

let lastRun = Date.now();

module.exports = fn => {
	const timestamp = Date.now();
	if (timestamp - lastRun < throttleTimeout) {
		// Throttled
		return;
	}

	lastRun = timestamp;
	fn();
};
