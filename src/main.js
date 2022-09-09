import Vue from 'vue'
import App from './App.vue'

// FONTSOURCE - OPENS-SANS
import "@fontsource/open-sans"

/***********************************************************************
 BOOTSTRAP START
***********************************************************************/
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
/***********************************************************************
 BOOTSTRAP END
***********************************************************************/

/***********************************************************************
 FONTAWESOME START
***********************************************************************/
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarSol } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faMagnifyingGlass)
library.add(faStarSol)
library.add(faStarReg)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
/***********************************************************************
 FONTAWESOME END
***********************************************************************/


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
