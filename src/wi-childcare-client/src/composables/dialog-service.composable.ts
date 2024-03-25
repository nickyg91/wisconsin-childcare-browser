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
    const emitters = Object.keys(options.emits ?? {}).reduce(
      (prev: Record<string, (...args: any[]) => void | Promise<void>>, curr) => {
        if (!curr.startsWith('on')) {
          const funcName = curr[0].toUpperCase() + curr.slice(1);
          prev[`on${funcName}`] = options.emits![curr] as (...args: any[]) => void | Promise<void>;
        } else {
          prev[curr] = options.emits![curr] as (...args: any[]) => void | Promise<void>;
        }
        return prev;
      },
      {}
    );

    const view = h(component, {
      ...options.props,
      ...emitters
    });

    if (typeof options.title === 'string') {
      options.title = h('div', options.title);
    } else if (options.title === null || options.title === undefined) {
      options.title = h('div', '');
    }

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
                title: () => renderSlot(options.title),
                content: () => h('div', view),
                description: () => renderSlot(options.description),
                footer: () => renderSlot(options.footer)
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

  const renderSlot = (slot: string | Component | null | undefined) => {
    if (typeof slot === 'string') {
      return h('div', slot);
    } else if (!slot) {
      return h('div', '');
    }
    return h(slot);
  };

  return {
    showDialog,
    closeDialog,
    openDialogs
  };
};
