import * as tf from '@tensorflow/tfjs';
import { MentorshipModel } from './mentorship.model';

export class MentorshipAI {
  private model: tf.Sequential;

  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [10] }));
    this.model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
    this.model.compile({ optimizer: tf.optimizers.adam(), loss: 'meanSquaredError' });
  }

  async train(data: MentorshipModel[]) {
    const inputs = data.map((d) => d.inputs);
    const labels = data.map((d) => d.labels);
    await this.model.fit(tf.tensor2d(inputs), tf.tensor2d(labels), { epochs: 100 });
  }

  async predict(inputs: number[]) {
    const inputTensor = tf.tensor2d([inputs]);
    const output = await this.model.predict(inputTensor);
    return output.dataSync();
  }
}

export interface MentorshipModel {
  inputs: number[];
  labels: number[];
                             }
