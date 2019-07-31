<template>
  <div>
    <dx-popup
      :visible.sync="isShow"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      class="popup"
      title
      titleTemplate="<div style='padding: 5px;font-size: 16px;'><b>Transações</b></div>"
      content-template="myContent"
      :maxWidth="580"
      :maxHeight="290"
    >
      <div slot="myContent" slot-scope="data">
        <dx-scroll-view>
          <dx-validation-group>
            <div class="row">
              <div class="col-xs-12 col-sm-5 col-md-5">
                <div class="box">
                  <span style="margin-left:6px;">Parcela</span>
                  <div class="dx-field">
                    <dx-number-box
                      :disabled="showDisabled"
                      value.sync="dados.installmentNumber"
                      v-model="dados.installmentNumber"
                    >
                      <dx-validator>
                        <dx-range-rule :min="1" message="Informe a quantidade total de parcelas." />
                        <dx-range-rule :max="12" message="É permitido no máximo 12 parcelas." />
                      </dx-validator>
                    </dx-number-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-7 col-md-7">
                <div class="box">
                  <span style="margin-left:6px;">Vencimento</span>
                  <div class="dx-field">
                    <dx-date-box
                      :value="dados.payDay"
                      type="date"
                      v-model="dados.payDay"
                      :disabled="showData"
                    >
                      <dx-validator>
                        <dx-string-length-rule
                          :min="3"
                          message="Informe a data de vencimento da parcela."
                        />
                      </dx-validator>
                    </dx-date-box>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-5 col-md-5">
                <div class="box">
                  <span style="margin-left:6px;margin-right:16px;">Valor *</span>
                  <div class="dx-field">
                    <dx-number-box v-model="dados.value" format="R$ #,##0.##" :disabled="showValor">
                      <dx-validator>
                        <dx-range-rule :min="0" message="Informe o valor desta transação." />
                        <!--<dx-compare-rule
                        :comparison-target="valorLiquidoComparison"
                        message="Informe o valor liquido"
                        />-->
                      </dx-validator>
                    </dx-number-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-7 col-md-7">
                <div class="box">
                  <span style="margin-left:6px;">Status</span>
                  <div class="dx-field">
                    <dx-select-box
                      :items="status"
                      :show-clear-button="true"
                      placeholder="Selecione"
                      :disabled="!showStatus"
                      v-model="dados.status"
                      display-expr="displayName"
                      value-expr="name"
                    >
                      <dx-validator>
                        <dx-required-rule message="Informe o meio de pagamento" />
                      </dx-validator>
                    </dx-select-box>
                  </div>
                </div>
              </div>
            </div>

            <div class="row end-xs" style="margin-top:32px;margin-bottom: 0px;">
              <div class="col-xs-12">
                <div class="box">
                  <dx-button
                    text="Atualizar/Reenviar"
                    type="info"
                    @click="validate($event,'reenviar')"
                    v-if="acoes.reenviar"
                    style="margin-left:0px;margin-rigth: 5px;"
                  />

                  <dx-button
                    text="Cancelar transação"
                    type="danger"
                    @click="validate($event,'cancelarTransacao')"
                    v-if="acoes.cancelar"
                    style="margin-left:5px;margin-rigth: 5px;"
                  />

                  <dx-button
                    text="Pagar fora do sistema"
                    type="success"
                    @click="validate($event,'pagarForaSistema')"
                    v-if="acoes.pagarForaSistema"
                    style="margin-left:5px;margin-rigth: 5px;"
                  />
                  <dx-button
                    text="Status - não enviado operadora"
                    type="success"
                    @click="validate($event,'naoEnviadoOperadora')"
                    v-if="acoes.naoEnviadoOperadora"
                    style="margin-left:5px;margin-rigth: 5px;"
                  />

                  <dx-button
                    text="Estornar"
                    type="success"
                    @click="validate($event,'estornar')"
                    v-if="acoes.estornar"
                    style="margin-left:5px;margin-rigth: 5px;"
                  />

                  <dx-button
                    text="Gravar"
                    type="success"
                    @click="validate"
                    v-if="acoes.gravarManual"
                  />
                  <dx-button text="Cancelar" style="margin-left:20px;" @click="close" />
                </div>
              </div>
            </div>
          </dx-validation-group>
        </dx-scroll-view>
      </div>
    </dx-popup>
  </div>
</template>

<script>
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

export default {
  components: {
    DxAdapter,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,
    DxValidator,
    DxValidationGroup,
    DxValidationSummary,
    DxScrollView,
    DxTextArea,
    DxCheckBox,
    DxSelectBox,
    DxDateBox,
    DxNumberBox,
    DxButton,
    DxTextBox,
    DxPopup
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    acoes: {
      type: Object,
      default: { editarData: false, editarValor: false }
    },
    isShowPopup: {
      type: Boolean,
      default: false
    },
    modo: {
      type: Number,
      default: 0
    },
    status: {
      type: Array,
      default: []
    }
  },

  watch: {
    item: function(e) {
      console.log("watch ", e);
      this.dados = {
        id: e.id,
        installmentNumber: e.installmentNumber,
        tid: e.tid,
        payDay: e.payDay,
        status: e.status,
        brand: e.brand,
        value: e.value,
        receber_id: e.receber_id
      };
      this.showDisabled = e.id <= 0 ? false : true;
      this.showData = this.acoes.editarData ? true : false;
      this.showValor = this.acoes.editarValor ? true : false;
      if (this.receber.meioPgto === "koi") {
        this.showStatus = true;
      } else {
        this.showStatus = false;
      }
    },

    modo: function(e) {
      this.$forceUpdate();
    },

    isShowPopup: function(e) {
      this.isShow = e;
    }
  },
  mounted() {},

  data() {
    return {
      showDisabled: false,
      showData: false,
      showValor: false,
      showStatus: false,
      dados: {},
      isShow: false
    };
  },

  methods: {
    close() {
      this.$emit("close", false);
    },

    validate(params, modulo) {
      console.log(params);
      const result = params.validationGroup.validate();
      if (result.isValid) {
        if (modulo === "pagarForaSistema") {
          this.pagarForaSistema();
        }
        if (modulo === "naoEnviadoOperadora") {
          this.naoEnviadoOperadora();
        }

        if (modulo === "estornar") {
          this.estornar();
        }

        if (modulo === "cancelarTransacao") {
          this.cancelarTransacao();
        }

        this.$emit("aplicado", this.dados);
        this.close();
        return;
      }
      console.log("naõ validado");
    },

    reenviar() {
      console.log("atualizar reenviar");
    },

    pagarForaSistema() {
      console.log("pagar fora do sistema");
    },

    naoEnviadoOperadora() {
      console.log("naoEnviadoOperadora");
    },

    cancelarTransacao() {
      console.log("cancelarTransacao");
    },

    estornar() {
      console.log("estornar");
    }
  }
};
</script>

<style>
</style>
