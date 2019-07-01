import axios from "axios";
import { baseApiUrl } from "@/global";
//import lodash from "vue-lodash";
import Vue from "vue";
window.lo = Vue.lodash;

export default {
  async getReceberItemsIndex(payload) {
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
  }
};
