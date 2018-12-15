import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import App from '@/App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#vuex}}
import store from '@/store'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}

Vue.config.productionTip = false{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{#vuex}}
const app = new Vue({
  ...App,
  store{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/vuex}}
{{#if_eq vuex false}}
const app = new Vue(App){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/if_eq}}

app.$mount(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
