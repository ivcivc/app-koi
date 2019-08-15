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
              :form-data.sync="treinamento"
              :show-validation-summary="true"
              :show-colon-after-label="true"
              validation-group="customerData"
              :on-content-ready="validateForm"
            >
              <dx-group-item>
                <dx-simple-item data-field="nome">
                  <dx-required-rule message="Informe o nome do treinamento" />
                </dx-simple-item>

                <dx-simple-item
                  data-field="valorBaseAVista"
                  editor-type="dxNumberBox"
                  :editorOptions="optionFormatoMoeda"
                >
                  <dx-label text="Valor à vista" />
                  <dx-required-rule message="Informe o valor do treinamento à vista" />
                  <dx-compare-rule
                    :comparison-target="valorAVistaComparison"
                    message="Valor à vista não permitido."
                  />
                </dx-simple-item>
                <dx-simple-item
                  data-field="valor"
                  editor-type="dxNumberBox"
                  :editorOptions="optionFormatoMoeda"
                >
                  <dx-label text="Valor à prazo" />
                  <dx-required-rule message="Informe o valor do treinamento à prazo" />
                  <dx-compare-rule
                    :comparison-target="valorComparison"
                    message="Valor à prazo não permitido"
                  />
                </dx-simple-item>

                <dx-simple-item
                  :editor-options="statusEditorOptions"
                  data-field="status"
                  editor-type="dxSelectBox"
                >
                  <dx-required-rule message="Informe o status" />
                </dx-simple-item>
              </dx-group-item>
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
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxEmailRule
} from "devextreme-vue/form";
//import service from './data.js'
import "devextreme-vue/text-area";

import Service from "../../services/Treinamento";
import notify from "devextreme/ui/notify";
import { constants } from "crypto";

export default {
  components: {
    DxButton,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxEmailRule,
    DxStringLengthRule,
    DxForm,
    notify
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

      statusEditorOptions: {
        dataSource: situacoes
      },

      optionFormatoMoeda: { format: "R$ #,##0.##" },

      valorComparison: ee => {
        let valor = 0.0;
        if (this.treinamento.valor === undefined) {
          return false;
        }
        valor = parseFloat(this.treinamento.valor);
        return valor > 0 ? valor : -1 + valor;
      },
      valorAVistaComparison: ee => {
        let valor = 0.0;
        if (this.treinamento.valorBaseAVista === undefined) {
          return false;
        }
        valor = parseFloat(this.treinamento.valorBaseAVista);
        return valor > 0 ? valor : -1 + valor;
      }
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();

      console.log(e);

      return;
    },

    validateForm(e) {
      console.log("validateForm");
      this.formValidation = e;
      const v = e.component.validate();
    },

    gravar() {
      console.log("gravar..");
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