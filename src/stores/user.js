import axios from "axios";
import { userKey, baseApiUrl } from "@/global";

// State
export const state = {
  avatar: `${process.env.BASE_URL}images/avatar.jpg`,
  user: null,
  forgot: false,
  users: [],
  permissions: [],
  roles: []
};

// Getters
export const getters = {
  users(state) {
    return state.users;
  },
  permissions(state) {
    return state.permissions;
  },
  roles(state) {
    return state.roles;
  }
};

// Mutations
export const mutations = {
  setUser(state, user) {
    state.user = user;
    if (user) {
      axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  },

  setUsers(state, payload) {
    state.users = payload;
  },

  logout(state) {
    localStorage.removeItem(userKey);
    state.user = null;
  },

  setPermissions(state, payload) {
    state.permissions = payload;
  },

  setRoles(state, payload) {
    state.roles = payload;
  }
};

// Actions
export const actions = {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/users`)
        .then(res => {
          commit("setUsers", res.data);
          resolve(true);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

  permissions({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/permissions/tree`)
        .then(res => {
          commit("setPermissions", res.data);
          resolve(true);
        })
        .catch(e => {
          commit("setPermissions", []);
          reject(e);
        });
    });
  },

  roles({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/roles`)
        .then(res => {
          commit("setRoles", res.data);
          resolve(true);
        })
        .catch(e => {
          commit("setRoles", []);
          reject(e);
        });
    });
  }
};
