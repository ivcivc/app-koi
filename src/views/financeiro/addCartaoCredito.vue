<template>
  <div>
    <dx-popup
      :visible.sync="isShow"
      :drag-enabled="true"
      :close-on-outside-click="false"
      :show-title="true"
      class="popup"
      title
      titleTemplate="<div style='padding: 5px;font-size: 16px;'><b>Cartão de Crédito</b></div>"
      content-template="myContent"
      :maxWidth="580"
      :maxHeight="330"
    >
      <div slot="myContent" slot-scope="data">
        <dx-scroll-view>
          <dx-validation-group>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="box">
                  <span style="margin-left:6px;">Nome escrito no cartão *</span>
                  <div class="dx-field">
                    <dx-text-box value v-model="dados.cardName">
                      <dx-validator>
                        <dx-string-length-rule
                          :min="3"
                          message="Informe o nome escrito no cartão."
                        />
                      </dx-validator>
                    </dx-text-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="box">
                  <span style="margin-left:6px;">
                    <span style="margin-left:0px;">Bandeira *</span>
                  </span>
                  <div class="dx-field">
                    <DxSelectBox
                      :search-enabled="true"
                      :data-source="bandeiras"
                      :search-mode="'contains'"
                      :search-expr="'name'"
                      :search-timeout="200"
                      :min-search-length="0"
                      :show-data-before-search="false"
                      display-expr="name"
                      value-expr="internalName"
                      value
                      v-model="dados.internalName"
                    >
                      <dx-validator>
                        <dx-required-rule message="Informe o nome da bandeira do cartão." />
                      </dx-validator>
                    </DxSelectBox>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <div class="box">
                  <span style="margin-left:6px;">Número do Cartão *</span>
                  <div class="dx-field">
                    <dx-text-box value mask="0000 0000 0000 0009" v-model="dados.cardNumber">
                      <dx-validator>
                        <dx-string-length-rule
                          :min="3"
                          message="Informe o número do cartão de crédito."
                        />
                      </dx-validator>
                    </dx-text-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-4 col-md4">
                <div class="box">
                  <span style="margin-left:6px;">Validade *</span>
                  <div class="dx-field">
                    <dx-text-box
                      mask="00/0000"
                      value.sync="dados.cardValidate"
                      v-model="dados.cardValidate"
                    >
                      <dx-validator>
                        <dx-compare-rule
                          :comparison-target="ruleValidate"
                          message="Informe o mês/ano do cartão de crédito. Ex: 01/2025"
                        />
                      </dx-validator>
                    </dx-text-box>
                  </div>
                </div>
              </div>

              <div class="col-xs-12 col-sm-6 col-md6">
                <div class="box">
                  <span style="margin-left:6px;">Código de Segurança *</span>
                  <div class="dx-field">
                    <dx-text-box value mask="0009" v-model="dados.cardCode">
                      <dx-validator>
                        <dx-string-length-rule :min="3" message="Informe o código de segurança." />
                      </dx-validator>
                    </dx-text-box>
                  </div>
                </div>
              </div>
            </div>
            <div class="row end-xs">
              <div class="col-xs-12">
                <div class="box">
                  <dx-button
                    style="margin-left:5px;margin-right: 10px;"
                    text="Confirmar"
                    type="success"
                    @click="validate"
                  />
                  <dx-button
                    style="margin-left:5px;margin-right: 10px;"
                    text="Cancelar"
                    type="normal"
                    @click="close"
                  />
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
import Service from "../../services/Receber";

import notify from "devextreme/ui/notify";

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
    card: {
      type: Object,
      default: null
    },
    data: {
      type: Object,
      default: null
    },
    cartoesList: {
      type: Array,
      default: () => []
    },
    isShowPopup: {
      type: Boolean,
      default: false
    },
    modo: {
      type: Number,
      default: 1
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

  watch: {
    isShowPopup: function(e) {
      this.isShow = e;
    },

    data: function(e) {
      this.dados = e;
    },

    isShow: function(e) {
      if (!e) this.$emit("close", e);
    },

    card: function(e) {
      if (e) this.dados = this.lodash.cloneDeep(e);
      else
        this.dados = {
          cardBrand: "",
          cardCode: "",
          cardName: "",
          cardNumber: "",
          cardValidate: ""
        };
    }
  },

  mounted() {
    this.bandeiras = Service.getBandeiras().then(e => (this.bandeiras = e));
  },

  data() {
    return {
      dados: {},
      isShow: false,
      bandeiras: [],
      ruleValidate: () => {
        let card = this.dados.cardValidate;
        if (card === undefined) return 1;
        if (card.length < 6) {
          return card + "_";
        }
        let mes = parseInt(card.substr(0, 2));
        if (mes > 0 && mes < 13) {
          let ano = parseInt(card.substr(2));
          let anoServidor = new Date().getFullYear();
          if (ano < anoServidor) {
            return card + "_";
          }
          return card;
        }
        return card + "_";
      }
    };
  },

  methods: {
    close() {
      this.isShow = false;
      this.$emit("close", this.isShow);
    },

    validate(params, modulo) {
      const result = params.validationGroup.validate();
      if (result.isValid) {
        this.$emit("aplicado", this.dados);
        this.close();
        return;
      }
      console.log("naõ validado");
    }
  }
};
</script>

<style>
</style>
