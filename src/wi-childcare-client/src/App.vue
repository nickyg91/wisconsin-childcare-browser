<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
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
    <header class="p-3 bg-gray-600">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              :active="router.currentRoute.value.name === 'childcare-providers'"
              href="/childcare-providers"
              :class="
                navigationMenuTriggerStyle({
                  class: 'data-[active]:bg-blue-900 data-[active]:text-white mr-2'
                })
              "
            >
              Childcare Providers
            </NavigationMenuLink>
            <NavigationMenuLink
              :active="router.currentRoute.value.name === 'vaccination'"
              href="/vaccination"
              :class="
                navigationMenuTriggerStyle({
                  class: 'data-[active]:bg-blue-900 data-[active]:text-white'
                })
              "
            >
              Child Vaccination Providers
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
