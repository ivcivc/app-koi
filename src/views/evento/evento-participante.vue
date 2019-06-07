<template>
  <div>
    <h1 v-if="isTitle">Participante</h1>

    <div class="content-block1">
      <dx-scroll-view :height="scrollHeight">
        <dx-validation-group>
          <div class="row">
            <div class="col-xs-12 col-sm-7 col-md-8">
              <div class="box">
                <span style="margin-left:6px;">Nome *</span>
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
                    v-model="evento.pessoa_id"
                  >
                    <dx-validator>
                      <dx-required-rule message="Informe o nome do Aluno."/>
                    </dx-validator>
                  </DxSelectBox>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-5 col-md-4">
              <div class="box">
                <span style="margin-left:6px;"></span>
                <div class="dx-field">
                  <dx-check-box v-model="evento.treinamentoConcluido" text="Treinamento Concluído"/>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-3 col-md-3">
              <div class="box">
                <span style="margin-left:6px;">Total Parcelas *</span>
                <div class="dx-field">
                  <dx-number-box value v-model="evento.parcelas">
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
                  <dx-number-box value v-model="evento.total" format="R$ #,##0.##">
                    <dx-validator>
                      <dx-range-rule :min="0" message="Informe o valor total do investimento."/>
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
                    v-model="evento.tipoNegociacao_id"
                  >
                    <dx-validator>
                      <dx-required-rule message="Informe o tipo de negociação."/>
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
                    v-model="evento.consultor_id"
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
                    v-model="evento.pagarConsultor"
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
                    v-model="evento.percentConsultor"
                    format="#,##0.##"
                  >
                    <dx-validator>
                      <dx-compare-rule
                        :comparison-target="percentConsultorComparison"
                        message="Informe o percentual de comissão do consultorr"
                      />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4">
              <div class="box">
                <span style="margin-left:6px;margin-right:6px;">Valor</span>
                <a href="#" @click="this.calcularComissaoConsultor">Calcular</a>

                <div class="dx-field">
                  <dx-number-box
                    v-model="evento.valorConsultor"
                    format="R$ #,##0.##"
                    ref="valorConsultorRef"
                  >
                    <dx-validator>
                      <dx-range-rule :min="0" message="Informe o valor a ser pago ao Consultor."/>
                      <dx-compare-rule
                        :comparison-target="valorConsultorComparison"
                        message="Informe o valor a ser pago ao Consultor"
                      />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>
          </div>

          <div class="row end-xs" style="margin-top:32px;margin-bottom: 25px;">
            <div class="col-xs-12">
              <div class="box">
                <dx-button text="Gravar" @click="validate"/>
                <dx-button text="Cancelar" style="margin-left:8px;" @click="cancelar"/>
              </div>
            </div>
          </div>
        </dx-validation-group>
        <dx-validation-summary/>
      </dx-scroll-view>
    </div>
  </div>
</template>

<script>
import notify from "devextreme/ui/notify";
import config from "devextreme/core/config";
import { userKey, baseApiUrl, loading } from "@/global";

import { confirm } from "devextreme/ui/dialog";

import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import Service from "../../services/Pessoa";

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

export default {
  components: {
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
    id: {
      type: {}
    },
    evento: {
      type: Object,
      default: {}
    },
    tipoNegociacaoList: {
      type: Array,
      default: []
    }
  },

  mounted() {
    window.me = this;
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
      searchModeOption: "contains",
      searchExprOption: "nome",
      searchTimeoutOption: 200,
      minSearchLengthOption: 3,
      showDataBeforeSearchOption: false,

      pagarConsultorComparison: e => {
        let pagar = _.isUndefined(this.evento.pagarConsultor)
          ? null
          : this.evento.pagarConsultor;
        let nulo =
          _.isNull(this.evento.pagarConsultor) ||
          _.isUndefined(this.evento.pagarConsultor);
        let valor = _.isUndefined(this.evento.valorConsultor)
          ? 0.0
          : this.evento.valorConsultor;
        let percentual = _.isUndefined(this.evento.percentConsultor)
          ? 0.0
          : this.evento.percentConsultor;

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
        let pagar = _.isUndefined(this.evento.pagarConsultor)
          ? null
          : this.evento.pagarConsultor;
        let valor = _.isUndefined(this.evento.valorConsultor)
          ? 0.0
          : this.evento.valorConsultor;
        let percentual = _.isUndefined(this.evento.percentConsultor)
          ? 0.0
          : this.evento.percentConsultor;

        if (pagar && percentual > 0 && valor > 0) {
          return valor;
        }

        if (!pagar && valor > 0) return valor + 1;
        if (!pagar && percentual > 0) return valor + 1;
        if (pagar && valor === 0.0) return valor + 1;

        return valor;
      },
      percentConsultorComparison: () => {
        let pagar = _.isUndefined(this.evento.pagarConsultor)
          ? null
          : this.evento.pagarConsultor;
        let valor = _.isUndefined(this.evento.valorConsultor)
          ? 0.0
          : this.evento.valorConsultor;
        let percentual = _.isUndefined(this.evento.percentConsultor)
          ? 0.0
          : this.evento.percentConsultor;

        if (percentual === 0 && valor > 0) {
          return percentual + 1;
        }
        if (percentual === 0 && pagar) {
          return percentual + 1;
        }

        return percentual;
      },

      nomeConsultorComparison: () => {
        const retorno = this.evento.consultor_id;
        let nome =
          _.isUndefined(this.evento.consultor_id) ||
          _.isNull(this.evento.consultor_id)
            ? 0
            : this.evento.consultor_id;
        let pagar = _.isUndefined(this.evento.pagarConsultor)
          ? null
          : this.evento.pagarConsultor;

        if (nome > 0 && pagar) return retorno;
        if (nome === 0 && pagar) return nome - 1;

        return retorno;
      },

      parcelasComparison: () => {
        const retorno = this.evento.parcelas;
        let parcelas =
          _.isUndefined(this.evento.parcelas) || _.isNull(this.evento.parcelas)
            ? 0
            : this.evento.parcelas;
        let total =
          _.isUndefined(this.evento.total) || _.isNull(this.evento.total)
            ? null
            : this.evento.total;

        if (parcelas > 0 && total > 0) return retorno;
        if (parcelas === 0 && total > 0) return parcelas - 1;

        return retorno;
      },

      totalComparison: () => {
        const retorno = this.evento.total;
        let parcelas =
          _.isUndefined(this.evento.parcelas) || _.isNull(this.evento.parcelas)
            ? 0
            : this.evento.parcelas;
        let total =
          _.isUndefined(this.evento.total) || _.isNull(this.evento.total)
            ? null
            : this.evento.total;

        if (total > 0 && parcelas > 0) return retorno;
        if (total === 0 && parcelas > 0) return total - 1;

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

  methods: {
    onFechar() {
      if (this.isPopup) this.$emit("close", false);
    },

    calcularComissaoConsultor() {
      let valor = _.isUndefined(this.evento.valorConsultor)
        ? 0.0
        : this.evento.valorConsultor;
      let percentual = _.isUndefined(this.evento.percentConsultor)
        ? 0.0
        : this.evento.percentConsultor;

      const valorBase = this.evento.total;

      if (valorBase <= 0 || percentual <= 0) return;

      let ref = this.$refs.valorConsultorRef;
      window.ref = ref;

      if (!this.evento.id) {
        this.evento.valorConsultor = (valorBase * percentual) / 100;
        this.$forceUpdate();
        return;
      }

      this.$nextTick(() => {
        let result = confirm(
          "<p>Confirma recalcular a comissão?</p>",
          "Confirmação"
        );
        result.then(dialogResult => {
          this.evento.valorConsultor = (valorBase * percentual) / 100;
          this.$forceUpdate();
        });
      });
    },

    validateCustom() {
      /*var result1 = this.$refs.customValidator.instance.validate();
      var result2 = this.validator.validate();
      this.customValueIsNotEmpty = result1.isValid;
      this.customValueIsDigit = result2.isValid;*/
      if (this.evento.pagarConsultor && valorConsultor === 0) {
        console.log("validateCustom .f. ");
        return false;
      }
      console.log("validateCustom .t. ");
      return true;
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

      /*let result1 = this.$refs.customValidator.instance.validate();
      console.log("validação customizada ", result1);
      console.log(result1.isValid);*/
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
