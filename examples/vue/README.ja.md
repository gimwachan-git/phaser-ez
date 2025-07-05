# Phaser-EZ デモアプリケーション

**効率的なゲーム開発を紹介する完全な Vue 3 + Phaser-EZ デモンストレーション**

このサンプルアプリケーションは、自動アセット読み込み、シーン管理、Vue統合、強力なEventBusシステムを含む Phaser-EZ の主要機能を紹介します。Phaser-EZ が完全な Phaser 3 互換性を維持しながら、どのように定型コードを排除するかを理解するのに最適です。

## 🚀 クイックスタート

### 前提条件

- Node.js v21 以上
- pnpm v8.15.4+（推奨）または npm

### インストール & 開発

```bash
# 依存関係をインストール
pnpm install

# 開発サーバーを開始
pnpm dev
```

### プロダクションビルド

```bash
# アプリケーションをビルド
pnpm build

# プロダクションビルドをローカルでプレビュー
pnpm preview

# クイックビルドとプレビュー
pnpm start
```

### デプロイメント

FTP デプロイメントの場合、`.ftpconfig.sample` を `.ftpconfig` にコピーしてサーバー設定を構成してください：

```bash
pnpm upload
```

## 🎯 このデモが示すもの

### 実証される主要な Phaser-EZ 機能

1. **🔄 自動アセット読み込み**: シーンディレクトリ構造に基づいてアセットが自動的に読み込まれます
2. **🎮 簡素化されたシーン管理**: `start()` と `dispose()` メソッドによるクリーンなシーンライフサイクル
3. **📡 EventBus統合**: Vue と Phaser シーン間のリアルタイム通信
4. **⚡ シーンプリローディング**: インテリジェントなアセットプリローディングによるシームレスな遷移
5. **🛠️ 開発ツール**: 組み込みシーンデバッグとホットリロードサポート

### デモシーン

- **MainMenu**: 基本的なアセット使用とシーン遷移を実演するエントリーポイント
- **Vue**: Phaser シーン内での Vue コンポーネント統合を表示
- **Pivot**: インタラクティブ要素とアニメーションの例

### アセット構成構造

```
src/assets/
├── common/
│   ├── images/Preloader/     # 共有プリローダーアセット
│   └── sounds/Preloader/     # グローバル効果音
├── images/
│   ├── MainMenu/             # MainMenuシーンアセット
│   ├── Vue/                  # Vueシーンアセット
│   └── Pivot/                # Pivotシーンアセット
└── sounds/                   # シーン固有のオーディオファイル
```

### 基本シーンの例

```javascript
import { DefaultScene } from 'phaser-ez'

export default class MyScene extends DefaultScene {
  constructor() {
    super('MyScene')  // シーンキーはディレクトリ名と一致
  }

  start() {
    // src/assets/images/MyScene/ からのアセットが自動的に読み込まれる
    this.add.image(400, 300, 'background')
    
    // シームレスな遷移のために次のシーンをプリロード
    DefaultScene.preload(this, 'NextScene')
    
    // シーン遷移
    this.button.once('pointerdown', () => {
      DefaultScene.start(this, 'NextScene')
    })
  }
}
```

## 🔧 Vue + Phaser 統合

### Phaser シーン内での Vue コンポーネント使用

Phaser-EZ は Phaser シーン内でのシームレスな Vue コンポーネント統合を提供します。Phaser のアーキテクチャにより、Vue コンポーネントは `create()` ライフサイクルフェーズ中に作成する必要があります：

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
    // 座標（512, 584）に Vue コンポーネントを追加
    this.vueComponent = this.addVue(512, 584, VueComponent)
  }

  start() {
    // Vue コンポーネントにアニメーションを適用
    createFallAnimation(this, this.vueComponent)
  }
}
```

### EventBus 通信

EventBus は Vue コンポーネントと Phaser シーン間のリアルタイム通信を可能にします：

```javascript
// Vue コンポーネント内
import { EventBus } from 'phaser-ez'

// Phaser にイベントを発行
EventBus.emit('player-action', { type: 'jump', power: 10 })

// Phaser イベントをリッスン
EventBus.on('game-over', (data) => {
  console.log('ゲームオーバー:', data.score)
})

// Phaser シーン内
EventBus.on('player-action', (action) => {
  if (action.type === 'jump') {
    this.player.jump(action.power)
  }
})

EventBus.emit('game-over', { score: this.currentScore })
```

## 🛠️ 利用可能なユーティリティ & アニメーション

このデモには開発を加速するための事前構築されたユーティリティとアニメーションが含まれています：

### ユーティリティ関数
- **`getCookie`** - Cookie 取得ユーティリティ
- **`setCookie`** - Cookie 設定ユーティリティ
- **`toLocalISOString`** - ローカル時間フォーマット

### アニメーションライブラリ
このサンプルには包括的なアニメーションシステムが含まれています：

- **`createAngleAnimation`** - 回転ベースアニメーション
- **`createFallAnimation`** - 重力落下エフェクト
- **`createFallAnimation2`** - 代替落下パターン
- **`createFloatAnimation`** - 浮遊モーションエフェクト
- **`createFrameAnimation`** - スプライトフレームアニメーション
- **`createKiraAnimation`** - スパークル/グリッターエフェクト
- **`createPenAnimation`** - 描画/パスアニメーション
- **`createRotateAnimation`** - 回転トゥイーン
- **`createScaleAnimation`** - スケール変換エフェクト
- **`createShowAnimation`** - 出現/表示エフェクト
- **`createXYAnimation`** - 位置ベースムーブメント

これらのアニメーションは、再利用可能なゲームコンポーネント構築のための Phaser-EZ の拡張可能なアーキテクチャを実演しています。

## 💻 技術スタック

[![Phaser-EZ](https://img.shields.io/badge/Phaser--EZ-0.0.218-blue?style=for-the-badge)](https://github.com/your-repo/phaser-ez)
[![Phaser](https://img.shields.io/badge/Phaser-3.87.0-99c3ea?style=for-the-badge)](https://phaser.io/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5.13-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-2C3E50?style=for-the-badge&logo=vite&logoColor=4FC08D)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-2.3.0-fce367?style=for-the-badge)](https://pinia.vuejs.org/)

- **Phaser-EZ**: ストリームライン化された Phaser 3 開発ライブラリ
- **Vue 3**: Composition API を持つプログレッシブ JavaScript フレームワーク
- **Vite**: 次世代フロントエンドビルドツール
- **Pinia**: Vue のための直感的な状態管理
- **SASS**: 拡張スタイリングのための CSS プリプロセッサ

## 📁 プロジェクト構造

このデモは Phaser-EZ の推奨プロジェクト構成に従います：

```
src/
├── main.js                 # Vue アプリケーションエントリーポイント
├── App.vue                  # ルート Vue コンポーネント
├── components/              # Vue コンポーネント
│   ├── Loader.vue          # ローディング画面コンポーネント
│   ├── SceneDebug.vue      # 開発デバッグツール
│   └── icons/              # アイコンコンポーネント
├── stores/                  # Pinia 状態管理
│   └── useAppStore.js      # グローバルアプリケーション状態
├── game/                    # Phaser-EZ ゲームコード
│   ├── PhaserGame.vue      # Vue-Phaser ブリッジコンポーネント
│   └── scenes/             # ゲームシーン
│       ├── MainMenu.js     # メインメニューシーン
│       ├── Vue.js          # Vue 統合デモ
│       └── Pivot.js        # インタラクティブシーン
├── libs/                   # 共有ユーティリティ
│   └── Phaser/            # Phaser 固有ヘルパー
│       └── animations/     # アニメーションライブラリ
├── utils/                  # 一般的なユーティリティ
│   ├── getCookie.js       # Cookie 管理
│   ├── setCookie.js
│   └── toLocalISOString.js # 時間フォーマット
└── assets/                 # ゲームアセット（自動読み込み）
    ├── common/             # 共有アセット
    ├── images/             # シーン固有画像
    ├── sounds/             # オーディオファイル
    └── videos/             # ビデオアセット
```

## 🎮 デモの実行

`PhaserGame.vue` コンポーネントは Vue と Phaser 間のブリッジとして機能し、以下を処理します：

- **ゲーム初期化**: 最適な設定で Phaser を構成
- **アセットコンテキスト設定**: Vite の `import.meta.glob` による自動アセット読み込みを有効化
- **シーン管理**: `./scenes/` ディレクトリからすべてのシーンを動的に読み込み
- **イベント処理**: Vue と Phaser 間の EventBus 通信を管理

### Vue でのゲームインスタンスへのアクセス

```javascript
// 親 Vue コンポーネント内
<script setup>
import { ref, toRaw } from 'vue'

const phaserRef = ref()

// ゲームインスタンスと現在のシーンにアクセス
const game = computed(() => toRaw(phaserRef.value?.game))
const currentScene = computed(() => toRaw(phaserRef.value?.currentScene))

const onSceneChange = (scene) => {
  console.log('アクティブシーンが変更されました:', scene.key)
}
</script>

<template>
  <PhaserGame ref="phaserRef" @scene-change="onSceneChange" />
</template>
```

## 🚀 シーン管理 & プリローディング

Phaser-EZ の `DefaultScene` は完全なシーンライフサイクルを処理します：

### 自動アセット読み込み
- シーンキーとディレクトリ構造に基づいてアセットが読み込まれます
- `preload()` は `src/assets/[type]/[sceneKey]/` 内のアセットを自動発見
- 画像、音声、動画、フォント、スプライトシートをサポート
- 読み込み進行状況は EventBus 経由で Vue に通信

### シーンライフサイクル
1. **Constructor**: シーン登録とキー割り当て
2. **Preload**（自動）: アセット発見と読み込み
3. **Create**（自動）: 読み込み完了とリソース準備
4. **Start**: ゲームロジックエントリーポイント（従来の `create` を置換）
5. **Dispose**: シーン遷移時の自動クリーンアップ

### シームレスなシーン遷移

```javascript
import { DefaultScene } from 'phaser-ez'

export default class GameLevel extends DefaultScene {
  constructor() {
    super('GameLevel')
  }

  start() {
    // 瞬時遷移のために次のシーンをプリロード
    DefaultScene.preload(this, 'GameOver', 'NextLevel')
    
    // シーンを設定
    this.setupGameplay()
    
    // シーン遷移を処理
    this.onWin(() => {
      DefaultScene.start(this, 'NextLevel')
    })
  }
  
  dispose() {
    // 自動クリーンアップ - メモリリークなし！
    super.dispose()
  }
}
```

## 🧪 開発 & デバッグ

### デバッグツール
このデモには包括的なデバッグ機能が含まれています：

- **シーンナビゲーター**: 瞬時シーン切り替えのためのトップツールバー（開発モードのみ）
- **Vue DevTools**: Vue/Pinia 状態検査のためのボトムパネル
- **コンソールロギング**: EventBus アクティビティとシーンライフサイクルイベント
- **ホットリロード**: 開発中の瞬時更新

### カスタムローディングコンポーネント
`src/components/icons/LoaderIcon.vue` を変更してローディング体験をカスタマイズ：

```vue
<template>
  <div class="loader">
    <!-- カスタムローディングアニメーション -->
    <svg><!-- カスタム SVG アニメーション --></svg>
  </div>
</template>

<style scoped>
.loader {
  /* カスタムスタイル */
}
</style>
```

## 🚀 プロダクションデプロイメント

このデモは最適なパフォーマンスのために静的サイト生成（SSG）を使用します：

```bash
# プロダクション用にビルド
pnpm build

# プロダクションビルドをプレビュー
pnpm preview

# クイックビルドとプレビュー
pnpm start
```

ビルドプロセス：
- すべてのコードとアセットを `dist/` ディレクトリにバンドル
- ウェブデプロイメント用に最適化
- アセット最適化とコード分割を含む
- 任意の静的ホスティングプロバイダーで使用可能

## 🛠️ カスタマイゼーション

### ビルド設定
`vite.config.mjs` を変更してカスタマイズ：
- アセット処理と最適化
- ビルドターゲットと互換性
- プラグイン設定
- 開発サーバー設定

### デモの拡張
1. **新しいシーンを追加**: `src/game/scenes/` にファイルを作成
2. **アセットを追加**: `src/assets/[type]/[sceneKey]/` に整理
3. **カスタムアニメーション**: アニメーションライブラリを拡張
4. **Vue コンポーネント**: Phaser シーンと UI 要素を統合

## 📚 詳細情報

- **[Phaser-EZ ドキュメント](../CLAUDE.md)**: 完全な開発ガイド
- **[Phaser 3 公式ドキュメント](https://newdocs.phaser.io)**: コア Phaser API リファレンス
- **[Vue 3 ドキュメント](https://vuejs.org)**: Vue フレームワークガイド
- **[Vite ドキュメント](https://vitejs.dev)**: ビルドツール設定

---

**ゲームを作る準備はできましたか？**このデモは Phaser-EZ で可能なことの始まりにすぎません。コードを探索し、シーンを変更して、独自のゲーム作りを始めましょう！ 🎮✨