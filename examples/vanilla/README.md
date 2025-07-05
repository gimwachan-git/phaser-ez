# Phaser-EZ Vanilla JavaScript Demo

This is a complete demo application showcasing Phaser-EZ library features using pure vanilla JavaScript.

## Features Demonstrated

- **Scene Management**: Seamless scene transitions with preloading
- **Asset Loading**: Automatic asset detection and loading system
- **Event System**: Global communication using EventBus
- **Animation System**: Custom animations with reusable components
- **Resource Management**: Organized asset structure with automatic cleanup

## Project Structure

```
vanilla/
├── src/
│   ├── assets/          # Game assets organized by type
│   │   ├── images/      # Image assets
│   │   ├── sounds/      # Audio assets
│   │   └── videos/      # Video assets
│   ├── scenes/          # Game scenes
│   │   ├── MainMenu.js  # Main menu scene
│   │   ├── Vanilla.js   # Vanilla JS demo scene
│   │   └── Pivot.js     # Interactive demo scene
│   ├── libs/            # Utility libraries
│   │   └── Phaser/      # Phaser extensions and animations
│   └── main.js          # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Build configuration
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Key Implementation Details

### Scene Management
- Each scene extends `DefaultScene` from phaser-ez
- Automatic asset preloading for seamless transitions
- Scene lifecycle management with proper cleanup

### Asset Loading
- Uses Vite's `import.meta.glob` for automatic asset discovery
- Organized by scene directories for automatic loading
- Supports images, sounds, and videos with automatic format detection

### Event System
- Global EventBus for cross-scene communication
- Scene loading status tracking
- Custom event logging for debugging

### Animation System
- Reusable animation components
- Tween-based animations with callbacks
- Smooth transitions and effects

## Browser Support

- Modern browsers with ES6 module support
- Requires WebGL for optimal performance
- Responsive design with automatic scaling

## License

This demo is part of the Phaser-EZ library and follows the same license terms.