<template>
  <div>
    <!-- Select como label à esquerda -->
    <div class="dx-field">
      <div class="dx-field-label">Treinamento</div>
      <div class="dx-field-value">
        <dx-select-box
          :items="simpleProducts"
          :show-clear-button="true"
          placeholder="Selecione"
          :disabled="true"
        >
          <dx-validator :validationRules="validationRules.email"/>
        </dx-select-box>
      </div>
    </div>
    <!-- fim do Select -->

    <!-- Select como label no Top -->
    <div class="col-xs-6">
      <span>Treinamento *</span>
      <div class="dx-field">
        <dx-select-box
          :items="treinametoList"
          :show-clear-button="true"
          placeholder="Selecione"
          :disabled="false"
          display-expr="nome"
          value-expr="id"
        >
          <dx-validator :validationRules="validationRules.treinamento"/>
        </dx-select-box>
      </div>
    </div>
    <!-- fim do Select -->
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
