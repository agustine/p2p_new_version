import {
  isProduction,
} from '../utils/env';
import * as production from './production';
import * as test from './test';

const configs = isProduction ? production : test;

export default configs;
