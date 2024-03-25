import type { Component } from 'vue';
type EventEmitterType = { [key in string]: Function };
export interface IDynamicDialogOptions {
  title?: string | Component | null | undefined;
  description?: string | Component | null | undefined;
  footer?: Component | null | undefined;
  props?: object | null | undefined;
  emits?: EventEmitterType;
}
