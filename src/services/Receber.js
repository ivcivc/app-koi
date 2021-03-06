import axios from "axios";
import { baseApiUrl } from "@/global";
//import lodash from "vue-lodash";
import Vue from "vue";
window.lo = Vue.lodash;

export default {
  async getReceberItemsIndex(payload) {
    console.log(payload);
    try {
      return await axios({
        method: "get",
        url: `${baseApiUrl}/receberItems?page=${payload.skip}&limit=${
          payload.take
        }`,
        responseType: "json",
        params: payload,
        data: {}
      })
        .then(res => {
          let data = res.data;

          // Ordenar por nome do aluno
          if (payload.sortSelector) {
            if (payload.sortSelector === "receber.pessoa.nome") {
              let direcao = payload.sortDirection === "ASC" ? "asc" : "desc";
              let dataArr = _.orderBy(data.data, ["aluno"], [`${direcao}`]);
              data.data = dataArr;
            }
          }

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

  async getReceber(ID) {
    try {
      const response = await axios.get(`${baseApiUrl}/receber/${ID}`);

      let data = response.data;

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  },

  async getPessoaCartoes(ID) {
    try {
      const response = await axios.get(
        `${baseApiUrl}/galaxPay/getPessoaCartoes/${ID}`
      );

      if (_.has(response, "response")) {
        return [];
      }

      if (response.data.type) {
        const data = response.data.cards;
        data.forEach(r => {
          r.description = r.brand + " - " + r.truncatedNumber;
        });
        return data;
      }

      return [];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  },

  async getBandeiras() {
    try {
      const response = await axios.get(`${baseApiUrl}/site/getBandeiras`);

      const data = response.data.brands;
      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return error;
    }
  },

  async addReceber(payload) {
    try {
      const response = await axios.post(`${baseApiUrl}/receber`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateReceber(payload) {
    try {
      const response = await axios.put(
        `${baseApiUrl}/receber/${payload.id}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateReceberItem(payload) {
    try {
      const response = await axios.put(
        `${baseApiUrl}/receberItems/${payload.id}`,
        payload
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addReceberItem(payload) {
    try {
      const response = await axios.post(`${baseApiUrl}/receberItems`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async pagarForaSistema(ID) {
    try {
      const response = await axios.post(`${baseApiUrl}/pagarForaSistema`, {
        receber_item_id: ID
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async sincronizar(receber_id) {
    try {
      const response = await axios.post(
        `${baseApiUrl}/site/updateTransactions`,
        {
          receber_id
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(ID) {
    try {
      const response = await axios.delete(`${baseApiUrl}/receber/${ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
