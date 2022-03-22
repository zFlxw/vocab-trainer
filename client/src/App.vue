<template>
  <header>
    <div>
      <p class="user">Hello, <a class="username">Login</a>!</p>
    </div>
    <div>
      <Settings class="icon" size="32"/>
      <User class="icon" size="32"/>
    </div>
  </header>
  <router-view />
  <footer>
    <a href="https://github.com/zFlxw" target="_blank">&copy; 2022 by Flxw</a>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { User, Settings } from 'lucide-vue-next'

export default defineComponent({
  name: 'App',
  components: { User, Settings }
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
  min-height: calc(97vh - 92px);
  display: grid;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Poppins', sans-serif;
}

header {
  width: 99vw;
  display: inline-flex;
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
    transition: .3s;
    margin-right: 1.5rem;

    &:hover {
      color: $main_blue;
      transform: scale(125%);
    }
  }
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
