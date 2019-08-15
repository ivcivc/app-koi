<template>
  <div style="padding: 20px;">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12"></div>
    </div>

    <dx-form :form-data="formData">
      <dx-group-item>
        <dx-simple-item data-field="titulo" />
      </dx-group-item>
    </dx-form>

    <dx-html-editor
      style="margin-top: 15px;"
      :height="EditorHeight"
      v-on:input="$emit('input', $event.target.value)"
      :value.sync="emailEditor"
      v-model="emailEditor"
      id="editor"
    >
      <dx-toolbar>
        <dx-item format-name="undo" />
        <dx-item format-name="redo" />
        <dx-item format-name="separator" />
        <dx-item :format-values="sizeValues" format-name="size" />
        <dx-item :format-values="fontValues" format-name="font" />
        <dx-item format-name="separator" />
        <dx-item format-name="bold" />
        <dx-item format-name="italic" />
        <dx-item format-name="strike" />
        <dx-item format-name="underline" />
        <dx-item format-name="separator" />
        <dx-item format-name="alignLeft" />
        <dx-item format-name="alignCenter" />
        <dx-item format-name="alignRight" />
        <dx-item format-name="alignJustify" />
        <dx-item format-name="separator" />
        <dx-item format-name="color" />
        <dx-item format-name="background" />
        <dx-item format-name="separator" />
        <dx-item format-name="link" />
        <dx-item format-name="image" />
      </dx-toolbar>
    </dx-html-editor>

    <div style="float: left; margin-top:20px">
      <dx-button text="Email teste" @click="testeEmail" style="margin-right:10px" />
      <dx-button text="Disparar email" type="success" @click="gravar" style="margin-right:10px" />
      <dx-button text="Voltar" @click="cancelar" />
    </div>
  </div>
</template>

<script>
import ServiceMalaDireta from "../../services/Maladireta";
import notify from "devextreme/ui/notify";
import { DxButton } from "devextreme-vue";
import { confirm } from "devextreme/ui/dialog";
import { DxHtmlEditor, DxToolbar, DxItem } from "devextreme-vue/html-editor";
import {
  DxForm,
  DxSimpleItem,
  DxGroupItem,
  DxLabel
} from "devextreme-vue/form";

export default {
  components: {
    DxHtmlEditor,
    DxToolbar,
    DxItem,
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    DxButton
  },

  computed: {
    screen() {
      return this.$store.getters["common/screen"];
    }
  },

  props: {
    pessoas: {
      type: Array,
      default: () => []
    },

    filtros: {
      type: Object,
      default: () => {}
    }
  },

  watch: {
    screen: function(e) {
      console.log("screen....>> ", e);

      if (e.isSmall) {
        this.EditorHeight = 500;
      }

      if (e.isLarge) {
        this.EditorHeight = 850;
      }

      if (e.isMedium) {
        this.EditorHeight = 650;
      }

      if (e.isXSmall) {
        this.EditorHeight = 400;
      }
    }
  },

  data() {
    return {
      popupVisible: false,

      emailEditor: "",

      EditorHeight: 500,

      formData: { titulo: "Mala direta" },

      sizeValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"],
      fontValues: [
        "Arial",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Tahoma",
        "Times New Roman",
        "Verdana"
      ]
    };
  },
  methods: {
    async gravar() {
      this.$nextTick(function() {
        let result = confirm(
          "<div style='margin-left:15px!important;margin-right:15px!important;'><p>&nbsp;Confirma o disparo de emails?</p></div>",
          "  Confirmação"
        );
        result.then(dialogResult => {
          if (!dialogResult) return;
          ServiceMalaDireta.dispararEmail({
            titulo: this.formData.titulo,
            emailHtml: this.emailEditor,
            filtros: this.filtros,
            pessoas: this.pessoas
          })
            .then(r => {
              this.mensagem(
                "Email enviado com sucesso. Verifique sua caixa postal.",
                "success"
              );
            })
            .catch(e => {
              this.mensagem("Email não enviado. Tente novamente!");
            });
        });
      });
    },

    async testeEmail() {
      this.$nextTick(function() {
        let result = confirm(
          "<div style='margin-left:15px!important;margin-right:15px!important;'><p>&nbsp;Confirma o envio de email teste?</p></div>",
          "  Confirmação"
        );
        result.then(dialogResult => {
          if (!dialogResult) return;

          ServiceMalaDireta.dispararTesteEmail({
            titulo: this.formData.titulo,
            emailHtml: this.emailEditor
          })
            .then(r => {
              this.mensagem(
                "Email enviado com sucesso. Verifique sua caixa postal.",
                "success"
              );
            })
            .catch(e => {
              this.mensagem("Email não enviado. Tente novamente!");
            });
        });
      });
    },
    cancelar() {
      this.$emit("fechar", true);
    },

    mensagem(m, tipo) {
      if (_.isEmpty(tipo)) {
        tipo = "error";
      }
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
        tipo,
        3000
      );
    }
  }
};
</script>

<style>
.dx-htmleditor-content img {
  vertical-align: middle;
  padding-right: 10px;
}

#editor {
  border-color: #ece6e6;
}
</style>
