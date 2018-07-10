const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const { resolve } = require('path');
const maxBy = require('lodash.maxby');

const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(800, 800);
const context = canvas.getContext('2d');

const modelLoad = tf.loadModel(resolve(__dirname, 'model.json'));

const minProbability = 0.9;

const commands = {
	'0': undefined,
	'1': 'corny.sayHello',
	'2': 'corny.gitPush',
	'3': 'corny.gitPull',
};

module.exports = async filename => {
	const image = await loadImage(filename);
	context.drawImage(image, 0, 0, 800, 800);

	const tensor = tf.fromPixels(canvas);
	const model = await modelLoad;
	const predictedClass = tf.tidy(() => {
		const predictions = model.predict(tensor);
		return predictions.as1D().argMax();
	});

	const arr = Object.entries(await predictedClass.data());
	const selectedCommand = arr.filter(([key, prob]) => prob > minProbability).shift();
	if (selectedCommand) {
		const [key, prob] = selectedCommand;
		return key;
	}
};
