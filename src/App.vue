<template>
  <div id="root">
    <Loading/>
    <div :class="cssClasses">
      <router-view
        name="layout"
        :title="title"
        :is-x-small="screen.isXSmall"
        :is-large="screen.isLarge"
        :is-small="screen.isSmall"
        :is-medium="screen.isMedium"
      >
        <div class="content">
          <router-view name="content"/>
        </div>
        <template #footer>
          <the-footer/>
        </template>
      </router-view>
    </div>
  </div>
</template>

<script>
import TheFooter from "./components/the-footer";
import { sizes, subscribe, unsubscribe } from "./utils/media-query";
import Loading from "@/components/Loading";

import { locale, loadMessages, formatMessage } from "devextreme/localization";

import ptMessages from "devextreme/localization/messages/pt.json";
import config from "devextreme/core/config";
config({
  defaultCurrency: "BRL",
  decimalSeparator: ",",
  serverDecimalSeparator: ".",
  thousandsSeparator: "."
});

import "devextreme-intl";

function getScreenSizeInfo() {
  const screenSizes = sizes();
  console.log("screenSizes ", screenSizes);

  return {
    isLarge: screenSizes["screen-large"],
    isMedium: screenSizes["screen-medium"],
    isSmall: screenSizes["screen-small"],
    isXSmall: screenSizes["screen-x-small"],
    cssClasses: Object.keys(screenSizes).filter(cl => screenSizes[cl])
  };
}

export default {
  name: "app",
  data() {
    return {
      title: this.$appInfo.title,
      screen: getScreenSizeInfo()
    };
  },

  watch: {
    screen: function(e) {
      console.log("screen.... ", e);
      this.$store.dispatch("common/setScreen", this.screen);
    }
  },

  created() {
    this.initMessages();
    locale("pt");
  },

  computed: {
    cssClasses() {
      return ["app"].concat(this.screen.cssClasses);
    }
  },
  methods: {
    screenSizeChanged() {
      this.screen = getScreenSizeInfo();
    },
    initMessages() {
      console.log("Iniciando loadMessages(ptMessages)");
      loadMessages(ptMessages);
    }
  },

  mounted() {
    subscribe(this.screenSizeChanged);
    this.screenSizeChanged();
  },

  beforeDestroy() {
    unsubscribe(this.screenSizeChanged);
  },

  components: {
    TheFooter,
    Loading
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0px;
  min-height: 100%;
  height: 100%;
}

#root {
  height: 100%;
}

* {
  box-sizing: border-box;
}

.app {
  @import "./themes/generated/variables.base.scss";
  background-color: darken($base-bg, 5);
  display: flex;
  height: 100%;
  width: 100%;
}
</style>
