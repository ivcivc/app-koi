//import { userKey } from "@/global";
//import store from "../src/services/store";
import axios from "axios";
import { baseApiUrl } from "@/global";

//import notify from "devextreme/ui/notify";

export default {
  async getPessoas(ID) {
    try {
      const response = await axios.get(`${baseApiUrl}/pessoas/${ID}`);

      let data = response.data;
      let grupos = [];
      if (_.has(data, "grupos")) {
        data.grupos.forEach(e => {
          grupos.push(e.id);
        });
      }
      data.tel_resid = data.tel_resid === null ? "" : data.tel_resid;
      data.tel_com = data.tel_com === null ? "" : data.tel_com;
      data.tel_celular = data.tel_celular === null ? "" : data.tel_celular;
      data.tel_celular2 = data.tel_celular2 === null ? "" : data.tel_celular2;

      if (_.isNull(data.endereco)) {
        data.endereco = {
          logradouro: null,
          compl: null,
          bairro: null,
          cidade: null,
          estado: null,
          cep: null
        };
      }

      data.grupos = grupos;
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  },

  async getPessoaIndex(payload) {
    try {
      return axios({
        method: "get",
        url: `${baseApiUrl}/pessoas?page=${payload.skip}&limit=${payload.take}`,
        responseType: "json",
        params: payload,
        data: {}
      })
        .then(res => {
          let data = res.data;
          let totalCount = 0;
          // eslint-disable-next-line
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
      throw error;
    }
  },

  async updatePessoa(payload) {
    try {
      const response = await axios.put(
        `${baseApiUrl}/pessoas/${payload.id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addPessoa(payload) {
    try {
      const response = await axios.post(`${baseApiUrl}/pessoas`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deletePessoa(ID) {
    try {
      const response = await axios.delete(`${baseApiUrl}/pessoas/${ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
