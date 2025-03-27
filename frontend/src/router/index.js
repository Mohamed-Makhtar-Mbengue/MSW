import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Recherche de chercheurs'
    }
  },
  {
    path: '/profile/:id',
    name: 'Profile',    
    component: UserProfile,
    props: route => ({
      id: route.params.id,
      // Passage supplémentaire de query params si nécessaire
      ...route.query
    }),
    meta: {
      title: 'Profil chercheur',
      requiresAuth: false 
    }
  },
  // Route de fallback pour les 404
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

// Gestion dynamique du titre de page
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'MyScienceWork'
  next()
})

export default router