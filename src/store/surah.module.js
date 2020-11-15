import { surah } from './../common/api.service';
import { GET_SURAH_LIST, GET_SURAH } from './actions.type';
import { SAVE_SURAH_LIST } from './mutations.type';

const state = {
  surahList: [],
};

const getters = {
  getSurahList(state) {
    return state.surahList;
  },
};

const mutations = {
  [SAVE_SURAH_LIST](state, surah) {
    state.surahList = surah;
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
  [GET_SURAH](ctx, surahNumber) {
    return new Promise((resolve, reject) => {
      surah
        .fetchSingle(surahNumber)
        .then(({ data }) => {
          console.log(data.data);
          resolve(data.data);
        })
        .catch(reject);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
