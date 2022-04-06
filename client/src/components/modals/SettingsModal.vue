<template>
  <Modal :modal_active="show" @close-modal="close">
    <div class="modal-content">
      <h1>Settings</h1>
      <p>Here you can tweak your settings how you want:</p>
      <form @submit.prevent="submit" class="settings-form">
        <div class="options">
          <div class="option">
            <p>Option 1:</p>
            <Button :isChecked="true" />
          </div>
          <div class="option">
            <p>Option 1:</p>
            <Button />
          </div>
          <div class="option">
            <p>Option 1:</p>
            <Button :isChecked="true" />
          </div>
          <div class="option">
            <p>Option 1:</p>
            <Button />
          </div>
          <div class="option">
            <p>Option 1:</p>
            <Button />
          </div>
          <div class="option">
            <p>Option 1:</p>
            <Button />
          </div>
        </div>

        <input name="submit" type="submit" class="submit" value="Save" />
      </form>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from './Modal.vue';
import Button from '../Button.vue';

export default defineComponent({
  name: "SettingsModal",
  props: ["show"],
  components: { Modal, Button },
  setup (props, { emit }) {
    const close = () => {
      emit("close-modal", "settings");
    };

    const submit = () => {
      // TODO: submit settings
    };

    return { close, submit };
  }
});
</script>

<style lang="scss">
@import "@/assets/modal_style.scss"
</style>