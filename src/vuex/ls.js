export default function ls(key, config) {
  const {
    provider,
    serialize,
    deserialize,
    dataExpires,
  } = Object.assign({
    provider: localStorage,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
    dataExpires: 0, // never expires
  }, config);

  return {
    get() {
      let state;
      try {
        const {
          value,
          expires,
        } = deserialize(provider.getItem(key));
        if (expires === 0 || expires > new Date().getTime()) {
          state = deserialize(value);
        }
      } catch (e) {
        // console.log(e)
      }

      return state;
    },
    set(value) {
      try {
        provider.setItem(key, serialize({
          value: serialize(value),
          expires: dataExpires ? dataExpires + new Date().getTime() : dataExpires,
        }));
      } catch (e) {
        // console.log(e)
      }
    },
  };
}
