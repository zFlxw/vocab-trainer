<template>
  <Modal :modal_active="show" @close-modal="close(true)">
    <div class="modal-content">
      <h1>Add Deck</h1>
      <form @submit.prevent="submit">
        <input
          name="name"
          class="field"
          id="name"
          type="text"
          placeholder="Name"
          v-model="name"
        />

        <input name="submit" class="submit" type="submit" value="Log in" />
      </form>
      <div class="message" v-if="response">
        <p :class="responseClass">{{ response }}</p>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import { post } from "../../../api/methods";
import { User } from "../../../models/User";
import { useUserStore } from "../../../stores/stores";
import Modal from "../Modal.vue";

export default defineComponent({
  name: "AddDeckModal",
  props: ["show"],
  components: { Modal },
  setup(props, { emit }) {
    const name = ref("");

    const response = ref("");
    const responseClass = ref("");

    const cleanup = () => {
      response.value = "";
      responseClass.value = "";
    };

    const close = (clean: boolean) => {
      if (clean) {
        cleanup();
      }

      emit("close-modal", "add-deck");
    };

    const submit = () => {
      post("/login", { }, false)
        .then((res) => {
          cleanup();
          response.value = res.data.message;
          responseClass.value = res.status === 200 ? "success" : "error";
          localStorage.setItem("token", res.data.token);

          const { id, username, email } = res.data.user;
          const user = { id, username, email, token: res.data.token } as User;

          useUserStore().setUser(user);
          emit("reload-user", user);
          close(false);
        })
        .catch((err) => {
          cleanup();
          
          response.value = err.response.data.message;
          responseClass.value = "error";
        });
    };

    return {
      name,
      close,
      response,
      responseClass,
      submit,
    };
  },
});
</script>

<style lang="scss">
@import "@/assets/modal_style.scss";
</style>
