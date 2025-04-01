import DefaultScene from './DefaultScene'
import EventBus from './EventBus'

// シーンの共通サウンドコンテキスト
const soundsCommonContext = import.meta.glob('../assets/sounds/**/*', {
  eager: true
})
// シーンの共通画像コンテキスト
const imagesCommonContext = import.meta.glob('../assets/images/**/*', {
  eager: true
})
// シーンの共通ビデオコンテキスト
const videosCommonContext = import.meta.glob('../assets/videos/**/*', {
  eager: true
})

/**
 * プリローダーシーン。ゲームの共通アセットを事前にロードします。
 * @extends DefaultScene
 */
export default class Preloader extends DefaultScene {
  /**
   * 次のシーンのキー。
   * @type {string}
   * @static
   */
  static nextSceneKey = 'Main';

  /**
   * コンストラクタ。共通のアセットをマッチングしてロードします。
   */
  constructor() {
    super('Preloader')
    // 画像ファイル名をマッチングしてコンテキストに追加
    if (this.imagesCommonFilenames) {
      const mergedImagesContext = {
        ...this.constructor.imagesCommonContext,
        ...imagesCommonContext
      };
      // console.log("this.imagesCommonFilename >> ", mergedImagesContext);
      this.constructor.imagesContext = {
        ...this.constructor.imagesContext,
        ...this.matchFilenamesWithContext(this.imagesCommonFilenames, mergedImagesContext)
      };
      // console.log("this.imagesContext >> ", this.constructor.imagesContext);
    }
    // サウンドファイル名をマッチングしてコンテキストに追加
    if (this.soundsCommonFilenames) {
      const mergedSoundsContext = {
        ...this.constructor.soundsCommonContext,
        ...soundsCommonContext
      };
      // console.log("this.soundsCommonFilename >> ", mergedSoundsContext);
      this.constructor.soundsContext = {
        ...this.constructor.soundsContext,
        ...this.matchFilenamesWithContext(this.soundsCommonFilenames, mergedSoundsContext)
      };
      // console.log("this.soundsContext >> ", this.constructor.soundsContext);
    }
    // ビデオファイル名をマッチングしてコンテキストに追加
    if (this.videosCommonFilenames) {
      const mergedVideosContext = {
        ...this.constructor.videosCommonContext,
        ...videosCommonContext
      };
      // console.log("this.videosCommonFilename >> ", mergedVideosContext);
      this.constructor.videosContext = {
        ...this.constructor.videosContext,
        ...this.matchFilenamesWithContext(this.videosCommonFilenames, mergedVideosContext)
      };
      // console.log("this.videosContext >> ", this.constructor.videosContext);
    }
  }

  /**
   * 次のシーンのキーを設定します。
   * @param {string} value - 次のシーンのキー。
   */
  set nextSceneKey(value) {
    this.constructor.nextSceneKey = value;
  }
  /**
   * 次のシーンのキーを取得します。
   * @returns {string} 次のシーンのキー。
   */
  get nextSceneKey() {
    return this.constructor.nextSceneKey;
  }
  /**
   * 共通のサウンドコンテキストを取得します。
   * @returns {Object} 共通のサウンドコンテキスト。
   */
  get imagesCommonContext() {
    return this.constructor.imagesCommonContext;
  }
  /**
   * 共通のサウンドコンテキストを取得します。
   * @returns {Object} 共通のサウンドコンテキスト。
   */
  get soundsCommonContext() {
    return this.constructor.soundsCommonContext;
  }
  /**
   * 共通のビデオコンテキストを取得します。
   * @returns {Object} 共通のビデオコンテキスト。
   */
  get videosCommonContext() {
    return this.constructor.videosCommonContext;
  }
  /**
   * 共通のサウンドファイル名を取得します。
   * @returns {string[]} サウンドファイル名の配列。
   */
  get soundsCommonFilenames() {
    return this.constructor.soundsCommonFilenames;
  }
  /**
   * 共通の画像ファイル名を取得します。
   * @returns {string[]} 画像ファイル名の配列。
   */
  get imagesCommonFilenames() {
    return this.constructor.imagesCommonFilenames;
  }
  /**
   * 共通のビデオファイル名を取得します。
   * @returns {string[]} ビデオファイル名の配列。
   */
  get videosCommonFilenames() {
    return this.constructor.videosCommonFilenames;
  }
  /**
   * ファイル名とコンテキストをマッチングします。
   * @param {string[]} filenames - ファイル名の配列。
   * @param {Object} context - インポートしたコンテキストオブジェクト。
   * @returns {Object} マッチしたファイルのオブジェクト。
   */
  matchFilenamesWithContext(filenames, context) {
    const matchedFiles = {};
    for (const key in context) {
      for (const filename of filenames) {
        if (key.includes(filename)) {
          matchedFiles[key] = context[key];
        }
      }
    }
    return matchedFiles;
  }
  /**
   * シーンの初期化メソッド。ロードバーなどを設定できます。
   */
  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    // this.add.image(512, 384, "background");
    //  A simple progress bar. This is the outline of the bar.
    // this.add.rectangle(this.game.canvas.width / 2, this.game.canvas.height / 2, 468, 32).setStrokeStyle(1, 0xffffff);
    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    // const bar = this.add.rectangle(this.game.canvas.width / 2 - 230, this.game.canvas.height / 2, 4, 28, 0xffffff);
    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    // this.load.on("progress", (progress) => {
    //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
    // bar.width = 4 + 460 * progress;
    // });
  }
  /**
   * アセットのプリロードを行います。
   */
  preload() {
    EventBus.emit('scene-loading', {
      sceneKey: this.scene.key,
      isLoading: true
    })
    //  Load the assets for the game - Replace with your own assets
    // this.load.setPath('assets');

    // this.load.image('logo', 'logo.png');
    // this.load.image('star', 'star.png');
    super.preload()
    DefaultScene.preload(this, this.nextSceneKey)
  }
  /**
   * シーンの作成メソッド。アセットのロード完了後に実行されます。
   */
  create() {
    EventBus.emit('scene-loading', {
      sceneKey: this.scene.key,
      isLoading: false
    })
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the ID000. You could also swap this for a Scene Transition, such as a camera fade.
    super.create()
    DefaultScene.start(this, this.nextSceneKey)
  }
}
