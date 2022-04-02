<template>
  <main>
    <div class="wrapper">
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p class="links"><a href="/">Home</a> • <a href="/profile">Profile</a></p>
    </div>
  </main>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
$background: #f6f8fa;
$main_blue: #0077b6;
$main_grey: #495057;
$second_grey: #ced4da;

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 3rem;
  padding-bottom: 2rem;
}

p {
  flex-direction: row;
  font-size: 1.5rem;
  color: $main_grey;
}

.links {
  font-size: 1.25rem;
  padding-top: 2rem;

  a {
    color: $main_blue;
    transition: .3s;

    &:hover {
      opacity: .8;
      cursor: pointer;
      text-decoration: underline;
    }

    &:visited, &:active {
      color: $main_blue;
    }
  }
}
</style>
