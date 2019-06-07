import { userKey } from "@/global";
import store from "../src/services/store";
import axios from "axios";
import { baseApiUrl, baseUrl, loading } from "@/global";

import notify from "devextreme/ui/notify";

let authenticated = false;

export default {
  authenticated() {
    const json = localStorage.getItem(userKey);
    const user = JSON.parse(json);
    if (!user) {
      authenticated = false;
    } else {
      authenticated = true
    }
    return authenticated;
  },

  logIn(user) {
    loading();

    return new Promise((resolve, reject) => {
      axios
        .post(`${baseApiUrl}/sessions`, user)
        .then(res => {
          store.commit("user/setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          loading();
          authenticated = true;
          resolve(true);
        })
        .catch(e => {
          notify(e, "error", 600);
          loading();
          authenticated = false;
          reject(false);
        });
    });
  },

  logOut() {
    authenticated = false;
  },

  forgot(payload) {
    loading();

    return new Promise((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/passwords`, payload)
        .then(() => {
          loading();
          resolve(true);
        })
        .catch(e => {
          loading();
          notify(e, "error", 4000);
          reject(false);
        });
    });
  },

  recover(email) {
    return new Promise((resolve, reject) => {
      loading();

      axios
        .post(`${baseApiUrl}/passwords`, {
          redirect_url: `${baseUrl}/#/forgot`,
          email
        })
        .then(() => {
          const message = "Email enviado! Consulte a sua caixa de email.";
          notify(message, "error", 4000);
          loading();
          resolve(true);
        })
        .catch(e => {
          loading();
          //const message = "Email enviado! Consulte a sua caixa de email.";
          notify(e, "error", 4000);
          reject(e);
        });
    });
  }
};
