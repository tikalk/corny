const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

const { resolve } = require('path');

const model = tf.loadModel(resolve(__dirname, 'model.json'));

module.exports = async buffer => {

};