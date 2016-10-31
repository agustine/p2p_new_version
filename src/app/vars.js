const storage = {};
const KEY_STORE = 'KEY_STORE';

export const ERROR_CODE_UNKNOW = 1900;
export const ERROR_CODE_HINT = 1700;

export function get(key) {
  if (key in storage) {
    return storage[key];
  }
  return null;
}
export function set(key, value) {
  storage[key] = value;
}
export function exist(key) {
  return key in storage;
}

export function getStore() {
  return get(KEY_STORE);
}

export function getSessionId() {
  return getStore().getters.sessionId;
}

export function setStore(store) {
  return set(KEY_STORE, store);
}
