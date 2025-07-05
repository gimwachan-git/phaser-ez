import { DefaultScene, EventBus } from 'phaser-ez'
import { createShowAnimation } from '@/libs/Phaser/animations'

export default class Vue extends DefaultScene {
  constructor() {
    super('Vue')
  }

  start() {
    // Preload next scene for seamless transition
    DefaultScene.preload(this, 'Pivot')

    this.cameras.main.setBackgroundColor(0xffffff)

    this.logo = this.add.image(512, 384, 'vue').setDepth(10).setOrigin(0.5, 0.5)
    
    // Demo: EventBus scene activity logging
    EventBus.emit('scene-log', 'Vue scene active - showing Vue.js integration capabilities')
    
    createShowAnimation(this, this.logo)
    this.logo.setInteractive()
    this.logo.once('pointerdown', (_pointer) => {
      // Demo: EventBus user interaction tracking
      EventBus.emit('scene-log', 'Vue logo clicked - proceeding to Pivot scene')
      
      this.dispose()
      DefaultScene.start(this, 'Pivot')
    })
  }

  dispose() {
    this.logo.destroy()
  }
}
