<template>
  <dx-load-panel
    :position="{ of: 'body' }"
    :visible.sync="loadingVisible"
    :show-indicator="true"
    :show-pane="true"
    :shading="true"
    :close-on-outside-click="false"
    shading-color="rgba(0,0,0,0.4)"
  />
</template>

<script>
import { mapState } from 'vuex'
import { DxLoadPanel } from 'devextreme-vue/load-panel'

export default {
    name: 'Loading',

    computed: mapState({
        stateLoadingVisible: state => {
            const loading = state.common.loadingVisible
            return loading
        },
    }),

    watch: {
        stateLoadingVisible: function(valor) {
            this.loadingVisible = valor
        },
    },

    data() {
        return {
            loadingVisible: false,
        }
    },

    components: {
        DxLoadPanel,
    },
}
</script>
 
