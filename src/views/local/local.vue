<template>
  <div>
    <h2 class="content-block">{{titulo}}</h2>

    <div class="right-id" v-if="id">ID # {{id}}</div>

    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <div id="form-container">
          <form action="your-action" @submit="handleSubmit($event)" ref="form" autocomplete="off">
            <dx-form
              id="form"
              :read-only="false"
              :col-count="2"
              :form-data.sync="local"
              :show-validation-summary="true"
              :show-colon-after-label="true"
              :on-content-ready="validateForm"
            >
              <dx-item :items="groupedItems.dadosPessoais" item-type="group" caption/>
              <dx-item :items="groupedItems.endereco" item-type="group" caption="Endereço"/>
              <dx-item
                :items="groupedItems.info"
                item-type="group"
                caption="Anotações"
                :col-span="2"
              />
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

import Service from "../../services/Local";
import notify from "devextreme/ui/notify";

import { DxButton } from "devextreme-vue";
import { DxForm, DxItem, DxTagBox, DxButtonItem } from "devextreme-vue/form";
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

export default {
  components: {
    DxForm,
    DxItem,
    DxTagBox,
    DxButton,
    DxButtonItem,

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

    Service.getLocais(id)
      .then(r => {
        next(vm => {
          vm.local = r;
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
      titulo: "Cadastro de Locais",
      local: {},
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true
      },
      validationRules: {
        situacao: [{ type: "required", message: "Informe o status" }],
        grupos: [{ type: "required", message: "Informe o grupo" }],
        dnasc: [
          {
            type: "required",
            message: "Informe a data de nascimento."
          }
        ]
      },
      groupedItems: {
        dadosPessoais: [
          {
            dataField: "nome",
            label: { text: "Nome" },
            validationRules: [
              {
                type: "required",
                message: "Informe o campo nome."
              },
              {
                type: "stringLength",
                min: 3,
                max: 30,
                message: "O campo nome deve conter pelo menos 3 caracteres"
              }
            ]
          },
          {
            dataField: "contato",
            label: { text: "Contato" },
            validationRules: [
              {
                type: "required",
                message: "Informe o campo contato."
              },
              {
                type: "stringLength",
                min: 3,
                max: 20,
                message: "O campo contato deve conter de 3 a 20 caracteres"
              }
            ]
          },
          {
            dataField: "tel_com",
            editorOptions: {
              showClearButton: true,
              mask: "(00) 0000-0000"
              //maskRules: { X: /[02-9]/ }
            },
            label: { text: "Residencial" }
          },
          {
            dataField: "tel_com2",
            editorOptions: {
              showClearButton: true,
              mask: "(00) 0000-0000"
              //maskRules: { X: /[02-9]/ }
            },
            label: { text: "Comercial" }
          },
          {
            dataField: "tel_celular",
            editorOptions: {
              showClearButton: true,
              mask: "(00) 00000-0000"
              //maskRules: { X: /[02-9]/ }
            },
            label: { text: "WhatsApp" }
          },
          {
            dataField: "tel_celular2",
            editorOptions: {
              showClearButton: true,
              mask: "(00) 00000-0000"
              //maskRules: { X: /[02-9]/ }
            },
            label: { text: "Celular" }
          },
          {
            dataField: "email",
            label: { text: "Email" },
            validationRules: [
              {
                type: "email",
                message: "Informe um email válido"
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
                message: "Informe a situação."
              }
            ]
          }
        ],

        endereco: [
          {
            dataField: "logradouro",
            label: { text: "Logr." },
            editorOptions: {
              autocomplete: "off",
              activeStateEnabled: true
            }
          },
          {
            dataField: "compl",
            label: { text: "compl." },
            editorOptions: {
              spellcheck: false,
              autocomplete: "off"
            }
          },
          {
            dataField: "bairro",
            label: { text: "Bairro." }
          },
          {
            dataField: "cidade",
            label: { text: "Cidade" }
          },
          {
            dataField: "estado",
            label: { text: "Estado" }
          },
          {
            dataField: "cep",
            label: { text: "Cep" },
            editorOptions: {
              showClearButton: true,
              mask: "00.000-000"
            }
          }
        ],

        info: [
          {
            dataField: "nota",
            label: {
              text: "Anotações",
              visible: false
            },
            editorType: "dxTextArea",
            editorOptions: { height: 135 }
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

      let data = _.cloneDeep(this.local);

      if (_.has(data, "id")) {
        Service.updateLocal(data)
          .then(res => {
            //commit('setUsers', res.data)
            console.log("gravando....");
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
        Service.addLocal(data)
          .then(res => {
            console.log("gravando....");
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
              2000
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
      this.$router.push({ name: "locais" });
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