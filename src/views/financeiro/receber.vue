<template>
  <div>
    <FormItem
      :item="item"
      :modo="modoItem"
      :status="statusItems"
      :isShowPopup="popupItemVisible"
      @close="popupItemVisible=$event"
      @aplicado="onItemAplicar($event);"
    />

    <div class="content-block-title" id="bloco1">
      <div class="row between-xs" style="margin-top:0px;margin-bottom: 0px;">
        <div class="col-xs-7">
          <h2 class="content-block" v-if="isTitle">Conta a Receber</h2>
        </div>
        <div class="col-xs-5">
          <div class="row end-xs">
            <dx-button
              style="margin-top:30px"
              text="Alterar Cartão"
              type="normal"
              @click="onAlterarCartao"
              :styling-mode="'outlined'"
              :visible="modo === 2 && receber.meioPgto === 'galaxpay'"
            />
            <dx-button
              style="margin-top:30px;margin-left:10px;margin-right:55px;"
              text="Cancelar conta"
              type="danger"
              @click="onCancelarConta"
              :styling-mode="'outlined'"
              :visible="modo === 2 "
            />
          </div>
        </div>
      </div>
    </div>

    <div class="content-block" id="bloco1">
      <div class="dx-card responsive-paddings">
        <dx-validation-group>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="box">
                <!--<span style="margin-left:6px;">Nome *</span>-->
                <span style="margin-left:6px;">
                  <span style="margin-left:0px;">Nome *</span>
                </span>
                <div class="dx-field">
                  <DxSelectBox
                    :search-enabled="true"
                    :data-source="dataSourcePessoas"
                    :search-mode="'contains'"
                    :search-expr="'nome'"
                    :search-timeout="200"
                    :min-search-length="3"
                    :show-data-before-search="false"
                    display-expr="nome"
                    value-expr="id"
                    value
                    :enabled="modo === 1"
                    :disabled="modo === 2"
                    v-model="receber.pessoa_id"
                  >
                    <dx-validator>
                      <dx-required-rule message="Informe o nome do Aluno." />
                    </dx-validator>
                  </DxSelectBox>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="box">
                <span style="margin-left:6px;">Status *</span>
                <div class="dx-field">
                  <dx-select-box
                    :items="listaStatusReceber"
                    :show-clear-button="true"
                    placeholder="Selecione"
                    :disabled="modo !== 1"
                    v-model="receber.status"
                    display-expr="displayName"
                    value-expr="name"
                    :visible="modo !== 1"
                  >
                    <dx-validator>
                      <dx-required-rule message="Informe o status desta conta" />
                    </dx-validator>
                  </dx-select-box>

                  <dx-select-box
                    :items="listaStatusReceber"
                    :show-clear-button="true"
                    placeholder="Selecione"
                    :disabled="false"
                    v-model="receber.status"
                    display-expr="displayName"
                    value-expr="name"
                    :visible="modo === 1"
                  >
                    <dx-validator>
                      <dx-required-rule message="Informe o status desta conta" />
                    </dx-validator>
                  </dx-select-box>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-6 col-sm-3 col-md-3">
              <span style="margin-left:6px;">Cadastro *</span>
              <div class="dx-field">
                <dx-date-box
                  :value="receber.dateFirst"
                  type="date"
                  v-model="receber.dateFirst"
                  :disabled="modo === 2"
                >
                  <dx-validator>
                    <dx-required-rule message="Informe a data de cadastro desta conta" />
                  </dx-validator>
                </dx-date-box>
              </div>
            </div>

            <div class="col-xs-6 col-sm-3 col-md-3">
              <div class="box">
                <span style="margin-left:6px;">Total de Parcelas *</span>
                <div class="dx-field">
                  <dx-number-box value v-model="receber.quantity" :disabled="modo === 2">
                    <dx-validator>
                      <dx-required-rule message="Informe a quantidade total de parcelas." />
                      <dx-range-rule :min="1" message="Informe a quantidade total de parcelas." />
                      <dx-range-rule :max="12" message="É permitido no máximo 12 parcelas." />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="box">
                <span style="margin-left:6px;">Meio de Pagamento *</span>
                <div class="dx-field">
                  <dx-select-box
                    :items="statusMeioPgto"
                    :show-clear-button="true"
                    placeholder="Selecione"
                    v-model="receber.meioPgto"
                    display-expr="value"
                    value-expr="key"
                    :disabled=" modo===2 || items.length > 0"
                  >
                    <dx-validator>
                      <dx-required-rule message="Informe o meio de pagamento" />
                    </dx-validator>
                  </dx-select-box>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-3 col-md-3">
              <div class="box">
                <span style="margin-left:6px;margin-right:16px;">Líquido *</span>
                <div class="dx-field">
                  <dx-number-box
                    v-model="receber.liquido"
                    format="R$ #,##0.##"
                    ref="valorLiquidoRef"
                    :disabled="modo === 2"
                  >
                    <dx-validator>
                      <dx-range-rule :min="0" message="Informe o valor líquido desta conta." />
                      <dx-compare-rule
                        :comparison-target="valorTotalContaComparison"
                        message="Informe um valor válido para esta conta"
                      />
                      <!--<dx-compare-rule
                        :comparison-target="valorLiquidoComparison"
                        message="Informe o valor liquido"
                      />-->
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3">
              <div class="box">
                <span style="margin-left:6px;margin-right:16px;">Desconto</span>
                <div class="dx-field">
                  <dx-number-box
                    v-model="receber.desconto"
                    format="R$ #,##0.##"
                    ref="valorDescontoRef"
                    :disabled="modo === 2"
                  >
                    <dx-validator>
                      <dx-range-rule :min="0" message="Informe o valor do desconto." />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3">
              <div class="box">
                <span style="margin-left:6px;margin-right:16px;">Total *</span>
                <div class="dx-field">
                  <dx-number-box
                    v-model="receber.value"
                    format="R$ #,##0.##"
                    ref="valortotalRef"
                    :disabled="true"
                  >
                    <dx-validator>
                      <dx-range-rule :min="0" message="Informe o valor total da conta." />
                    </dx-validator>
                  </dx-number-box>
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-3 col-md-3">
              <!--<dx-button
                v-show="modo > 0 && receber.value > 0"
                style="margin-top:25px"
                text="Gerar parcelas"
                type="danger"
                @click="gerar"
              />-->
            </div>
          </div>
          <!--
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <dx-list :items="items" item-template="my-template">
                <div slot="my-template" slot-scope="{ data }">
                  <i>This is my template for {{data}}</i>
                  <div class="box">
                    <span style="margin-left:6px;">Total de Parcelas</span>
                    <div class="dx-field">
                      <dx-number-box value v-model="data.value">
                        <dx-validator>
                          <dx-range-rule
                            :min="1"
                            message="Informe a quantidade total de parcelas."
                          />
                          <dx-range-rule :max="12" message="É permitido no máximo 12 parcelas."/>
                        </dx-validator>
                      </dx-number-box>
                    </div>
                  </div>
                  <div class="box">
                    <span style="margin-left:6px;">Total de Parcelas</span>
                    <div class="dx-field">
                      <dx-text-box value v-model="data.status"></dx-text-box>
                    </div>
                  </div>
                </div>
              </dx-list>
            </div>
          </div>-->
          <div class="row left-xs" style="margin-left: 0px;margin-top:0px;margin-bottom: 6px;">
            <dx-button
              style="margin-top:25px"
              text="Adicionar"
              type="normal"
              @click="addItem"
              :styling-mode="'outlined'"
            />
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <dx-data-grid
                ref="grid"
                :data-source="items"
                :show-borders="true"
                key-expr="id"
                :selection="{ mode: 'single' }"
                :hover-state-enabled="true"
                @selection-changed="onSelectionChanged"
                @editorPreparing="onEditorPreparing"
                @rowInserting="onRowInserted"
                :rowInserting="addRow"
              >
                <!--<dx-editing
                  :allow-adding="true"
                  :allow-updating="true"
                  :allow-deleting="true"
                  :select-text-on-edit-start="true"
                  :start-edit-action="'click'"
                  mode="batch"
                />-->

                <dx-paging :enabled="false" />
                <dx-column
                  caption="Ações"
                  :width="110"
                  :buttons="editButtons"
                  ref="btn"
                  type="buttons"
                />
                <dx-column :width="70" data-field="installmentNumber" caption="Parcela" />
                <dx-column data-field="payDay" data-type="date" caption="Vencimento" />
                <dx-column data-field="value" caption="Valor" />
                <dx-column :width="60" data-field="brand" />
                <!--<dx-column :width="125" data-field="status" caption="Status" />-->

                <dx-column caption="Status" cell-template="cellTemplate" :allowEditing="false" />

                <div slot="cellTemplate" slot-scope="data">
                  <span>{{statusGrid(data)}}</span>
                </div>
              </dx-data-grid>

              <!--<div class="options">
                <div class="caption">Options</div>
                <div class="option">
                  <dx-check-box text="Select Text on Edit Start"/>
                </div>
                <div class="option">
                  <span>Start Edit Action</span>
                  <dx-select-box :items="['click', 'dblClick']"/>
                </div>
              </div>-->
            </div>
          </div>

          <div class="row end-xs" style="margin-top:32px;margin-bottom: 25px;">
            <div class="col-xs-12">
              <div class="box">
                <dx-button
                  text="Gravar"
                  type="success"
                  @click="validate"
                  v-if="receber.meioPgto === 'koi'"
                />
                <dx-button
                  text="Enviar para GalaxPay"
                  type="success"
                  @click="validate"
                  v-if="receber.meioPgto === 'galaxpay' && modo === 1"
                />
                <dx-button text="Abandonar" style="margin-left:8px;" @click="cancelar" />
              </div>
            </div>
          </div>
        </dx-validation-group>
      </div>
    </div>
  </div>
</template>

<script>
import { loading } from "@/global";
import notify from "devextreme/ui/notify";
import DxPopup from "devextreme-vue/popup";
import FormItem from "./receber-item";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
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
  DxSelectBox,
  DxDateBox,
  DxNumberBox,
  DxButton,
  DxTextBox
} from "devextreme-vue";

import {
  DxDataGrid,
  DxColumn,
  DxPaging,
  DxEditing,
  DxLookup
} from "devextreme-vue/data-grid";

import ServicePessoa from "../../services/Pessoa";
import ServiceReceber from "../../services/Receber";
import ServiceStatusTransction from "../../services/StatusTransaction";

ServiceStatusTransction.getStatusTransaction();

import { constants } from "crypto";

const decimalFormatter = new Intl.NumberFormat("pt-BR", {
  style: "decimal",
  currency: "BRL",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2
});

const dataSourcePessoas = new DataSource({
  store: new CustomStore({
    //loadMode: "raw",
    key: "id",

    byKey: key => {
      console.log("buscando byKey ", key);
      if (parseInt(key) < 0) {
        console.log("entrou ");
        return {};
      }
      console.log("naõ entrou");
      return ServicePessoa.getPessoas(key);
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

      return ServicePessoa.getPessoaIndex(o);
    }
  })
});

export default {
  components: {
    DxValidator,
    DxValidationGroup,
    DxValidationSummary,
    DxScrollView,
    DxSelectBox,
    DxDateBox,
    DxNumberBox,
    DxButton,
    DxTextBox,
    DxAdapter,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule,

    DxDataGrid,
    DxColumn,
    DxPaging,
    DxEditing,
    DxLookup,
    FormItem,
    DxPopup
  },
  props: {
    id1: {
      type: [String, Number],
      default: -1
    },
    isPopup: {
      type: Boolean,
      default: false
    },
    isTitle: {
      type: Boolean,
      default: true
    }
  },

  beforeRouteEnter(to, from, next) {
    loading();
    const id = parseInt(to.params.id);
    if (!id || id === -1) {
      next(vm => {
        vm.receber = vm.receberDefault;
        return true;
      });
      loading();
    } else {
      ServiceReceber.getReceber(id)
        .then(r => {
          next(vm => {
            r.quantity = parseInt(r.quantity);
            vm.receber = r;
            vm.items = r.receberItems;
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

  mounted() {
    window.w = this;
  },

  data() {
    const dsPessoa = dataSourcePessoas;

    return {
      modo: parseInt(this.$route.params.id) > 0 ? 2 : 1,
      modoItem: 0,

      popupItemVisible: false,

      dataSourcePessoas: dsPessoa,
      items: [],

      item: {},

      statusMeioPgto: [
        { key: "galaxpay", value: "GALAXPAY" },
        { key: "koi", value: "KOI" }
      ],

      statusItems: [],

      editButtons: [
        {
          hint: "Editar",
          icon: "edit",
          visible: true,
          disable: false,
          onClick: this.onItemEditClick,
          ref: "btnEdit"
        },
        {
          hint: "Excluir",
          icon: "trash",
          visible: this.onVisibleExcluirGrade,
          onClick: this.onDeleteClickGrade
        }
      ],

      id:
        parseInt(this.$route.params.id) > 0
          ? parseInt(this.$route.params.id)
          : -1,
      newId: 0,
      receber: {
        meioPgto: "",
        liquido: 0.0,
        desconto: 0.0,
        value: 0.0,
        quantity: 0,
        dateFirst: "",
        status: ""
      },
      receberDefault: {
        meioPgto: "",
        liquido: 0.0,
        desconto: 0.0,
        value: 0.0,
        quantity: 0,
        dateFirst: "",
        status: ""
      },

      valorTotalContaComparison: () => {
        console.log("calculando..... ");
        let liquido = _.isUndefined(this.receber.liquido)
          ? null
          : this.receber.liquido;
        let desconto = _.isUndefined(this.receber.desconto)
          ? 0.0
          : this.receber.desconto;
        let total = this.receber.value;

        if (!liquido) {
          console.log(2);
          return 1;
        }

        if (liquido - desconto <= 0) {
          console.log(3);
          return false;
        }

        if (liquido === 0) {
          console.log(4);
          return -1;
        }
        console.log(5);
        return liquido;
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
    },

    total() {
      let total = this.receber.liquido - this.receber.desconto;
      if (total) {
        return total;
      }
      return 0;
    },

    statusTransaction() {
      const status = this.$store.getters["transaction/statusTransactions"];
      let arr = [];
      status.forEach(e => {
        if (e.status === "galaxpay") {
          arr.push(e);
        }
      });
      return arr;
    },

    statusTransactionKoi() {
      const status = this.$store.getters["transaction/statusTransactions"];
      let arr = [];
      status.forEach(e => {
        if (e.status === "koi") {
          arr.push(e);
        }
      });
      return arr;
    },

    listaStatusReceber() {
      return this.$store.getters["transaction/statusReceber"];
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

    total: function(t) {
      console.log("total ", t);
      this.receber.value = t;
    },

    id: function(e) {
      console.log("watch modo ", e);
      this.modo = 1;
      if (e === undefined) {
        this.id = -1;
        return;
      }
      if (parseInt(e) > 0) {
        this.modo = 2;
      }
    }
  },

  methods: {
    onVisibleExcluirGrade(e) {
      console.log("visible ", e);
      if (e.row.data.status === "transmitir") {
        return true;
      }
      return false;
    },

    onDeleteClickGrade(e) {
      console.log("deletando... ", e);
      const id = e.row.data.id;
      this.items.forEach((o, index) => {
        if (o.id === id) {
          this.items.splice(index);
        }
      });
    },

    addItem() {
      const value = this.receber.value;
      const quantity = this.receber.quantity;
      const meioPgto = this.lodash.isEmpty(this.receber.meioPgto);
      if (value <= 0 || quantity <= 0 || meioPgto)
        return this.mensagem("Primeiro informe os dados desta conta.");

      const valor = parseFloat(decimalFormatter.format(value / quantity));

      if (this.receber.meioPgto === "koi") {
        this.statusItems = this.statusTransactionKoi;
      } else {
        //if (this.modo === 1) {
        this.statusItems = [
          {
            name: "transmitir",
            displayName: "Transmitir",
            status: "galaxpay"
          }
        ];
        //} else {
        //  this.statusItems = this.statusTransaction;
        //}
      }

      this.newId--;
      const dados = {
        id: this.newId,
        installmentNumber: 0,
        tid: "",
        payDay: "",
        status: this.receber.meioPgto === "koi" ? "emAberto" : "transmitir",
        brand: "",
        value: valor,
        receber_id: this.receber.receber_id
      };

      this.item = dados;
      this.modoItem = 1;
      this.popupItemVisible = !this.popupItemVisible;
    },

    onItemEditClick(e) {
      const item = e.row.data;
      this.item = item;
      this.modoItem = 2;
      this.popupItemVisible = !this.popupItemVisible;
    },

    onItemAplicar(item) {
      console.log("aplicar....");
      console.log(item, this.items);

      const modo = this.modoItem;
      if (modo === 1) {
        this.items.push(item);
        return;
      }
      this.items.forEach((e, i) => {
        if (e.id === item.id) {
          this.items[i].brand = item.item;
          this.items[i].id = item.id;
          this.items[i].installmentNumber = item.installmentNumber;
          this.items[i].payDay = item.payDay;
          this.items[i].receber_id = item.receber_id;
          this.items[i].status = item.status;
          this.items[i].tid = item.tid;
          this.items[i].value = item.value;
        }
      });

      /*this.item = {
        brand: item.item,
        id: item.id,
        installmentNumber: item.installmentNumber,
        payDay: item.payDay,
        receber_id: item.receber_id,
        status: item.status,
        tid: item.tid,
        value: item.value
      };*/
    },

    onSelectionChanged(e) {
      console.log("onSelectionChanged ", e);
    },

    addRow(e) {
      console.log("addRow ", e);
    },

    onRowInserted(e) {
      console.log("onRowInserting acionado ", e);
      throw "falhou a inserção";
      return false;
    },

    onEditorPreparing(e) {
      console.log("onEditorPreparing ", e);

      if (e.parentType === "dataRow" && e.dataField === "status") {
        e.editorOptions.disabled = true; //typeof e.row.data.StateID !== "number";
      }
    },

    selectionChanged(e) {
      console.log("selectionChanged ", selectionChanged);
    },

    mensagem(m) {
      const position = {
        at: "center center",
        of: "#bloco1"
      };
      notify(
        {
          message: m,
          position,
          width: 300,
          shading: true
        },
        "error",
        3000
      );
    },

    statusGrid(item) {
      const status = item.data.data.status;
      const arr =
        this.receber.meioPgto === "koi"
          ? this.statusTransactionKoi
          : this.statusTransaction;
      const o = this.lodash.find(arr, { name: status });
      return o.displayName;
    },

    temItem() {
      if (this.items.length === 0) {
        const position = {
          at: "center center",
          of: "#bloco1"
        };
        notify(
          {
            message: "Informe um item de recebimento.",
            position,
            width: 300,
            shading: true
          },
          "error",
          3000
        );
        return false;
      }
      return true;
    },

    validate(params) {
      console.log("validando... ");
      console.log(params);
      const result = params.validationGroup.validate();
      if (result.isValid) {
        // form data is valid
        //params.validationGroup.reset();

        if (result.isValid) {
          if (!this.temItem()) {
            return;
          }
          console.log("passou na validação ");

          if (this.modo === 1) {
            let result = this.prepararAdd();
            return;
          } else {
            //const
          }

          return;
          let payload = this.preparar();
          if (this.lodash.has(payload, "id")) {
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

    gerar() {
      this.newId--;
      let id = this.newId;
      let parcelas = {
        id,
        installmentNumber: "2",
        tid: "5tid",
        payDay: "2019-07-17",
        status: "ativo",
        brand: "visa",
        value: 750.0,
        receber_id: 2
      };

      this.items.push(parcelas);
    },

    onAlterarCartao() {},

    onCancelarConta() {},

    cancelar() {
      if (this.isPopup) this.$emit("close", false);
      else this.$router.push({ name: "recebers" });
    }
  }
};
</script>

<style scoped>
.content-block {
  padding-top: 3px;
  padding-bottom: 0px !important;
  padding-right: 10px;
  padding-left: 10px;
}

.content-block-title {
  padding-top: 0px;
  padding-bottom: 0px !important;
  padding-right: 10px;
  padding-left: 0px;
}
</style>


/*

      dataSourceItems: new DataSource({
        store: new CustomStore({
          key: "id",
          load: () => {
            const data = ServiceReceber.getReceber(this.id);
            console.log("load data= ", data);
            console.log("newId ", this.newId);
            return data;
          },
          insert: values => {
            console.log("insert ", values);

            return values;
            /*this.sendRequest(`${URL}/InsertOrder`, "POST", {
            values: JSON.stringify(values)
          }),    */
          },

          update: (key, values) => {
            console.log("update ", key, " value= ", values);
            throw "falha";
            return false;
            /*this.sendRequest(`${URL}/UpdateOrder`, "PUT", {
            key: key,
            values: JSON.stringify(values)
          }),      */
          },

          remove: key => {
            console.log("removendo.... ", key);
            return "";
            /*this.sendRequest(`${URL}/DeleteOrder`, "DELETE", {
            key: key
          })*/
          }
        })
      }),


*/