<template>
  <div>
    <h2 v-if="isTitle" class="content-block">{{titulo}}</h2>

    <div class="right-id" v-if="id">ID # {{id}}</div>

    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <div id="form-container">
          <form action="your-action" @submit="handleSubmit($event)" ref="form">
            <dx-form
              id="form"
              :read-only="false"
              :col-count="2"
              :form-data.sync="pessoa"
              :show-validation-summary="true"
              :show-colon-after-label="true"
              :on-content-ready="validateForm"
            >
              <dx-item :items="groupedItems.systemInformation" item-type="group" caption />
              <dx-item :items="groupedItems.dadosPessoais" item-type="group" caption />
              <dx-item :items="groupedItems.endereco" item-type="group" caption="Endereço" />
              <dx-item
                :items="groupedItems.contato"
                item-type="group"
                caption="Contato"
                :col-span="1"
              />
              <dx-item :items="groupedItems.tipoPessoa" item-type="group" caption :col-span="1" />
              <dx-item :items="groupedItems.situacao" item-type="group" caption :col-span="1" />
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
import axios from "axios";
import { userKey, baseApiUrl, loading } from "@/global";

import Service from "../../services/Pessoa";

import notify from "devextreme/ui/notify";

import Joi from "@hapi/joi";

import { DxButton } from "devextreme-vue";
import { DxForm, DxItem, DxTagBox, DxButtonItem } from "devextreme-vue/form";
import service from "./data.js";
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

  /*watch: {
    id: function(e) {
      console.log("watch executando....");
      if (!this.lodash.isNull(e)) {
        this.getID(e);
      }
    }
  },*/

  beforeRouteEnter(to, from, next) {
    //console.log("entrando ", to);
    loading();

    const id = to.params.id;
    if (!id) {
      console.log("ID não encontrado no parms do router.... ");
      loading();
      return next();
    }
    //console.log("buscar pessoa ");
    Service.getPessoas(id)
      .then(r => {
        console.log("Encontrei registro ", r);
        next(vm => {
          vm.pessoa = r;
          return true;
        });
        loading();
      })
      .catch(error => {
        loading();
        next(false);
      });
    /*axios
      .get(`${baseApiUrl}/pessoas/${to.params.id}`)
      .then(res => {
        loading();
        next(vm => {
          let grupos = [];
          res.data.grupos.forEach(e => grupos.push(e.id));
          res.data.grupos = grupos;
          vm.pessoa = res.data;
          if (_.isNull(res.data.tel_resid)) vm.pessoa.tel_resid = "";
          if (_.isNull(res.data.tel_com)) vm.pessoa.tel_com = "";
          if (_.isNull(res.data.tel_celular)) vm.pessoa.tel_celular = "";
          if (_.isNull(res.data.tel_celular2)) vm.pessoa.tel_celular2 = "";
        });
      })
      .catch(e => {
        loading();
        next(false);
      });*/
  },

  beforeRouteLeave(to, from, next) {
    // antes de sair
    next();
  },

  data() {
    //const pessoa = service.getPessoa()
    const situacoes = service.getSituacoes();
    const grupos = service.getGrupos();
    const sexos = service.getSexos();
    const camisas = service.getCamisas();
    const estadosCivis = service.getEstadosCivis();

    return {
      titulo: "Cadastro de Pessoas",
      buttonOptions: {
        text: "Register",
        type: "success",
        useSubmitBehavior: true
      },
      formValidation: null,
      pessoa: null,
      situacoes,
      grupos,
      sexos: sexos,
      camisas: camisas,
      estadosCivis: estadosCivis,
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
        systemInformation: [
          {
            dataField: "nome",
            editorOptions: {
              showClearButton: false,
              onChange: e => {
                //console.log("change ", e.component.option("text"));
                //this.pessoa.cracha = e.component.option("text");
              },
              onKeyPress: e => {
                //console.log("keyPress ", e.component.option("text"));
                //this.pessoa.cracha = e.component.option("text");
                //window.ee = e;
              }
            },
            validationRules: [
              {
                type: "required",
                message: "Informe o campo nome."
              },
              {
                type: "stringLength",
                min: 3,
                message: "O campo nome deve conter pelo menos 3 caracteres"
              }
            ]
          },
          {
            dataField: "certificado",
            editorOptions: {
              showClearButton: false
            },
            validationRules: [
              {
                type: "required",
                message: "Informe o campo certificado."
              },
              {
                type: "stringLength",
                min: 3,
                message:
                  "O campo certificado deve conter pelo menos 3 caracteres"
              }
            ]
          },
          {
            dataField: "cracha",
            editorOptions: {
              showClearButton: false
            },
            validationRules: [
              {
                type: "required",
                message: "Informe o campo cracha."
              },
              {
                type: "stringLength",
                min: 3,
                message: "O campo cracha deve conter pelo menos 3 caracteres"
              }
            ]
          },
          "profissao",
          {
            dataField: "camisa",
            label: { text: "Camisa" },
            editorType: "dxSelectBox",
            editorOptions: {
              showClearButton: false,
              hideSelectedItems: true,
              searchEnabled: true,
              items: camisas
            }
          }
        ],
        endereco: [
          {
            dataField: "endereco.logradouro",
            label: { text: "Logr." },
            editorOptions: {
              showClearButton: false,
              autocomplete: "off",
              activeStateEnabled: false
            }
          },
          {
            dataField: "endereco.compl",
            label: { text: "compl." },
            editorOptions: {
              showClearButton: false
            }
          },
          {
            dataField: "endereco.bairro",
            label: { text: "Bairro." },
            editorOptions: {
              showClearButton: false
            }
          },
          {
            dataField: "endereco.cidade",
            label: { text: "Cidade" },
            editorOptions: {
              showClearButton: false
            }
          },
          {
            dataField: "endereco.estado",
            label: { text: "Estado" },
            editorOptions: {
              showClearButton: false
            }
          },
          {
            dataField: "endereco.cep",
            label: { text: "Cep" },
            editorOptions: {
              mask: "00.000-000",
              showClearButton: true
            }
          }
        ],

        dadosPessoais: [
          {
            dataField: "cpf",
            label: { text: "CPF" },
            editorOptions: {
              mask: "000.000.000-00",
              showClearButton: true
            },
            validationRules: [
              {
                type: "required",
                message: "CPF obrigatório"
              }
            ]
          },

          {
            dataField: "rg",
            label: { text: "RG" },
            editorOptions: {
              showClearButton: false
            }
          },

          {
            dataField: "sexo",
            label: { text: "Sexo" },
            editorType: "dxSelectBox",
            editorOptions: {
              hideSelectedItems: true,
              searchEnabled: true,
              items: sexos,
              showClearButton: false
            }
          },

          {
            dataField: "dnasc",
            label: { text: "Data Nasc" },
            editorType: "dxDateBox",
            editorOptions: {
              showClearButton: false
            }
          },

          {
            dataField: "estado_civil",
            label: { text: "Est. Civil" },
            editorType: "dxSelectBox",
            editorOptions: {
              hideSelectedItems: true,
              searchEnabled: true,
              items: estadosCivis,
              showClearButton: false
            }
          }
        ],
        contato: [
          {
            itemType: "tabbed",
            tabPanelOptions: {
              deferRendering: false
            },
            tabs: [
              {
                title: "Telefone",
                items: [
                  {
                    dataField: "tel_resid",
                    editorOptions: {
                      mask: "(00) 0000-0000",
                      showClearButton: true
                      //maskRules: { X: /[02-9]/ }
                    },
                    label: { text: "Residencial" }
                  },
                  {
                    dataField: "tel_com",
                    editorOptions: {
                      mask: "(00) 0000-0000",
                      showClearButton: true
                      //maskRules: { X: /[02-9]/ }
                    },
                    label: { text: "Comercial" }
                  },
                  {
                    dataField: "tel_celular",
                    editorOptions: {
                      mask: "(00) 00000-0000",
                      showClearButton: true,
                      maskRules: { X: /[02-9]/ }
                    },
                    label: { text: "WhatsApp" }
                  },
                  {
                    dataField: "tel_celular2",
                    editorOptions: {
                      mask: "(00) 00000-0000",
                      showClearButton: true,
                      maskRules: { X: /[02-9]/ }
                    },
                    label: { text: "Celular" }
                  }
                ]
              },
              {
                title: "Social",
                items: [
                  {
                    dataField: "facebook",
                    editorOptions: {
                      showClearButton: false
                    }
                  },
                  {
                    dataField: "instagram",
                    editorOptions: {
                      showClearButton: false
                    }
                  },
                  {
                    dataField: "skype",
                    editorOptions: {
                      showClearButton: false
                    }
                  }
                ]
              },
              {
                title: "Email",
                items: [
                  {
                    dataField: "email",
                    label: { text: "Principal" },
                    editorOptions: {
                      showClearButton: false
                    },
                    validationRules: [
                      {
                        type: "email",
                        message: "Informe um email válido"
                      },
                      {
                        type: "required",
                        message: "Informe um email válido"
                      }
                    ]
                  },
                  {
                    dataField: "email2",
                    label: { text: "Alternativo" },
                    editorOptions: {
                      showClearButton: false
                    },
                    validationRules: [
                      {
                        type: "email",
                        message: "Informe um email válido"
                      }
                    ]
                  }
                ]
              },
              {
                title: "Nota",
                items: [
                  {
                    dataField: "nota",
                    label: {
                      text: "Anotações",
                      visible: false
                    },
                    editorType: "dxTextArea",
                    editorOptions: { height: 135, showClearButton: false }
                  }
                ]
              }
            ]
          }
        ],
        tipoPessoa: [
          {
            dataField: "grupos",
            label: { text: "Grupo" },
            editorType: "dxTagBox",
            editorOptions: {
              hideSelectedItems: true,
              searchEnabled: true,
              displayExpr: "nome",
              valueExpr: "id",
              items: grupos
            },
            validationRules: [
              {
                type: "required",
                message: "Informe pelo menos um grupo."
              }
            ]
          }
        ],
        situacao: [
          {
            dataField: "situacao",
            label: {
              text: "Situação"
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
        acoes: [
          {
            label: { text: "Ação", visible: false },
            editorType: "dxButton",
            editorOptions: {
              horizontalAlignment: "right",
              text: "Register",
              type: "success",
              useSubmitBehavior: true
            }
          }
        ]
      }
    };
  },

  created() {},

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      return;
    },

    getID(id) {
      loading();
      Service.getPessoas(id)
        .then(r => {
          this.pessoa = r;
          loading();
        })
        .catch(error => {
          loading();
          this.pessoa = {};
        });
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

      let data = _.cloneDeep(this.pessoa);

      if (_.has(data, "endereco")) {
        if (_.has(data.endereco, "logradouro")) {
          if (_.isEmpty(data.endereco.logradouro)) {
            data.endereco = null;
          }
        }
      }

      if (_.has(data, "id")) {
        Service.updatePessoa(data)
          .then(r => {
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
                5000
              );
            }
          });
      } else {
        Service.addPessoa(data)
          .then(r => {
            const message = "Gravado com sucesso";
            loading();
            notify(message, "success", 1000);
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
                  5000
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
                5000
              );
            }
          });
      }
    },

    cancelar() {
      if (this.isPopup) return this.$emit("close", false);
      this.$router.push({ name: "pessoas" });
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