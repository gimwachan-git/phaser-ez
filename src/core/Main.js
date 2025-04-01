import Phaser from 'phaser';
import Preloader from './Preloader'
import getFileNameWithoutExtension from '../utils/getFileNameWithoutExtension'
import EventBus from './EventBus'
import startNextScene from '../utils/startNextScene'
import setSceneStatus from '../utils/setSceneStatus'

/**
 * メイン関数。Phaser ゲームを初期化し、シーンのイベントを処理します。
 *
 * @param {Object} params - パラメータオブジェクト。
 * @param {Object} params.config - Phaser ゲームの設定オブジェクト。
 * @param {Object} params.scenes - ゲームのシーンを含むオブジェクト。
 * @returns {Object} ゲームインスタンスとシーンの状態を含むオブジェクト。
 */
const Main = ({
  config: config,
  scenes: scenes,

}) => {
  /**
   * 前のシーンへの参照。
   * @type {Phaser.Scene|null}
   */
  let preventScene = null;

  /**
   * 現在のシーンの参照とキー。
   * @type {{ scene: Phaser.Scene, sceneKey: string }|null}
   */
  let currentScene = null;

  /**
   * Phaser ゲームの基本設定。提供された設定とデフォルト設定をマージします。
   * @type {Object}
   */
  const baseConfig = {
    ...config,
    autoStart: false,
    scene: [Preloader, ...Object.values(scenes)],
  }

  /**
   * 各シーンのロード状態を追跡するマップ。
   * キーはシーン名（拡張子なし）、値はロード中かどうかのブール値。
   * @type {Map<string, boolean>}
   */
  const scenesStatus = new Map()
  scenesStatus.set('Preloader', true)
  Object.keys(scenes).map(sceneKey => {
    const sceneName = getFileNameWithoutExtension(sceneKey)
    scenesStatus.set(sceneName, false)
  })

  // Phaser ゲームインスタンスを作成
  /**
   * Phaser ゲームのインスタンス。
   * @type {Phaser.Game}
   */
  const game = new Phaser.Game({ ...baseConfig });

  // シーンのロードイベントをリッスン
	EventBus.on('scene-loading', (scene) => {
		const { sceneKey, isLoading } = scene
		if (scenesStatus.get(sceneKey) === isLoading) return
		setSceneStatus(scenesStatus, sceneKey, isLoading)
	})

  // シーンの開始イベントをリッスン
	EventBus.on('scene-start', ({ scene, sceneKey }) => {
		preventScene = scene
		currentScene = { scene: scene.scene.get(sceneKey), sceneKey }
		startNextScene(preventScene, currentScene)
	})

  return {
    game,
    preventScene,
    currentScene,
    scenesStatus,
  }
}

export default Main;