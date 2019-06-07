// State
export const state = {
  isMenuVisible: true,
  loadingVisible: false,
  screen: null
};

// Getters
export const getters = {
  loadingVisible(state) {
    return state.loadingVisible;
  },
  screen(state) {
    return state.screen;
  }
};

// Mutations
export const mutations = {
  setMenuVisible(state, payload) {
    state.isMenuVisible = payload;
  },

  setLoadingVisible(state) {
    console.log("mutacao");
    state.loadingVisible = !state.loadingVisible;
  },

  setScreen(state, payload) {
    state.screen = payload;
  }
};

// Actions
export const actions = {
  setLoadingVisible({ commit }) {
    console.log("ação");
    commit("setLoadingVisible");
  },
  setScreen({ commit }, payload) {
    commit("setScreen", payload);
  }
};
