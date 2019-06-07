    
<template>
  <div>
    <h2 class="content-block">Cadastro de Evento</h2>

    <div class="right-id" v-if="id">ID # {{id}}</div>

    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <form action="post" @submit="handleSubmit">
          <dx-form
            :colCount="2"
            :formData="employee"
            validation-group="customerData"
            label-location="top"
          >
            <dx-simple-item data-field="ID"/>
            <dx-simple-item data-field="FirstName" :editorOptions="{ disabled: false }"/>
            <dx-simple-item data-field="LastName" :editorOptions="{ disabled: false }"/>
            <dx-simple-item
              data-field="Position"
              editorType="dxSelectBox"
              :editorOptions="positions"
            >
              <dx-required-rule message="Position is required"/>
            </dx-simple-item>

            <dx-simple-item data-field="Estado" :colSpan="2" :editorOptions="{ disabled: false }"/>

            <dx-simple-item
              data-field="BirthDate"
              editorType="dxDateBox"
              :editorOptions="{ disabled: false, width: '100%' }"
            />
            <dx-simple-item
              data-field="HireDate"
              editorType="dxDateBox"
              :editorOptions="{ value: null, width: '100%' }"
            >
              <dx-required-rule message="Hire date is required"/>
            </dx-simple-item>
            <dx-simple-item data-field="Notes" :colSpan="2">
              <dx-text-area
                slot-scope="{ data }"
                :minHeight="80"
                :value="data.editorOptions.value"
              />
            </dx-simple-item>
            <dx-simple-item data-field="Address"/>
            <dx-simple-item
              data-field="Phone"
              :editorOptions="{ mask: '+1 (X00) 000-0000', maskRules: { X: /[02-9]/ } }"
            />

            <dx-item
              :colSpan="2"
              :items="groupedItems.contactInformation"
              item-type="group"
              caption
            />

            <!--<dx-Tabbed-item :colSpan="2">
              <dx-item
                :colSpan="2"
                :items="groupedItems.contactInformation"
                item-type="group"
                caption="Contact Information"
              />
            </dx-Tabbed-item>-->

            <dx-button-item
              :button-options="{text: 'Register', type: 'success',  useSubmitBehavior: true}"
              horizontal-alignment="left"
            ></dx-button-item>
          </dx-form>

          <!--<dx-tab-panel :items="tabs">
            <div slot="tab1" slot-scope="_">
              <h3>First Tab Content</h3>
            </div>
            <div slot="tab2" slot-scope="_">
              <async-component/>
            </div>
          </dx-tab-panel>-->
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { DxForm, DxItem } from "devextreme-vue/form";
import { DxTextArea } from "devextreme-vue";
import DxTabs from "devextreme-vue/tabs";
import DxTabPanel from "devextreme-vue/tab-panel";

import {
  DxSimpleItem,
  DxTabbedItem,
  DxButtonItem,
  DxRequiredRule
  //DxTabs
} from "devextreme-vue/form";
const employee = {
  ID: 1,
  FirstName: "John",
  LastName: "Heart",
  Position: "CEO",
  BirthDate: "1964/03/16",
  HireDate: "1995/01/15",
  Notes:
    "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.",
  Address: "351 S Hill St., Los Angeles, CA",
  Phone: "360-684-1334"
};

import SecondTabComponent from "./example-block";

export default {
  components: {
    DxForm,
    DxItem,
    DxTextArea,
    DxSimpleItem,
    DxTabbedItem,
    DxButtonItem,
    DxRequiredRule,
    DxTabs,
    DxTabPanel,
    AsyncComponent: () => Promise.resolve(SecondTabComponent)
  },

  props: ["id"],

  data() {
    return {
      employee,

      tabs: [
        { title: "Sync Tab", template: "tab1" },
        { title: "Async Tab", template: "tab2" }
      ],

      positions: {
        items: [
          "HR Manager",
          "IT Manager",
          "CEO",
          "Controller",
          "Sales Manager",
          "Support Manager",
          "Shipping Manager"
        ],
        value: ""
      },

      groupedItems: {
        contactInformation: [
          {
            itemType: "tabbed",
            tabPanelOptions: {
              deferRendering: false
            },
            tabs: [
              {
                title: "Phone",
                items: ["Phone"]
              },
              {
                title: "Skype",
                items: ["Skype"]
              },
              {
                title: "Email",
                items: ["Email"]
              }
            ]
          }
        ]
      }
    };
  },

  methods: {
    setFocus: function() {
      this.textBox.focus();
    },

    handleSubmit(e) {
      console.log("submit ");
      notify(
        {
          message: "You have submitted the form",
          position: {
            my: "center top",
            at: "center top"
          }
        },
        "success",
        3000
      );
      e.preventDefault();
    }
  }
};
</script>


<style>
.dx-field-item-required-mark {
  color: #ea4444;
}
</style>