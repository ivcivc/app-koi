<template>
  <smart-widget-grid :layout="layout" @on-refresh="onMoved" @layout-updated="handleLayoutUpdated">
    <smart-widget slot="0" title="Treinamentos realizado pelo Aluno">
      <template slot="toolbar">
        <div style="margin: 0 12px;">
          <div class="row end-xs" style="margin-top:0px;margin-bottom: 0px;">
            <div class="col-xs-12">
              <div class="box">
                <DxSelectBox
                  :search-enabled="true"
                  :data-source="datasourceAluno"
                  :search-mode="searchModeOption"
                  :search-expr="searchExprOption"
                  :search-timeout="searchTimeoutOption"
                  :min-search-length="minSearchLengthOption"
                  :show-data-before-search="showDataBeforeSearchOption"
                  display-expr="nome"
                  value-expr="id"
                  :value="1"
                  v-model="pessoa_id"
                ></DxSelectBox>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template slot="toolbar">
        <div style="margin: 0 12px;">
          <div class="row end-xs" style="margin-top:0px;margin-bottom: 0px;">
            <div class="col-xs-12">
              <div class="box">
                <DxButton text="Buscar" @click="onLocalizarTreinamentosAluno"></DxButton>
              </div>
            </div>
          </div>
        </div>
      </template>

      <div class="layout-center">
        <dx-scroll-view :height="heightGrid">
          <dx-data-grid
            :data-source="treinamentosRealizadosPeloAluno"
            :show-borders="true"
            :heigth="'100%'"
          >
            <dx-column :width="150" :fixed="true" data-field="evento" caption="Evento" />
            <dx-column :fixed="true" data-field="treinamento" caption="Treinamento" />
            <dx-column :fixed="true" data-field="consultor" caption="Consultor" />
            <dx-column :fixed="true" data-field="padrinho" caption="Padrinho" />
            <dx-column
              :width="90"
              :fixed="true"
              data-field="dInicio"
              caption="Início"
              data-type="date"
            />
            <dx-column
              :width="90"
              :fixed="true"
              data-field="dTermino"
              caption="Término"
              data-type="date"
            />
            <dx-column :width="85" :fixed="true" data-field="concluido" caption="Concluído" />
          </dx-data-grid>
        </dx-scroll-view>
      </div>
    </smart-widget>
  </smart-widget-grid>
</template>

<script>
import Vue from "vue";
import { SmartWidgetGrid } from "vue-smart-widget";
Vue.component("SmartWidgetGrid", SmartWidgetGrid);

import { DxButton, DxScrollView } from "devextreme-vue";

import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";

import ServicePessoa from "../services/Pessoa";

import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";

import ServiceDashboard from "../services/Dashboard";

import { DxSelectBox } from "devextreme-vue";
import { constants } from "crypto";

const datasourceAluno = new DataSource({
  store: new CustomStore({
    //loadMode: "raw",
    key: "id",

    byKey: key => {
      console.log("buscando byKey ", key);
      return ServicePessoa.getPessoas(key);
    },

    load: function(loadOptions) {
      let params = {};
      let o = {
        isLocalizar: true,
        grupos: ["ALUNO"],
        isLookup: true,
        take: 20,
        page: 1
      };

      if (!loadOptions.searchValue) {
        loadOptions.searchValue = null;
      } else {
        let key = "nome";
        let value = loadOptions.searchValue;
        if (value) {
          o[key] = value;
        }
      }

      let sort = null;

      if (_.isArray(loadOptions.sort)) {
        o["sortSelector"] = loadOptions.sort[0].selector;
        o["sortDirection"] = loadOptions.sort[0].desc ? "DESC" : "ASC";
      }

      return ServicePessoa.getPessoaIndex(o);
    }
  })
});

export default {
  components: { DxSelectBox, DxButton, DxDataGrid, DxColumn, DxScrollView },
  data() {
    return {
      heightGrid: "250",

      datasourceAluno: datasourceAluno,
      searchModeOption: "contains",
      searchExprOption: "nome",
      searchTimeoutOption: 200,
      minSearchLengthOption: 3,
      showDataBeforeSearchOption: false,

      pessoa_id: null,

      treinamentosRealizadosPeloAluno: [],

      layout: [{ x: 0, y: 0, w: 12, h: 6, i: "0" }]
    };
  },

  methods: {
    async onLocalizarTreinamentosAluno() {
      if (!this.pessoa_id) return;
      const ID = this.pessoa_id;
      const arr = await ServiceDashboard.getTreinamentosRealizadoPeloAluno(ID);
      this.treinamentosRealizadosPeloAluno = this.lodash.orderBy(
        arr,
        ["dInicio"],
        ["desc"]
      );
    },

    handleLayoutUpdated(newLayout) {
      if (this.lodash.has(newLayout, "newHPx")) {
        this.heightGrid = `${newLayout.newHPx - 100}`;
      }
    },

    onMoved(o) {
      console.log("moved: ", o);
    }
  }
};
</script>


<style lang="scss">
.logos-container {
  margin: 20px 0 40px 0;
  text-align: center;
  svg {
    display: inline-block;
  }
}

.devextreme-logo {
  width: 200px;
  height: 34px;
  margin-bottom: 17px;
}

.vue-logo {
  width: 180px;
  height: 62px;
}

.plus {
  margin: 20px 10px;
  width: 22px;
  height: 22px;
}

.screen-x-small .logos-container {
  svg {
    width: 100%;
    display: block;
    &.plus {
      margin: 0;
    }
  }
}
</style>
