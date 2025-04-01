import loadResource from '../utils/loadResource'
import EventBus from './EventBus'
import Phaser from 'phaser';

/**
 * DefaultScene
 * @class
 * @extends Scene
 * @classdesc Base class for all scenes
 * @status 
 * Phaser.Scenes.PENDING, or 0
 * Phaser.Scenes.INIT, or 1
 * Phaser.Scenes.START, or 2
 * Phaser.Scenes.LOADING, or 3
 * Phaser.Scenes.CREATING, or 4
 * Phaser.Scenes.RUNNING, or 5
 * Phaser.Scenes.PAUSED, or 6
 * Phaser.Scenes.SLEEPING, or 7
 * Phaser.Scenes.SHUTDOWN, or 8
 * Phaser.Scenes.DESTROYED, or 9
 */
export default class DefaultScene extends Phaser.Scene {
  constructor(key) {
    super(key)
  }

  get loadOption() {
    return this.constructor.loadOption
  }

  get soundsContext() {
    return this.constructor.soundsContext;
  }

  get imagesContext() {
    return this.constructor.imagesContext;
  }

  get videosContext() {
    return this.constructor.videosContext;
  }

  init() {}

  preload() {
    const sceneKey = this.scene.key
    const sceneKeyPath = `/${sceneKey}/`

    const sounds = Object.keys(this.soundsContext).reduce((acc, key) => {
      const sound = this.soundsContext[key]
      const currentKey = key.split('/').pop().split('.').shift()
      if (!key.includes(sceneKeyPath)) return acc
      // console.log("key >> ", key);
      // console.log("currentKey >> ", currentKey);
      // console.log("sceneKey >> ", sceneKey);
      acc[currentKey] = sound.default
      return acc
    }, {})

    const images = Object.keys(this.imagesContext).reduce((acc, key) => {
      const image = this.imagesContext[key]
      const currentKey = key.split('/').pop().split('.').shift()
      if (!key.includes(sceneKeyPath)) return acc
      // console.log("key >> ", key);
      // console.log("currentKey >> ", currentKey);
      // console.log("sceneKey >> ", sceneKey);
      acc[currentKey] = image.default
      return acc
    }, {})

    const videos = Object.keys(this.videosContext).reduce((acc, key) => {
      const video = this.videosContext[key]
      const currentKey = key.split('/').pop().split('.').shift()
      if (!key.includes(sceneKeyPath)) return acc
      // console.log("key >> ", key);
      // console.log("currentKey >> ", currentKey);
      // console.log("sceneKey >> ", sceneKey);
      acc[currentKey] = video.default
      return acc
    }, {})

    if (
      Object.keys(sounds).length === 0 &&
      Object.keys(images).length === 0 &&
      Object.keys(videos).length === 0
    )
      return

    // console.log('\n----------------------------------------')
    // console.log(`Scene ${sceneKey} begin preload`)
    // Object.keys(sounds).length !== 0 && console.log("sounds >> ", sounds);
    // Object.keys(images).length !== 0 && console.log("images >> ", images);
    // Object.keys(videos).length !== 0 && console.log("videos >> ", videos);
    loadResource(this, Object.assign({}, sounds, images, videos), this.loadOption)
    // console.log('----------------------------------------\n')
  }

  create() {
    EventBus.emit('scene-loading', {
      sceneKey: this.scene.key,
      isLoading: false
    })
    // console.log(`Scene ${this.scene.key} created`);
  }

  static start(scene, sceneKey) {
    if (scene.scene.key === sceneKey) return

    console.log(`%cScene ${sceneKey} start`, 'font-weight: bold; color: green;')
    const nextScene = scene.scene.get(sceneKey)

    // Stop all sounds except bgm
    scene.sound.forEachActiveSound(function (sound) {
      if (sound.key === 'bgm') return
      sound.stop()
    })
    scene.time.removeAllEvents()

    // dispose scene
    if (scene.dispose) {
      console.log(`%cScene ${scene.scene.key} dispose`, 'font-weight: bold; color: red;')
      scene.dispose()
    }

    // If scene is not running, launch it
    const status = scene.scene.getStatus(sceneKey)
    if (status === 1) {
      scene.scene.launch(sceneKey)
    } else if (status === 7) {
      scene.scene.restart(sceneKey)
    }
    // console.log(`%cScene ${sceneKey} status: ${status}`, 'font-weight: bold; color: green;')

    // If scene is loading, wait for it to complete
    const isLoading = nextScene.load.isLoading()

    if (isLoading || status === 1) {
      // console.log(`%cScene ${sceneKey} is loading`, 'font-weight: bold; color: orange;')
      EventBus.emit('scene-loading', {
        sceneKey: sceneKey,
        isLoading: true
      })
      nextScene.load.once('complete', () => {
        EventBus.emit('scene-start', {
          scene: scene,
          sceneKey: sceneKey
        })
        EventBus.emit('scene-loading', {
          sceneKey: sceneKey,
          isLoading: false
        })
      })
    } else {
      // console.log(`%cScene ${sceneKey} is ready`, 'font-weight: bold; color: green;')
      EventBus.emit('scene-start', {
        scene: scene,
        sceneKey: sceneKey
      })
    }

  }

  static preload(scene, ...sceneKey) {
    const sceneKeys = sceneKey.flat()
    sceneKeys.forEach((key) => {
      scene.scene.launch(key)
    })
  }
}
