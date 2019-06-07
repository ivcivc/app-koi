//import { userKey } from "@/global";
//import store from "../src/services/store";
import axios from "axios";
import { baseApiUrl } from "@/global";

//import notify from "devextreme/ui/notify";

export default {
  async getTipoNegociacaoIndex(payload) {
    try {
      return axios({
        method: "get",
        url: `${baseApiUrl}/tipoNegociacaos?page=${payload.skip}&limit=${
          payload.take
        }`,
        responseType: "json",
        params: payload,
        data: {}
      })
        .then(res => {
          let data = res.data;
          let totalCount = 0;
          if (_.has(data, "pagination")) {
            totalCount = data.pagination.total;
          } else {
            totalCount = data.total;
          }
          return {
            data: data.data,
            totalCount
          };
        })
        .catch(e => {
          return {
            data: [],
            totalCount: 0
          };
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  },

  async getTipoNegociacoes(ID) {
    try {
      const response = await axios.get(`${baseApiUrl}/tipoNegociacaos/${ID}`);

      let data = response.data;
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  },

  async updateTipoNegociacao(payload) {
    try {
      const response = await axios.put(
        `${baseApiUrl}/tipoNegociacaos/${payload.id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addTipoNegociacao(payload) {
    try {
      const response = await axios.post(
        `${baseApiUrl}/tipoNegociacaos`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteTipoNegociacao(ID) {
    try {
      const response = await axios.delete(
        `${baseApiUrl}/tipoNegociacaos/${ID}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
