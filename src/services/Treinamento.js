//import { userKey } from "@/global";
//import store from "../src/services/store";
import axios from "axios";
import { baseApiUrl } from "@/global";

//import notify from "devextreme/ui/notify";

export default {
  async getTreinamentosIndex(payload) {
    try {
      return await axios({
        method: "get",
        url: `${baseApiUrl}/treinamentos?page=${payload.skip}&limit=${
          payload.take
        }`,
        responseType: "json",
        params: payload,
        data: {}
      })
        .then(res => {
          let data = res.data;
          let totalCount = 0;
          // eslint-disable-next-line no-undef
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
        .catch(() => {
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

  async getTreinamento(ID) {
    try {
      const response = await axios.get(`${baseApiUrl}/treinamentos/${ID}`);

      let data = response.data;

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  },

  async updateTreinamento(payload) {
    try {
      const response = await axios.put(
        `${baseApiUrl}/treinamentos/${payload.id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addTreinamento(payload) {
    try {
      const response = await axios.post(`${baseApiUrl}/treinamentos`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteTreinamento(ID) {
    try {
      const response = await axios.delete(`${baseApiUrl}/treinamentos/${ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
