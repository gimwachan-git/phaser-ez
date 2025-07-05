import { DefaultScene, EventBus } from 'phaser-ez'
import { createShowAnimation } from '../libs/Phaser/animations/index.js'

export default class Vanilla extends DefaultScene {
  constructor() {
    super('Vanilla')
  }

  start() {
    // Preload next scene for seamless transitions
    DefaultScene.preload(this, 'Pivot')

    this.cameras.main.setBackgroundColor(0xffffff)

    // Create JavaScript logo
    this.logo = this.add.text(512, 384, 'JS', {
      fontFamily: 'Arial Black',
      fontSize: 120,
      color: '#F7DF1E',
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    }).setDepth(10).setOrigin(0.5, 0.5)

    this.subtitle = this.add.text(512, 480, 'Vanilla JavaScript', {
      fontFamily: 'Arial',
      fontSize: 32,
      color: '#333333',
      align: 'center'
    }).setDepth(10).setOrigin(0.5, 0.5)
    
    // Demo: EventBus scene activity logging
    EventBus.emit('scene-log', 'Vanilla scene active - showing pure JavaScript integration')
    
    createShowAnimation(this, this.logo)
    createShowAnimation(this, this.subtitle, 500)

    this.logo.setInteractive()
    this.logo.once('pointerdown', (_pointer) => {
      // Demo: EventBus user interaction tracking
      EventBus.emit('scene-log', 'Vanilla logo clicked - proceeding to Pivot scene')
      
      this.dispose()
      DefaultScene.start(this, 'Pivot')
    })
  }

  dispose() {
    this.logo.destroy()
    this.subtitle.destroy()
  }
}