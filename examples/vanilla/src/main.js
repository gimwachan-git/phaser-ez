import { Main, DefaultScene, Preloader, EventBus } from 'phaser-ez'
import Phaser from 'phaser-ez/Phaser'

const startGame = async () => {
  // Phaser configuration
  // https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
  const config = {
    parent: 'game-container',
    type: Phaser.CANVAS,
    width: 1024,
    height: 768,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    autoFocus: true,
  }

  // Dynamic scene loading using Vite glob imports
  const sceneModules = import.meta.glob('./scenes/*.js', {
    import: 'default'
  })
  const scenes = {}
  for (const [path, importer] of Object.entries(sceneModules)) {
    scenes[path] = await importer()
  }

  // Asset contexts configuration - demonstrating phaser-ez asset management
  DefaultScene.soundsContext = import.meta.glob('./assets/sounds/**/*', {
    eager: true
  })
  DefaultScene.imagesContext = import.meta.glob('./assets/images/**/*', {
    eager: true
  })
  DefaultScene.videosContext = import.meta.glob('./assets/videos/**/*', {
    eager: true
  })
  
  // Configure persistent sounds that won't stop during scene transitions
  DefaultScene.persistentSounds = ['SE_03']

  // Common assets loading - demonstrating global asset sharing
  Preloader.imagesCommonContext = import.meta.glob('./assets/common/images/Preloader/*', {
    eager: true
  })
  Preloader.soundsCommonContext = import.meta.glob('./assets/common/sounds/Preloader/*', {
    eager: true
  })
  Preloader.videosCommonContext = import.meta.glob('./assets/common/videos/Preloader/*', {
    eager: true
  })

  // Preloader configuration - customize startup behavior
  Preloader.nextSceneKey = 'MainMenu' // Start with main menu instead of 'Main'
  Preloader.config.autoStart = false  // Wait for user interaction
  
  // Common asset keywords for automatic loading
  Preloader.imagesCommonFilenames = ['btn_ok', 'btn_quit', 'btn_continue', 'btn_close']
  Preloader.soundsCommonFilenames = ['SE_03']

  const phaser = Main({
    config: config,
    scenes: scenes,
  })

  // EventBus listeners - demonstrating phaser-ez event system
  EventBus.on('scene-loading', (scene) => {
    const { sceneKey, isLoading } = scene
    console.log(`Scene ${sceneKey} ${isLoading ? 'loading' : 'loaded'}`)
  })

  EventBus.on('scene-start', (scene) => {
    console.log(`Scene ${scene.sceneKey} started`)
  })
  
  // Custom event for logging demo activities
  EventBus.on('scene-log', (message) => {
    console.log(`[Demo Log] ${message}`)
  })
  
  // Start the preloader when ready
  EventBus.on('start-next-scene', () => {
    console.log('Starting Phaser-EZ Vanilla demo...')
  })

  return phaser
}

// Start the game
startGame().then(() => {
  // Simulate user readiness after a brief delay for demo purposes
  setTimeout(() => {
    EventBus.emit('start-next-scene')
  }, 1000)
})