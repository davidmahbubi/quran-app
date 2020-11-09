import { surah } from './../common/api.service';
import { GET_SURAH_LIST } from './actions.type';
import { SAVE_SURAH_LIST } from './mutations.type';

const state = {
  surahList: [],
};

const mutations = {
  [SAVE_SURAH_LIST](state, surah) {
    state.surahList = surah;
    console.log(state.surahList);
  },
};

const actions = {
  [GET_SURAH_LIST]({ commit }) {
    return new Promise((resolve, reject) => {
      surah
        .fetchAll()
        .then(({ data }) => {
          commit(SAVE_SURAH_LIST, data.data);
          resolve(data.data);
        })
        .catch(reject);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
