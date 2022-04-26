<template>
  <main>
    <div class="learn-wrapper">
      <div class="decks">
        <div class="decks-inner">
          <h1>Your Decks:</h1>
          <hr />
          <ul class="decks-list">
            <li class="deck-item" v-for="deck in decks" @click="selectDeck(deck)">
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
        <!-- Placeholder -->
        <div class="placeholder" v-if="!currentDeck.id && currentDeck.id !== 0 ">
          <p>No Deck selected.</p>
        </div>
        <!-- Actual content -->
        <div v-else class="content-inner">
          <div class="content-header">
            <!-- This item is hidden and only to center the headline and align the close button right! -->
            <i />
            <h1>Selected Deck: {{ currentDeck.name }}</h1>
            <i class="close fas fa-times" @click="clearDeck" />
          </div>
          <hr />
          <div class="stats">
            <div class="stats-items">
              <h2>Test: Test</h2>
              <h2>Test: Test</h2>
              <h2>Test: Test</h2>
              <h2>Test: Test</h2>
            </div>
          </div>
          <div class="vocab-wrapper">
            <div class="vocabs">
              <p class="vocab">Giraffe</p>
              <p class="vocab">Elefant</p>
              <p class="vocab">Wolf</p>
              <p class="vocab">Wolf²</p>
              <p class="vocab">Hund</p>
              <p class="vocab">Katze</p>
              <p class="vocab">Leo</p>
              <p class="vocab">Krokodil</p>
              <p class="vocab">Reh</p>
              <p class="vocab">Tiger</p>
              <p class="vocab">Panther</p>
              <p class="vocab">Nashorn</p>
              <p class="vocab">Anakonda</p>
              <p class="vocab">Giraffe</p>
              <p class="vocab">Elefant</p>
              <p class="vocab">Wolf</p>
              <p class="vocab">Wolf²</p>
            </div>
            <div class="buttons">
              <a class="main-btn btn"><BookOpen class="icon" :size="26"/>Start<i/></a>
              <a class="btn"><Edit class="icon" :size="26"/>Edit<i/></a>
              <a class="btn"><Award class="icon" :size="26"/>Stats<i/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import { PlusCircle, BookOpen, Edit, Award, ArrowRight, Plus, Info } from "lucide-vue-next";
import { get } from "../api/methods";
import AddDeckModal from "../components/modals/learn_view/AddDeckModal.vue";
import InfoModal from "../components/modals/learn_view/InfoModal.vue";

interface Deck {
  id: number;
  name: string;
}

export default defineComponent({
  name: "LearnEdit",
  components: { PlusCircle, BookOpen, Edit, Award, Plus, ArrowRight, Info, AddDeckModal, InfoModal },
  setup() {
    const showAddDeckModal = ref(false);
    const showInfoModal = ref(false);
    const decks = ref([
      { id: 0, name: "German" },
      { id: 1, name: "English" },
      { id: 2, name: "Italian" },
      { id: 3, name: "Greek" },
    ]);

    const currentDeck = ref({} as Deck);

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

    const selectDeck = (deck: Deck) => {
      currentDeck.value = deck;
    };

    const clearDeck = () => {
      currentDeck.value = {} as Deck
    };

    const submitGet = () => {
      get("/decks", true).then((res) => {
        console.log(res.data);
      });
    };

    return {
      showAddDeckModal,
      showInfoModal,
      decks,
      currentDeck,
      openAddDeckModal,
      openInfoModal,
      close,
      submitGet,
      selectDeck,
      clearDeck,
    };
  },
});
</script>

<style lang="scss" scoped>
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
      border-radius: $default_border_radius;
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
      color: $main_grey;

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
      border-radius: $default_border_radius;
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
  height: 100%;
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

  .content-inner {
    height: 100%;
  }

  .content-header {
    display: flex;
    flex-direction: row;
    justify-content: center;

    i:first-child {
      visibility: hidden;
      margin-right: auto;
    }

    i:last-child {
      height: 10px;
      margin-left: auto;
      padding: .5em .5em 0 0;
      cursor: pointer;
      transition: .3s;

      &:hover {
        color: $main_red;
      }
    }

    h1 {
      font-weight: normal;
    }
  }

  .stats {
    border-radius: $default_border_radius;
    padding: 2em 3em;
    width: 95%;
    background: #eee;
    margin: 2rem auto;

    .stats-items {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      h2 {
        font-weight: normal;
      }
    }
  }

  .vocab-wrapper {
    width: 95%;
    height: 70%;
    max-height: 70%;
    overflow: hidden;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: stretch;

    .vocabs {
      border-radius: $default_border_radius;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      gap: 1em;
      width: 82.333%;
      padding: 1em;
      background-color: #eee;

      .vocab {
        flex: 1;
        padding: 1.5em;
        background-color: #fff;
        border-radius: $default_border_radius;
        cursor: pointer;
        transition: .3s;

        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .buttons {
      border-radius: $default_border_radius;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 1em;
      width: 15.667%;

      .btn {
        width: 100%;
        padding: 1em;
        background-color: #ddd;
        color: $main_grey;
        cursor: pointer;
        border-radius: $default_border_radius;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        transition: .3s ease-in-out;

        .icon {
          visibility: hidden;
          opacity: 0;
          transition: .3s ease-in-out;
          transform: translateX(-.5em);
        }

        &:hover {
          & > .icon {
            visibility: visible;
            opacity: 1;
            transform: translateX(0);
          }
        }
      }

      .main-btn {
        background-color: $main_blue;
        color: #fff;
      }
    }
  }

  hr {
    margin: 0.5em auto;
    width: 150px;
    height: 3px;
    background: $main_blue;
    border: none;
  }
}
</style>
