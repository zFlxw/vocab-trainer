<template>
  <div class="loading" v-if="isLoading">
    <svg
      version="1.1"
      id="loader-1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 50 50"
      style="enable-background: new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        fill="currentColor"
        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
    <p>Data loading. Please wait...</p>
  </div>
  <div class="wrapper" v-else>
    <header>
      <div>
        <p class="user" v-if="!hasToken">
          Hello, <a class="username" @click="showLogin = true">Login</a>!
        </p>
        <p class="user" v-if="hasToken">
          Hello, <a class="username" href="/profile">{{ user.username }}</a
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

    <router-view v-slot="{ Component, route }">
      <Transition :name="route.meta.transition || ''">
        <component :is="Component" />
      </Transition>
    </router-view>

    <LoginModal
      :show="showLogin"
      @close-modal="closeModal"
      @switch-modal="switchModal"
      @reload-user="reloadUser"
    />

    <RegisterModal
      :show="showRegister"
      @closeModal="closeModal"
      @switch-modal="switchModal"
      @reload-user="reloadUser"
    />

    <SettingsModal :show="showSettings" @close-modal="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/stores";
import { User, Settings, LogOut, Home } from "lucide-vue-next";
import { checkForToken } from "./api/jwt.util";
import { requestUser } from "./api/userMethods";
import { User as UserModel } from "./models/User";
import Modal from "./components/modals/Modal.vue";
import Button from "./components/Button.vue";
import LoginModal from "./components/modals/LoginModal.vue";
import RegisterModal from "./components/modals/RegisterModal.vue";
import SettingsModal from "./components/modals/SettingsModal.vue";
import LearnEditView from "./views/LearnEditView.vue";

export default defineComponent({
  name: "App",
  components: {
    User,
    Settings,
    LogOut,
    Home,
    Modal,
    Button,
    LoginModal,
    RegisterModal,
    SettingsModal,
  },
  setup() {
    const router = useRouter();
    const usersStore = useUserStore();
    const isLoading = ref(true);

    const showLogin = ref(false);
    const showRegister = ref(false);
    const showSettings = ref(false);

    const hasToken = ref(checkForToken());
    const user = ref(usersStore.user);

    onBeforeMount(() => {
      if (hasToken.value) {
        requestUser().then((u) => {
          usersStore.setUser(u);
          user.value = u;
          isLoading.value = false;
        });
      } else {
        isLoading.value = false;
      }
    });

    // --- Modals ---
    const closeModals = () => {
      showLogin.value = false;
      showRegister.value = false;
      showSettings.value = false;
    };

    const closeModal = (modalName: string) => {
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
      closeModals();
      if (to === "login") {
        showLogin.value = true;
      } else if (to === "register") {
        showRegister.value = true;
      } else if (to === "settings") {
        showSettings.value = true;
      }
    };

    // --- Icons ---
    const switchToHome = () => {
      router.push("/");
    };

    const switchToProfile = () => {
      if (!hasToken.value) {
        showLogin.value = true;
        return;
      }

      router.push("/profile");
    };

    const switchToSettings = () => {
      if (!hasToken.value) {
        showLogin.value = true;
        return;
      }

      showSettings.value = true;
    };

    const reloadUser = (newUser: UserModel) => {
      user.value = newUser;
    };

    const logout = () => {
      router.push("/");

      if (hasToken.value) {
        localStorage.removeItem("token");
        usersStore.deleteUser();
        hasToken.value = false;
      }
    };

    return {
      closeModal,
      switchToProfile,
      switchToSettings,
      logout,
      hasToken,
      showLogin,
      showRegister,
      switchToHome,
      showSettings,
      switchModal,
      user,
      reloadUser,
      isLoading,
      LearnEditView,
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

// ANIMATIONS 
.slide-in-enter-active,
.slide-in-leave-acitve {
  transform: translateY(0);
  transition: transform .3s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateY(100%);
}

// ---

.loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  flex-direction: column;

  svg {
    width: 4rem;
    height: 4rem;
    color: $main_blue;
  }

  p {
    font-size: 1.5rem;
  }
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

  a {
    display: inherit;
    text-decoration: none;
    justify-content: flex-start;
    color: second_grey;
    font-size: 1rem;
    overflow: hidden;
    padding: 0;
    transition: 0.3s;

    &:visited,
    &:active {
      color: $second_grey;
    }

    &:hover {
      cursor: pointer;
      color: $main_grey;
    }
  }
}
</style>
