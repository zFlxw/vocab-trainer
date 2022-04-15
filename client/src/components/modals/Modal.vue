<template>
  <transition name="modal-animation">
    <div v-show="modal_active" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="modal_active" class="modal-inner">
          <i class="close fas fa-times" @click="close" />
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Modal',
  props: ['modal_active'],
  setup (props, { emit }) {
    const close = () => {
      emit('close-modal')
    }
    return { close }
  }
})
</script>

<style lang="scss">
/* Transitions */
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity .2s cubic-bezier(.52, .02, .19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-inner-enter-active {
  transition: all .2s cubic-bezier(.52, .02, .19, 1.02) .15s;
}

.modal-animation-inner-leave-active {
  transition: all .2s cubic-bezier(.52, .02, .19, 1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: scale(.6);
}

.modal-animation-inner-leave-to {
  transform: scale(.6);
}

/* Modal Styling */
.modal {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}

/* Scrollbar Stuff (currently webkit only, firefox later) */
.modal .modal-inner::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  position: relative;
}

.modal .modal-inner::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

.modal .modal-inner::-webkit-scrollbar-corner {
  border-radius: 0 0 20px 0;
}

.modal .modal-inner {
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  max-width: 640px;
  max-height: 100%;
  width: 80%;
  height: min-content;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px 10px;
  box-shadow: 0 0 26px -4px rgba(0,0,0,0.56);
  -webkit-box-shadow: 0 0 26px -4px rgba(0,0,0,0.56);
  -moz-box-shadow: 0 0 26px -4px rgba(0,0,0,0.56);
}

.modal .modal-inner i {
  position: absolute;
  top: 20px;
  left: 25px;
  font-size: 20px;
  cursor: pointer;
  transition: .3s;
}

.modal .modal-inner i:hover {
  animation: rotateIcon 3s infinite 3s;
  opacity: .8;
  color: #ff0000;
}

/* Animations */
@keyframes rotateIcon {
  0% {
    transform: rotate(0deg);
  }
  20%, 100% {
    transform: rotate(360deg);
  }
}
</style>
