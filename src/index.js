import Vue from 'vue';
import App from './App';
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
import router from './router/index';
Vue.use(router);

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');