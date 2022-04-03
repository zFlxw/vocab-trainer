<template>
  <label class="switch">
    <input type="checkbox" :checked="checked"/>
    <span class="slider"></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Ref, ref } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    isChecked: Boolean
  },
  setup (props) {
    const checked: Ref<Boolean> = ref(props.isChecked);

    return {
      checked
    }
  }
});
</script>

<style lang="scss" scoped>
$background: #f6f8fa;
$main_blue: #0077b6;
$main_grey: #495057;
$main_green: #90be6d;
$main_red: #f94144;
$second_grey: #ced4da;
$second_green: #65C18C;
$second_red: #ee6055;

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $second_red;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
}

input {
  &:checked + .slider {
    background-color: $second_green;
  }

  &:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + .slider::before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
}
</style>