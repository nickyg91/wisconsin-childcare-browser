import type { Component } from 'vue';

export interface IDynamicDialogOptions {
  title: string;
  description: string | null | undefined;
  footer: Component | null | undefined;
  props: object;
  //emits:
}
