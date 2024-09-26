import * as tf from '@tensorflow/tfjs';
import { EducationModel } from './education.model';

export class EducationAI {
  private model: tf.Sequential;

  constructor() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 20, activation: 'relu', inputShape: [20] }));
    this.model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
    this.model.compile({ optimizer: tf.optimizers.adam(), loss: 'meanSquaredError' });
  }

  async train(data: EducationModel[]) {
    const inputs = data.map((d) => d.inputs);
    const labels = data.map((d) => d.labels);
    await this.model.fit(tf.tensor2d(inputs), tf.tensor2d(labels), { epochs: 100 });
  }

  async predict(inputs: number[]) {
    const inputTensor = tf.tensor2d([inputs]);
    const output = await this.model.predict(inputTensor);
    return output.dataSync();
  }

  async getRecommendations(studentId: string) {
    const studentData = await this.getStudentData(studentId);
    const recommendations = await this.predict(studentData);
    return recommendations;
  }

  async getStudentData(studentId: string) {
    // TO DO: implement logic to retrieve student data from database or API
    // For now, just return some dummy data
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  }
}

export interface EducationModel {
  inputs: number[];
  labels: number[];
}
