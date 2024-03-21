<script setup lang="ts">
import Dialog from './ui/dialog/Dialog.vue';
import DialogHeader from './ui/dialog/DialogHeader.vue';
import DialogTitle from './ui/dialog/DialogTitle.vue';
import DialogDescription from './ui/dialog/DialogDescription.vue';
import DialogContent from './ui/dialog/DialogContent.vue';
import DialogFooter from './ui/dialog/DialogFooter.vue';
</script>

<template>
  <Dialog>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          <slot name="title"></slot>
        </DialogTitle>
        <DialogDescription>
          <slot name="description"></slot>
        </DialogDescription>
      </DialogHeader>
      <slot name="content"></slot>
      <DialogFooter>
        <slot name="footer"></slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<style scoped></style>
