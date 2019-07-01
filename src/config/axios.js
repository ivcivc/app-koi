import axios from "axios";
import { userKey } from "@/global";
import store from "../services/store";

//axios.defaults.headers.get['Content-Type'] = 'application/json;application/json'

const success = res => res;

const error = err => {
  return new Promise((resolve, reject) => {
    window.errr = err;
    if (err.response === undefined) {
      store.commit("user/setUser", null);
      localStorage.removeItem(userKey);

      return reject(
        "Ocorreu um erro na rede. Verificar conexão com a internet"
      );
    }
    if (401 === err.response.status) {
      store.commit("user/setUser", null);
      localStorage.removeItem(userKey);

      if (!store.state.user.isForgot) {
        if (store.state.user.user) {
          window.location = "/";
        }
      }
      return reject(err.response.data);
    } else if (404 === err.response.status) {
      return reject(err.response.data);
    } else if (400 === err.response.status) {
      // eslint-disable-next-line no-console
      console.log("Axios  - 400 ", err);
      let res = err.response.data;
      if (_.has(res, "errors")) {
        return reject(res.errors);
      } else {
        return reject(res);
      }
    } else {
      return reject(err);
    }
  });
};

axios.interceptors.response.use(success, error);
