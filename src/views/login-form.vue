<template>
  <dx-validation-group>
    <div class="login-header">
      <div class="title">{{ title }}</div>
      <div>Faça login com sua conta</div>
    </div>

    <div class="dx-field">
      <dx-text-box placeholder="Email" width="100%" :value.sync="login">
        <dx-validator>
          <dx-required-rule message="O email é obrigatório"/>
        </dx-validator>
      </dx-text-box>
    </div>

    <div class="dx-field">
      <dx-text-box placeholder="Password" width="100%" mode="password" :value.sync="password">
        <dx-validator>
          <dx-required-rule message="Senha obrigatória"/>
        </dx-validator>
      </dx-text-box>
    </div>

    <div class="dx-field">
      <dx-check-box :value.sync="rememberUser" text="Lembre-me"/>
    </div>

    <div class="dx-field">
      <dx-button type="default" text="Acessar" width="100%" @click="onLoginClick"/>
    </div>

    <div class="dx-field">
      <router-link to="/recovery">
        <a @click="onEsqueceuSenha">Esqueceu a senha?</a>
      </router-link>
    </div>

    <div class="dx-field">
      <dx-button type="normal" text="Criar uma conta" width="100%" :disabled="true"/>
    </div>
  </dx-validation-group>
</template>

<script>
import { confirm } from "devextreme/ui/dialog";
window.dial = confirm;
import DxButton from "devextreme-vue/button";
import DxCheckBox from "devextreme-vue/check-box";
import DxTextBox from "devextreme-vue/text-box";
import DxValidationGroup from "devextreme-vue/validation-group";
import DxValidator, { DxRequiredRule } from "devextreme-vue/validator";

import auth from "../auth";

export default {
  data() {
    return {
      title: this.$appInfo.title,
      login: "",
      password: "",
      rememberUser: false
    };
  },
  methods: {
    onLoginClick(e) {
      if (!e.validationGroup.validate().isValid) {
        return;
      }

      auth
        .logIn({ email: this.login, password: this.password })
        .then(r => {
          e.validationGroup.reset();
          this.$router.push(this.$route.query.redirect || "/home");
        })
        .catch(e => {});
    },

    onEsqueceuSenha() {
      this.$nextTick(function() {
        if (_.isEmpty(this.login)) {
          //alert("Primeiro informe o email.", "Importante");
          let myDialog = confirm({
            title: "Aviso!",
            messageHtml: "Você deve primeiro informar o email",
            buttons: [
              {
                text: "Ok",
                onClick: e => {
                  return { buttonText: e.component.option("text") };
                }
              }
            ]
          });
          /*myDialog.show().then(dialogResult => {
            //console.log(dialogResult.buttonText);            
          });*/
          return;
        }

        let result = confirm(
          "<i>Confirma o envio de email para recuperação de senha?</i>",
          "Recuperação de senha."
        );
        result.then(dialogResult => {
          console.log(dialogResult);
          if (!dialogResult) {
            return false;
          }
          auth.recover(this.login);
        });
      });
    }
  },
  components: {
    DxButton,
    DxCheckBox,
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxValidationGroup
  }
};
</script>

<style lang="scss">
@import "../themes/generated/variables.base.scss";

.login-header {
  text-align: center;
  margin-bottom: 40px;

  .title {
    color: $base-accent;
    font-weight: bold;
    font-size: 30px;
    margin: 0;
  }
}
</style>
