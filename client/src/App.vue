<template>
  <HomeView />
  <router-view />
  <footer>
    <a href="https://github.com/zFlxw" target="_blank">&copy; 2022 by Flxw</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeView from './views/HomeView.vue'

export default defineComponent({
  name: 'App',
  components: { HomeView }
})
</script>

<style lang="scss">
$background: #f6f8fa;
$main_blue: #0077b6;
$main_grey: #495057;
$second_grey: #ced4da;

@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
  box-sizing: border-box;
}

main {
  min-height: calc(97vh - 3px);
  display: grid;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Poppins', sans-serif;
}

footer {
  width: 100%;
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: $second_grey;
  text-align: center;
  transition: .15s;

  a {
    text-decoration: none;
    color: second_grey;

    &:visited, &:active {
      color: inherit;
    }
  }

  &:hover {
    cursor: pointer;
    color: $main_grey;
  }
}
</style>
