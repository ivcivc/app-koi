<template>
  <div>
    <h2 class="content-block">Localizar Eventos</h2>

    <div class="content-block" id="bloco1">
      <div class="dx-card responsive-paddings">
        <div class="left-side">
          <div class="dx-field-label" style="width:85px;">INFORME:</div>
          <dx-select-box
            :data-source="fields"
            :value="fields[0].key"
            :selection="{ mode: 'single' }"
            value-expr="key"
            display-expr="text"
            :paging="paging"
            :pager="pager"
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

          <!--<dx-column
            :activeStateEnabled="false"
            :width="110"
            :allow-sorting="false"
            data-field="Ações"
            cell-template="cellTemplate"
            :allowEditing="false"
          />-->

          <dx-column caption="Ações" :width="110" :buttons="editButtons" type="buttons" />

          <dx-column caption="Nome" data-field="nome" />
          <dx-column caption="Local" data-field="local.nome" :allow-sorting="false" />
          <dx-column caption="Início" data-field="dInicio" data-type="date" />
          <dx-column caption="Término" data-field="dTermino" data-type="date" />
          <dx-column caption="Status" data-field="status" />

          <div slot="cellTemplate" slot-scope="data">
            <dx-button styling-mode="outlined" @click="onEditClick(data)" icon="edit" />
            <dx-button
              type="normal"
              text
              @click="onDeleteClick(data)"
              icon="trash"
              style="margin-left:10px;"
            />
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

import { DxSelectBox } from "devextreme-vue";
import { DxButton, DxTextBox } from "devextreme-vue";

import Service from "../../services/Evento";
import notify from "devextreme/ui/notify";

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

      o.page = params.skip;
      o.take = params.take;

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
        o["sortSelector"] = loadOptions.sort[0].selector;
        o["sortDirection"] = loadOptions.sort[0].desc ? "DESC" : "ASC";
      }

      if (!_.has(loadOptions, "start")) {
        o.nome = "xxx";
      }

      return Service.getEventosIndex(o);
    }
  })
});

window.ds = dataSource;

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
    window.app = this;
  },

  data() {
    return {
      pattern: /^\(\d{3}\) \d{3}-\d{2}$/i,
      moedaFormat: {
        type: "currency",
        precision: 2
      },
      eventos: [],
      btnEditar: true,
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
      fields: [
        { key: "nome", text: "NOME" },
        { key: "status", text: "STATUS" }
      ],
      dataSource: dataSource,
      remoteOperations: {
        sorting: true,
        paging: true
      },
      paging: {
        pageSize: 10
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [5, 15, 20, 25, 30],
        showInfo: true
      },
      key: "nome",
      value: "",
      start: false
    };
  },

  methods: {
    //formatMessage: formatMessage,

    /*initMessages() {
            loadMessages(ptMessages);
        },   */

    onAdd() {
      this.$router.push({ path: "/evento/-1", params: { id: -1 } });
    },

    onLocalizar() {
      let key = this.key;
      let value = this.value;
      this.dataSource.loadOptions()["localizar"] = { key, value };
      this.dataSource.loadOptions()["start"] = true;
      this.dataSource.reload();
    },

    onEditClick(item) {
      console.log("editaar ", item.row.data);
      const id = item.row.data.id;
      console.log("ID ", id);
      this.$router.push({ path: "/evento/" + id, params: { id } });
    },

    onDeleteClick(item) {
      const id = item.row.data.id;

      this.$nextTick(function() {
        let result = confirm(
          "<div style='margin-left:15px!important;margin-right:15px!important;'><p>Confirma a exclusão do evento selecionado?</p></div>",
          "  Confirmação"
        );
        result.then(dialogResult => {
          console.log(dialogResult);
          if (!dialogResult) {
            return false;
          }
          loading();
          Service.deleteEvento(id)
            .then(res => {
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
                "success",
                2000
              );
              this.onLocalizar();
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
                    4000
                  );
                });
              } else {
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
                  4000
                );
              }
            });
        });
      });
    },

    optionChanged(e) {
      console.log("optionChanged= ", e);
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
