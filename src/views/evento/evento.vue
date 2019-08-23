<template>
  <div
    class="home-view dx-content-background"
    data-options="dxContent : { targetPlaceholder: 'content' } "
  >
    <h2 class="content-block">Cadastro de Evento</h2>

    <div class="content-block" id="bloco1">
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
                          <dx-required-rule message="Informe o status do evento." />
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
                          <dx-required-rule message="Informe o nome do treinamento." />
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
                          <dx-required-rule message="Informe o local do evento" />
                        </dx-validator>
                      </dx-select-box>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <span style="margin-left:6px;">Início *</span>
                    <div class="dx-field">
                      <dx-date-box :value="evento.dInicio" type="date" v-model="evento.dInicio">
                        <dx-validator>
                          <dx-required-rule message="Informe a data de início do evento" />
                        </dx-validator>
                      </dx-date-box>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <span style="margin-left:6px;">Término *</span>
                    <div class="dx-field">
                      <dx-date-box :value="evento.dTermino" type="date" v-model="evento.dTermino">
                        <dx-validator>
                          <dx-required-rule message="Informe a data de término do evento" />
                        </dx-validator>
                      </dx-date-box>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-12">
                    <span style="margin-left:6px;">Anotações</span>
                    <div class="dx-field">
                      <dx-text-area :minHeight="80" :value.sync="evento.obs" />
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
                        style="margin-left:6px;color:blue;"
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

                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                      <div class="box">
                        <span style="margin-left:6px;">Link da imagem *</span>
                        <div class="dx-field">
                          <dx-text-box value v-model="evento.siteLink"></dx-text-box>
                        </div>
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
                      <dx-item format-name="undo" />
                      <dx-item format-name="redo" />
                      <dx-item format-name="separator" />
                      <dx-item :format-values="sizeValues" format-name="size" />
                      <dx-item :format-values="fontValues" format-name="font" />
                      <dx-item format-name="separator" />
                      <dx-item format-name="bold" />
                      <dx-item format-name="italic" />
                      <dx-item format-name="strike" />
                      <dx-item format-name="underline" />
                      <dx-item format-name="separator" />
                      <dx-item format-name="alignLeft" />
                      <dx-item format-name="alignCenter" />
                      <dx-item format-name="alignRight" />
                      <dx-item format-name="alignJustify" />
                      <dx-item format-name="separator" />
                      <dx-item format-name="color" />
                      <dx-item format-name="background" />
                      <dx-item format-name="separator" />
                      <dx-item format-name="link" />
                      <dx-item format-name="image" />
                    </dx-toolbar>
                  </dx-html-editor>
                </div>
              </div>
            </div>
            <div slot="tab3" slot-scope="_">
              <div class="content1">
                <div class="dx-card-personalizado">
                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                      <div style="margin-left:6px;color:black;margin-bottom:5px;">
                        <span>
                          <b>Email de boas vindas</b>
                        </span>
                      </div>
                    </div>

                    <div class="col-xs-9 col-sm-9 col-md-9">
                      <dx-text-box
                        value
                        v-model="evento.emailBoasVindasTitulo"
                        placeholder="Informe o título do email"
                        :editorOptions="{ value: null, width: '100%' }"
                      ></dx-text-box>
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12">
                      <div style="margin-top: 5px;">
                        <dx-html-editor
                          :height="260"
                          v-on:input="$emit('input', $event.target.value)"
                          :value.sync="evento.emailBoasVindas"
                          v-model="evento.emailBoasVindas"
                          id="editor"
                        >
                          <dx-toolbar>
                            <dx-item format-name="undo" />
                            <dx-item format-name="redo" />
                            <dx-item format-name="separator" />
                            <dx-item :format-values="sizeValues" format-name="size" />
                            <dx-item :format-values="fontValues" format-name="font" />
                            <dx-item format-name="separator" />
                            <dx-item format-name="bold" />
                            <dx-item format-name="italic" />
                            <dx-item format-name="strike" />
                            <dx-item format-name="underline" />
                            <dx-item format-name="separator" />
                            <dx-item format-name="alignLeft" />
                            <dx-item format-name="alignCenter" />
                            <dx-item format-name="alignRight" />
                            <dx-item format-name="alignJustify" />
                            <dx-item format-name="separator" />
                            <dx-item format-name="color" />
                            <dx-item format-name="background" />
                            <dx-item format-name="separator" />
                            <dx-item format-name="link" />
                            <dx-item format-name="image" />
                          </dx-toolbar>
                        </dx-html-editor>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12">
                      <div style="margin-left:6px;color:black;margin-bottom:5px;margin-top:10px;">
                        <span>
                          <b>Email Informativo</b>
                        </span>
                      </div>
                    </div>

                    <div class="col-xs-6 col-sm-6 col-md-6">
                      <dx-text-box
                        value
                        v-model="evento.emailInformativoTitulo"
                        placeholder="Informe o título do email"
                        :editorOptions="{ value: null, width: '100%' }"
                      ></dx-text-box>
                    </div>
                    <div class="col-xs-3 col-sm-3 col-md-3">
                      <dx-text-box
                        value
                        v-model="evento.emailInformativoTitulo"
                        placeholder="Disparo"
                        :disabled="true"
                        :editorOptions="{ value: null, width: '100%' }"
                      ></dx-text-box>
                    </div>
                    <div class="col-xs-4 col-sm-3 col-md-3">
                      <dx-button
                        styling-mode="outlined"
                        @click="onDispararEmailInformativo()"
                        icon="email"
                        text="Disparar"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-12 col-md-12">
                      <div style="margin-top: 5px;">
                        <dx-html-editor
                          :height="260"
                          v-on:input="$emit('input', $event.target.value)"
                          :value.sync="evento.emailInformativo"
                          v-model="evento.emailInformativo"
                          id="editor2"
                        >
                          <dx-toolbar>
                            <dx-item format-name="undo" />
                            <dx-item format-name="redo" />
                            <dx-item format-name="separator" />
                            <dx-item :format-values="sizeValues" format-name="size" />
                            <dx-item :format-values="fontValues" format-name="font" />
                            <dx-item format-name="separator" />
                            <dx-item format-name="bold" />
                            <dx-item format-name="italic" />
                            <dx-item format-name="strike" />
                            <dx-item format-name="underline" />
                            <dx-item format-name="separator" />
                            <dx-item format-name="alignLeft" />
                            <dx-item format-name="alignCenter" />
                            <dx-item format-name="alignRight" />
                            <dx-item format-name="alignJustify" />
                            <dx-item format-name="separator" />
                            <dx-item format-name="color" />
                            <dx-item format-name="background" />
                            <dx-item format-name="separator" />
                            <dx-item format-name="link" />
                            <dx-item format-name="image" />
                          </dx-toolbar>
                        </dx-html-editor>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div slot="tab4" slot-scope="_">
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
                <div class="row end-xs" style="margin-top:-23px;">
                  <div class="col-xs-4">
                    <span>À VISTA: R$ {{numero(evento.valorBaseAVista)}}</span>
                  </div>
                  <div class="col-xs-4">
                    <span>À PRAZO: R$ {{numero(evento.valorBase)}}</span>
                  </div>
                  <div class="col-xs-4">
                    <dx-button
                      styling-mode="outlined"
                      @click="onAddParticipante()"
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

                  <dx-column caption="Ações" :width="80" :buttons="editButtons" type="buttons" />

                  <dx-column
                    data-field="receberStatus"
                    :width="80"
                    caption="Receber"
                    alignment="left"
                  ></dx-column>

                  <dx-column
                    :width="82"
                    data-field="treinamentoConcluido"
                    caption="Certificado"
                    :calculate-cell-value="treinamentoConcluidoCell"
                  />

                  <dx-column data-field="pessoa.nome" caption="Nome" />
                  <dx-column
                    :calculate-cell-value="consultorCell"
                    caption="Consultor"
                    alignment="left"
                  ></dx-column>

                  <dx-column
                    :width="60"
                    data-field="pagarConsultor"
                    caption="Pagar?"
                    :calculate-cell-value="pagarConsultorCell"
                  />

                  <dx-column :calculate-cell-value="tipoNegociacaoCell" caption="Negociação" />
                  <dx-column data-field="parcelas" data-type="number" :width="66" />
                  <dx-column
                    data-field="valorBase"
                    :width="110"
                    caption="Valor"
                    :format="moedaFormat"
                  />

                  <!--<dx-column data-field="status" caption="Status" :width="90" /> -->

                  <dx-column caption :width="45" :buttons="editButtonsExcluir" type="buttons" />

                  <div slot="receberStatus" slot-scope="{ data }">
                    <template v-if="data.data.receberStatus.length > 0">
                      <a
                        id="aStatus"
                        href="#"
                        @click.prevent="botaoReceberGrid(data);"
                      >{{data.data.receberStatus}}</a>
                    </template>
                    <div>{{data.data.receberStatus}}</div>
                  </div>

                  <!--<div slot="cellTemplate" slot-scope="data">
                    <dx-button styling-mode="outlined" @click="onUserEditClick(data)" icon="edit"/>
                    <dx-button
                      type="normal"
                      text
                      @click="onParticipanteDeleteClick(data)"
                      icon="trash"
                      style="margin-left:10px;"
                    />
                  </div>-->

                  <dx-check-box
                    :value="data.text"
                    slot="cell-pagarConsultor"
                    slot-scope="{ data }"
                  />

                  <dx-button slot="cell-city" slot-scope="{ data }" :text="data.text" />
                  <span slot="tag" slot-scope="{ data }" class="New">{{data.text}}</span>
                </dx-data-grid>
              </div>
            </div>
          </dx-tab-panel>

          <dx-validation-summary />
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
      :visible.sync="popupReceberVisible"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      class="popup"
      title
      :titleTemplate="tituloContaReceber"
      :fullScreen="popupFullScreen"
      content-template="myContent"
      :maxWidth="990"
      :maxHeight="850"
      :deferRendering="false"
    >
      <div slot="myContent" slot-scope="data">
        <dx-scroll-view>
          <!-- Your content goes here -->
          <FormReceber
            :isPopup="true"
            :isTitle="false"
            :isParenteListaParticipantes="true"
            @refreshParticipantes="refreshParticipantes"
            :participante="participante"
            :receber_id="receber_id"
            @close="popupReceberVisible= $event;receber_id=-2"
            :limpar="limparItemsReceber"
            @atualizarListaParticipantes="onAtualizarListaParticipantes"
          />
        </dx-scroll-view>
      </div>

      <!--<div class="dx-card responsive-paddings"></div>
      
      <p>Popup content</p>-->
    </dx-popup>

    <dx-popup
      :visible.sync="popupVisible"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      class="popup"
      title="Information"
      titleTemplate="<b>Editar aluno inscrito</b>"
      :fullScreen="popupFullScreen"
      content-template="myContent"
      :maxWidth="isPopupMaxWidth"
      :maxHeight="isPopupMaxHeight"
      :deferRendering="false"
    >
      <div slot="myContent" slot-scope="data">
        <!-- Your content goes here -->
        <FormParticipante
          :isPopup="true"
          :isTitle="false"
          :editar="editarParticipante"
          :tipoNegociacaoList="tipoNegociacaoList"
          :evento="evento"
          @close="popupVisible= $event"
          @atualizar="refreshParticipantes"
          :participante="participante"
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

import { confirm } from "devextreme/ui/dialog";

//import EditorHtml from "../../components/editor/html";
import { DxHtmlEditor, DxToolbar, DxItem } from "devextreme-vue/html-editor";
import {
  DxButtonGroup,
  DxItem as DxButtonGroupItem
} from "devextreme-vue/button-group";

import { DxForm, DxSimpleItem } from "devextreme-vue/form";

import {
  DxTextArea,
  DxCheckBox,
  DxSelectBox,
  DxDateBox,
  DxNumberBox,
  DxButton,
  DxTextBox,
  DxScrollView
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
import FormReceber from "../financeiro/receber";
//import FormParticipante from "../pessoa/pessoa";

const decimalFormatter = new Intl.NumberFormat("pt-BR", {
  style: "decimal",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

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
    DxPopup,
    FormReceber,
    DxScrollView,
    DxSimpleItem,
    DxForm
  },

  props: ["id2"],

  beforeRouteEnter(to, from, next) {
    loading();
    const id = parseInt(to.params.id);
    console.log("evento id==== ", id);
    if (!id || id === -1) {
      ServiceEvento.getNovo()
        .then(r => {
          next(vm => {
            vm.tabParticipantesEnabled = false;
            vm.localList = r[0].data;
            vm.treinametoList = r[1].data;
            vm.tipoNegociacaoList = r[2].data;

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
      ServiceEvento.get(id)
        .then(r => {
          next(vm => {
            vm.tabParticipantesEnabled = id > 0 ? true : false;
            let evento = r[0];
            vm.evento = evento;

            let participantes = r[3].data;
            participantes.map(e => {
              e.pagarConsultor =
                parseInt(e.pagarConsultor) === 1 ? true : false;
              e.treinamentoConcluido =
                parseInt(e.treinamentoConcluido) === 1 ? true : false;
              if (vm.lodash.isNull(e.receber)) {
                e.receberStatus = "";
              } else {
                e.receberStatus = e.receber.statusDescription;
              }
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
      tituloContaReceber: "Cadastro de Contas a Receber",
      popupVisible: false,
      popupReceberVisible: false,
      popupFullScreen: false,
      isPopupMaxWidth: "900",
      isPopupMaxHeight: "450",
      gridRefName: "grid",
      selectedRowIndex: -1,
      receber_id: -5,

      limparItemsReceber: 0,

      editarParticipante: false,

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
          hint: "Contas a Receber",
          icon: "money",
          visible: this.onReceberVisible,
          onClick: this.onReceberEditClick
        }
      ],
      editButtonsExcluir: [
        {
          hint: "Excluir",
          icon: "trash",
          visible: this.onExcluirVisible,
          onClick: this.onParticipanteDeleteClick
        }
      ],
      moedaFormat: { type: "currency", precision: 2 },
      tabParticipantesEnabled: false,
      tabs: [
        { title: "Informações", template: "tab1" },
        { title: "Site", template: "tab2" },
        {
          title: "Email",
          template: "tab3"
        },
        {
          title: "Participantes",
          template: "tab4"
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
      evento: {
        siteDetalhes: "",
        valorBase: 0.0,
        percentConsultor: 0.0,
        emailBoasVindas: "",
        emailInformativo: "",
        dDisparoEmail: null
      },
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
      participante: {},
      columns: ["nome", "status", "State", "Phone", "Fax"]
    };
  },

  methods: {
    async onDispararEmailInformativo() {
      this.$nextTick(function() {
        let result = confirm(
          "<div style='margin-left:15px!important;margin-right:15px!important;'><p>Confirma o disparo de email?</p></div>",
          " Confirmação "
        );
        result.then(dialogResult => {
          if (!dialogResult) {
            return;
          }
          this.dispararEmailInfo();
        });
      });
    },

    async dispararEmailInfo() {
      loading();
      const position = {
        at: "center center",
        of: "#bloco1"
      };

      if (!this.lodash.has(this.evento, "id")) {
        const message = "Este evento ainda não foi gravado.";
        notify(
          {
            message: message,
            position,
            width: 300,
            shading: true
          },
          "info",
          4000
        );
        return;
      }

      ServiceEvento.dispararEmailInformativo(this.evento)
        .then(r => {
          loading();
          notify(
            {
              message: "Email disparado com sucesso!",
              position,
              width: 300,
              shading: true
            },
            "success",
            3000
          );
        })
        .catch(e => {
          loading();
          notify(
            {
              message: e,
              position,
              width: 300,
              shading: true
            },
            "error",
            4000
          );
        });
    },

    numero(n) {
      let nr = decimalFormatter.format(n);

      return nr;
    },

    onReceberVisible(e) {
      // botao receber grade participantes
      return true;
    },

    onExcluirVisible(e) {
      // botao excluir da grade participantes.
      return e.row.data.receberStatus === "";
    },

    setFocus: function() {
      this.textBox.focus();
    },

    botaoReceberGrid(data) {
      console.log("botao : ", data);
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
        valorBaseAVista: 0.0,
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

    onAddParticipante() {
      this.participante = {
        consultor_id: null,
        evento_id: this.id,
        pessoa_id: null,
        status: "ATIVO",
        tipoNegociacao_id: null,
        valorBase: this.evento.valorBase,
        treinamentoConcluido: false,
        parcelas: 0,
        pagarConsultor: false,
        percentConsultor: 0.0,
        valorConsultor: 0.0
      };
      this.editarParticipante = false;
      this.popupVisible = !this.popupVisible;
    },

    onParticipanteEditClick(item) {
      console.log(item);
      console.log("editaar ", item.row.data);
      const id = item.row.data.id;
      this.participante = _.cloneDeep(item.row.data);
      console.log("participate ID ", this.participante.id);
      console.log("participate valorBase ", this.participante.valorBase);
      this.$forceUpdate();
      this.editarParticipante = true;
      this.popupVisible = !this.popupVisible;

      //this.$router.push({ name: "treinamento", params: { id } });
    },

    onReceberEditClick(item) {
      // Grid - botão conta receber
      let id = -1;
      this.receber = _.cloneDeep(item.row.data.receber);
      if (this.receber) {
        id = item.row.data.receber.id;
        this.receber_id = this.receber.id;
        this.tituloContaReceber =
          "<div style='padding: 5px;'><b>Cadastro de Contas a Receber</b></div>";
      } else {
        this.receber_id = -1;
        this.tituloContaReceber =
          "<div style='padding: 5px;'><b>Cadastro de Contas a Receber - (Criar conta)</b></div>";
      }

      this.participante = _.cloneDeep(item.row.data);

      this.limparItemsReceber = this.limparItemsReceber + 1;

      this.popupReceberVisible = !this.popupReceberVisible;
    },

    onParticipanteDeleteClick(item) {
      const id = item.row.data.id;

      this.$nextTick(function() {
        let result = confirm(
          "<div style='margin-left:15px!important;margin-right:15px!important;'><p>Confirma exclusão do Aluno selecionado?</p></div>",
          " Confirmação "
        );
        result.then(dialogResult => {
          console.log(dialogResult);
          if (!dialogResult) {
            return false;
          }
          loading();
          ServiceEvento.deleteEventoParticipante(id)
            .then(res => {
              loading();

              this.refreshParticipantes();
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

    preparar() {
      let d = _.cloneDeep(this.evento);

      let payload = {
        dInicio: d.dInicio,
        dTermino: d.dTermino,
        local_id: d.local_id,
        nome: d.nome,
        obs: d.obs,
        siteDetalhes: d.siteDetalhes,
        siteEvento: d.siteEvento,
        siteExibir: d.siteExibir,
        siteParcelas: d.siteParcelas,
        status: d.status,
        siteLink: d.siteLink,
        treinamento_id: d.treinamento_id,
        valorBase: d.valorBase,
        emailBoasVindas: d.emailBoasVindas,
        emailBoasVindasTitulo: d.emailBoasVindasTitulo,
        emailInformativo: d.emailInformativo,
        emailInformativoTitulo: d.emailInformativoTitulo
        //dDisparoEmail: d.dDisparoEmail
      };

      if (d.id) payload.id = d.id;

      return payload;
    },

    validate(params) {
      console.log("validando... ");
      console.log(params);
      const result = params.validationGroup.validate();

      if (result.isValid) {
        let payload = this.preparar();
        if (_.has(payload, "id")) {
          this.updateEvento(payload);
        } else {
          this.addEvento(payload);
        }
      } else {
        console.log("falhou na validação");
      }
    },

    cancelar() {
      this.$router.push({ name: "eventos" });
    },

    addEvento(payload) {
      loading();
      ServiceEvento.addEvento(payload)
        .then(r => {
          loading();
          this.evento.id = r.id;
          this.id = r.id;
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Gravado com sucesso.",
              position,
              width: 300,
              shading: true
            },
            "success",
            2000
          );
          this.$router.push({
            path: "/evento/" + this.id,
            params: { id: this.id }
          });
        })
        .catch(e => {
          loading();
          window.errou = e;
          console.log(e);
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: e,
              position,
              width: 300,
              shading: true
            },
            "error",
            4000
          );
        });
    },

    updateEvento(payload) {
      loading();
      ServiceEvento.updateEvento(payload)
        .then(r => {
          loading();
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Gravado com sucesso.",
              position,
              width: 300,
              shading: true
            },
            "success",
            2000
          );
          this.cancelar();
        })
        .catch(e => {
          window.errou = e;
          console.log(e);
          loading();
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: e,
              position,
              width: 300,
              shading: true
            },
            "error",
            4000
          );
        });
    },

    onAtualizarListaParticipantes() {
      // atualizar os participantes. Disparado do conta a receber.
      this.refreshParticipantes();
    },

    refreshParticipantes() {
      this.participante = {};
      console.log("atualizar inscritos");
      ServiceEvento.getEventoParticipantes(this.evento.id)
        .then(d => {
          let participantes = d.data;
          participantes.map(e => {
            e.pagarConsultor = parseInt(e.pagarConsultor) === 1 ? true : false;
            e.treinamentoConcluido =
              parseInt(e.treinamentoConcluido) === 1 ? true : false;
            if (this.lodash.isNull(e.receber)) {
              e.receberStatus = "";
            } else {
              e.receberStatus = e.receber.statusDescription;
            }
          });
          this.participantes = participantes;
        })
        .catch(e => {
          loading();

          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Ocorreu uma falha ao tentar carregar os participantes.",
              position,
              width: 300,
              shading: true
            },
            "error",
            4000
          );
        });
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
    },
    "evento.treinamento_id": function(e) {
      console.log("evento.treinamento ", e);
      let busca = this.lodash.find(this.treinametoList, { id: e });
      if (e) {
        this.evento.valorBase = busca.valor;
        this.evento.valorBaseAVista = busca.valorBaseAVista;
      }
    }
  }
};
</script>

<style scoped>
#aStatus {
  background-color: transparent;
  border: 0;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  padding: 0;
  position: relative;
  text-decoration: underline;
}

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

#editor {
  border-color: #ece6e6;
}

#editor2 {
  border-color: #ece6e6;
}
</style>
