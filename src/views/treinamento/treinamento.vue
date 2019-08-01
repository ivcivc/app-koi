<template>
  <div>
    <h2 class="content-block">{{titulo}}</h2>

    <div class="right-id" v-if="id">ID # {{id}}</div>

    <div class="content-block" id="bloco1">
      <div class="dx-card responsive-paddings">
        <div id="form-container">
          <form action="your-action" @submit="handleSubmit($event)" ref="form">
            <dx-form
              id="form"
              :read-only="false"
              :col-count="2"
              :form-data.sync="treinamento"
              :show-validation-summary="true"
              :show-colon-after-label="true"
              :on-content-ready="validateForm"
            >
              <dx-item :items="groupedItems.dados" item-type="group" caption />
            </dx-form>
          </form>
          <div style="float: left; margin-top:20px">
            <dx-button text="Gravar" type="success" @click="gravar" style="margin-right:10px" />
            <dx-button text="Cancelar" @click="cancelar" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

import Service from "../../services/Treinamento";
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
  props: ["id"],

  beforeRouteEnter(to, from, next) {
    loading();
    const id = to.params.id;
    if (!id) {
      loading();
      return next();
    }
    Service.getTreinamento(id)
      .then(r => {
        next(vm => {
          vm.treinamento = r;
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
      titulo: "Cadastro de Treinamento",
      treinamento: {},
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true
      },
      validationRules: {
        status: [{ type: "required", message: "Informe o status" }],
        nome: [{ type: "required", message: "Informe do Treinamento" }]
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
            dataField: "valorBaseAVista",
            label: { text: "Valor à vista" },
            editorOptions: {
              format: "R$ #,##0.##"
            },
            editorType: "dxNumberBox"
          },

          {
            dataField: "valor",
            label: { text: "Valor à prazo" },
            editorOptions: {
              format: "R$ #,##0.##"
            },
            editorType: "dxNumberBox",
            validationRules: [
              {
                type: "compare",
                comparisonTarget: "validadarValorPrazo",
                message: "Informe o Status do treinamento."
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
                message: "Informe o Status do treinamento."
              }
            ]
          }
        ]
      }
    };
  },

  methods: {
    validadarValorPrazo: () => {
      return 100;
    },

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

      let data = _.cloneDeep(this.treinamento);

      console.log("gravar ", data);

      if (_.has(data, "id")) {
        Service.updateTreinamento(data)
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
        Service.addTreinamento(data)
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
      this.$router.push({ name: "treinamentos" });
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