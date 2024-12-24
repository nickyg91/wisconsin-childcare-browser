<script setup lang="ts">
import { RouterView, useRouter, RouterLink } from 'vue-router';
import DialogProvider from '@/components/DialogProvider.vue';
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
const router = useRouter();
</script>

<template>
  <div class="min-h-screen">
    <header class="p-3 bg-red-600">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              :as="RouterLink"
              to="/childcare-providers"
              :active="router.currentRoute.value.name === 'childcare-providers'"
              :class="
                navigationMenuTriggerStyle({
                  class: 'data-[]: data-[active]:bg-red-800 data-[active]:text-white mr-2'
                })
              "
            >
              Childcare Providers
            </NavigationMenuLink>
            <NavigationMenuLink
              :as="RouterLink"
              to="/vaccination"
              :active="router.currentRoute.value.name === 'vaccination'"
              :class="
                navigationMenuTriggerStyle({
                  class: 'data-[active]:bg-red-800 data-[active]:text-white mr-2'
                })
              "
            >
              Childcare Vaccination Providers
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>

    <RouterView class="p-5" v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <DialogProvider />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
