import { defineStore } from "pinia";
import { User } from "@/models/User";

export const useUserStore = defineStore("users", {
  state: () => ({
    user: {} as User,
  }),
  getters: {
    getUser(state): User {
      return state.user;
    },
  },
  actions: {
    setUser(user: User) {
      this.$patch((state) => {
        state.user = user;
      });
    },
    updateToken(token: string) {
      this.$patch((state) => {
        state.user.token = token;
      });
    },
    deleteUser() {
      this.$patch((state) => {
        state.user = {} as User;
      });
    },
  },
});
