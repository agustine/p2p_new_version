const storage = {};
const KEY_STORE = 'KEY_STORE';
const KEY_FIRST_HASH = 'KEY_FIRST_HASH';

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

export function setFirstHash(hash) {
  return set(KEY_FIRST_HASH, hash);
}

export function isFirstHash(hash) {
  return get(KEY_FIRST_HASH) === hash;
}
