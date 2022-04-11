<template>
  <main>
    <div class="learn-wrapper">
      <div class="decks">
        <div class="decks-inner">
          <h1>Your Decks:</h1>
          <hr />
          <ul class="decks-list">
            <li class="deck-item bg"><ArrowRight class="select-item" size="26" />German</li>
            <li class="deck-item"><ArrowRight class="select-item" size="26" />English</li>
            <li class="deck-item bg"><ArrowRight class="select-item" size="26" />French</li>
            <li class="deck-item"><ArrowRight class="select-item" size="26" />Italian</li>
            <li class="deck-item bg"><ArrowRight class="select-item" size="26" />Greek</li>
          </ul>
        </div>

        <PlusCircle class="icon" size="48" />
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
import { defineComponent } from "@vue/runtime-core";
import { PlusCircle, ArrowRight } from "lucide-vue-next";

export default defineComponent({
  name: "LearnEdit", 
  components: { PlusCircle, ArrowRight },
  setup() {},
});
</script>

<style lang="scss" scoped>
.learn-wrapper {
  float: left;
  display: flex;
  margin: 0 2em;
  padding: 1em;
  padding-left: 0;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
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

  h1 {
    padding: 0 .5em;
  }

  hr {
    margin: .5em auto;
    width: 50px;
    height: 3px;
    background: $main_blue;
    border: none;
  }

  .decks-list {
    padding-top: 25px;

    li {
      padding: 20px;
      font-size: 1.25rem;
      list-style: none;
      text-align: left;
      display: flex;
      align-items: center;
      flex-direction: row;
      transition: .3s;
      cursor: pointer;
      border-bottom: 1px solid $main_grey;

      &:hover {
        box-shadow: inset 0 0 0 3px $main_blue;
      }

      &:hover > .select-item {
        opacity: 1;
        transform: translateX(0);
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
    transition: .3s ease-in-out;
    margin-right: 10px;
  }

  .icon {
    color: $main_grey;
    cursor: pointer;
    margin-bottom: 50px;
    transition: .15s;

    &:hover {
      opacity: .8;
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
