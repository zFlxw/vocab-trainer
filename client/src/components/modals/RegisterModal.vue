<template>
  <Modal :modal_active="show" @close-modal="close">
    <div class="modal-content">
      <h1>Sign up</h1>
      <p>
        Already have an account? <a @click="switchToLogin">Log in</a>.
      </p>
      <form @submit.prevent="submit">
        <input
          name="username"
          class="field"
          id="username_register"
          type="text"
          placeholder="Username"
          v-model="username"
        />

        <input
          name="email"
          class="field"
          id="email"
          type="email"
          placeholder="E-Mail"
          v-model="email"
        />

        <input
          name="password"
          class="field"
          id="password"
          type="password"
          placeholder="Password"
          v-model="password"
        />

        <input name="submit" type="submit" class="submit" value="Register" />
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
import { post } from "../../api/methods";
import Modal from './Modal.vue';

export default defineComponent({
  name: "RegisterModal",
  props: ["show"],
  components: { Modal },
  setup (props, { emit }) {
    const username = ref("");
    const email = ref("");
    const password = ref("");

    const response = ref("");
    const responseClass = ref("");
    
    const cleanup = () => {
      username.value = "";
      email.value = "";
      password.value = "";
      response.value = "";
      responseClass.value = "";
    };

    const close = (clean: boolean) => {
      if (clean) {
        cleanup();
      }

      emit("close-modal", "register");
    };

    const switchToLogin = () => {
      cleanup();
      emit("switch-modal", "login");
    };

    const submit = () => {
      post(
        "/register",
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
        false
      )
        .then((res) => {
          cleanup();
          response.value = res.data.message;
          responseClass.value = res.status === 200 ? "success" : "error";

          localStorage.setItem("token", res.data.token);
          
          cleanup();

          // TODO: FIRE EVENT WITH USER DATA
        })
        .catch((err) => {
          cleanup();
          response.value = err.response.data.message;
          responseClass.value = "error";
        });
    };

    return {
      username,
      email,
      password,
      response,
      responseClass,
      close,
      submit,
      switchToLogin
    }
  }
});
</script>

<style lang="scss">
@import "@/assets/modal_style.scss";
</style>
