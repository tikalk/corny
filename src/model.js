const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const { resolve } = require('path');
const maxBy = require('lodash.maxby');

const modelLoad = tf.loadModel(resolve(__dirname, 'model.json'));

module.exports = async img => {
	const model = await modelLoad;
	const predictedClass = tf.tidy(() => {
		const predictions = model.predict(img);
		return predictions.as1D().argMax();
	});

	const arr = await predictedClass.data();
};
