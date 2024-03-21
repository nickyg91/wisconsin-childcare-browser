import { getCurrentInstance } from 'vue';

export const useMarkerEventBus = () => {
  const internalInstance = getCurrentInstance();
  const emitter = internalInstance?.appContext.config.globalProperties.emitter;

  return emitter;
};
