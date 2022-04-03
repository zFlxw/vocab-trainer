<template>
  <header>
    <div>
      <p class="user" v-if="!hasToken">
        Hello, <a class="username" @click="showLogin = true">Login</a>!
      </p>
      <p class="user" v-if="hasToken">
        Hello, <a class="username" href="/profile">{{ getUsername() }}</a
        >!
      </p>
    </div>
    <div>
      <LogOut v-if="hasToken" @click="logout" class="icon red" size="32" />
      <Settings class="icon" size="32" @click="switchToSettings()" />
      <User @click="switchToProfile()" class="icon" size="32" />
      <Home class="icon" size="32" @click="switchToHome()" />
    </div>
  </header>
  <router-view />
  <!--- Login Modal -->
  <!-- <Modal :modal_active="showLogin" @close-modal="closeModal">
    <div class="modal-content">
      <h1>Sign in</h1>
      <p>No account yet? <a @click="switchLoginRegister"> Create one</a>.</p>
      <form @submit.prevent="submitLogin">
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
  </Modal> -->
  <LoginModal :show="showLogin" @close-modal="closeModals" @switch-modal="switchModal" />
  <!--- Register Modal -->
  <!-- <Modal :modal_active="showRegister" @close-modal="closeModal">
    <div class="modal-content">
      <h1>Sign up</h1>
      <p>
        Already have an account? <a @click="switchLoginRegister">Log in</a>.
      </p>
      <form @submit.prevent="submitRegister">
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
  </Modal> -->
  <RegisterModal :show="showRegister" @closeModal="closeModals" @switch-modal="switchModal" />
  <!--- Settings Modal -->
  <Modal :modal_active="showSettings" @close-modal="closeModal">
    <div class="modal-content">
      <h1>Settings</h1>
      <p>Here you can tweak your settings how you want:</p>
      <form @submit.prevent="submitSettings" class="settings-form">
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
  <!-- TODO -->
  <footer>
    <a href="https://github.com/zFlxw" target="_blank">&copy; 2022 by Flxw</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { User, Settings, LogOut, Home } from "lucide-vue-next";
import Modal from "./components/modals/Modal.vue";
import { post } from "./api/methods";
import { checkForToken, getUsername } from "./api/jwt.util";
import Button from "./components/Button.vue";
import LoginModal from "./components/modals/LoginModal.vue";
import RegisterModal from "./components/modals/RegisterModal.vue";

export default defineComponent({
  name: "App",
  components: { User, Settings, LogOut, Home, Modal, Button, LoginModal, RegisterModal },
  setup() {
    const router = useRouter();

    const showLogin = ref(false);
    const showRegister = ref(false);
    const showSettings = ref(false);
    const hasToken = ref(checkForToken());
    const user = ref({ id: "", username: getUsername(), email: "" });

    const response = ref("");
    const responseClass = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");

    const clearInputs = () => {
      username.value = "";
      email.value = "";
      password.value = "";
    };

    const closeModal = () => {
      clearInputs();
      response.value = "";
      showLogin.value = false;
      showRegister.value = false;
      showSettings.value = false;
    };

    const closeModals = (modalName: string) => {
      if (modalName === "login") {
        showLogin.value = false;
        hasToken.value = checkForToken();
      } else if (modalName === "register") {
        showRegister.value = false;
        hasToken.value = checkForToken();
      } else if (modalName === "settings") {
        showSettings.value = false;
      }
    };

    const switchModal = (to: string) => {
      closeModal();
      if (to === "login") {
        showLogin.value = true;
      } else if (to === "register") {
        showRegister.value = true;
      } else if (to === "settings") {
        showSettings.value = true;
      }
    };

    const switchLoginRegister = () => {
      showLogin.value = !showLogin.value;
      showRegister.value = !showRegister.value;
      clearInputs();
      response.value = "";
    };

    const submitLogin = () => {
      post("/login", { email: email.value, password: password.value }, false)
        .then((res) => {
          response.value = res.data.message;
          responseClass.value = res.status === 200 ? "success" : "error";
          localStorage.setItem("token", res.data.token);
          username.value = res.data.username;
          password.value = "";
          showLogin.value = false;
          showRegister.value = false;
          hasToken.value = true;
        })
        .catch((err) => {
          response.value = err.response.data.message;
          responseClass.value = "error";
          password.value = "";
        });
    };

    const submitRegister = () => {
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
          console.log(res.data);
          response.value = res.data.message;
          responseClass.value = res.status === 200 ? "success" : "error";
          localStorage.setItem("token", res.data.token);
          user.value = res.data;
          clearInputs();
          showLogin.value = false;
          showRegister.value = false;
          hasToken.value = true;
        })
        .catch((err) => {
          response.value = err.response.data.message;
          responseClass.value = "error";
          password.value = "";
        });
    };

    const submitSettings = () => {};

    const switchToProfile = () => {
      if (!hasToken.value) {
        showLogin.value = true;
        return;
      }

      router.push("/profile");
    };

    const switchToHome = () => {
      router.push("/");
    };

    const switchToSettings = () => {
      if (!hasToken.value) {
        showLogin.value = true;
        return;
      }

      showSettings.value = true;
    };

    const logout = () => {
      router.push("/");

      if (hasToken.value) {
        localStorage.removeItem("token");
        hasToken.value = false;
      }
    };

    return {
      user,
      username,
      email,
      password,
      response,
      submitLogin,
      submitRegister,
      closeModal,
      switchToProfile,
      switchLoginRegister,
      switchToSettings,
      logout,
      hasToken,
      showLogin,
      showRegister,
      switchToHome,
      getUsername,
      showSettings,
      submitSettings,
      responseClass,
      closeModals,
      switchModal
    };
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Dongle&display=swap");

* {
  box-sizing: border-box;
}

main {
  min-height: calc(96vh - 89px);
  display: grid;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Poppins", sans-serif;
  text-align: center;
}

header {
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  padding-right: 0;

  .user {
    padding-right: 2rem;
    font-size: 1.25rem;
    justify-content: left;

    .username {
      color: $main_blue;
      cursor: pointer;
      text-decoration: none;

      &:active,
      &:visited {
        color: $main_blue;
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .icon {
    justify-content: right;
    float: right;
    color: $main_grey;
    cursor: pointer;
    transition: color 0.15s, all 0.3s;
    margin-right: 1.5rem;

    &:hover {
      color: $main_blue;
      transform: scale(125%);
    }
  }

  .red:hover {
    color: $main_red;
    transform: scale(125%);
  }
}

/* Modal */
.modal-content {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  a {
    color: $main_blue;
    transition: 0.3s;

    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }

  input {
    margin-top: 30px;
    font-family: "Outfit", "Poppins", sans-serif;
    border: none;
    border-bottom: 2px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    width: 100%;
    max-width: 100%;
    font-size: 1.25rem;
    height: 35px;
    transition: 0.15s;

    &::placeholder {
      text-align: center;
    }

    &:focus {
      outline: none;
      border-color: $main_blue;
    }

    &[type="submit"] {
      background-color: transparent;
      border: 2.5px solid $main_grey;
      color: $main_grey;
      margin-top: 30px;
      display: inline-flex;
      width: 35%;
      cursor: pointer;
      transition: 0.5s;
      border-radius: 50px;

      &:diabled {
        color: #eee;
        border-color: #eee;
      }

      &:hover {
        border-color: $main_blue;
        color: $main_blue;
      }
    }
  }

  h1,
  p {
    font-family: "Outfit", "Poppins", sans-serif;
    margin-bottom: 16px;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.25rem;
  }

  .message {
    padding-top: 1rem;

    p {
      font-size: 1.25rem;
    }

    .success {
      color: $main_green;
    }

    .error {
      color: $main_red;
    }
  }

  .settings-form {
    .options {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .option {
      display: flex;
      flex-direction: row;
      justify-content: center;

      p {
        padding-right: 2rem;
      }
    }
  }
}

footer {
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: $second_grey;
  text-align: center;
  transition: 0.15s;
  -webkit-transition: 0.15s;

  a {
    display: inherit;
    text-decoration: none;
    justify-content: flex-start;
    color: second_grey;
    font-size: 1rem;
    overflow: hidden;
    padding: 0;

    &:visited,
    &:active {
      color: $second_grey;
    }
  }

  &:hover {
    cursor: pointer;
    color: $main_grey;
  }
}
</style>
