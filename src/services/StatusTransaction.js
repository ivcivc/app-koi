import axios from "axios";
import { baseApiUrl } from "@/global";

import store from "./store";
window.store = store;

export default {
  async getStatusTransaction() {
    try {
      return axios({
        method: "get",
        url: `${baseApiUrl}/getStatusTransaction`,
        responseType: "json",
        data: {}
      })
        .then(res => {
          let data = res.data;
          store.dispatch("transaction/setStatusTransactions", data);
          return data;
        })
        .catch(() => {
          store.dispatch("transaction/setStatusTransactions", []);
          return [];
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  }
};
