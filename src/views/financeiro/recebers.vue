<template>
  <div>
    <h2 class="content-block">Localizar Recebimentos</h2>

    <div class="content-block" id="bloco1">
      <div class="dx-card responsive-paddings">
        <div class="left-side">
          <div class="dx-field-label" style="width:110px;">LOCALIZAR:</div>
          <dx-select-box
            :data-source="fields"
            :value="fields[0].key"
            value-expr="key"
            display-expr="text"
            v-model="key"
          />
          <dx-text-box v-model="value" style="margin-left:6px;" />
          <dx-button text="Localizar" @click="onLocalizar" style="margin-left:6px;" />
        </div>

        <div class="right-add">
          <dx-button styling-mode="outlined" @click="onAdd()" icon="add" text="adicionar" />
        </div>

        <dx-data-grid
          :data-source="dataSource"
          :selection="{ mode: 'single' }"
          :hover-state-enabled="true"
          :remote-operations="remoteOperations"
          :paging="paging"
          :pager="pager"
          key-expr="id"
          style="margin-top:15px;"
          :show-borders="true"
        >
          <!--<dx-paging :page-size="page"/>
            <dx-pager :show-page-size-selector="true" :allowed-page-sizes="pageSizes" :show-info="true"/>
          <dx-editing :allow-updating="true" :popup="{width:700, height:345}" mode="popup"/>-->
          <dx-filter-row :visible="false" apply-filter="auto" />

          <dx-column caption="Ações" :width="110" :buttons="editButtons" type="buttons" />

          <dx-column caption="Nome" data-field="receber.pessoa.nome" />
          <dx-column caption="Vencimento" data-type="date" data-field="payDay" />
          <dx-column caption="Desconto" data-field="desconto" :format="moedaFormat" />
          <dx-column caption="Valor" data-field="value" :format="moedaFormat" />
          <!--<dx-column caption="Status" data-field="status" />-->
          <dx-column caption="Status" cell-template="cellTemplate" :allowEditing="false" />

          <div slot="cellTemplate" slot-scope="data">
            <span>{{statusGrid(data)}}</span>
          </div>
        </dx-data-grid>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { userKey, baseApiUrl, loading } from "@/global";
import { confirm } from "devextreme/ui/dialog";

import Service from "../../services/Receber";
import notify from "devextreme/ui/notify";

import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxFilterRow,
  DxPager,
  DxPaging,
  DxSearchPanel
} from "devextreme-vue/data-grid";

import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";

import { locale, loadMessages, formatMessage } from "devextreme/localization";

import { DxSelectBox } from "devextreme-vue";
import { DxButton, DxTextBox } from "devextreme-vue";

const dataSource = new DataSource({
  store: new CustomStore({
    key: "id",
    load: function(loadOptions) {
      let params = {};
      params.take = loadOptions.take;
      if (loadOptions.skip === 0) {
        params.skip = 1;
      } else {
        params.skip = loadOptions.skip / loadOptions.take + 1;
      }

      let o = { isLocalizar: true };

      if (!loadOptions.localizar) {
        loadOptions.localizar = null;
      } else {
        let key = loadOptions.localizar.key;
        let value = loadOptions.localizar.value;
        if (value) {
          o[key] = value;
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
      }

      let res = Service.getReceberItemsIndex(o);

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
    DxTextBox
  },

  created() {},

  mounted() {
    window.w = this;
  },

  computed: {
    statusTransaction() {
      const status = this.$store.getters["transaction/statusTransactions"];
      return status;
    }
  },

  data() {
    return {
      pattern: /^\(\d{3}\) \d{3}-\d{2}$/i,
      moedaFormat: { type: "currency", precision: 2 },
      recebers: [],
      fields: [{ key: "nome", text: "NOME" }, { key: "cpf", text: "CPF" }],
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

    onAdd() {
      this.$router.push({ path: "/receber/-1", params: { id: -1 } });
    },

    onLocalizar() {
      let key = this.key;
      let value = this.value;
      this.dataSource.loadOptions()["localizar"] = { key, value };
      this.dataSource.loadOptions()["start"] = true;
      this.dataSource.reload();
    },

    onEditClick(item) {
      const id = item.row.data.receber_id;
      this.$router.push({ path: "/receber/" + id, params: { id } });
    },

    onDeleteClick(item) {
      this.$nextTick(function() {
        let result = confirm(
          "<div style='margin-left:15px!important;margin-right:15px!important;'><i>Confirma exclusão do registro selecionado?</i></div>",
          "Confirmação"
        );
        result.then(dialogResult => {
          if (!dialogResult) {
            return false;
          }
          loading();

          const id = item.row.data.id;

          Service.deletePessoa(id)
            .then(r => {
              loading();
              const message = "Excluído com sucesso";
              const position = {
                at: "center center",
                of: "#bloco1"
              };
              notify(
                {
                  message: message,
                  position,
                  width: 300,
                  shading: true
                },
                "error",
                5000
              );
              this.dataSource.reload();
            })
            .catch(error => {
              loading();
              if (_.isArray(error)) {
                error.forEach(i => {
                  const position = {
                    at: "center center",
                    of: "#bloco1"
                  };
                  notify(
                    {
                      message: i.message,
                      position,
                      width: 300,
                      shading: true
                    },
                    "error",
                    3000
                  );
                });
              } else {
                console.log("error ", error);
                const position = {
                  at: "center center",
                  of: "#bloco1"
                };
                notify(
                  {
                    message: error,
                    position,
                    width: 300,
                    shading: true
                  },
                  "error",
                  5000
                );
              }
            });
        });
      });
    },

    optionChanged(e) {
      console.log("optionChanged= ", e);
    },

    statusGrid(item) {
      const status = item.data.data.status;
      const o = this.lodash.find(this.statusTransaction, { name: status });
      if (o) {
        return o.displayName;
      }
      return status;
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
</style>
