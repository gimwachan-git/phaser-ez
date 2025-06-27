import { DefaultScene, EventBus } from 'phaser-ez'
import { createShowAnimation } from '@/libs/Phaser/animations'

export default class Pivot extends DefaultScene {
  constructor() {
    super('Pivot')
  }

  start() {
    // Complete the demo cycle by preloading MainMenu
    DefaultScene.preload(this, 'MainMenu')

    this.cameras.main.setBackgroundColor(0xffffff)

    const maxBgWidth = this.sys.game.config.width * 1.3
    const maxBgHeight = this.sys.game.config.height * 1.3

    this.bg = this.add.image(512, 364, 'pivot_bg')
    this.bg.displayWidth = maxBgWidth
    this.bg.displayHeight = maxBgHeight

    this.logo = this.add.sprite(512, 384, 'pivot').setDepth(10).setOrigin(0.5, 0.5).setAlpha(0)
    this.logo.setScale(1.5)
    
    // Demo: EventBus with animation completion tracking
    EventBus.emit('scene-log', 'Pivot scene loaded - demonstrating interactive elements')
    
    createShowAnimation(this, this.logo, 1000)

    this.input.once('pointerdown', (_pointer) => {
      // Demo: EventBus demo completion tracking
      EventBus.emit('scene-log', 'Demo cycle complete - returning to MainMenu')
      
      this.dispose()
      DefaultScene.start(this, 'MainMenu')
    })
    
    // Demo: EventBus timer-based events
    this.time.delayedCall(2000, () => {
      EventBus.emit('scene-log', 'Animation complete - click anywhere to continue demo cycle')
    })
  }

  dispose() {
    this.bg.destroy()
    this.logo.destroy()
  }
}
