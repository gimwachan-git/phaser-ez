# Phaser-EZ

**Phaser 3 ゲーム開発を効率化し、ゲーム制作を加速するためのストリームラインライブラリ**

Phaser-EZ は Phaser 3 上に構築されたプロダクション対応の拡張ライブラリで、基礎となる Phaser API との完全な互換性を保ちながら、一般的なゲーム開発パターンを簡素化するように設計されています。実際のゲーム開発のニーズから生まれ、シーン管理、アセット読み込み、およびコンポーネント・アーキテクチャのための直感的な抽象化を提供します。

## ✨ 主要機能

### 🎮 **スマートシーン管理**

- **DefaultScene**: 自動アセット読み込み機能付きの拡張ベースシーンクラス
- **インテリジェントプリローディング**: シームレスな遷移のための自動シーンプリローディング
- **シーンフロー制御**: 高度なシーンルーティングと状態管理
- **EventBus統合**: シーン間通信のためのグローバルイベントシステム

### 📦 **自動アセット管理**

- **コンテキスト対応読み込み**: シーンディレクトリ構造によるアセットの自動整理
- **マルチフォーマット対応**: 画像、音声、動画、スプライト、アトラス
- **Base64対応**: 埋め込みアセットの直接読み込み
- **永続アセット**: シーン間で持続するサウンドとリソースの設定
- **CDN統合**: CDN配信アセットの組み込みサポート

### 🔧 **モダンな開発体験**

- **Vite統合**: `import.meta.glob` などのモダンバンドラー機能の活用
- **Vue.js対応**: Vue 3 アプリケーションとのシームレスな統合
- **TypeScript対応**: より良い開発体験のための完全なTypeScriptサポート
- **ホットリロード対応**: 開発ワークフローに最適化

### 🎯 **プロダクション実証済み**

- **実戦テスト済み**: 複雑な要件を持つプロダクション教育ゲームで使用
- **パフォーマンス最適化**: 効率的なリソース管理とシーン遷移
- **拡張可能なアーキテクチャ**: カスタムコンポーネントとユーティリティの簡単な拡張
- **コンポーネントシステム**: ボタン、UI要素、インタラクションのための再利用可能なゲームコンポーネント

## 🚀 クイックスタート

### インストール

```bash
npm install phaser-ez phaser
# または
pnpm add phaser-ez phaser
```

### 基本的な使用方法

```javascript
import { Main, DefaultScene, Preloader, EventBus } from 'phaser-ez'
import Phaser from 'phaser-ez/Phaser'

// ゲームシーンを作成
class GameScene extends DefaultScene {
  constructor() {
    super('GameScene')
  }
  
  start() {
    // シーンは assets/images/GameScene/ から自動でアセットを読み込む
    this.add.image(400, 300, 'background')
    
    // シームレスな遷移のために次のシーンをプリロード
    DefaultScene.preload(this, 'NextScene')
  }
}

// ゲームを設定して開始
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600
}

// アセットコンテキストを設定（Viteと連携）
DefaultScene.imagesContext = import.meta.glob('./assets/images/**/*', { eager: true })
DefaultScene.soundsContext = import.meta.glob('./assets/sounds/**/*', { eager: true })

// 永続アセットを設定
DefaultScene.persistentSounds = ['backgroundMusic']

// ゲームを開始
const { game } = Main({
  config,
  scenes: { GameScene }
})
```

## 🏗️ アーキテクチャ

### シーンライフサイクル

```javascript
export default class MyScene extends DefaultScene {
  constructor() {
    super('MyScene')
  }
  
  start() {
    // シーンがアクティブになったときに呼ばれる
    // アセットはシーン名に基づいて自動的に読み込まれる
  }
  
  dispose() {
    // シーンリソースをクリーンアップ
    // シーン遷移時に自動的に呼ばれる
  }
}
```

### アセット構成

```text
src/assets/
├── sounds/
│   ├── MyScene/          # MyScene用自動読み込み
│   │   ├── bgm.mp3
│   │   └── sfx.ogg
│   └── common/           # シーン間共有
├── images/
│   ├── MyScene/
│   │   ├── background.png
│   │   ├── character_32x48.png    # 自動検出スプライトシート
│   │   └── ui_atlas.png           # 自動検出アトラス
│   └── common/
└── videos/
```

### EventBus通信

```javascript
// 任意のシーンからイベントを発行
EventBus.emit('player-scored', { score: 100 })

// VueコンポーネントまたはVueコンポーネントまたは他のシーンでイベントをリッスン
EventBus.on('player-scored', (data) => {
  console.log(`プレイヤーが得点: ${data.score}`)
})
```

## 🎯 実際の使用例

Phaser-EZ は以下の機能を含む高度な教育ゲームに実装されています：

- **複雑なシーンフロー**: ストーリーシーケンス、インタラクティブバトル、キャラクター進行
- **Live2D統合**: 動的アセット読み込みによるアニメーションキャラクターインタラクション
- **状態管理**: ゲーム状態のVue/Piniaとのシームレスな統合
- **マルチステージゲーム**: 永続データとシーンプリローディングによるレベル進行
- **インタラクティブUIコンポーネント**: 再利用可能なボタンシステム、プログレスバー、アニメーション要素

## 📚 ドキュメント & サンプル

- **[サンプルプロジェクト](./example/)**: 完全な Vue + Phaser-EZ デモアプリケーション
- **[プロダクションリファレンス](./202509/)**: 高度なパターンを紹介する実際の実装
- **[API ドキュメント](./CLAUDE.md)**: 包括的な開発ガイド

## 🛠️ 開発

```bash
# 依存関係をインストール
npm install

# ライブラリをビルド
npm run build

# ウォッチモードで開発
npm run watch

# サンプルプロジェクトを実行
cd example
npm install
npm run dev
```

## 🎮 なぜPhaser-EZ？

**従来のPhaser 3開発:**

```javascript
// 手動でのアセット読み込み、シーン管理、クリーンアップ...
class MyScene extends Phaser.Scene {
  preload() {
    this.load.image('bg', './assets/bg.png')
    this.load.audio('music', './assets/music.mp3')
    // ... 各アセットの手動読み込み
  }
  
  create() {
    // 手動シーン設定
  }
}
```

**Phaser-EZを使用:**

```javascript
// 自動アセット読み込み、簡素化されたシーン管理
class MyScene extends DefaultScene {
  start() {
    // アセットは自動読み込み、ゲームロジックに集中
    this.add.image(400, 300, 'bg')
    this.sound.play('music')
  }
}
```

## 🤝 貢献

このライブラリは積極的にメンテナンスされ、プロダクションで使用されています。貢献を歓迎します：

1. リポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを開く

## 📄 ライセンス

MIT ライセンス - 詳細は [LICENSE](./LICENSE) をご覧ください。

---

**Phaser 3 開発を効率化する準備はできましたか？**
Phaser-EZ は定型コードを排除し、素晴らしいゲームの作成に集中できるようにします。 🎮✨