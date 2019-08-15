//import { userKey } from "@/global";
//import store from "../src/services/store";
import axios from "axios";
import { baseApiUrl, loading } from "@/global";

//import notify from "devextreme/ui/notify";

export default {
  async getTreinamentosRealizadoPeloAluno(ID) {
    loading();
    try {
      const response = await axios.get(
        `${baseApiUrl}/dashboard/getTodosTreinamentosAluno/${ID}`
      );

      let data = response.data;

      loading();

      return data;
    } catch (error) {
      // eslint-disable-next-line no-console
      loading();
      throw error.message;
    }
  }
};
