//import { userKey } from "@/global";
//import store from "../src/services/store";
import axios from "axios";
import { baseApiUrl, loading } from "@/global";

//import notify from "devextreme/ui/notify";

export default {
  async getLocalizar(payload) {
    loading();
    try {
      const response = await axios.post(
        `${baseApiUrl}/maladireta/localizar`,
        payload
      );

      let data = response.data;

      loading();

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      loading();
      throw error.message;
    }
  },

  async dispararEmail(payload) {
    loading();
    try {
      const response = await axios.post(
        `${baseApiUrl}/maladireta/disparo`,
        payload
      );

      loading();
      let data = response.data;

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      loading();
      throw error.message;
    }
  },

  async dispararTesteEmail(payload) {
    loading();
    try {
      const response = await axios.post(
        `${baseApiUrl}/maladireta/disparoTeste`,
        payload
      );

      loading();
      let data = response.data;

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      loading();
      throw error.message;
    }
  }
};
