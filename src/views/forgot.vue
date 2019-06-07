<template>
  <dx-validation-group>
    <div class="login-header">
      <div class="title">{{ title }}</div>
      <div>Recuperar senha de usuário</div>
    </div>

    <div class="dx-field">
      <div class="dx-field-label">Token</div>
      <dx-text-box placeholder="Token" width="100%" :value.sync="token" :disabled="true">
        <dx-validator>
          <dx-required-rule message="O token é obrigatório"/>
        </dx-validator>
      </dx-text-box>
    </div>

    <div class="dx-field">
      <dx-text-box
        placeholder="Informe a senha"
        width="100%"
        mode="password"
        :value.sync="password"
      >
        <dx-validator>
          <dx-required-rule message="Senha obrigatória"/>
        </dx-validator>
      </dx-text-box>
    </div>

    <div class="dx-field">
      <dx-text-box
        placeholder="Confirme a senha"
        width="100%"
        mode="password"
        :value.sync="password2"
      >
        <dx-validator>
          <dx-required-rule message="Confirmação da senha obrigatória"/>
          <dx-string-length-rule :min="6" message="A senha deve ter pelo menos 6 dígitos"/>
          <dx-compare-rule
            :comparison-target="passwordComparison"
            message="As senhas não coincidem"
          />
        </dx-validator>
      </dx-text-box>
    </div>

    <div class="dx-field">
      <dx-button type="default" text="Confirmar" width="100%" @click="onForgotClick"/>
    </div>
  </dx-validation-group>
</template>

<script>
import DxButton from "devextreme-vue/button";
import DxCheckBox from "devextreme-vue/check-box";
import DxTextBox from "devextreme-vue/text-box";
import DxValidationGroup from "devextreme-vue/validation-group";
import DxValidator, {
  DxRequiredRule,
  DxCompareRule,
  DxStringLengthRule
} from "devextreme-vue/validator";

import auth from "../auth";

export default {
  mounted() {
    const loc = window.location.hash;
    if (loc) {
      let partes = loc.split("?id=");
      if (partes.length === 2) {
        let parte2 = partes[1];
        if (parte2) {
          this.$store.state.user.isForgot = true;
          this.token = parte2;
        }
      }
    }
  },

  data() {
    return {
      title: this.$appInfo.title,
      login: "",
      password: "",
      password2: "",
      rememberUser: false,
      token: null,
      passwordComparison: () => {
        return this.password;
      }
    };
  },
  methods: {
    onForgotClick(e) {
      if (!e.validationGroup.validate().isValid) {
        return;
      }

      auth
        .forgot({
          token: this.token,
          password: this.password,
          password_confirmation: this.password2
        })
        .then(r => {
          e.validationGroup.reset();
          window.rotear = this.$route;
          this.$router.push(this.$route.query.redirect || "/login-form");
        })
        .catch(e => {});
    }
  },
  components: {
    DxButton,
    DxCheckBox,
    DxTextBox,
    DxValidator,
    DxRequiredRule,
    DxValidationGroup,
    DxCompareRule,
    DxStringLengthRule
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
