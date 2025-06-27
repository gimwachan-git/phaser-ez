# Phaser-EZ Demo Application

**Complete Vue 3 + Phaser-EZ demonstration showcasing streamlined game development**

This example application demonstrates the key features of Phaser-EZ, including automatic asset loading, scene management, Vue integration, and the powerful EventBus system. Perfect for understanding how Phaser-EZ eliminates boilerplate code while maintaining full Phaser 3 compatibility.

## 🚀 Quick Start

### Prerequisites

- Node.js v21 or higher
- pnpm v8.15.4+ (recommended) or npm

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Building for Production

```bash
# Build the application
pnpm build

# Preview production build locally
pnpm preview

# Quick build and preview
pnpm start
```

### Deployment

For FTP deployment, copy `.ftpconfig.sample` to `.ftpconfig` and configure your server settings:

```bash
pnpm upload
```

## 🎯 What This Demo Shows

### Key Phaser-EZ Features Demonstrated

1. **🔄 Automatic Asset Loading**: Assets are automatically loaded based on scene directory structure
2. **🎮 Simplified Scene Management**: Clean scene lifecycle with `start()` and `dispose()` methods
3. **📡 EventBus Integration**: Real-time communication between Vue and Phaser scenes
4. **⚡ Scene Preloading**: Seamless transitions with intelligent asset preloading
5. **🛠️ Development Tools**: Built-in scene debugging and hot reload support

### Demo Scenes

- **MainMenu**: Entry point demonstrating basic asset usage and scene transitions
- **Vue**: Shows Vue component integration within Phaser scenes  
- **Pivot**: Interactive elements and animation examples

### Asset Organization Structure

```
src/assets/
├── common/
│   ├── images/Preloader/     # Shared preloader assets
│   └── sounds/Preloader/     # Global sound effects
├── images/
│   ├── MainMenu/             # MainMenu scene assets
│   ├── Vue/                  # Vue scene assets  
│   └── Pivot/                # Pivot scene assets
└── sounds/                   # Scene-specific audio files
```

### Basic Scene Example

```javascript
import { DefaultScene } from 'phaser-ez'

export default class MyScene extends DefaultScene {
  constructor() {
    super('MyScene')  // Scene key matches directory name
  }

  start() {
    // Assets from src/assets/images/MyScene/ automatically loaded
    this.add.image(400, 300, 'background')
    
    // Preload next scene for seamless transitions
    DefaultScene.preload(this, 'NextScene')
    
    // Scene transition
    this.button.once('pointerdown', () => {
      DefaultScene.start(this, 'NextScene')
    })
  }
}
```

## 🔧 Vue + Phaser Integration

### Using Vue Components in Phaser Scenes

Phaser-EZ provides seamless Vue component integration within Phaser scenes. Due to Phaser's architecture, Vue components must be created during the `create()` lifecycle phase:

```javascript
import { DefaultScene } from 'phaser-ez'
import VueComponent from '@/components/VueComponent'
import { createFallAnimation } from '@/libs/Phaser/animations'

export default class IntegratedScene extends DefaultScene {
  constructor() {
    super('IntegratedScene')
  }

  create() {
    super.create()
    // Add Vue component at coordinates (512, 584)
    this.vueComponent = this.addVue(512, 584, VueComponent)
  }

  start() {
    // Apply animations to Vue components
    createFallAnimation(this, this.vueComponent)
  }
}
```

### EventBus Communication

The EventBus enables real-time communication between Vue components and Phaser scenes:

```javascript
// In Vue component
import { EventBus } from 'phaser-ez'

// Emit event to Phaser
EventBus.emit('player-action', { type: 'jump', power: 10 })

// Listen for Phaser events
EventBus.on('game-over', (data) => {
  console.log('Game Over:', data.score)
})

// In Phaser scene
EventBus.on('player-action', (action) => {
  if (action.type === 'jump') {
    this.player.jump(action.power)
  }
})

EventBus.emit('game-over', { score: this.currentScore })
```


## 🛠️ Available Utilities & Animations

This demo includes pre-built utilities and animations to accelerate development:

### Utility Functions
- **`getCookie`** - Cookie retrieval utility
- **`setCookie`** - Cookie setting utility  
- **`toLocalISOString`** - Local time formatting

### Animation Library
The example includes a comprehensive animation system:

- **`createAngleAnimation`** - Rotation-based animations
- **`createFallAnimation`** - Gravity-fall effects
- **`createFallAnimation2`** - Alternative fall patterns
- **`createFloatAnimation`** - Floating motion effects
- **`createFrameAnimation`** - Sprite frame animations
- **`createKiraAnimation`** - Sparkle/glitter effects
- **`createPenAnimation`** - Drawing/path animations
- **`createRotateAnimation`** - Rotation tweens
- **`createScaleAnimation`** - Scale transformation effects
- **`createShowAnimation`** - Reveal/appearance effects
- **`createXYAnimation`** - Position-based movement

These animations demonstrate Phaser-EZ's extensible architecture for building reusable game components.

## 💻 Technology Stack

[![Phaser-EZ](https://img.shields.io/badge/Phaser--EZ-0.0.218-blue?style=for-the-badge)](https://github.com/your-repo/phaser-ez)
[![Phaser](https://img.shields.io/badge/Phaser-3.87.0-99c3ea?style=for-the-badge)](https://phaser.io/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.13-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-2C3E50?style=for-the-badge&logo=vite&logoColor=4FC08D)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-2.3.0-fce367?style=for-the-badge)](https://pinia.vuejs.org/)

- **Phaser-EZ**: Streamlined Phaser 3 development library
- **Vue 3**: Progressive JavaScript framework with Composition API
- **Vite**: Next-generation frontend build tool
- **Pinia**: Intuitive state management for Vue
- **SASS**: CSS preprocessor for enhanced styling

## 📁 Project Structure

The demo follows Phaser-EZ's recommended project organization:

```
src/
├── main.js                 # Vue application entry point
├── App.vue                  # Root Vue component
├── components/              # Vue components
│   ├── Loader.vue          # Loading screen component
│   ├── SceneDebug.vue      # Development debugging tools
│   └── icons/              # Icon components
├── stores/                  # Pinia state management
│   └── useAppStore.js      # Global application state
├── game/                    # Phaser-EZ game code
│   ├── PhaserGame.vue      # Vue-Phaser bridge component
│   └── scenes/             # Game scenes
│       ├── MainMenu.js     # Main menu scene
│       ├── Vue.js          # Vue integration demo
│       └── Pivot.js        # Interactive scene
├── libs/                   # Shared utilities
│   └── Phaser/            # Phaser-specific helpers
│       └── animations/     # Animation library
├── utils/                  # General utilities
│   ├── getCookie.js       # Cookie management
│   ├── setCookie.js
│   └── toLocalISOString.js # Time formatting
└── assets/                 # Game assets (auto-loaded)
    ├── common/             # Shared assets
    ├── images/             # Scene-specific images
    ├── sounds/             # Audio files
    └── videos/             # Video assets
```

## 🎮 Running the Demo

The `PhaserGame.vue` component serves as the bridge between Vue and Phaser, handling:

- **Game Initialization**: Configures Phaser with optimal settings
- **Asset Context Setup**: Enables automatic asset loading via Vite's `import.meta.glob`
- **Scene Management**: Dynamically loads all scenes from `./scenes/` directory
- **Event Handling**: Manages EventBus communication between Vue and Phaser

### Accessing Game Instance in Vue

```javascript
// In parent Vue component
<script setup>
import { ref, toRaw } from 'vue'

const phaserRef = ref()

// Access game instance and current scene
const game = computed(() => toRaw(phaserRef.value?.game))
const currentScene = computed(() => toRaw(phaserRef.value?.currentScene))

const onSceneChange = (scene) => {
  console.log('Active scene changed:', scene.key)
}
</script>

<template>
  <PhaserGame ref="phaserRef" @scene-change="onSceneChange" />
</template>
```

## 🚀 Scene Management & Preloading

Phaser-EZ's `DefaultScene` handles the complete scene lifecycle:

### Automatic Asset Loading
- Assets are loaded based on scene key and directory structure
- `preload()` automatically discovers assets in `src/assets/[type]/[sceneKey]/`
- Supports images, sounds, videos, fonts, and sprite sheets
- Loading progress communicated to Vue via EventBus

### Scene Lifecycle
1. **Constructor**: Scene registration and key assignment
2. **Preload** (automatic): Asset discovery and loading
3. **Create** (automatic): Loading completion and resource preparation
4. **Start**: Your game logic entry point (replaces traditional `create`)
5. **Dispose**: Automatic cleanup when transitioning scenes

### Seamless Scene Transitions

```javascript
import { DefaultScene } from 'phaser-ez'

export default class GameLevel extends DefaultScene {
  constructor() {
    super('GameLevel')
  }

  start() {
    // Preload next scenes for instant transitions
    DefaultScene.preload(this, 'GameOver', 'NextLevel')
    
    // Set up your scene
    this.setupGameplay()
    
    // Handle scene transition
    this.onWin(() => {
      DefaultScene.start(this, 'NextLevel')
    })
  }
  
  dispose() {
    // Automatic cleanup - no memory leaks!
    super.dispose()
  }
}
```

## 🧪 Development & Debugging

### Debug Tools
The demo includes comprehensive debugging features:

- **Scene Navigator**: Top toolbar for instant scene switching (dev mode only)
- **Vue DevTools**: Bottom panel for Vue/Pinia state inspection
- **Console Logging**: EventBus activity and scene lifecycle events
- **Hot Reload**: Instant updates during development

### Custom Loading Component
Customize the loading experience by modifying `src/components/icons/LoaderIcon.vue`:

```vue
<template>
  <div class="loader">
    <!-- Your custom loading animation -->
    <svg><!-- Custom SVG animation --></svg>
  </div>
</template>

<style scoped>
.loader {
  /* Your custom styles */
}
</style>
```

## 🚀 Production Deployment

The demo uses Static Site Generation (SSG) for optimal performance:

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview

# Quick build and preview
pnpm start
```

The build process:
- Bundles all code and assets into the `dist/` directory
- Optimized for web deployment
- Includes asset optimization and code splitting
- Ready for any static hosting provider

## 🛠️ Customization

### Build Configuration
Modify `vite.config.mjs` to customize:
- Asset handling and optimization
- Build targets and compatibility
- Plugin configuration
- Development server settings

### Extending the Demo
1. **Add New Scenes**: Create files in `src/game/scenes/`
2. **Add Assets**: Organize in `src/assets/[type]/[sceneKey]/`
3. **Custom Animations**: Extend the animation library
4. **Vue Components**: Integrate UI elements with Phaser scenes

## 📚 Learn More

- **[Phaser-EZ Documentation](../CLAUDE.md)**: Complete development guide
- **[Phaser 3 Official Docs](https://newdocs.phaser.io)**: Core Phaser API reference
- **[Vue 3 Documentation](https://vuejs.org)**: Vue framework guide
- **[Vite Documentation](https://vitejs.dev)**: Build tool configuration

---

**Ready to build your game?** This demo shows just the beginning of what's possible with Phaser-EZ. Explore the code, modify the scenes, and start building your own game! 🎮✨
