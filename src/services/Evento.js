//import { userKey } from "@/global";
//import store from "../src/services/store";
import axios from "axios";
import { baseApiUrl } from "@/global";

import Local from "./Local";
import Treinamento from "./Treinamento";
import TipoNegociacao from "./TipoNegociacao";

//import notify from "devextreme/ui/notify";

export default {
  async getEventosIndex(payload) {
    try {
      const { page, take } = payload;
      delete payload.page;
      delete payload.take;
      return axios({
        method: "get",
        url: `${baseApiUrl}/eventos?page=${page}&limit=${take}`,
        responseType: "json",
        params: payload,
        data: {}
      })
        .then(res => {
          let data = res.data;
          console.log("sobre ", res.data);
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

  async getEvento(ID) {
    try {
      const response = await axios.get(`${baseApiUrl}/eventos/${ID}`);

      let data = response.data;

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    }
  },

  async getEventoParticipantes(EVENTO_ID) {
    try {
      return axios({
        method: "get",
        url: `${baseApiUrl}/participantes`,
        responseType: "json",
        params: { evento_id: EVENTO_ID },
        data: {}
      })
        .then(res => {
          let data = res.data;
          return {
            data: data
          };
        })
        .catch(e => {
          throw e;
        });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    }
  },

  async getEventoParticipante(ID) {
    try {
      const response = await axios.get(`${baseApiUrl}/participantes/${ID}`);

      let data = response.data;

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    }
  },

  async updateEvento(payload) {
    try {
      const response = await axios.put(
        `${baseApiUrl}/eventos/${payload.id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateEventoParticipante(payload) {
    try {
      const response = await axios.put(
        `${baseApiUrl}/participantes/${payload.id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addEvento(payload) {
    try {
      const response = await axios.post(`${baseApiUrl}/eventos`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addEventoParticipante(payload) {
    try {
      const response = await axios.post(`${baseApiUrl}/participantes`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteEvento(ID) {
    try {
      const response = await axios.delete(`${baseApiUrl}/eventos/${ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteEventoParticipante(ID) {
    try {
      const response = await axios.delete(`${baseApiUrl}/participantes/${ID}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async get(id) {
    // eslint-disable-next-line
    console.log("Iniciando a promessa - get.....", id);
    // eslint-disable-next-line
    console.log("3000");
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      console.log("3000-a");

      Promise.all([
        this.getEvento(id),
        Local.getLocaisIndex({}),
        Treinamento.getTreinamentosIndex({}),
        this.getEventoParticipantes(id),
        TipoNegociacao.getTipoNegociacoesIndex({
          sortSelector: "nome",
          sortDirection: "desc"
        })
      ])
        .then(resultados => {
          // eslint-disable-next-line
          console.log("3001");
          // eslint-disable-next-line
          console.log("promise all = ", resultados);
          resolve(resultados);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log("3002");
          // eslint-disable-next-line
          console.log("promise all rejeitado = ", resultados);
          reject(err);
        });
    });
  },

  async getNovo() {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      Promise.all([
        Local.getLocaisIndex({}),
        Treinamento.getTreinamentosIndex({}),
        TipoNegociacao.getTipoNegociacoesIndex({
          sortSelector: "nome",
          sortDirection: "desc"
        })
      ])
        .then(resultados => {
          // eslint-disable-next-line
          resolve(resultados);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
