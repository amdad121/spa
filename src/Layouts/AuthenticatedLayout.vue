<script setup>
import { computed } from 'vue'
// import { Link } from '@inertiajs/vue3';
// import { usePage } from '@inertiajs/vue3';
// import NavLink from '@/Components/NavLink.vue';
// import { useToast } from 'vue-toastification';

// const toast = useToast();

// if (usePage().props.flash.success) {
//     toast.success(usePage().props.flash.success);
// }

// if (usePage().props.flash.error) {
//     toast.error(usePage().props.flash.error);
// }

// const appName = computed(() => usePage().props.appName);
</script>

<template>
  <div class="select-none bg-gray-100 text-gray-800">
    <div class="mx-auto min-h-screen max-w-sm bg-white">
      <div class="px-4 pb-20">
        <h1
          class="-mx-4 rounded-b-lg bg-gray-600 py-2 text-center text-lg font-semibold capitalize text-white"
        >
          {{ appName }}
        </h1>
        <main>
          <slot />
        </main>
      </div>
      <div
        class="fixed inset-x-0 bottom-0 mx-auto max-w-sm rounded-t-lg border-t border-gray-100 bg-white"
      >
        <ul class="flex items-center space-x-2 divide-dashed p-2 text-center">
          <li class="flex-1">
            <NavLink
              :href="route('dashboard')"
              :active="route().current('dashboard')"
              class="inline-flex flex-col gap-1"
            >
              <i class="fa-solid fa-house"></i>
              <span class="text-xs">{{ $t('Home') }}</span>
            </NavLink>
          </li>
          <li class="flex-1">
            <NavLink
              :href="route('expenses.index')"
              :active="route().current('expenses.index')"
              class="inline-flex flex-col gap-1"
            >
              <i class="fa-regular fa-calendar-days"></i>
              <span class="text-xs">{{ $t('Expenses') }}</span>
            </NavLink>
          </li>
          <li class="flex-1">
            <Link
              class="-mt-12 block w-full items-center justify-center rounded-xl bg-rose-600 py-2 text-3xl font-semibold text-white hover:-translate-y-px hover:bg-rose-500"
              :href="route('expenses.create')"
              :class="{
                '-translate-y-px bg-rose-500':
                  route().current('expenses.create'),
              }"
              >&plus;</Link
            >
          </li>
          <li class="flex-1">
            <NavLink
              :href="route('todos.index')"
              :active="route().current('todos.index')"
              class="inline-flex flex-col gap-1"
            >
              <i class="fa-solid fa-list"></i>
              <span class="text-xs">{{ $t('Todos') }}</span>
            </NavLink>
          </li>
          <li class="flex-1">
            <NavLink
              :href="route('menu')"
              :active="route().current('menu')"
              class="inline-flex flex-col gap-1"
            >
              <i class="fa-solid fa-bars-staggered"></i>
              <span class="text-xs">{{ $t('Menu') }}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
