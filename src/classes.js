import {
  getStore,
} from './app/vars';

export const ERROR_CODE_UNKNOW = 1900;
export const ERROR_CODE_HINT = 1700;

function showHint(message) {
  getStore();
  console.log(message);
}
export class AppError extends Error {
  constructor(message, code) {
    super(message, code);
    this.errorCode = code;
    this.errorMessage = message;
  }

  commonTrigger() {
    switch (this.errorCode) {
      case ERROR_CODE_HINT:
        showHint(this.errorMessage);
        break;
      case ERROR_CODE_UNKNOW:
      default:
        break;
    }
  }
}


export default {
  ERROR_CODE_UNKNOW,
  ERROR_CODE_HINT,
  AppError,
};
