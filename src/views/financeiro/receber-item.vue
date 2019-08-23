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
      :maxWidth="680"
      :maxHeight="360"
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
                  <span style="margin-left:6px;margin-right:16px;">Líquido *</span>
                  <div class="dx-field">
                    <dx-number-box
                      v-model="dados.liquido"
                      format="R$ #,##0.##"
                      :disabled="showValor"
                    ></dx-number-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-3 col-md-3">
                <div class="box">
                  <span style="margin-left:6px;margin-right:16px;">Desconto *</span>
                  <div class="dx-field">
                    <dx-number-box
                      v-model="dados.desconto"
                      format="R$ #,##0.##"
                      :disabled="showValor"
                    ></dx-number-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <div class="box">
                  <span style="margin-left:6px;margin-right:16px;">Valor *</span>
                  <div class="dx-field">
                    <dx-number-box v-model="dados.value" format="R$ #,##0.##" :read-only="true">
                      <dx-validator>
                        <dx-compare-rule
                          :comparison-target="valorTransacaoComparison"
                          message="Informe o valor da transação"
                        />
                      </dx-validator>
                    </dx-number-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-5 col-md-5">
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
                        <dx-required-rule message="Informe o status da transação" />
                      </dx-validator>
                    </dx-select-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="box">
                  <a style="margin-left:6px;" href="#" @click="onDetalhesConta">Detalhes da conta</a>
                </div>
              </div>
            </div>

            <div class="row end-xs" style="margin-top:32px;margin-bottom: 0px;">
              <div class="col-xs-12">
                <div class="box">
                  <!--<dx-button
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
                  />-->

                  <dx-button
                    text="Pagar fora do sistema"
                    type="success"
                    @click="validate($event,'pagarForaSistema')"
                    v-if="acoes.pagarForaSistema"
                    style="margin-left:5px;margin-rigth: 5px;"
                  />
                  <!--<dx-button
                    text="Status - não enviado operadora"
                    type="success"
                    @click="validate($event,'naoEnviadoOperadora')"
                    v-if="acoes.naoEnviadoOperadora"
                    style="margin-left:5px;margin-rigth: 5px;"
                  />-->

                  <!--<dx-button
                    text="Estornar"
                    type="success"
                    @click="validate($event,'estornar')"
                    v-if="acoes.estornar"
                    style="margin-left:5px;margin-rigth: 5px;"
                  />-->

                  <dx-button
                    :text="TextButtonGravar"
                    type="success"
                    @click="validate($event,'gravarManual')"
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

    <dx-popup
      :visible.sync="popupDetalhesConta"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      class="popup"
      title
      titleTemplate="<div style='padding: 5px;font-size: 16px;'><b>Detalhes</b></div>"
      content-template="myContent"
      :maxWidth="680"
      :maxHeight="500"
    >
      <div slot="myContent" slot-scope="data">
        <div class="form">
          <div class="dx-fieldset">
            <div class="dx-field">
              <div class="dx-field-label">Código</div>
              <div class="dx-field-value">
                <dx-number-box v-model="item.id" :read-only="true" />
              </div>
            </div>

            <div class="dx-field">
              <div class="dx-field-label">Código (Galaxpay)</div>
              <div class="dx-field-value">
                <dx-text-box :value.sync="item.paymentBillInternalId" :read-only="true" />
              </div>
            </div>

            <div class="dx-field">
              <div class="dx-field-label">Código interno</div>
              <div class="dx-field-value">
                <dx-text-box :value.sync="item.paymentBillIntegrationId" :read-only="true" />
              </div>
            </div>

            <div class="dx-field">
              <div class="dx-field-label">Código autorização</div>
              <div class="dx-field-value">
                <dx-text-box :value.sync="item.authorizationCode" :read-only="true" />
              </div>
            </div>

            <div class="dx-field">
              <div class="dx-field-label">Link</div>
              <div class="dx-field-value">
                <dx-text-box :value.sync="item.link" :read-only="true" />
              </div>
            </div>

            <div class="dx-field">
              <div class="dx-field-label">Info</div>
              <div class="dx-field-value">
                <dx-text-box :value.sync="item.additionalInfo" :read-only="true" />
              </div>
            </div>
          </div>
        </div>

        <div class="row end-xs" style="margin-right:5px;">
          <div class="col-xs-12">
            <div class="box">
              <dx-button text="Fechar" style="margin-left:8px;" @click="popupDetalhesConta=false" />
            </div>
          </div>
        </div>
      </div>
    </dx-popup>
  </div>
</template>

<script>
import DxPopup from "devextreme-vue/popup";
import ServiceReceber from "../../services/Receber";

import notify from "devextreme/ui/notify";
import { loading } from "@/global";
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
    },
    receber: {
      type: Object,
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
        statusDescription: e.statusDescription,
        brand: e.brand,
        liquido: e.liquido,
        desconto: e.desconto,
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
      if (_.has(this.receber, "id")) {
        if (this.receber.id > 0) {
          this.TextButtonGravar = "Gravar";
        } else {
          this.TextButtonGravar = "Confirmar";
        }
      } else {
        this.TextButtonGravar = "Confirmar";
      }
    },

    isShowPopup: function(e) {
      this.isShow = e;
    },

    "dados.liquido": function(e) {
      console.log("liquido");
      if (e <= 0) this.dados.value = 0.0;

      this.dados.value = e - this.dados.desconto;
    },
    "dados.desconto": function(e) {
      console.log("desconto");
      this.dados.value = this.dados.liquido - e;
    },
    "dados.status": function(e) {
      const status = e;
      let oStatus = _.find(this.status, { name: this.dados.status });
      this.dados.statusDescription = oStatus.displayName;
    }
  },
  mounted() {},

  data() {
    return {
      TextButtonGravar: "Gravar",
      popupDetalhesConta: false,
      showDisabled: false,
      showData: false,
      showValor: false,
      showStatus: false,
      dados: {},
      isShow: false,

      valorTransacaoComparison: () => {
        let value = _.isUndefined(this.dados.value) ? null : this.dados.value;

        if (!value) {
          return 1;
        }

        if (value === 0) {
          return 1;
        }

        return value;
      }
    };
  },

  methods: {
    onDetalhesConta() {
      this.popupDetalhesConta = true;
    },

    close() {
      this.$emit("close", false);
    },

    validate(params, modulo) {
      console.log(params);
      const result = params.validationGroup.validate();
      if (result.isValid) {
        /*let status = this.dados.status;
        let oStatus = _.find(this.status, { name: this.dados.status });
        this.dados.statusDescription = oStatus.displayName;*/

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

        if (modulo === "gravarManual") {
          if (this.modo === 2) {
            this.gravarManualUpdate();
          } else {
            this.gravarManualAdd();
          }
        }

        /*this.$emit("aplicado", this.dados);
        this.close();*/
        return;
      }
      console.log("naõ validado");
    },

    reenviar() {
      console.log("atualizar reenviar");
    },

    pagarForaSistema() {
      console.log("pagar fora do sistema");
      const id = this.item.id;

      loading();

      const resposta = ServiceReceber.pagarForaSistema(id)
        .then(res => {
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          loading();
          if (res.type) {
            notify(
              {
                message: res.message,
                position,
                width: 300,
                shading: true
              },
              "success",
              3000
            );
          } else {
            notify(
              {
                message: res.message,
                position,
                width: 300,
                shading: true
              },
              "success",
              3000
            );
          }

          this.$emit("aplicado", this.dados);
          //res.receber.quantity = parseInt(res.receber.quantity);
          //res.receberStatus = res.receber.statusDescription;
          //this.$emit("atualizarReceber", res.receber);
          this.close();
        })
        .catch(error => {
          loading();
          console.log("erro ", error);
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Ocorreu uma falha na transação.",
              position,
              width: 300,
              shading: true
            },
            "error",
            4000
          );
        });
    },

    naoEnviadoOperadora() {
      console.log("naoEnviadoOperadora");
    },

    cancelarTransacao() {
      console.log("cancelarTransacao");
    },

    estornar() {
      console.log("estornar");
    },

    async gravarManualUpdate() {
      const ID = this.receber.id;
      let item = _.cloneDeep(this.dados);
      item.receber_id = ID;

      const resposta = ServiceReceber.updateReceberItem(item)
        .then(res => {
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Transação realizada com sucesso.",
              position,
              width: 300,
              shading: true
            },
            "success",
            3000
          );

          this.$emit("aplicado", this.dados);
          res.receber.quantity = parseInt(res.receber.quantity);
          res.receberStatus = res.receber.statusDescription;
          this.$emit("atualizarReceber", res.receber);
          this.close();
        })
        .catch(error => {
          console.log("erro ", error);
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Ocorreu uma falha na transação.",
              position,
              width: 300,
              shading: true
            },
            "error",
            4000
          );
        });
    },

    async gravarManualAdd() {
      const ID = this.receber.id;

      if (!ID) {
        this.$emit("aplicado", this.dados);
        this.close();
        return;
      }
      let item = _.cloneDeep(this.dados);
      item.receber_id = ID;

      const resposta = ServiceReceber.addReceberItem(item)
        .then(res => {
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Transação realizada com sucesso.",
              position,
              width: 300,
              shading: true
            },
            "success",
            3000
          );
          this.dados.id = res.item.id;

          this.$emit("aplicado", this.dados);
          res.receber.quantity = parseInt(res.receber.quantity);
          res.receberStatus = res.receber.statusDescription;
          this.$emit("atualizarReceber", res.receber);
          this.close();
        })
        .catch(error => {
          console.log("erro ", error);
          const position = {
            at: "center center",
            of: "#bloco1"
          };
          notify(
            {
              message: "Ocorreu uma falha na transação.",
              position,
              width: 300,
              shading: true
            },
            "error",
            4000
          );
        });
    }
  }
};
</script>

<style>
</style>
