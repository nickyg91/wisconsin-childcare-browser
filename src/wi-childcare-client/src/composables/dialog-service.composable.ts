import DynamicDialog from '@/components/DynamicDialog.vue';
import { h, defineComponent, Teleport, type Component, ref, markRaw } from 'vue';
import type { IDynamicDialogOptions } from './interfaces/dynamic-dialog-options.interface';
const openDialogs = ref(new Map<string, Component>());
export const useDialogService = () => {
  const showDialog = <T extends Component>(
    name: string,
    component: T,
    options: IDynamicDialogOptions
  ) => {
    if (openDialogs.value.has(name)) {
      return;
    }
    //need event emitters yet.
    const view = h(component, options.props);
    const dialog = defineComponent({
      setup() {
        return () =>
          h(Teleport, { to: 'body' }, [
            h(
              DynamicDialog,
              {
                'onUpdate:open': (value: boolean) => {
                  if (!value) {
                    closeDialog(name);
                  }
                },
                open: openDialogs.value.has(name)
              },
              {
                title: () => h('div', options.title),
                content: () => h('div', view),
                description: () => h('div', options.description ?? ''),
                footer: () => (options.footer ? h(options.footer) : '')
              }
            )
          ]);
      }
    });
    openDialogs.value.set(name, markRaw(dialog));
  };

  const closeDialog = (name: string) => {
    if (openDialogs.value.has(name)) {
      openDialogs.value.delete(name);
    }
  };

  return {
    showDialog,
    closeDialog,
    openDialogs
  };
};
