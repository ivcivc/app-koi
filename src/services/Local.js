//import { userKey } from "@/global";
//import store from "../src/services/store";
import axios from "axios";
import { baseApiUrl } from "@/global";

//import notify from "devextreme/ui/notify";

export default {
  async getLocaisIndex(payload) {
    try {
      return axios({
        method: "get",
        url: `${baseApiUrl}/locals?page=${payload.skip}&limit=${payload.take}`,
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

  async getLocais(ID) {
    try {
      const response = await axios.get(`${baseApiUrl}/locals/${ID}`);

      let data = response.data;

      data.tel_com = data.tel_com === null ? "" : data.tel_com;
      data.tel_com2 = data.tel_com2 === null ? "" : data.tel_com2;
      data.tel_celular = data.tel_celular === null ? "" : data.tel_celular;
      data.tel_celular2 = data.tel_celular2 === null ? "" : data.tel_celular2;

      data.logradouro = data.logradouro === null ? "" : data.logradouro;
      data.compl = data.compl === null ? "" : data.compl;
      data.bairro = data.bairro === null ? "" : data.bairro;
      data.cidade = data.cidade === null ? "" : data.cidade;
      data.estado = data.estado === null ? "" : data.estado;
      data.cep = data.cep === null ? "" : data.cep;

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  },

  async updateLocal(payload) {
    try {
      const response = await axios.put(
        `${baseApiUrl}/locals/${payload.id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addLocal(payload) {
    try {
      const response = await axios.post(`${baseApiUrl}/locals`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteLocal(ID) {
    try {
      const response = await axios.delete(`${baseApiUrl}/locals/${ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
