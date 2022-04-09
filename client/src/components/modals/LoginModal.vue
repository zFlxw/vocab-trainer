<template>
  <Modal :modal_active="show" @close-modal="close(true)">
    <div class="modal-content">
      <h1>Sign in</h1>
      <p>No account yet? <a @click="switchToRegister"> Create one</a>.</p>
      <form @submit.prevent="submit">
        <input
          name="email"
          class="field"
          id="email_login"
          type="email"
          placeholder="E-Mail"
          v-model="email"
        />

        <input
          name="password"
          class="field"
          id="password_login"
          type="password"
          placeholder="Password"
          v-model="password"
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
import { defineComponent, watch } from "@vue/runtime-core";
import { ref, Ref } from "vue";
import { post } from "../../api/methods";
import { User } from "../../models/User";
import { useUserStore } from "../../stores/stores";
import Modal from "./Modal.vue";

export default defineComponent({
  name: "LoginModal",
  props: ["show"],
  components: { Modal },
  setup(props, { emit }) {
    const email = ref("");
    const password = ref("");

    const response = ref("");
    const responseClass = ref("");

    const cleanup = () => {
      email.value = "";
      password.value = "";
      response.value = "";
      responseClass.value = "";
    };

    const close = (clean: boolean) => {
      if (clean) {
        cleanup();
      }

      emit("close-modal", "login");
    };

    const switchToRegister = () => {
      cleanup();
      emit("switch-modal", "register");
    };

    const submit = () => {
      post("/login", { email: email.value, password: password.value }, false)
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
      email,
      password,
      close,
      switchToRegister,
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
