<template>
  <main>
    <div class="learn-wrapper">
      <div class="decks">
        <div class="decks-inner">
          <h1>Your Decks:</h1>
          <hr />
          <ul class="decks-list">
            <li class="deck-item" v-for="deck in decks">
              <ArrowRight class="select-item" :size="26" /> {{ deck.name }}
            </li>
            <li
              class="placeholder-item"
              v-if="decks.length < 5"
              @click="openAddDeckModal"
            >
              <Plus class="placeholder-plus" :size="26" /> Create Deck
            </li>
          </ul>
        </div>

        <a @click="submitGet" class="debug-item">Hehe, click me (Debug)</a>
        <div class="bottom-items">
          <Info class="info-item" :size="26" @click="openInfoModal" />
          <p class="counter-item">{{ decks.length }}/5</p>
        </div>
        
        <AddDeckModal
          :show="showAddDeckModal"
          @close-modal="close"
        />

        <InfoModal :show="showInfoModal" @close-modal="close" />
      </div>
      <div class="content">
        <div class="placeholder">
          <p>No Deck selected.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { PlusCircle, ArrowRight, Plus, Info } from "lucide-vue-next";
import { get } from "../api/methods";
import AddDeckModal from "../components/modals/learn_view/AddDeckModal.vue";
import InfoModal from "../components/modals/learn_view/InfoModal.vue";

export default defineComponent({
  name: "LearnEdit",
  components: { PlusCircle, Plus, ArrowRight, Info, AddDeckModal, InfoModal },
  setup() {
    const showAddDeckModal = ref(false);
    const showInfoModal = ref(false);
    const decks = ref([
      { id: 0, name: "German" },
      { id: 1, name: "English" },
      { id: 2, name: "Italian" },
      { id: 2, name: "Greek" },
    ]);

    const openAddDeckModal = () => {
      showAddDeckModal.value = true;
    };

    const openInfoModal = () => {
      showInfoModal.value = true;
    };

    const close = () => {
      showAddDeckModal.value = false;
      showInfoModal.value = false;
    };

    const submitGet = () => {
      get("/decks", true).then((res) => {
        console.log(res.data);
      });
    };

    return {
      showAddDeckModal,
      showInfoModal,
      openAddDeckModal,
      openInfoModal,
      close,
      submitGet,
      decks,
    };
  },
});
</script>

<style lang="scss" scoped>
// Animations
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
// Actual CSS
main {
  min-height: calc(100vh - 89px);
  display: grid;
}

.learn-wrapper {
  float: left;
  display: flex;
  margin: 0 2em;
  padding: 1em;
  padding-left: 0;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}

.decks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20%;
  border-right: 3px solid #ccc;

  .decks-inner {
    width: 100%;
  }
  
  .debug-item {
    cursor: url("@/assets/normal.cur"), auto;
  }

  h1 {
    padding: 0 0.5em;
  }

  hr {
    margin: 0.5em auto;
    width: 50px;
    height: 3px;
    background: $main_blue;
    border: none;
  }

  .decks-list {
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .deck-item {
      border-radius: 5px;
      width: 90%;
      padding: 20px;
      font-size: 1.25rem;
      list-style: none;
      text-align: left;
      display: flex;
      align-items: center;
      flex-direction: row;
      transition: 0.3s;
      cursor: pointer;
      margin-bottom: 0.5em;

      .condition {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        box-shadow: inset 0 0 0 3px $main_blue;
      }

      &:hover > .select-item {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .placeholder-item {
      background-color: transparent !important;
      border-radius: 5px;
      width: 90%;
      padding: 20px;
      font-size: 1.25rem;
      color: #ccc;
      list-style: none;
      display: flex;
      align-items: center;
      flex-direction: row;
      transition: 0.3s;
      cursor: pointer;
      margin-bottom: 0.5em;
      border: 3px dashed #ddd;

      .placeholder-plus {
        margin-right: 0.5em;
      }

      &:hover {
        color: #aaa;
        border-color: #aaa;
      }
    }

    li:nth-child(odd) {
      background-color: #ddd;
    }

    li:nth-child(even) {
      background: $background;
    }
  }

  .select-item {
    opacity: 0;
    transform: translateX(-50%);
    transition: 0.3s ease-in-out;
    margin-right: 10px;
  }

  .bottom-items {
    padding: 0 1em;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;

    .info-item {
      color: $main_grey;
      cursor: pointer;
      transition: 0.15s;

      &:hover {
        opacity: 0.8;
      }
    }

    .counter-item {
      color: $main_grey;
    }
  }
}

.content {
  width: 80%;

  .placeholder {
    height: 100%;
    display: flex;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $second_grey;
    user-select: none;
  }
}
</style>
