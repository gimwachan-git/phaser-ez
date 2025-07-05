import { DefaultScene, EventBus } from 'phaser-ez'
import { createFallAnimation } from '@/libs/Phaser/animations'

export default class MainMenu extends DefaultScene {
  logoTween

  constructor() {
    super('MainMenu')
  }

  start() {
    // Preload next scenes for seamless transitions
    DefaultScene.preload(this, 'Vue')

    this.bg = this.add.image(512, 384, 'bg')

    this.logo = this.add.image(512, 300 - 343, 'logo').setDepth(100)

    this.menu = this.add
      .text(512, 460, 'Main Menu', {
        fontFamily: 'Arial Black',
        fontSize: 38,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        align: 'center'
      })
      .setDepth(100)
      .setOrigin(0.5)

    // Demo: EventBus logging
    EventBus.emit('scene-log', 'MainMenu scene started - logo animation beginning')
    
    createFallAnimation(this, this.logo)

    this.menu.setInteractive()
    this.menu.once('pointerdown', () => {
      // Demo: EventBus communication
      EventBus.emit('scene-log', 'User clicked main menu - transitioning to Vue scene')
      
      DefaultScene.start(this, 'Vue')
      this.dispose()
    })
  }

  dispose() {
    this.bg.destroy()
    this.logo.destroy()
    this.menu.destroy()
  }

  moveLogo(vueCallback) {
    if (this.logoTween) {
      if (this.logoTween.isPlaying()) {
        this.logoTween.pause()
      } else {
        this.logoTween.play()
      }
    } else {
      this.logoTween = this.tweens.add({
        targets: this.logo,
        x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
        y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
        yoyo: true,
        repeat: -1,
        onUpdate: () => {
          vueCallback({
            x: Math.floor(this.logo.x),
            y: Math.floor(this.logo.y)
          })
        }
      })
    }
  }
}
