<template>
  <div style="height:300px;">
    <h2 class="content-block">Prospecção</h2>
    <div class="content-block">
      <div class="dx-card responsive-paddings">
        <div id="form-container">
          <dx-scheduler
            :data-source="dataSource"
            :current-date="currentDate"
            :views="views"
            :start-day-hour="0"
            :end-day-hour="24"
            :remote-filtering="true"
            :height="700"
            current-view="day"
            text-expr="Text"
            start-date-expr="StartDate"
            end-date-expr="EndDate"
            all-day-expr="AllDay"
            :cross-scrolling-enabled="false"
            :show-all-day-panel="false"
            :on-content-ready="onContentReady"
            :on-appointment-form-opening="onAppointmentFormOpening"
            :timeZone="timeZone"
            :first-day-of-week="0"
          >
            <dx-resource
              :data-source="situacoes"
              :allow-multiple="false"
              label="Situação"
              field-expr="Situacao"
            />
          </dx-scheduler>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DxScheduler, DxResource } from "devextreme-vue/scheduler";
import { baseApiUrl } from "@/global";

import moment from "moment-timezone";

import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";

import Query from "devextreme/data/query";

const getMovieById = function(resourceId) {
  console.log("resourceId ", resourceId);
  return Query(moviesData)
    .filter("id", resourceId)
    .toArray()[0];
};

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

const schedulerDataSource = new DataSource({
  filter: ["startDateTimeZone", "America/Sao_Paulo"],
  store: new CustomStore({
    load: loadOptions => {
      console.log(loadOptions);
      window.xx = loadOptions;
      let StartDate = null;
      let EndDate = null;

      let params = "?";
      let arrParams = null;

      if ("filter" in loadOptions && isNotEmpty(loadOptions["filter"])) {
        params = loadOptions.filter;

        arrParams = params[0];

        const arr = arrParams[0];
        if (_.isArray(arr)) {
          arr.forEach(f => {
            if (f[0] === "EndDate") EndDate = f[2];
            if (f[0] === "StartDate") StartDate = f[2];
          });
        }
      }

      const jsonParams = JSON.stringify([StartDate, EndDate]);

      return fetch(
        `${baseApiUrl}/prospeccao?StartDate=${StartDate}&&EndDate=${EndDate}`,
        {
          method: "GET"
        }
      )
        .then(handleErrors)
        .then(response => response.json())
        .then(result => {
          // Here, you can perform operations unsupported by the server
          // or any other operations on the retrieved data
          console.log("load result ", result.data);
          let arr = [];

          result.data.forEach(e => {
            //console.log("elemento ", e);
            delete e["RecurrenceRule"];
            e.startDateTimeZone = "America/Sao_Paulo";
            e.endDateTimeZone = "America/Sao_Paulo";
            //console.log(moment);
            const start = moment.tz(e.StartDate, "America/Sao_Paulo");
            const startUtc = moment(start.format()).utc(start.format());
            const start2 = moment.tz(startUtc.format(), "America/Sao_Paulo");
            //start = moment.tz(start.format(), "America/Sao_Paulo");
            //console.log("fui.....");
            console.log(
              " = " + `titulo: ${e.Text} - ${start2.format()} - ${e.StartDate}`
            );

            //e.EndDate = start.format();
            const fim = moment.tz(e.EndDate, "America/Sao_Paulo");
            const fimUtc = moment(fim.format()).utc(fim.format());
            const fim2 = moment.tz(fimUtc.format(), "America/Sao_Paulo");
            //fim = moment.tz(fim.format(), "America/Sao_Paulo");
            e.EndDate = fim2.format();

            console.log(
              " = " + `titulo FIM: ${e.Text} - ${fim2.format()} - ${e.EndDate}`
            );

            arr.push(e);
          });

          return arr;
        });
    },
    insert: values => {
      return fetch(`${baseApiUrl}/prospeccao`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(handleErrors);
    },
    remove: key => {
      return fetch(`${baseApiUrl}/prospeccao/${encodeURIComponent(key)}`, {
        method: "DELETE"
      }).then(handleErrors);
    },
    update: (key, values) => {
      delete values.startDateTimeZone;
      delete values.endDateTimeZone;

      console.log("values ", values.StartDate);
      const NovoStartDate = moment.tz(values.StartDate, "America/Sao_Paulo");
      //values.StartDate = NovoStartDate.format();
      const NovoEndDate = moment.tz(values.EndDate, "America/Sao_Paulo");
      const fimUtc = moment(NovoEndDate.format()).utc(NovoEndDate.format());
      // values.EndDate = NovoEndDate.format();
      console.log(`Inicio: ${values.StartDate} - convertido: ${NovoStartDate}`);
      console.log(
        `Fim: ${values.EndDate} - convertido: ${NovoEndDate}  - utc: ${fimUtc}`
      );

      return fetch(`${baseApiUrl}/prospeccao/${encodeURIComponent(key)}`, {
        method: "PUT",
        body: JSON.stringify({
          id: key.id,
          Text: values.Text,
          StartDate: NovoStartDate,
          EndDate: NovoEndDate,
          Description: values.Description,
          Padrinho: values.Padrinho,
          Consultor: values.Consultor,
          Situacao: values.Situacao
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(handleErrors);
    }
  }),
  paginate: false
});

export default {
  components: {
    DxScheduler,
    DxResource
  },

  mounted() {
    window.w = this;
    window.moment = this.$moment;
  },
  data() {
    return {
      groups: ["Situacao"],
      editing: { allowAdding: false },
      views: ["day", "workWeek", "month", "week"],
      currentDate: new Date(), // Date(2017, 4, 23),
      dataSource: schedulerDataSource,
      timeZone: "America/Sao_Paulo",
      situacoes: [
        { id: "ABERTO", text: "ABERTO", color: "#417e09" },
        { id: "FINALIZADO", text: "FINALIZADO", color: "#9ea5a5" }
      ]
    };
  },

  methods: {
    onContentReady(e) {
      console.log("onContentReady= ", e);
      this.scheduler = e.component;
    },

    onAppointmentFormOpening(data) {
      let form = data.form,
        movieInfo = data.appointmentData.id || {},
        startDate = data.appointmentData.startDate;

      form.option("colCount", 1);

      form.option("items", [
        {
          label: {
            text: "Título"
          },
          dataField: "Text",
          name: "Text",
          editorType: "dxTextBox",

          validationRules: [
            {
              type: "required",
              message: "Informe o título."
            }
          ],
          editorOptions: {
            width: "100%",
            value: data.appointmentData.Text,
            readOnly: false
          }
        },
        {
          label: {
            text: "Email"
          },
          dataField: "Email",
          name: "Email",
          editorType: "dxTextBox",

          validationRules: [
            {
              type: "email",
              message: "Informe um email válido!."
            }
          ],
          editorOptions: {
            width: "100%",
            value: data.appointmentData.Email,
            readOnly: false
          }
        },
        {
          label: {
            text: "Celular"
          },
          dataField: "Celular",
          name: "Email",
          editorType: "dxTextBox",
          editorOptions: {
            width: "100%",
            value: data.appointmentData.Email,
            readOnly: false,
            mask: "(00) 00000-0000"
          }
        },
        {
          label: {
            text: "Anotações"
          },
          dataField: "Description",
          name: "Description",
          editorType: "dxTextArea",
          editorOptions: {
            width: "100%",
            value: data.appointmentData.Description,
            readOnly: false,
            colSpan: "1"
          }
        },

        {
          dataField: "StartDate",
          editorType: "dxDateBox",
          label: {
            text: "Início"
          },
          validationRules: [
            {
              type: "required",
              message: "Informe a data de início."
            }
          ],
          editorOptions: {
            width: "100%",
            type: "datetime",
            onValueChanged: function(args) {
              //startDate = args.value;
              //form.getEditor("endDate").option("value", startDate);
            }
          }
        },
        {
          name: "endDate",
          dataField: "EndDate",
          editorType: "dxDateBox",
          label: {
            text: "Fim"
          },
          validationRules: [
            {
              type: "required",
              message: "Informe a data final."
            }
          ],
          editorOptions: {
            width: "100%",
            type: "datetime",
            readOnly: false
            //min: new Date(2019, 8, 7),
            //max: new Date(2019, 8, 10),
            //format: "datetime"
          }
        },
        {
          dataField: "Padrinho",
          editorType: "dxTextBox",
          label: {
            text: "Padrinho"
          }
        },
        {
          dataField: "Consultor",
          editorType: "dxTextBox",
          label: {
            text: "Consultor"
          }
        },
        {
          dataField: "Situacao",
          editorType: "dxRadioGroup",
          label: {
            text: "Status"
          },
          validationRules: [
            {
              type: "required",
              message: "Informe o status."
            }
          ],
          editorOptions: {
            dataSource: ["ABERTO", "FINALIZADO"],
            itemTemplate: function(itemData) {
              return "".concat(itemData);
            }
          }
        }
      ]);
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
