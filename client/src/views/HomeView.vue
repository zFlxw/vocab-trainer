<template>
  <main>
    <div class="centered">
      <div class="title">
        <h1>Vokabeltrainer<p>.</p></h1>
      </div>
      <div class="childs">
        <h2 class="link-anim">Lernen<p>.</p></h2> <h2 class="link-anim">Erstellen<p>.</p></h2>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style lang="scss">
$background: #f6f8fa;
$main_blue: #0077b6;
$main_grey: #495057;
$second_grey: #ced4da;

*, *::before, *::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 18px;
  height: 85vh;
}

body {
  background-color: $background;

  h1 p, h2 p {
    color: $main_blue;
    display: inline-flex;
  }
}

.centered {
  height: 75%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: $main_grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    display: inline-block;
    text-decoration: none;
  }
}

.childs {
  padding-top: 12.5rem;
  font-size: 1.75rem;
  width: 60rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.link-anim {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  transition: .15s;

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: $main_blue;
    transition: width .3s;
  }

  &:hover {
    opacity: .9;
  }

  &:hover::after {
    width: 100%;
  }
}
</style>
