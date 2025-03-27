import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import '@fortawesome/fontawesome-free/css/all.css'
import 'buefy/dist/buefy.css'

// Configuration Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faFacebookF, 
  faTwitter, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Ajout des icônes nécessaires
library.add(faFacebookF, faTwitter, faLinkedinIn)

// Composant global FontAwesome
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Configuration Bulma (CSS framework)
import 'bulma/css/bulma.css'

// Initialisation de Buefy
Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
})

// Configuration globale Axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/api' // Adaptez selon votre backend
Vue.prototype.$http = axios

// Filtre global pour les dates
import moment from 'moment'
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')