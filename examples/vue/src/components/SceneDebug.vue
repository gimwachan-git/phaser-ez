<script setup>
import { ref, watchEffect } from 'vue'
import { DefaultScene } from 'phaser-ez'

const props = defineProps({
  sceneKeys: {
    type: Array,
    required: true
  },
  game: {
    type: Object,
    required: true
  },
  selectedScene: {
    type: String,
    default: ''
  }
})

const selectedScene = ref(props.selectedScene)

const handleDebugClick = async (e) => {
  if (selectedScene.value === e.target.value) return
  const currentScene = props.game.scene.getScene(selectedScene.value)
  const nextSceneKey = e.target.value

  // const { DefaultScene } = await import('phaser-ez')

  DefaultScene.preload(currentScene, nextSceneKey)
  setTimeout(() => {
    DefaultScene.start(currentScene, nextSceneKey)
  }, 100)
}

const handleItemClick = (scene) => {
  if (selectedScene.value === scene) return
  const radioInput = document.getElementById(scene)
  radioInput.click()
}

watchEffect(() => {
  selectedScene.value = props.selectedScene
})
</script>

<template>
  <div class="scene-debug">
    <div v-for="scene in sceneKeys" :key="scene">
      <div class="scene-debug__item" @click="handleItemClick(scene)">
        <input
          type="radio"
          :id="scene"
          name="scene"
          :value="scene"
          v-model="selectedScene"
          @click="handleDebugClick"
        />
        <label :for="scene">{{ scene }}</label>
      </div>
      <span></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scene-debug {
  --vue-devtools-widget-bg: #ededed;
  --vue-devtools-widget-bg-click: #ffffff;
  --vue-devtools-widget-fg: #111;
  --vue-devtools-widget-border: #efefef;
  --vue-devtools-widget-shadow: rgba(128, 128, 128, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  @media (prefers-color-scheme: dark) {
    --vue-devtools-widget-bg: #0f0f0f;
    --vue-devtools-widget-bg-click: #111;
    --vue-devtools-widget-fg: #f5f5f5;
    --vue-devtools-widget-border: #3336;
    --vue-devtools-widget-shadow: rgba(0, 0, 0, 0.3);
  }
  div {
    position: relative;
    div {
      box-sizing: border-box;
      border: 1px solid var(--vue-devtools-widget-border);
      border-radius: 20px;
      background-color: var(--vue-devtools-widget-bg);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      color: var(--vue-devtools-widget-fg);
      box-shadow: 2px 2px 8px var(--vue-devtools-widget-shadow);
      -webkit-user-select: none;
      user-select: none;
      padding: 5px 10px;
      z-index: 1;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      align-content: center;
      flex-direction: row;
      gap: 0.2em;
      transition: background-color 1s ease;
      &:has(input:checked) {
        background-color: var(--vue-devtools-widget-bg-click);
      }
    }
    input {
      margin: unset;
    }
    label {
      color: #c0c0c0;
      transition: color 1s ease;
      @media (prefers-color-scheme: dark) {
        color: #888;
      }
    }
    span {
      position: absolute;
      left: -40px;
      top: -30px;
      width: calc(100% + 100px);
      height: calc(100% + 60px);
      opacity: 0;
      transition: all 1s ease;
      pointer-events: none;
      z-index: -1;
      border-radius: 9999px;
      background-image: linear-gradient(45deg, #00dc82, #36e4da, #0047e1);
      filter: blur(38px);
    }
    &:has(input:checked) {
      label {
        color: #6b6b6b;
        @media (prefers-color-scheme: dark) {
          color: #d8d8d8;
        }
      }
      span {
        opacity: 0.6;
      }
    }
  }
}
</style>
