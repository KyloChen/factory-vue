import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '@/components/home/AppIndex'
import PlantMap from '@/components/factory/PlantMapIndex'
import FactoryHome from '@/components/factory/FactoryHome'
import FactoryManagement from '@/components/factory/FactoryManagementIndex'
import PitSelectorIndex from '@/components/factory/PitSelectorIndex'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/map',
      name: 'PlantMap',
      component: PlantMap
    },
    {
      path: '/index',
      name: 'AppIndex',
      component: AppIndex
    },
    {
      path: '/home',
      name: 'FactoryHome',
      component: FactoryHome,
      redirect: '/management',
      children: [
        {
          path: '/management',
          name: 'FactoryManagementIndex',
          component: FactoryManagement,
          children: [
            {
              path: '/pitSelector',
              name: 'PitSelectorIndex',
              component: PitSelectorIndex
            }
          ]
        }
      ]
    }

  ]
})
