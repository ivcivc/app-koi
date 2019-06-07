    
<template>
  <div>
    <h2 class="content-block">Cadastro de Evento</h2>

    <div class="right-id" v-if="id">ID # {{id}}</div>

    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <form action="post" @submit="handleSubmit">
          <dx-tab-panel :items="tabs">
            <div slot="tab1" slot-scope="_">
              <div class="dx-card responsive-paddings">
                <dx-form
                  :colCount="2"
                  :formData="evento"
                  validation-group="eventoData"
                  label-location="top"
                >
                  <dx-simple-item data-field="nome">
                    <dx-required-rule message="Informe o nome do evento."/>
                  </dx-simple-item>

                  <dx-simple-item
                    data-field="status"
                    editorType="dxSelectBox"
                    :editorOptions="statusList"
                  >
                    <dx-required-rule message="Informe o status do evento."/>
                  </dx-simple-item>

                  <dx-simple-item
                    data-field="treinamento_id"
                    editorType="dxSelectBox"
                    :label="{ text: 'Treinamento' }"
                    :editorOptions="{ hideSelectedItems: true,searchEnabled: true, displayExpr: 'nome',valueExpr: 'id', items: treinamentos, value: ''}"
                    display-expr="nome"
                    value-expr="id"
                  >
                    <dx-required-rule message="Informe o nome do Treinamento"/>
                  </dx-simple-item>

                  <dx-simple-item
                    data-field="local_id"
                    editorType="dxSelectBox"
                    :label="{ text: 'Local' }"
                    :editorOptions="{ hideSelectedItems: true,searchEnabled: true, displayExpr: 'nome',valueExpr: 'id', items: locais, value: ''}"
                    display-expr="nome"
                    value-expr="id"
                  >
                    <dx-required-rule message="Informe o Local do Treinamento"/>
                  </dx-simple-item>

                  <dx-simple-item
                    data-field="dInicio"
                    editorType="dxDateBox"
                    :label="{ text: 'Início' }"
                    :editorOptions="{ disabled: false, width: '100%' }"
                  >
                    <dx-required-rule message="Informe a data de início do treinamento."/>
                  </dx-simple-item>

                  <dx-simple-item
                    data-field="dTermino"
                    editorType="dxDateBox"
                    :label="{ text: 'Término' }"
                    :editorOptions="{ value: null, width: '100%' }"
                  >
                    <dx-required-rule message="Informe a data de término do treinamento."/>
                  </dx-simple-item>

                  <dx-simple-item data-field="Observações" :colSpan="2">
                    <dx-text-area
                      slot-scope="{ data }"
                      :minHeight="80"
                      :value="data.editorOptions.value"
                    />
                  </dx-simple-item>

                  <dx-item :colCount="2" :colSpan="2" item-type="group" caption="Configuração Site">
                    <dx-simple-item
                      editorType="dxSelectBox"
                      data-field="siteAtivar"
                      :editorOptions="exibirSiteList"
                      :label="{ text: 'Mostrar este evento no site?' }"
                      :colSpan="1"
                    >
                      <dx-required-rule message="Informe se o evento será mostrado no web site."/>
                    </dx-simple-item>

                    <dx-simple-item
                      editorType="dxNumberBox"
                      data-field="valorBase"
                      :label="{ text: 'Investimento' }"
                      :colSpan="1"
                      :editorOptions="{ disabled: false, format:'R$ #,##0.##'}"
                    >
                      <dx-required-rule message="Informe o valor do investimento."/>
                      <dx-range-rule :min="1" message="Valor de investimento inválido."/>
                    </dx-simple-item>

                    <dx-simple-item
                      data-field="siteEvento"
                      :label="{ text: 'Nome do Evento' }"
                      editorType="dxTextBox"
                    >
                      <dx-required-rule
                        message="Informe o nome do evento que será mostrado no web site."
                      />
                      <dx-text-box-button :options="nomeButton" name="siteEvento" location="after"/>
                    </dx-simple-item>

                    <dx-simple-item
                      editorType="dxSelectBox"
                      data-field="siteParcelasMax"
                      :editorOptions="exibirParcelamentoList"
                      :label="{ text: 'Parcelamento permitido' }"
                      :colSpan="1"
                    >
                      <dx-required-rule
                        message="Informe a quantidade de parcelas que será mostrada no web site."
                      />
                    </dx-simple-item>

                    <dx-simple-item data-field="Detalhes" :colSpan="2">
                      <dx-text-area
                        slot-scope="{ data }"
                        :minHeight="80"
                        :value="data.editorOptions.value"
                      />
                    </dx-simple-item>
                  </dx-item>

                  <dx-group-item :col-count="1" css-class="first-group">
                    <dx-button-item
                      :button-options="{text: 'Ver', type: 'danger',  useSubmitBehavior: false}"
                      horizontal-alignment="left"
                    ></dx-button-item>
                  </dx-group-item>

                  <dx-item :colCount="12" item-type="group" caption>
                    <dx-button-item
                      :button-options="{text: 'Gravar', type: 'success',  useSubmitBehavior: true}"
                      horizontal-alignment="left"
                    ></dx-button-item>

                    <dx-button-item
                      :button-options="{text: 'Cancelar', type: 'success',  useSubmitBehavior: true}"
                      horizontal-alignment="left"
                    ></dx-button-item>
                  </dx-item>
                </dx-form>
              </div>
            </div>

            <div slot="tab2" slot-scope="_">
              <div class="dx-card responsive-paddings">
                <dx-form
                  :colCount="2"
                  :formData="evento2"
                  validation-group="eventoData2"
                  label-location="top"
                >
                  <dx-simple-item
                    editorType="dxSelectBox"
                    data-field="siteAtivar"
                    :editorOptions="exibirSiteList"
                    :label="{ text: 'Mostrar este evento no site?' }"
                    :colSpan="1"
                  >
                    <dx-required-rule message="Informe se o evento será mostrado no web site."/>
                  </dx-simple-item>

                  <dx-simple-item
                    editorType="dxNumberBox"
                    data-field="valorBase"
                    :label="{ text: 'Investimento' }"
                    :colSpan="1"
                    :editorOptions="{ disabled: false, format:'R$ #,##0.##'}"
                  >
                    <dx-required-rule message="Informe o valor do investimento."/>
                    <dx-range-rule :min="1" message="Valor de investimento inválido."/>
                  </dx-simple-item>

                  <dx-simple-item data-field="siteEvento" :label="{ text: 'Nome do Evento' }">
                    <dx-required-rule
                      message="Informe o nome do evento que será mostrado no web site."
                    />
                  </dx-simple-item>

                  <dx-simple-item
                    editorType="dxSelectBox"
                    data-field="siteParcelasMax"
                    :editorOptions="exibirParcelamentoList"
                    :label="{ text: 'Parcelamento permitido' }"
                    :colSpan="1"
                  >
                    <dx-required-rule
                      message="Informe a quantidade de parcelas que será mostrada no web site."
                    />
                  </dx-simple-item>

                  <dx-simple-item data-field="Detalhes" :colSpan="2">
                    <dx-text-area
                      slot-scope="{ data }"
                      :minHeight="80"
                      :value="data.editorOptions.value"
                    />
                  </dx-simple-item>

                  <dx-item :colCount="1" :colSpan="2" item-type="group" caption="coragem">
                    <dx-tabbed-item :items="tabs">
                      <div slot="tab1" slot-scope="_">
                        <h3>First Tab Content</h3>
                      </div>
                      <div slot="tab2" slot-scope="_">
                        <async-component/>
                      </div>
                    </dx-tabbed-item>
                  </dx-item>
                  <!--<EditorHtml valueContent="oi" @mudou="html= $event"/>
                  -->
                </dx-form>
              </div>
            </div>

            <div slot="tab3" slot-scope="_">
              <div></div>
            </div>
          </dx-tab-panel>

          <!--<dx-tab-panel :items="tabs">
            <div slot="tab1" slot-scope="_">
              <h3>First Tab Content</h3>
            </div>
            <div slot="tab2" slot-scope="_">
              <async-component/>
            </div>
          </dx-tab-panel>-->
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxTextBox,
  DxButton as DxTextBoxButton
} from "devextreme-vue/text-box";

import { DxForm, DxItem } from "devextreme-vue/form";
import { DxTextArea, DxButton } from "devextreme-vue";
import DxTabs from "devextreme-vue/tabs";
import DxTabPanel from "devextreme-vue/tab-panel";

import { userKey, baseApiUrl, loading } from "@/global";

import { DxNumberBox } from "devextreme-vue/number-box";

import notify from "devextreme/ui/notify";

import ServiceEvento from "../../services/Evento";
import ServiceLocal from "../../services/Local";
import ServiceTreinamento from "../../services/Treinamento";

import {
  DxSimpleItem,
  DxTabbedItem,
  DxButtonItem,
  DxRequiredRule,
  DxRangeRule,
  DxGroupItem

  //DxTabs
} from "devextreme-vue/form";
const evento = {
  treinamento_id: 3,
  status: "Heart",
  capacidade: 10,
  dInicio: "1964/03/16",
  dTermino: "1995/01/15",
  local_id: 1,
  obs:
    "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.",
  valorBase: 1.23
};

import EditorHtml from "../../components/editor/html";

import SecondTabComponent from "./example-block";
import { async } from "q";

/*import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";*/

/*const treinamentosDataSource = new DataSource({
  store: new CustomStore({
    key: "id",

    load: function(loadOptions) {
      console.log("dando um load");
      return ServiceTreinamento.getTreinamentosIndex({});
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
        o["sortSelector"] = loadOptions.sort[0].selector;
        o["sortDirection"] = loadOptions.sort[0].desc ? "DESC" : "ASC";
      }

      if (!_.has(loadOptions, "start")) {
        //o.nome = "";
      }

      console.log(o);

      return ServiceTreinamento.getTreinamentosIndex(o);
    }
  })
});*/

/*const dataSource1 = {
  store: new CustomStore({
    load: function(loadOptions) {
      console.log("rodando o data source 1");
      let params = "?";

      params += `skip=${loadOptions.skip}`;
      params += `&take=${loadOptions.take}`;

      if (loadOptions.sort) {
        params += `&orderby=${loadOptions.sort[0].selector}`;
        if (loadOptions.sort[0].desc) {
          params += " desc";
        }
      }
      return Service.getTreinamentosIndex({});
    }
  })
};*/

import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxFilterRow,
  DxPager,
  DxPaging,
  DxSearchPanel
} from "devextreme-vue/data-grid";

//treinamentosDataSource.reload();

export default {
  components: {
    DxForm,
    DxItem,
    DxTextArea,
    DxSimpleItem,
    DxTabbedItem,
    DxButtonItem,
    DxRequiredRule,
    DxRangeRule,
    DxTabs,
    DxTabPanel,
    DxButton,
    DxNumberBox,
    AsyncComponent: () => Promise.resolve(SecondTabComponent),

    DxDataGrid,
    DxColumn,
    DxEditing,
    DxFilterRow,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxGroupItem,
    DxTextBoxButton,
    DxTextBox,

    EditorHtml
  },

  props: ["id"],

  beforeRouteEnter(to, from, next) {
    loading();
    const id = to.params.id;
    console.log("id==== ", id);
    if (!id) {
      loading();
      return next();
    }

    ServiceEvento.get(id)
      .then(r => {
        next(vm => {
          console.log("route ", r);
          vm.evento = r[0];
          vm.treinamentos = r[2].data;
          vm.locais = r[1].data;
          return true;
        });
        loading();
      })
      .catch(error => {
        loading();
        next(false);
      });
  },

  created() {
    console.log("criando componente.....");
    window.store = this.$store;
    //let treinamentos = ServiceTreinamento.getTreinamentosIndex({});
    /*treinamentos.then(r => console.log(r.data));
    
    this.$store
      .dispatch("treinamento/index")
      .then(r => console.log("retornei ", r));*/
  },

  mounted() {
    //treinamentos = this.treinamentos;
    //window.rr = this.treinamentosDataSource;
    //window.rr2 = this.dataSource1;
    //this.treinamentosDataSource.reload();
  },

  watch: {
    treinamentos: function(e) {
      console.log("wath ", e);
      /*this.treinamentosList.items = null;
      this.treinamentosList.items = e;*/
    }
  },

  computed: {},

  data() {
    console.log("data() rodando.... ");
    return {
      evento,

      evento2: { text: "oi" },

      html: "<h1>oi<h1>",
      editor: "",

      treinamentos: [],
      locais: [],

      tabs: [
        { title: "Informações", template: "tab1" },
        { title: "Site", template: "tab2" },
        { title: "Participantes", template: "tab3" }
      ],

      statusList: {
        hideSelectedItems: true,
        searchEnabled: true,
        items: ["ATIVO", "INATIVO"],
        value: "INATIVO"
      },

      exibirSiteList: {
        hideSelectedItems: true,
        searchEnabled: true,
        items: ["SIM", "NÃO"],
        value: "NÃO"
      },

      exibirParcelamentoList: {
        hideSelectedItems: true,
        searchEnabled: true,
        displayExpr: "nome",
        valueExpr: "id",
        items: [
          { id: 1, nome: "1 parcela" },
          { id: 2, nome: "2 parcelas" },
          { id: 3, nome: "3 parcelas" },
          { id: 4, nome: "4 parcelas" },
          { id: 5, nome: "5 parcelas" },
          { id: 6, nome: "6 parcelas" },
          { id: 7, nome: "7 parcelas" },
          { id: 8, nome: "8 parcelas" },
          { id: 9, nome: "9 parcelas" },
          { id: 10, nome: "10 parcelas" },
          { id: 11, nome: "11 parcelas" },
          { id: 12, nome: "12 parcelas" }
        ],
        value: "NÃO"
      },

      /*treinamentosList3: {
        hideSelectedItems: true,
        searchEnabled: true,
        displayExpr: "nome",
        valueExpr: "id",
        items: this.treinamentos,
        value: ""
      },*/

      groupedItems: {
        contactInformation: [
          {
            itemType: "tabbed",
            tabPanelOptions: {
              deferRendering: false
            },
            tabs: [
              {
                title: "Phone",
                items: ["Phone"]
              },
              {
                title: "Skype",
                items: ["Skype"]
              },
              {
                title: "Email",
                items: ["Email"]
              }
            ]
          }
        ]
      },

      nomeButton: {
        icon: "images/icons/eye.png",
        type: "default",
        onClick: () => {
          this.passwordMode =
            this.passwordMode === "text" ? "password" : "text";
        }
      }
    };
  },

  methods: {
    setFocus: function() {
      this.textBox.focus();
    },

    handleSubmit(e) {
      e.preventDefault();
      console.log("submit ");
      notify(
        {
          message: "You have submitted the form",
          position: {
            my: "center top",
            at: "center top"
          }
        },
        "success",
        3000
      );
    }
  }
};
</script>


<style>
.dx-field-item-required-mark {
  color: #ea4444;
}
</style>