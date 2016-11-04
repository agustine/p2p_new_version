import {
  CLOSE_DOWNLOAD_HINT,
} from '../mutation-types';

const state = {
  showDownLoadHint: true,
};

const mutations = {
  [CLOSE_DOWNLOAD_HINT](s) {
    s.showDownLoadHint = false;
  },
};

const actions = {
  closeDownloadHint({
    commit,
  }) {
    commit(CLOSE_DOWNLOAD_HINT);
  },
};

const getters = {
  showDownLoadHint(s) {
    return s.showDownLoadHint;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
