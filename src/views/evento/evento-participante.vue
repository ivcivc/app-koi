<template>
  <div>
    <h1 v-if="isTitle">Participante</h1>

    <div class="content-block1" id="bloco1">
      <dx-scroll-view :height="scrollHeight">
        <dx-validation-group>
          <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-8">
              <div class="box">
                <!--<span style="margin-left:6px;">Nome *</span>-->
                <span style="margin-left:6px;">
                  <span style="margin-left:0px;">Nome *</span>
                  <a style="margin-left:40px;" href="#" @click="this.formCliente">adicionar</a>
                </span>
                <div class="dx-field">
                  <DxSelectBox
                    :search-enabled="true"
                    :data-source="participantes"
                    :search-mode="searchModeOption"
                    :search-expr="searchExprOption"
                    :search-timeout="searchTimeoutOption"
                    :min-search-length="minSearchLengthOption"
                    :show-data-before-search="showDataBeforeSearchOption"
                    display-expr="nome"
                    value-expr="id"
                    :value="1"
                    v-model="participante.pessoa_id"
                  >
                    <dx-validator>
                      <dx-required-rule message="Informe o nome do Aluno." />
                    </dx-validator>
                  </DxSelectBox>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-5 col-md-4">
              <div class="box">
                <span style="margin-left:6px;"></span>
                <div class="dx-field">
                  <dx-check-box
                    v-model="participante.treinamentoConcluido"
                    text="Treinamento Concluído"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-3 col-md-3">
              <div class="box">
                <span style="margin-left:6px;">Total Parcelas *</span>
                <div class="dx-field">
                  <dx-number-box value v-model="participante.parcelas">
                    <dx-validator>
                      <dx-range-rule
                        :min="0"
                        :max="12"
                        message="Informe o total de parcelas (intervalor de 0-12)."
                      />
                      <dx-compare-rule
                        :comparison-target="parcelasComparison"
                        message="Informe quantidade de parcelas."
                      />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-5">
              <div class="box">
                <span style="margin-left:6px;">Valor do Treinamento *</span>
                <div class="dx-field">
                  <dx-number-box value v-model="participante.valorBase" format="R$ #,##0.##">
                    <dx-validator>
                      <dx-range-rule :min="0" message="Informe o valor total do investimento." />
                      <dx-compare-rule
                        :comparison-target="totalComparison"
                        message="Informe o valor Total do treinamento."
                      />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-5 col-md-4">
              <div class="box">
                <span style="margin-left:6px;">Tipo de Negociação *</span>
                <a style="margin-left:40px;" href="#" @click="this.formTipoNegociacao">adicionar</a>
                <div class="dx-field">
                  <DxSelectBox
                    :search-enabled="true"
                    :data-source="tipoNegociacaoList"
                    :search-mode="searchModeOption"
                    :search-expr="searchExprOption"
                    :search-timeout="searchTimeoutOption"
                    :min-search-length="0"
                    :show-data-before-search="showDataBeforeSearchOption"
                    display-expr="nome"
                    value-expr="id"
                    v-model="participante.tipoNegociacao_id"
                  >
                    <dx-validator>
                      <dx-required-rule message="Informe o tipo de negociação." />
                    </dx-validator>
                  </DxSelectBox>
                </div>
              </div>
            </div>
          </div>

          <div style="margin-left:0px;margin-top:10px;margin-bottom:8px">
            <span>
              <b>Consultor</b>
            </span>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-8">
              <div class="box">
                <span style="margin-left:6px;">Nome</span>

                <div class="dx-field">
                  <DxSelectBox
                    :search-enabled="true"
                    :data-source="consultores"
                    :search-mode="searchModeOption"
                    :search-expr="searchExprOption"
                    :search-timeout="searchTimeoutOption"
                    :min-search-length="minSearchLengthOption"
                    :show-data-before-search="showDataBeforeSearchOption"
                    display-expr="nome"
                    value-expr="id"
                    :value="1"
                    v-model="participante.consultor_id"
                  >
                    <dx-validator>
                      <dx-compare-rule
                        :comparison-target="nomeConsultorComparison"
                        message="Informe o nome do Consultor"
                      />
                    </dx-validator>
                  </DxSelectBox>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-5 col-md-4">
              <div class="box">
                <span style="margin-left:6px;">Pagar Consultor? *</span>
                <div class="dx-field">
                  <dx-select-box
                    :items="[{ key: true, value: 'SIM'}, {key: false, value: 'NÃO'}]"
                    :show-clear-button="true"
                    placeholder="Selecione"
                    :disabled="false"
                    v-model="participante.pagarConsultor"
                    display-expr="value"
                    value-expr="key"
                  >
                    <dx-validator>
                      <!--<dx-required-rule message="Informe se o Consultor será pago."/>-->
                      <dx-compare-rule
                        :comparison-target="pagarConsultorComparison"
                        message="Informe se o consultor será pago."
                      />
                    </dx-validator>
                  </dx-select-box>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-3 col-md-4">
              <div class="box">
                <span style="margin-left:6px;">Consultor (%) *</span>
                <div class="dx-field">
                  <dx-number-box
                    :min="0"
                    :max="100"
                    v-model="participante.percentConsultor"
                    format="#,##0.##"
                  >
                    <dx-validator>
                      <dx-compare-rule
                        :comparison-target="percentConsultorComparison"
                        message="Informe o percentual de comissão do consultor"
                      />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4">
              <div class="box">
                <span style="margin-left:6px;margin-right:16px;">Valor</span>
                <a href="#" @click="this.calcularComissaoConsultor">Calcular</a>

                <div class="dx-field">
                  <dx-number-box
                    v-model="participante.valorConsultor"
                    format="R$ #,##0.##"
                    ref="valorConsultorRef"
                  >
                    <dx-validator>
                      <dx-range-rule :min="0" message="Informe o valor a ser pago ao Consultor." />
                      <dx-compare-rule
                        :comparison-target="valorConsultorComparison"
                        message="Informe o valor a ser pago ao Consultor"
                      />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4">
              <div class="box">
                <span style="margin-left:6px;font-weight: bold;">Padrinho</span>

                <div class="dx-field">
                  <DxSelectBox
                    :search-enabled="true"
                    :data-source="padrinhos"
                    :search-mode="searchModeOption"
                    :search-expr="searchExprOption"
                    :search-timeout="searchTimeoutOption"
                    :min-search-length="minSearchLengthOption"
                    :show-data-before-search="showDataBeforeSearchOption"
                    display-expr="nome"
                    value-expr="id"
                    :value="1"
                    v-model="participante.padrinho_id"
                  ></DxSelectBox>
                </div>
              </div>
            </div>
          </div>

          <div class="row end-xs" style="margin-top:32px;margin-bottom: 25px;">
            <div class="col-xs-12">
              <div class="box">
                <dx-button text="Gravar" type="success" @click="validate" />
                <dx-button text="Cancelar" style="margin-left:8px;" @click="cancelar" />
              </div>
            </div>
          </div>
        </dx-validation-group>
        <dx-validation-summary />
      </dx-scroll-view>
    </div>

    <dx-popup
      :visible.sync="popupPessoaVisible"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      class="popup"
      title
      titleTemplate="<div style='padding: 5px;'><b>Cadastro de Pessoa (adicionar)</b></div>"
      :fullScreen="popupFullScreen"
      content-template="myContent"
      :maxWidth="isPopupMaxWidth"
      :maxHeight="isPopupMaxHeight"
    >
      <div slot="myContent" slot-scope="data">
        <dx-scroll-view>
          <!-- Your content goes here -->
          <FormAluno :isPopup="true" :isTitle="false" @close="popupPessoaVisible= $event" />
        </dx-scroll-view>
      </div>

      <!--<div class="dx-card responsive-paddings"></div>
      
      <p>Popup content</p>-->
    </dx-popup>

    <dx-popup
      :visible.sync="popupTipoNegociacaoVisible"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      class="popup"
      title
      titleTemplate="<div style='padding: 5px;'><b>Cadastro de Tipo de Negociação (adicionar)</b></div>"
      :fullScreen="popupFullScreen"
      content-template="myContent"
      :maxWidth="600"
      :maxHeight="350"
    >
      <div slot="myContent" slot-scope="data">
        <dx-scroll-view>
          <!-- Your content goes here -->
          <FormTipoNegociacao
            :isPopup="true"
            :isTitle="false"
            @close="refreshTipoNegociacao();popupTipoNegociacaoVisible= $event"
          />
        </dx-scroll-view>
      </div>

      <!--<div class="dx-card responsive-paddings"></div>
      
      <p>Popup content</p>-->
    </dx-popup>
  </div>
</template>

<script>
import FormAluno from "../pessoa/pessoa";
//import TipoNegociacao from "./TipoNegociacao";
import FormTipoNegociacao from "../tipoNegociacao/tipoNegociacao";
import notify from "devextreme/ui/notify";
import config from "devextreme/core/config";
import { userKey, baseApiUrl, loading } from "@/global";

import { confirm } from "devextreme/ui/dialog";

import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import Service from "../../services/Pessoa";
import ServiceTipo from "../../services/Treinamento";
import ServiceTipoNegociacao from "../../services/TipoNegociacao";
import DxPopup from "devextreme-vue/popup";

import {
  DxAdapter,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule
} from "devextreme-vue/validator";

import {
  DxValidator,
  DxValidationGroup,
  DxValidationSummary
} from "devextreme-vue";

import {
  DxScrollView,
  DxTextArea,
  DxCheckBox,
  DxSelectBox,
  DxDateBox,
  DxNumberBox,
  DxButton,
  DxTextBox
} from "devextreme-vue";

const dataSource = new DataSource({
  store: new CustomStore({
    //loadMode: "raw",
    key: "id",

    byKey: key => {
      console.log("buscando byKey ", key);
      return Pessoa.getPessoas(key);
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

      return Service.getPessoaIndex(o);
    }
  })
});

const dataSourceConsultor = new DataSource({
  store: new CustomStore({
    //loadMode: "raw",
    key: "id",

    byKey: key => {
      console.log("buscando byKey ", key);
      return Pessoa.getPessoas(key);
    },

    load: function(loadOptions) {
      let params = {};
      let o = {
        isLocalizar: true,
        grupos: ["CONSULTOR"],
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

      return Service.getPessoaIndex(o);
    }
  })
});

//import { products, simpleProducts } from './data.js';
//const productsDataSource = new DataSource(simpleProducts);

import Pessoa from "../../services/Pessoa";
import { isNull } from "util";
import { constants } from "crypto";

import ServiceEvento from "../../services/Evento";

export default {
  components: {
    FormAluno,
    FormTipoNegociacao,
    DxPopup,
    DxTextArea,
    DxCheckBox,
    DxSelectBox,
    DxDateBox,
    DxNumberBox,
    DxButton,
    DxTextBox,
    DxValidator,
    DxValidationGroup,
    DxValidationSummary,
    DxAdapter,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,
    DxScrollView
  },
  props: {
    isPopup: {
      type: Boolean,
      default: false
    },
    isTitle: {
      type: Boolean,
      default: true
    },
    participante: {
      type: Object,
      default: {}
    },
    tipoNegociacaoList: {
      type: Array,
      default: []
    },
    evento: {
      type: Object,
      default: {}
    },
    editar: {
      type: Boolean,
      default: false
    }
  },

  created() {
    const validatorComponent = new DxValidator({
      propsData: {
        adapter: {
          getValue: this.getCustomValue
        },
        validationRules: [
          { type: "range", min: 0, max: 9, message: "From 1 to 10" }
        ]
      }
    }).$mount();
    this.validator = validatorComponent.instance;
  },

  data() {
    return {
      //scrollHeight: "330",
      participantes: dataSource, //[{ id: 1, nome: "Ivan" }],
      consultores: dataSourceConsultor,
      padrinhos: dataSource,
      searchModeOption: "contains",
      searchExprOption: "nome",
      searchTimeoutOption: 200,
      minSearchLengthOption: 3,
      showDataBeforeSearchOption: false,

      popupPessoaVisible: false,
      popupTipoNegociacaoVisible: false,
      popupFullScreen: false,
      isPopupMaxWidth: "1400",
      isPopupMaxHeight: "1000",

      pagarConsultorComparison: e => {
        let pagar = _.isUndefined(this.participante.pagarConsultor)
          ? null
          : this.participante.pagarConsultor;
        let nulo =
          _.isNull(this.participante.pagarConsultor) ||
          _.isUndefined(this.participante.pagarConsultor);
        let valor = _.isUndefined(this.participante.valorConsultor)
          ? 0.0
          : this.participante.valorConsultor;
        let percentual = _.isUndefined(this.participante.percentConsultor)
          ? 0.0
          : this.participante.percentConsultor;

        if (nulo) return true;

        if (pagar && percentual <= 0) {
          return false;
        }

        if (pagar && valor <= 0.0) {
          return false;
        }

        if (!pagar && valor > 0.0) {
          return true;
        }

        if (!pagar && percentual > 0.0) {
          return true;
        }

        return pagar;
      },

      valorConsultorComparison: () => {
        let pagar = _.isUndefined(this.participante.pagarConsultor)
          ? null
          : this.participante.pagarConsultor;
        let valor = _.isUndefined(this.participante.valorConsultor)
          ? 0.0
          : this.participante.valorConsultor;
        let percentual = _.isUndefined(this.participante.percentConsultor)
          ? 0.0
          : this.participante.percentConsultor;

        if (pagar && percentual > 0 && valor > 0) {
          return valor;
        }

        if (!pagar && valor > 0) return valor + 1;
        if (!pagar && percentual > 0) return valor + 1;
        if (pagar && valor === 0.0) return valor + 1;

        return valor;
      },
      percentConsultorComparison: () => {
        let pagar = _.isUndefined(this.participante.pagarConsultor)
          ? null
          : this.participante.pagarConsultor;
        let valor = _.isUndefined(this.participante.valorConsultor)
          ? 0.0
          : this.participante.valorConsultor;
        let percentual = _.isUndefined(this.participante.percentConsultor)
          ? 0.0
          : this.participante.percentConsultor;

        if (percentual === 0 && valor > 0) {
          return percentual + 1;
        }
        if (percentual === 0 && pagar) {
          return percentual + 1;
        }

        return percentual;
      },

      nomeConsultorComparison: () => {
        const retorno = this.participante.consultor_id;
        let nome =
          _.isUndefined(this.participante.consultor_id) ||
          _.isNull(this.participante.consultor_id)
            ? 0
            : this.participante.consultor_id;
        let pagar = _.isUndefined(this.participante.pagarConsultor)
          ? null
          : this.participante.pagarConsultor;

        if (nome > 0 && pagar) return retorno;
        if (nome === 0 && pagar) return nome - 1;

        return retorno;
      },

      parcelasComparison: () => {
        const retorno = this.participante.parcelas;
        let parcelas =
          _.isUndefined(this.participante.parcelas) ||
          _.isNull(this.participante.parcelas)
            ? 0
            : this.participante.parcelas;
        let valorBase =
          _.isUndefined(this.participante.valorBase) ||
          _.isNull(this.participante.valorBase)
            ? null
            : this.participante.valorBase;

        if (parcelas > 0 && valorBase > 0) return retorno;
        if (parcelas === 0 && valorBase > 0) return parcelas - 1;

        return retorno;
      },

      totalComparison: () => {
        const retorno = this.participante.valorBase;
        let parcelas =
          _.isUndefined(this.participante.parcelas) ||
          _.isNull(this.participante.parcelas)
            ? 0
            : this.participante.parcelas;
        let valorBase =
          _.isUndefined(this.participante.valorBase) ||
          _.isNull(this.participante.valorBase)
            ? null
            : this.participante.valorBase;

        if (valorBase > 0 && parcelas > 0) return retorno;
        if (valorBase === 0 && parcelas > 0) return valorBase - 1;

        return retorno;
      }
    };
  },

  computed: {
    scrollHeight: function() {
      let tam = this.$store.getters["common/screen"];
      let n = 370;

      if (tam.isLarge || tam.isMedium) {
        n = 970;
      }

      if (tam.isSmall) {
        n = 900;
      }

      if (tam.isXSmall) {
        n = 400;
      }
      return n;
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

    "participante.parcelas": function(e) {
      if (this.editar) {
        return;
      }
      if (e === undefined) {
        return;
      }
      if (e === 0) {
        this.participante.valorBase = 0.0;
      }
      if (e === 1) {
        this.participante.valorBase = this.evento.valorBaseAVista;
      }
      if (e > 1) {
        this.participante.valorBase = this.evento.valorBase;
      }
    },
    participante: function(e) {
      console.log("Ouvindo troca de participante....", e);
      this.$forceUpdate();
    }
  },

  methods: {
    onFechar() {
      if (this.isPopup) this.$emit("close", false);
    },

    formCliente() {
      this.popupPessoaVisible = !this.popupPessoaVisible;
    },

    formTipoNegociacao() {
      this.popupTipoNegociacaoVisible = !this.popupTipoNegociacaoVisible;
    },

    calcularComissaoConsultor() {
      let valor = _.isUndefined(this.participante.valorConsultor)
        ? 0.0
        : this.participante.valorConsultor;
      let percentual = _.isUndefined(this.participante.percentConsultor)
        ? 0.0
        : this.participante.percentConsultor;

      const valorBase = this.participante.valorBase;

      if (valorBase <= 0 || percentual <= 0) return;

      if (!this.participante.id) {
        this.participante.valorConsultor = (valorBase * percentual) / 100;
        this.$forceUpdate();
        return;
      }

      this.$nextTick(() => {
        let result = confirm(
          "<p>Confirma recalcular a comissão?</p>",
          "Confirmação"
        );
        result.then(dialogResult => {
          this.participante.valorConsultor = (valorBase * percentual) / 100;
          this.$forceUpdate();
        });
      });
    },

    refreshTipoNegociacao() {
      loading();
      ServiceTipoNegociacao.getTipoNegociacoesIndex({
        sortSelector: "nome",
        sortDirection: "desc"
      })
        .then(r => {
          loading();
          this.tipoNegociacaoList = r.data;
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
            3000
          );
        });
    },

    validateCustom() {
      /*var result1 = this.$refs.customValidator.instance.validate();
      var result2 = this.validator.validate();
      this.customValueIsNotEmpty = result1.isValid;
      this.customValueIsDigit = result2.isValid;*/
      if (this.participante.pagarConsultor && valorConsultor === 0) {
        console.log("validateCustom .f. ");
        return false;
      }
      console.log("validateCustom .t. ");
      return true;
    },

    preparar() {
      let d = _.cloneDeep(this.participante);

      let payload = {
        consultor_id: d.consultor_id,
        padrinho_id: d.padrinho_id,
        evento_id: d.evento_id,
        pagarConsultor: d.pagarConsultor,
        parcelas: d.parcelas,
        percentConsultor: d.percentConsultor,
        pessoa_id: d.pessoa_id,
        tipoNegociacao_id: d.tipoNegociacao_id,
        valorBase: d.valorBase,
        treinamentoConcluido: d.treinamentoConcluido,
        valorConsultor: d.valorConsultor
      };

      if (d.id) payload.id = d.id;

      return payload;
    },

    validate(params) {
      console.log("validando... ");
      console.log(params);
      const result = params.validationGroup.validate();
      if (result.isValid) {
        // form data is valid
        //params.validationGroup.reset();
        console.log("passou na validação ");
        if (result.isValid) {
          let payload = this.preparar();
          if (_.has(payload, "id")) {
            this.update(payload);
          } else {
            this.add(payload);
          }
        } else {
          console.log("falhou na validação");
        }
      } else {
        console.log("falhou na validação");
      }

      /*let result1 = this.$refs.customValidator.instance.validate();
      console.log("validação customizada ", result1);
      console.log(result1.isValid);*/
    },

    add(payload) {
      loading();
      ServiceEvento.addEventoParticipante(payload)
        .then(r => {
          loading();
          this.participante.id = r.id;
          this.id = r.id;
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Adicionado com sucesso.",
              position,
              width: 300,
              shading: true
            },
            "success",
            1000
          );
          if (this.isPopup) this.$emit("atualizar", true);
          this.cancelar();
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

    update(payload) {
      loading();
      ServiceEvento.updateEventoParticipante(payload)
        .then(r => {
          loading();
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Atualizado com sucesso",
              position,
              width: 300,
              shading: true
            },
            "success",
            2000
          );
          if (this.isPopup) this.$emit("atualizar", true);
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

    cancelar() {
      if (this.isPopup) this.$emit("close", false);
    }
  }
};
</script>

<style scoped>
.content-block1 {
  padding-top: 3px;
  padding-bottom: 8px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
