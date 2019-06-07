<template>
  <div
    class="home-view dx-content-background"
    data-options="dxContent : { targetPlaceholder: 'content' } "
  >
    <h2 class="content-block">Cadastro de Eventos</h2>

    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <dx-validation-group>
          <dx-tab-panel :items="tabs" :deferRendering="false">
            <div slot="tab1" slot-scope="_">
              <div class="bloco">
                <div class="row">
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <div class="box">
                      <span style="margin-left:6px;">Nome *</span>
                      <div class="dx-field">
                        <dx-text-box value v-model="evento.nome">
                          <dx-validator :validationRules="validationRules.nome">
                            <dx-string-length-rule
                              :min="3"
                              message="O nome do evento deve conter pelo menos 3 dígitos."
                            />
                          </dx-validator>
                        </dx-text-box>
                      </div>
                    </div>
                  </div>

                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <span style="margin-left:6px;">Status *</span>
                    <div class="dx-field">
                      <dx-select-box
                        :items="statusList"
                        :show-clear-button="true"
                        placeholder="Selecione"
                        :disabled="false"
                        :searchEnabled="true"
                        v-model="evento.status"
                      >
                        <dx-validator>
                          <dx-required-rule message="Informe o status do evento."/>
                        </dx-validator>
                      </dx-select-box>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <span style="margin-left:6px;">Treinamento *</span>
                    <div class="dx-field">
                      <dx-select-box
                        :items="treinametoList"
                        :show-clear-button="true"
                        placeholder="Selecione"
                        :disabled="false"
                        display-expr="nome"
                        value-expr="id"
                        :searchEnabled="true"
                        v-model="evento.treinamento_id"
                      >
                        <dx-validator>
                          <dx-required-rule message="Informe o nome do treinamento."/>
                        </dx-validator>
                      </dx-select-box>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <span style="margin-left:6px;">Local *</span>
                    <div class="dx-field">
                      <dx-select-box
                        :items="localList"
                        :show-clear-button="true"
                        placeholder="Selecione"
                        :disabled="false"
                        display-expr="nome"
                        value-expr="id"
                        :searchEnabled="true"
                        v-model="evento.local_id"
                      >
                        <dx-validator>
                          <dx-required-rule message="Informe o local do evento"/>
                        </dx-validator>
                      </dx-select-box>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <span style="margin-left:6px;">Início *</span>
                    <div class="dx-field">
                      <dx-date-box :value="evento.dInicio" type="datetime" v-model="evento.dInicio">
                        <dx-validator>
                          <dx-required-rule message="Informe a data de início do evento"/>
                        </dx-validator>
                      </dx-date-box>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <span style="margin-left:6px;">Término *</span>
                    <div class="dx-field">
                      <dx-date-box
                        :value="evento.dTermino"
                        type="datetime"
                        v-model="evento.dTermino"
                      >
                        <dx-validator>
                          <dx-required-rule message="Informe a data de término do evento"/>
                        </dx-validator>
                      </dx-date-box>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12">
                    <span style="margin-left:6px;">Anotações</span>
                    <div class="dx-field">
                      <dx-text-area :minHeight="80" :value.sync="evento.obs"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div slot="tab2" slot-scope="_">
              <div class="content1">
                <div class="dx-card-personalizado">
                  <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <span
                        style="margin-left:6px;color:red;"
                      >Mostrar este evento no web site para venda? *</span>
                      <div class="dx-field">
                        <dx-select-box
                          :items="siteExibirList"
                          :show-clear-button="true"
                          placeholder="Selecione"
                          :disabled="false"
                          :searchEnabled="true"
                          v-model="evento.siteExibir"
                        >
                          <dx-validator>
                            <dx-required-rule
                              message="Informar se este evento deve ser mostrado no web site."
                            />
                          </dx-validator>
                        </dx-select-box>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <div class="box">
                        <span style="margin-left:6px;">Investimento *</span>
                        <div class="dx-field">
                          <dx-number-box value v-model="evento.valorBase" format="R$ #,##0.##">
                            <dx-validator>
                              <dx-required-rule
                                message="Informe o valor de investimento deste evento."
                              />
                              <dx-range-rule
                                :min="1"
                                message="Informe o valor de investimento deste evento."
                              />
                            </dx-validator>
                          </dx-number-box>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <div class="box">
                        <span style="margin-left:6px;">Nome do Evento *</span>
                        <div class="dx-field">
                          <dx-text-box value v-model="evento.siteEvento">
                            <dx-validator>
                              <dx-required-rule
                                message="Informe o nome evento que será exibido no web site."
                              />
                            </dx-validator>
                          </dx-text-box>
                        </div>
                      </div>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <span style="margin-left:6px;">Parcelamento permitido *</span>
                      <div class="dx-field">
                        <dx-select-box
                          :items="exibirParcelamentoList"
                          :show-clear-button="true"
                          placeholder="Selecione"
                          :disabled="false"
                          display-expr="nome"
                          value-expr="id"
                          :searchEnabled="true"
                          v-model="evento.siteParcelas"
                        >
                          <dx-validator>
                            <dx-required-rule
                              message="Informe o máximo de parcelas permitidas no web site."
                            />
                          </dx-validator>
                        </dx-select-box>
                      </div>
                    </div>
                  </div>
                </div>

                <div style="margin-left: 12px;">
                  <h5>Informe os detalhes do evento.</h5>
                </div>
                <div style="margin-top: -15px;">
                  <dx-html-editor
                    :height="300"
                    v-on:input="$emit('input', $event.target.value)"
                    :value.sync="evento.siteDetalhes"
                    v-model="evento.siteDetalhes"
                  >
                    <dx-toolbar>
                      <dx-item format-name="undo"/>
                      <dx-item format-name="redo"/>
                      <dx-item format-name="separator"/>
                      <dx-item :format-values="sizeValues" format-name="size"/>
                      <dx-item :format-values="fontValues" format-name="font"/>
                      <dx-item format-name="separator"/>
                      <dx-item format-name="bold"/>
                      <dx-item format-name="italic"/>
                      <dx-item format-name="strike"/>
                      <dx-item format-name="underline"/>
                      <dx-item format-name="separator"/>
                      <dx-item format-name="alignLeft"/>
                      <dx-item format-name="alignCenter"/>
                      <dx-item format-name="alignRight"/>
                      <dx-item format-name="alignJustify"/>
                      <dx-item format-name="separator"/>
                      <dx-item format-name="color"/>
                      <dx-item format-name="background"/>
                    </dx-toolbar>
                  </dx-html-editor>
                </div>
              </div>
            </div>
            <div slot="tab3" slot-scope="_">
              <div v-show="!tabParticipantesEnabled" style="margin: 15px">
                <div class="row center-xs">
                  <div class="col-xs-6">
                    <div class="box">
                      <h3 style="padding:20px">Este evento ainda não foi gravado.</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dx-card responsive-paddings" v-show="tabParticipantesEnabled">
                <div class="row end-xs" style="margin-top:-10px;">
                  <div class="col-xs-10">
                    <dx-button
                      styling-mode="outlined"
                      @click="onAdd()"
                      icon="add"
                      text="adicionar"
                    />
                  </div>
                </div>
                <dx-data-grid
                  id="grid"
                  :ref="gridRefName"
                  :data-source="participantes"
                  keyExpr="id"
                  :show-borders="true"
                  :selection="{ mode: 'single' }"
                  :hover-state-enabled="true"
                  @selection-changed="onSelectionGridChanged"
                  :row-alternation-enabled="true"
                  style="margin-top:8px;"
                >
                  <!--<dx-column
                    :activeStateEnabled="false"
                    :width="110"
                    :allow-sorting="false"
                    data-field="Ações"
                    cell-template="cellTemplate"
                    :allowEditing="false"
                  />-->

                  <dx-column :width="110" :buttons="editButtons" type="buttons"/>

                  <dx-column
                    :width="90"
                    data-field="treinamentoConcluido"
                    caption="Certificado"
                    :calculate-cell-value="treinamentoConcluidoCell"
                  />

                  <dx-column data-field="pessoa.nome" caption="Nome"/>
                  <dx-column
                    :calculate-cell-value="consultorCell"
                    caption="Consultor"
                    alignment="left"
                  ></dx-column>

                  <dx-column
                    :width="90"
                    data-field="pagarConsultor"
                    caption="Pagar?"
                    :calculate-cell-value="pagarConsultorCell"
                  />

                  <dx-column :calculate-cell-value="tipoNegociacaoCell" caption="Negociação"/>
                  <dx-column data-field="parcelas" data-type="number" :width="90"/>
                  <dx-column data-field="total" caption="Valor" :format="moedaFormat"/>

                  <dx-column data-field="status" caption="Status" :width="90"/>

                  <div slot="cellTemplate" slot-scope="data">
                    <dx-button styling-mode="outlined" @click="onUserEditClick(data)" icon="edit"/>
                    <dx-button
                      type="normal"
                      text
                      @click="onParticipanteDeleteClick(data)"
                      icon="trash"
                      style="margin-left:10px;"
                    />
                  </div>

                  <dx-check-box
                    :value="data.text"
                    slot="cell-pagarConsultor"
                    slot-scope="{ data }"
                  />

                  <dx-button slot="cell-city" slot-scope="{ data }" :text="data.text"/>
                  <span slot="tag" slot-scope="{ data }" class="New">{{data.text}}</span>
                </dx-data-grid>
              </div>
            </div>
          </dx-tab-panel>

          <dx-validation-summary/>
          <dx-button
            text="Gravar"
            type="success"
            style="margin-top:15px;"
            tooltip-placement="auto"
            data-toggle="tooltip"
            tooltip="Gravando..."
            @click="validate"
          />
          <dx-button
            text="Cancelar"
            type="normal"
            style="margin-top:15px; margin-left:8px;"
            @click="cancelar"
          />
        </dx-validation-group>
      </div>
    </div>

    <dx-popup
      :visible.sync="popupVisible"
      :drag-enabled="true"
      :close-on-outside-click="true"
      :show-title="true"
      class="popup"
      title="Information"
      titleTemplate="<b>Editar aluno inscrito</b>"
      :fullScreen="popupFullScreen"
      content-template="myContent"
      :maxWidth="isPopupMaxWidth"
      :maxHeight="isPopupMaxHeight"
    >
      <div slot="myContent" slot-scope="data">
        <!-- Your content goes here -->
        <FormParticipante
          :isPopup="true"
          :isTitle="false"
          :tipoNegociacaoList="tipoNegociacaoList"
          @close="popupVisible= $event"
          :evento="evento"
        />
      </div>
      <!--<div class="dx-card responsive-paddings"></div>
      
      <p>Popup content</p>-->
    </dx-popup>
  </div>
</template>



<script>
import notify from "devextreme/ui/notify";
import config from "devextreme/core/config";
import { userKey, baseApiUrl, loading } from "@/global";

let tabDisabled = false;

//import EditorHtml from "../../components/editor/html";
import { DxHtmlEditor, DxToolbar, DxItem } from "devextreme-vue/html-editor";
import {
  DxButtonGroup,
  DxItem as DxButtonGroupItem
} from "devextreme-vue/button-group";

import {
  DxTextArea,
  DxCheckBox,
  DxSelectBox,
  DxDateBox,
  DxNumberBox,
  DxButton,
  DxTextBox
} from "devextreme-vue";
import DxTabPanel from "devextreme-vue/tab-panel";

import {
  DxDataGrid,
  DxColumn,
  DxFilterRow,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSelection
} from "devextreme-vue/data-grid";

import {
  DxValidator,
  DxValidationGroup,
  DxValidationSummary
} from "devextreme-vue";

import {
  DxAdapter,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule
} from "devextreme-vue/validator";

import ServiceEvento from "../../services/Evento";
import ServiceLocal from "../../services/Local";
import ServiceTreinamento from "../../services/Treinamento";

import { DxTooltip } from "devextreme-vue/tooltip";

import DxPopup from "devextreme-vue/popup";

import FormParticipante from "./evento-participante";
//import FormParticipante from "../pessoa/pessoa";

const textBoxRefName = "some-ref-name";

export default {
  components: {
    DxTextBox,
    DxNumberBox,
    DxButton,
    DxDateBox,
    DxValidationGroup,
    DxValidationSummary,
    DxValidator,
    DxAdapter,
    DxEmailRule,
    DxRequiredRule,
    DxTextArea,
    DxCheckBox,
    DxSelectBox,
    DxTabPanel,
    DxHtmlEditor,
    DxToolbar,
    DxItem,
    DxButtonGroup,
    DxButtonGroupItem,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxGrouping,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxSelection,
    DxTooltip,
    FormParticipante,
    DxPopup
  },

  props: ["id2"],

  beforeRouteEnter(to, from, next) {
    loading();
    const id = parseInt(to.params.id);
    console.log("evento id==== ", id);
    if (!id || id === -1) {
      console.log("ID NÃO encontrado... ");
      ServiceEvento.getNovo()
        .then(r => {
          next(vm => {
            vm.tabParticipantesEnabled = false;
            vm.localList = r[0].data;
            vm.treinametoList = r[1].data;
            vm.tipoNegociacaoList = r[2];
            vm.novoRegistro();
            return true;
          });
          loading();
        })
        .catch(error => {
          loading();
          next(false);
          return;
        });

      /*return next(vm => {
        vm.novoRegistro();
        vm.tabParticipantesEnabled = id > 0 ? true : false;
      });*/
    } else {
      console.log("ID encontrado... ");
      ServiceEvento.get(id)
        .then(r => {
          next(vm => {
            vm.tabParticipantesEnabled = id > 0 ? true : false;
            console.log("route ", r);
            vm.evento = r[0];
            let participantes = r[3].data;
            participantes.map(e => {
              e.pagarConsultor =
                parseInt(e.pagarConsultor) === 1 ? true : false;
              e.treinamentoConcluido =
                parseInt(e.treinamentoConcluido) === 1 ? true : false;
            });
            vm.participantes = participantes;

            vm.treinametoList = r[2].data;
            vm.localList = r[1].data;
            vm.tipoNegociacaoList = r[4].data;
            return true;
          });
          loading();
        })
        .catch(error => {
          loading();
          next(false);
        });
    }
  },

  mounted() {
    window.app = this;
  },

  data: function() {
    return {
      id: this.$route.params.id,
      popupVisible: false,
      popupFullScreen: false,
      isPopupMaxWidth: "900",
      isPopupMaxHeight: "450",
      gridRefName: "grid",
      selectedRowIndex: -1,
      animationConfig: {
        show: {
          type: "slide",
          from: {
            top: -100,
            opacity: 0
          },
          to: {
            top: 0,
            opacity: 1
          }
        },
        hide: {
          type: "pop",
          from: {
            scale: 1,
            opacity: 1
          },
          to: {
            scale: 0.1,
            opacity: 0
          }
        }
      },
      editButtons: [
        {
          hint: "Editar",
          icon: "edit",
          visible: true,
          onClick: this.onParticipanteEditClick
        },
        {
          hint: "Excluir",
          icon: "trash",
          visible: true,
          onClick: this.onParticipanteDeleteClick
        },
        {
          hint: "Clone",
          icon: "repeat",
          visible: this.isCloneIconVisible,
          onClick: this.cloneIconClick
        }
      ],
      moedaFormat: { format: "currency", precision: 2 },
      tabParticipantesEnabled: false,
      tabs: [
        { title: "Informações", template: "tab1" },
        { title: "Site", template: "tab2" },
        {
          title: "Participantes",
          template: "tab3"
        }
      ],
      validationRules: {
        nome: [{ type: "required", message: "Informe o nome do evento." }]
      },
      sizeValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"],
      fontValues: [
        "Arial",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Tahoma",
        "Times New Roman",
        "Verdana"
      ],
      evento: { siteDetalhes: "", valorBase: 0.0, percentConsultor: 0.0 },
      treinametoList: [],
      localList: [],
      statusList: ["ATIVO", "INATIVO"],
      siteExibirList: ["SIM", "NÃO"],
      tipoNegociacaoList: [],
      exibirParcelamentoList: [
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
      participantes: [],
      columns: ["nome", "status", "State", "Phone", "Fax"]
    };
  },

  methods: {
    setFocus: function() {
      this.textBox.focus();
    },

    novoRegistro() {
      console.log("metodo novoRegistro ");
      const o = {
        dInicio: null,
        dTermino: null,
        nome: "",
        siteEvento: null,
        siteDetalhes: "",
        siteExibir: null,
        siteParcelas: 0,
        valorBase: 0.0,
        status: "",
        participantes: null,
        local: null,
        treinamento: null,
        treinamento_id: null,
        local_id: null,
        obs: null
      };

      this.participantes = [];
      this.evento = o;
    },

    onSelectionGridChanged(e) {
      /* Item selecionado no grid participantes */
      //const data = selectedRowsData[0];
      this.selectedRowIndex = e.component.getRowIndexByKey(
        e.selectedRowKeys[0]
      );
      //console.log('selecionei key ', this.selectedRowIndex )

      //console.log('selecionei ', data)
    },

    consultorCell(data) {
      const consultor = data.consultor;

      if (consultor) return consultor.nome;
      return "";
    },

    pagarConsultorCell(data) {
      return data.pagarConsultor ? "SIM" : "NÃO";
    },

    tipoNegociacaoCell(data) {
      const id = data.tipoNegociacao_id;
      let res = "-";
      this.tipoNegociacaoList.map(e => {
        if (e.id === id) res = e.nome;
      });
      return res;
    },

    treinamentoConcluidoCell(data) {
      return data.treinamentoConcluido ? "SIM" : "NÃO";
    },

    onAdd() {
      this.evento = {
        consultor_id: null,
        evento_id: null,
        pessoa_id: null,
        status: null,
        tipoNegociacao_id: null,
        total: 0.0,
        treinamentoConcluido: false,
        parcelas: 0,
        pagarConsultor: false,
        percentConsultor: 0.0,
        valorConsultor: 0.0
      };
      this.popupVisible = !this.popupVisible;
    },

    onParticipanteEditClick(item) {
      console.log(item);
      console.log("editaar ", item.row.data);
      const id = item.row.data.id;
      this.evento = _.cloneDeep(item.row.data);
      this.popupVisible = !this.popupVisible;

      //this.$router.push({ name: "treinamento", params: { id } });
    },

    onParticipanteDeleteClick(item) {
      const id = item.row.data.id;

      this.$nextTick(function() {
        let result = confirm("<i>Confirma exclusão?</i>", "Confirmação");
        result.then(dialogResult => {
          console.log(dialogResult);
          if (!dialogResult) {
            return false;
          }
          loading();
          Service.deleteTreinamento(id)
            .then(res => {
              loading();
              this.dataSource.reload();
              const message = "Excluído com sucesso";
              notify(message, "success", 1000);
            })
            .catch(error => {
              loading();
              if (_.isArray(error)) {
                error.forEach(i => {
                  notify(i.message, "error", 2000);
                });
              } else {
                notify(error, "error", 6000);
              }
            });
        });
      });
    },

    validate(params) {
      console.log("validando... ");
      console.log(params);
      const result = params.validationGroup.validate();
      if (result.isValid) {
        // form data is valid
        //params.validationGroup.reset();
        console.log("passou na validação");
      } else {
        console.log("falhou na validação");
      }
    },

    cancelar() {
      this.$router.push({ name: "eventos" });
    }
  },

  computed: {
    textBox: function() {
      return this.$refs[textBoxRefName].instance;
    },
    grid: function() {
      return this.$refs[this.gridRefName].instance;
    },
    screen: function() {
      let tam = this.$store.getters["common/screen"];
      return tam;
    }
  },

  watch: {
    screen: function(tam) {
      if (tam.isSmall || tam.isXSmall) {
        this.isPopupMaxWidth = "2000";
        this.isPopupMaxHeight = "2000";
        this.popupFullScreen = true;
      } else {
        this.popupFullScreen = false;
        this.isPopupMaxWidth = "900";
        this.isPopupMaxHeight = "450";
      }
    },
    id: function(e) {
      this.tabParticipantesEnabled = parseInt(this.id) > 0 ? true : false;
      this.tabs[2].disabled = this.tabParticipantesEnabled;
    }
  }
};
</script>

<style>
.bloco {
  padding: 15px;
}

.dx-card-personalizado {
  margin-top: 18px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 0px;
}

.dx-field-label1 {
  float: left;
  width: 10%;
}

.dx-field-value1 {
  width: 90% !important;
}

.dx-htmleditor-content img {
  vertical-align: middle;
  padding-right: 10px;
}

.value-content {
  margin-top: 20px;
  overflow: auto;
  height: 110px;
  width: 100%;
  white-space: pre-wrap;
}

.options {
  margin-top: 20px;
  padding: 20px;
  background-color: rgba(191, 191, 191, 0.15);
  box-sizing: border-box;
  width: 100%;
}

.right-add {
  position: absolute;
  right: 15px;
  top: 12px;
}

.New {
  content: "New";
  background-color: #f05b41;
}
</style>
