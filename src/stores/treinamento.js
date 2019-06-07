import Service from "../services/Treinamento";

// State
export const state = {
  treinamentos: []
};

// Getters
export const getters = {
  treinamentos(state) {
    return state.treinamentos;
  }
};

// Mutations
export const mutations = {
  setTreinamentos(state, payload) {
    state.treinamentos = payload;
  }
};

// Actions
export const actions = {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      Service.getTreinamentosIndex({})
        .then(res => {
          commit("setTreinamentos", res.data);
          resolve(res.data);
        })
        .catch(e => {
          commit("setTreinamentos", []);
          reject(e);
        });
    });
  }
};
