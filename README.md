# Phaser-EZ

**A streamlined library for Phaser 3 game development that eliminates boilerplate and accelerates game creation.**

Phaser-EZ is a production-ready extension library built on top of Phaser 3, designed to simplify common game development patterns while maintaining full compatibility with the underlying Phaser API. Born from real-world game development needs, it provides intuitive abstractions for scene management, asset loading, and component architecture.

## ✨ Key Features

### 🎮 **Smart Scene Management**
- **DefaultScene**: Enhanced base scene class with automatic asset loading
- **Intelligent Preloading**: Automatic scene preloading for seamless transitions
- **Scene Flow Control**: Sophisticated scene routing and state management
- **EventBus Integration**: Global event system for cross-scene communication

### 📦 **Automatic Asset Management** 
- **Context-Aware Loading**: Assets automatically organized by scene directory structure
- **Multi-Format Support**: Images, audio, video, sprites, and atlases
- **Base64 Support**: Direct loading of embedded assets
- **Persistent Assets**: Configure sounds and resources that persist across scenes
- **CDN Integration**: Built-in support for CDN-delivered assets

### 🔧 **Modern Development Experience**
- **Vite Integration**: Leverages modern bundler features like `import.meta.glob`
- **Vue.js Compatible**: Seamless integration with Vue 3 applications
- **TypeScript Ready**: Full TypeScript support for better developer experience
- **Hot Reload Friendly**: Optimized for development workflows

### 🎯 **Production Proven**
- **Battle Tested**: Used in production educational games with complex requirements
- **Performance Optimized**: Efficient resource management and scene transitions
- **Extensible Architecture**: Easy to extend with custom components and utilities
- **Component System**: Reusable game components for buttons, UI elements, and interactions

## 🚀 Quick Start

### Installation

```bash
npm install phaser-ez phaser
# or
pnpm add phaser-ez phaser
```

### Basic Usage

```javascript
import { Main, DefaultScene, Preloader, EventBus } from 'phaser-ez'
import Phaser from 'phaser-ez/Phaser'

// Create your game scenes
class GameScene extends DefaultScene {
  constructor() {
    super('GameScene')
  }
  
  start() {
    // Scene automatically loads assets from assets/images/GameScene/
    this.add.image(400, 300, 'background')
    
    // Preload next scene for seamless transitions
    DefaultScene.preload(this, 'NextScene')
  }
}

// Configure and start your game
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600
}

// Set up asset contexts (works with Vite)
DefaultScene.imagesContext = import.meta.glob('./assets/images/**/*', { eager: true })
DefaultScene.soundsContext = import.meta.glob('./assets/sounds/**/*', { eager: true })

// Configure persistent assets
DefaultScene.persistentSounds = ['backgroundMusic']

// Start the game
const { game } = Main({
  config,
  scenes: { GameScene }
})
```

## 🏗️ Architecture

### Scene Lifecycle
```javascript
export default class MyScene extends DefaultScene {
  constructor() {
    super('MyScene')
  }
  
  start() {
    // Called when scene becomes active
    // Assets automatically loaded based on scene name
  }
  
  dispose() {
    // Clean up scene resources
    // Called automatically during scene transitions
  }
}
```

### Asset Organization
```
src/assets/
├── sounds/
│   ├── MyScene/          # Auto-loaded for MyScene
│   │   ├── bgm.mp3
│   │   └── sfx.ogg
│   └── common/           # Shared across scenes
├── images/
│   ├── MyScene/
│   │   ├── background.png
│   │   ├── character_32x48.png    # Auto-detected spritesheet
│   │   └── ui_atlas.png           # Auto-detected atlas
│   └── common/
└── videos/
```

### EventBus Communication
```javascript
// Emit events from any scene
EventBus.emit('player-scored', { score: 100 })

// Listen for events in Vue components or other scenes
EventBus.on('player-scored', (data) => {
  console.log(`Player scored: ${data.score}`)
})
```

## 🎯 Real-World Usage

Phaser-EZ powers sophisticated educational games with features including:
- **Complex Scene Flows**: Story sequences, interactive battles, character progression
- **Live2D Integration**: Animated character interactions with dynamic asset loading
- **State Management**: Seamless integration with Vue/Pinia for game state
- **Multi-Stage Games**: Level progression with persistent data and scene preloading
- **Interactive UI Components**: Reusable button systems, progress bars, and animated elements

## 📚 Documentation & Examples

- **[Example Project](./example/)**: Complete Vue + Phaser-EZ demo application
- **[Production Reference](./202509/)**: Real-world implementation showcasing advanced patterns
- **[API Documentation](./CLAUDE.md)**: Comprehensive development guide

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Development mode with watch
npm run watch

# Run example project
cd example
npm install
npm run dev
```

## 🎮 Why Phaser-EZ?

**Traditional Phaser 3 Development:**
```javascript
// Manual asset loading, scene management, cleanup...
class MyScene extends Phaser.Scene {
  preload() {
    this.load.image('bg', './assets/bg.png')
    this.load.audio('music', './assets/music.mp3')
    // ... manual loading for each asset
  }
  
  create() {
    // Manual scene setup
  }
}
```

**With Phaser-EZ:**
```javascript
// Automatic asset loading, simplified scene management
class MyScene extends DefaultScene {
  start() {
    // Assets auto-loaded, just focus on game logic
    this.add.image(400, 300, 'bg')
    this.sound.play('music')
  }
}
```

## 🤝 Contributing

We welcome contributions! This library is actively maintained and used in production. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Ready to streamline your Phaser 3 development?** 
Phaser-EZ eliminates the boilerplate so you can focus on creating amazing games. 🎮✨