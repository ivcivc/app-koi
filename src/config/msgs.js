import Vue from 'vue'

// https://chengxulvtu.github.io/toastr/index.html
import CxltToastr from 'cxlt-vue2-toastr'
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'

Vue.use(CxltToastr, {
    position: 'top right',
    progressBar: true,
    showDuration: 2000,
    timeOut: 2500,
})

const toast = Vue.prototype.$toast

Vue.prototype.$toast.show = o => {
    switch (o.type) {
        case 'success':
            if (!o.icon) {
                o.icon = require('../assets/toast/success_4.png')
            }
            if (!o.color) {
                o.color = '#51A351'
            }
            toast.success(o)
            break
        case 'info':
            if (!o.icon) {
                o.icon = require('../assets/toast/info_1.png')
            }
            if (!o.color) {
                o.color = '#2F96B4'
            }
            toast.info(o)
            break
        case 'warning':
            if (!o.icon) {
                o.icon = require('../assets/toast/warning_2.png')
            }
            if (!o.color) {
                o.color = '#F89406'
            }
            toast.warn(o)
            break
        case 'error':
            if (!o.icon) {
                o.icon = require('../assets/toast/error_5.png')
            }
            if (!o.color) {
                o.color = '#BD362F'
            }
            toast.error(o)
            break
        default:
            if (!o.icon) {
                o.icon = require('../assets/toast/success_4.png')
            }
            if (!o.color) {
                o.color = '#2F96B4'
            }
            toast.info(o)
            break
    }
}
