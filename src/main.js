/*import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";
import "devextreme/dist/css/dx.common.css";
*/
import "devextreme/dist/css/dx.carmine.css";
import "./themes/generated/theme.additional.css";
import "devextreme/dist/css/dx.common.css";

/*import "./assets/estilo.css";
import "./assets/css/col.css";
import "./assets/css/2cols.css";
import "./assets/css/3cols.css";
import "./assets/css/4cols.css";
import "./assets/css/5cols.css";
import "./assets/css/6cols.css";
import "./assets/css/7cols.css";
import "./assets/css/8cols.css";
import "./assets/css/9cols.css";
import "./assets/css/10cols.css";
import "./assets/css/11cols.css";
import "./assets/css/12cols.css";*/

import "./assets/css/flexboxgrid.min.css";

import Vue from "vue";

import store from "./services/store";

import App from "./App";
import router from "./router";
import appInfo from "./app-info";

import "./config/axios";
import "./config/pt-BR";

import VueLodash from "vue-lodash";
Vue.use(VueLodash, { name: "lodash" });

import VueMoment from "vue-moment";
import moment from "moment-timezone";

Vue.use(VueMoment, {
  moment
});

import VueSmartWidget from "vue-smart-widget";

Vue.use(VueSmartWidget);

import "v-slim-dialog/dist/v-slim-dialog.css";
import SlimDialog from "v-slim-dialog";

Vue.use(SlimDialog);

Vue.config.productionTip = false;
Vue.prototype.$appInfo = appInfo;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
