<template>
  <div class="content-block">
    <div class="dx-card responsive-paddings">
      <example-block title="dxDataGrid">
        <div class="flex-container">
          <span class="label">Date Filter:</span>
          <dx-date-box v-model="dateFilter"/>
          <span class="label">Alternate Row Colors:</span>
          <dx-check-box v-model="alternateRowColors"/>
          <span class="label">Filter Row Visible:</span>
          <dx-check-box v-model="filterRowVisible"/>
          <span class="label">Country Sort Order:</span>
          <dx-switch :value.sync="countrySortOrderVal" offText="des" onText="asc"/>
        </div>
        <dx-data-grid
          :dataSource="sales"
          keyExpr="orderId"
          :allowColumnReordering="true"
          :rowAlternationEnabled="alternateRowColors"
          :selectedRowKeys="selectedRowKeys"
          @toolbarPreparing="toolbarPreparing"
        >
          <dx-filter-row :visible="filterRowVisible"/>
          <dx-group-panel :visible="true"/>
          <dx-grouping :autoExpandAll="autoExpandAll"/>
          <dx-selection mode="multiple"/>

          <dx-column
            data-field="orderId"
            caption="Order ID"
            :allowSorting="false"
            :allowFiltering="false"
            :allowGrouping="false"
            :allowReordering="false"
            :width="100"
          />
          <dx-column data-field="city" cellTemplate="cell-city"/>
          <dx-column data-field="country" :sortOrder.sync="countrySortOrder"/>
          <dx-column data-field="region" :groupIndex="0"/>
          <dx-column
            data-field="date"
            data-type="date"
            selectedFilterOperation=">="
            :filterValue.sync="dateFilter"
            :width="150"
          />
          <dx-column
            data-field="amount"
            format="currency"
            selectedFilterOperation=">="
            :filterValue="1000"
            :width="100"
          />

          <dx-pager :visible="true" :showPageSizeSelector="true"/>
          <dx-paging :pageSize="10"/>

          <dx-button slot="cell-city" slot-scope="{ data }" :text="data.text"/>
        </dx-data-grid>
      </example-block>
    </div>
  </div>
</template>

<script>
//import ExampleBlock from "./example-block";
import {
  DxButton,
  DxCheckBox,
  DxDataGrid,
  DxDateBox,
  DxSwitch
} from "devextreme-vue";
import {
  DxColumn,
  DxFilterRow,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSelection
} from "devextreme-vue/data-grid";
//import { sales } from "../data";
const sales = [
  {
    orderId: 10248,
    region: "North America",
    country: "United States",
    city: "New York",
    amount: 1740,
    date: "2013/01/06"
  },
  {
    orderId: 10249,
    region: "North America",
    country: "United States",
    city: "Los Angeles",
    amount: 850,
    date: "2013/01/13"
  }
];
const selectedKeys = [
  10273,
  10277,
  10292,
  10295,
  10300,
  10302,
  10305,
  10308,
  10312,
  10319,
  10321,
  10323,
  10326,
  10328,
  10331,
  10334,
  10335,
  10341,
  10351,
  10353,
  10356,
  10362,
  10367,
  10373,
  10376,
  10383,
  10387
];
export default {
  components: {
    //ExampleBlock,
    DxButton,
    DxCheckBox,
    DxDataGrid,
    DxDateBox,
    DxSwitch,
    DxColumn,
    DxFilterRow,
    DxGrouping,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxSelection
  },
  computed: {
    countrySortOrder: {
      get() {
        return this.countrySortOrderVal ? "asc" : "desc";
      },
      set(newValue) {
        this.countrySortOrderVal = newValue === "asc";
      }
    }
  },
  methods: {
    toolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        location: "after",
        widget: "dxButton",
        options: {
          icon: "chevronup",
          onClick: e => {
            this.autoExpandAll = e.component.option("icon") === "chevrondown";
            e.component.option(
              "icon",
              this.autoExpandAll ? "chevronup" : "chevrondown"
            );
          }
        }
      });
    }
  },
  data: function() {
    return {
      dateFilter: "2013/04/01",
      sales: sales,
      selectedRowKeys: selectedKeys,
      alternateRowColors: true,
      filterRowVisible: true,
      countrySortOrderVal: true,
      autoExpandAll: true
    };
  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
}
.label {
  color: black;
  padding-top: 0.6em;
}
.dx-checkbox {
  padding-top: 0.4em;
}
.dx-switch {
  padding-top: 0.2em;
}
</style>