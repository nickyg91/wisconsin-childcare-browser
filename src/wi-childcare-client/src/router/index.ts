import { createRouter, createWebHistory } from 'vue-router';
import VaccinationView from '@/views/VaccinationView.vue';
import ChildcareProviders from '../views/ChildcareProviders.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/childcare-providers',
      name: 'childcare-providers',
      component: ChildcareProviders
    },
    {
      path: '/vaccination',
      name: 'vaccination',
      component: VaccinationView
    },
    {
      path: '/',
      redirect: '/childcare-providers'
    }
  ]
});

export default router;
