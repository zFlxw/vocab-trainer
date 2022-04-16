<template>
  <Modal :modal_active="show" @close-modal="close()">
    <div class="modal-content">
      <h1>Learn More<a>.</a></h1>
      <p>Hey there! In this section, the <span>real things</span> happen.</p>
      <p>Here you can <span class="o">create</span> new decks, <span class="o">edit</span> existing ones, and <span class="o">learn</span> you vocabs! </p>
      <p>I try my best to provide the <span>best experience</span> to you, however, there is <span class="r">one limitation:</span></p>
      <ul>
        <li>Max. Decks: <span class="r">5</span></li>
      </ul>
      <p>To create a new Deck, just click on the <span class="i">Add Deck</span> area and <span class="o">fill out</span> the content in the pop up window</p>
      <p>If there is no <span class="i">Add Deck</span> button, you already have 5 existing Decks.</p>
      <p>In this case, please <span class="o">edit</span> or <span class="o">delete</span> one of your <span>existing Decks</span>.</p>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import Modal from "../Modal.vue";

export default defineComponent({
  name: "InfoModal",
  props: ["show"],
  components: { Modal },
  setup(props, { emit }) {

    const close = () => {
      emit("close-modal", "add-deck");
    };

    return {
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/modal_style.scss";

p {
  text-align: left;
  margin-left: 1em;
}

span {
  color: $main_blue;
}

// Operator styling
.o {
  color: $main_orange;
}

// Italic
.i {
  font-style: italic;
}

// Just red
.r {
  color: $main_red;
}

a {
  cursor: default !important;
  text-decoration: none;
}

ul, li {
  font-size: 1.05em;
  text-align: left;
  margin-left: 2.5em;
  margin-bottom: .5em;
}
</style>
