<template>
  <div>
    <h2 v-if="isTitle" class="content-block">{{titulo}}</h2>

    <div class="right-id" v-if="id">ID # {{id}}</div>

    <div class="content-block">
      <div class="dx-card responsive-paddings" id="bloco1">
        <div id="form-container">
          <form action="your-action" @submit="handleSubmit($event)" ref="form">
            <dx-form
              id="form"
              :read-only="false"
              :col-count="1"
              :form-data.sync="TipoNegociacao"
              :show-validation-summary="true"
              :show-colon-after-label="true"
              :on-content-ready="validateForm"
            >
              <dx-item :items="groupedItems.dados" item-type="group" caption/>
            </dx-form>
          </form>
          <div style="float: left; margin-top:20px">
            <dx-button text="Gravar" type="success" @click="gravar" style="margin-right:10px"/>
            <dx-button text="Cancelar" @click="cancelar"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { userKey, baseApiUrl, loading } from "@/global";

import { DxButton } from "devextreme-vue";
import {
  DxForm,
  DxItem,
  DxTagBox,
  DxButtonItem,
  DxNumberBox
} from "devextreme-vue/form";
//import service from './data.js'
import "devextreme-vue/text-area";
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule
} from "devextreme-vue/validator";

import Service from "../../services/TipoNegociacao";
import notify from "devextreme/ui/notify";

export default {
  components: {
    DxForm,
    DxItem,
    DxTagBox,
    DxButton,
    DxButtonItem,
    DxNumberBox,

    DxValidator,
    DxRequiredRule,
    DxCompareRule,
    DxEmailRule,
    DxPatternRule,
    DxStringLengthRule,
    DxRangeRule
  },

  props: {
    id: {
      type: ["String", "Numeric"],
      default: undefined
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
    const id = to.params.id;
    if (!id) {
      loading();
      return next();
    }
    Service.getTipoNegociacao(id)
      .then(r => {
        next(vm => {
          vm.TipoNegociacao = r;
          return true;
        });
        loading();
      })
      .catch(error => {
        loading();
        next(false);
      });
  },

  data() {
    const situacoes = ["ATIVO", "INATIVO"];
    return {
      titulo: "Cadastro de Tipo de Negociação",
      TipoNegociacao: {},
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true
      },
      validationRules: {
        status: [{ type: "required", message: "Informe o status" }],
        nome: [{ type: "required", message: "Informe do Tipo de Negociacao" }]
      },
      groupedItems: {
        dados: [
          {
            dataField: "nome",
            label: { text: "Nome" },
            editorOptions: {
              format: "R$ #,##0.##"
            },
            validationRules: [
              {
                type: "required",
                message: "Informe o campo nome."
              }
            ]
          },

          {
            dataField: "status",
            label: {
              text: "Status"
            },
            cssClass: "cssArea",

            editorType: "dxSelectBox",
            editorOptions: {
              hideSelectedItems: true,
              searchEnabled: true,
              items: situacoes
            },
            validationRules: [
              {
                type: "required",
                message: "Informe o Status do Tipo de Negociação."
              }
            ]
          }
        ]
      }
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      return;
    },

    validateForm(e) {
      this.formValidation = e;
      const v = e.component.validate();
    },

    gravar() {
      const validado = this.formValidation.component.validate().isValid;

      if (!validado) {
        console.log("não validado");
        return;
      }

      loading();

      let data = _.cloneDeep(this.TipoNegociacao);

      console.log("gravar ", data);

      if (_.has(data, "id")) {
        Service.updateTipoNegociacao(data)
          .then(res => {
            //commit('setUsers', res.data)
            loading();
            const message = "Gravado com sucesso";
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
              1000
            );
            this.cancelar();
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
      } else {
        Service.addTipoNegociacao(data)
          .then(res => {
            console.log(res);
            loading();
            const message = "Gravado com sucesso";
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
              1000
            );

            this.cancelar();
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
      }
    },

    cancelar() {
      if (this.isPopup) return this.$emit("close", false);
      this.$router.push({ name: "tipoNegociacoes" });
    }
  }
};
</script>

<style scoped >
#form-container {
  margin: 10px;
}

.long-title h3 {
  font-family: "Segoe UI Light", "Helvetica Neue Light", "Segoe UI",
    "Helvetica Neue", "Trebuchet MS", Verdana;
  font-weight: 200;
  font-size: 25px;
  text-align: center;
  margin-bottom: 20px;
}

.right-id {
  position: absolute;
  right: 28px;
  top: 6px;
  font-size: 25px;
}
</style>