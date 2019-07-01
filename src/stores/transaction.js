// State
export const state = {
  statusTransactions: [],

  statusTransactionsKoi: [
    { displayName: "Ativa", name: "active" },
    { displayName: "Encerrada", name: "closed" },
    { displayName: "Cancelada", name: "canceled" }
  ],

  statusReceber: [
    { displayName: "Ativa", name: "active" },
    { displayName: "Encerrada", name: "closed" },
    { displayName: "Cancelada", name: "canceled" }
  ]
};

// Getters
export const getters = {
  statusTransactions(state) {
    return state.statusTransactions;
  },

  statusTransactionsKoi(state) {
    return state.statusTransactionsKoi;
  },

  statusReceber(state) {
    return state.statusReceber;
  }
};

// Mutations
export const mutations = {
  setStatusTransactions(state, payload) {
    state.statusTransactions = payload;
  }
};

// Actions
export const actions = {
  setStatusTransactions({ commit }, payload) {
    commit("setStatusTransactions", payload);
  }
};
