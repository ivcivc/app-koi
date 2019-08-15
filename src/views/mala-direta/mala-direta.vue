<template>
  <div>
    <h2 class="content-block">Mala direta</h2>

    <div class="content-block" id="bloco1">
      <div class="dx-card responsive-paddings">
        <div>
          <dx-form id="form" :col-count="2" :form-data="malaDireta">
            <dx-item
              :editor-options="{disabled: false, value: '', items: treinamentos, colSpan:'2', displayExpr: 'nome',
            valueExpr: 'id'}"
              data-field="treinamento_id"
              editor-type="dxTagBox"
              :label="{text: 'Treinamentos realizados'}"
              :col-span="2"
            />
            <dx-item
              :editor-options="{disabled: false, value: '', items: treinamentos, colSpan:'2', displayExpr: 'nome',
            valueExpr: 'id'}"
              data-field="not_treinamento_id"
              editor-type="dxTagBox"
              :label="{text: 'Treinamentos não realizados'}"
              :col-span="2"
            />

            <dx-item
              :editor-options="{disabled: false, items: estado_civil}"
              data-field="estado_civil"
              editor-type="dxTagBox"
              :label="{text: 'Estado Civil'}"
              :col-span="1"
            />

            <dx-item
              :editor-options="{disabled: false, items: sexos, showClearButton: true }"
              data-field="sexo"
              editor-type="dxSelectBox"
              :label="{text: 'Sexo'}"
              :col-span="1"
            />

            <!--<dx-item :editor-options="{disabled: false}" data-field="Estado Civil" :col-span="1" />-->
          </dx-form>

          <dx-button
            style="margin-left: 20px; margin-top: 15px;"
            styling-mode="outlined"
            @click="onLocalizar"
            text="Localizar"
          />
          <dx-button
            style="margin-left: 20px; margin-top: 15px;"
            styling-mode="outlined"
            @click="onEditarEmail"
            text="Editar Email"
            v-if="selecionados.length > 0"
          />
        </div>

        <dx-data-grid
          :data-source="dataSource"
          key-expr="pessoa_id"
          style="margin-top:15px;"
          :show-borders="true"
          :selected-row-keys="selecionados"
          @selection-changed="onSelectionChanged"
        >
          <!--<dx-paging :page-size="page"/>
            <dx-pager :show-page-size-selector="true" :allowed-page-sizes="pageSizes" :show-info="true"/>
          <dx-editing :allow-updating="true" :popup="{width:700, height:345}" mode="popup"/>-->
          <dx-filter-row :visible="false" apply-filter="auto" />

          <dx-column caption="Nome" data-field="pessoa" />
          <dx-column caption="Sexo" data-field="sexo" />
          <dx-column caption="Estado Civil" data-field="estado_civil" />
          <dx-column caption="email" data-field="email" />

          <dx-paging :page-size="paginas" />

          <dx-selection
            :select-all-mode="allMode"
            :show-check-boxes-mode="checkBoxesMode"
            mode="multiple"
          />
          <!--<dx-column caption="Status" data-field="status" />
          <dx-column caption="Status" cell-template="cellTemplate" :allowEditing="false" />

          <dx-selection
            :select-all-mode="allMode"
            :show-check-boxes-mode="checkBoxesMode"
            mode="multiple"
          />-->
        </dx-data-grid>
      </div>
    </div>

    <dx-popup
      :visible.sync="popupVisible"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      :width="300"
      :height="250"
      class="popup"
      title="Editar layout email"
      titleTemplate="<div style='padding: 5px;'><b>Editar layout email</b></div>"
      :fullScreen="true"
      :deferRendering="true"
    >
      <div style="pading: 20px;">
        <MyEditorHtml
          @fechar="popupVisible=false"
          :pessoas="selecionadosLista"
          :filtros="malaDireta"
        />
      </div>
    </dx-popup>
  </div>
</template>

<script>
import { DxPopup } from "devextreme-vue/popup";
import MyEditorHtml from "./editorHtml";

import axios from "axios";
import { userKey, baseApiUrl, loading } from "@/global";
//import { confirm } from "devextreme/ui/dialog";

import Service from "../../services/Maladireta";
import notify from "devextreme/ui/notify";

import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxFilterRow,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxSelection
} from "devextreme-vue/data-grid";

import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";

import { locale, loadMessages, formatMessage } from "devextreme/localization";

import { DxSelectBox } from "devextreme-vue";

import { DxForm, DxItem } from "devextreme-vue/form";

import { DxButton, DxTextBox } from "devextreme-vue";

import ServiceTreinamento from "../../services/Treinamento";

const decimalFormatter = new Intl.NumberFormat("pt-BR", {
  style: "decimal",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const dataSource = new DataSource({
  store: new CustomStore({
    key: "pessoa_id",
    load: async function(loadOptions) {
      let params = {};
      params.take = loadOptions.take;
      if (loadOptions.skip === 0) {
        params.skip = 1;
      } else {
        params.skip = loadOptions.skip / loadOptions.take + 1;
      }

      let o = { isLocalizar: true };
      let loc = null;

      if (!loadOptions.localizar) {
        loadOptions.localizar = null;
      } else {
        loc = loadOptions.localizar;
        if (_.has(loc, "sexo")) {
          if (loc.sexo === "") delete loc["sexo"];
          if (_.isNull(loc.sexo)) delete loc["sexo"];
        }
        if (_.has(loc, "estado_civil")) {
          if (loc.estado_civil.length === 0) delete loc["estado_civil"];
        }
        if (_.has(loc, "treinamento_id")) {
          if (loc.treinamento_id.length === 0) delete loc["treinamento_id"];
        }
        if (_.has(loc, "not_treinamento_id")) {
          if (loc.not_treinamento_id.length === 0)
            delete loc["not_treinamento_id"];
        }
      }

      let sort = null;

      if (_.isArray(loadOptions.sort)) {
        sort = true;
        o["sortSelector"] = loadOptions.sort[0].selector;
        o["sortDirection"] = loadOptions.sort[0].desc ? "DESC" : "ASC";
      }

      if (!_.has(loadOptions, "start")) {
        o.nome = "xxx";
        return [];
      }

      if (_.isEmpty(loc)) {
        return [];
      }

      let res = await Service.getLocalizar(loc);

      return res;
    }
  })
});

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxEditing,
    DxPaging,
    DxPager,
    DxSearchPanel,
    DxSelectBox,
    DxButton,
    DxTextBox,
    DxForm,
    DxItem,
    DxSelection,
    DxPopup,
    MyEditorHtml
  },

  async created() {
    console.log("created");
    const treinamentos = await ServiceTreinamento.getTreinamentosIndex({});
    this.treinamentos = treinamentos.data;
  },

  mounted() {
    window.w = this;
  },

  computed: {},

  data() {
    return {
      pattern: /^\(\d{3}\) \d{3}-\d{2}$/i,
      moedaFormat: { type: "currency", precision: 2 },
      malaDireta: {},

      treinamentos: [],

      allMode: "allPages",
      checkBoxesMode: "always",
      paginas: 12,

      selecionados: [],
      selecionadosLista: [],

      emailEditor: null,

      popupVisible: false,

      estado_civil: ["SOLTEIRO", "CASADO", "UNIÃO ESTÁVEL", "DIVOCIADO"],
      sexos: ["MASCULINO", "FEMININO"],

      dataSource: dataSource,
      editButtons: [
        {
          hint: "Editar",
          icon: "edit",
          visible: this.btnEditar,
          onClick: this.onEditClick
        },
        {
          hint: "Excluir",
          icon: "trash",
          visible: true,
          onClick: this.onDeleteClick
        }
      ],
      remoteOperations: {
        sorting: true,
        paging: true
      },
      paging: {
        pageSize: 5
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 15, 20],
        showInfo: true
      },
      key: "nome",
      value: "",
      start: false
    };
  },

  methods: {
    formatMessage: formatMessage,

    onSelectionChanged({ selectedRowKeys, selectedRowsData }) {
      const a = selectedRowKeys;
      const b = selectedRowsData;
      this.selecionados = selectedRowKeys;
      let arr = [];
      selectedRowsData.forEach(e => {
        arr.push({ pessoa_id: e.pessoa_id, pessoa: e.pessoa, email: e.email });
      });
      this.selecionadosLista = arr;
    },

    onLocalizar() {
      let mala = this.malaDireta;
      this.dataSource.loadOptions()["localizar"] = mala;
      this.dataSource.loadOptions()["start"] = true;
      this.dataSource.reload();
    },

    onEditarEmail() {
      this.popupVisible = !this.popupVisible;
    }
  }
};
</script>

<style scoped>
.long-title h3 {
  font-family: "Segoe UI Light", "Helvetica Neue Light", "Segoe UI",
    "Helvetica Neue", "Trebuchet MS", Verdana;
  font-weight: 200;
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
}

.right-side {
  position: absolute;
  right: 1px;
  top: 6px;
}

.right-add {
  position: absolute;
  right: 15px;
  top: 12px;
}

.left-side {
  display: flex;
  flex-wrap: wrap;
}

.options {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  position: relative;
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 10px;
}

.checkboxes-mode {
  position: absolute;
  right: 20px;
  bottom: 20px;
}

.option > .dx-selectbox {
  width: 150px;
  display: inline-block;
  vertical-align: middle;
}

.option > span {
  margin-right: 10px;
}
</style>
