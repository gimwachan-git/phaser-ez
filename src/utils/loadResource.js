import base64ToArrayBuffer from './base64ToArrayBuffer'
/**
 * リソースをロードする関数。シーンに必要な全てのアセットをロードします。
 *
 * @param {Phaser.Scene} scene - リソースをロードする対象のシーン。
 * @param {Object} allAssets - ロードする全てのアセットを含むオブジェクト。
 * @param {Object|null} [options=null] - オプション設定。
 * @param {Phaser.Types.Loader.XHRSettingsObject} [options.xhrSettings] - XHR の設定オブジェクト。
 * @param {string} [options.imageBaseURL=''] - 画像アセットのベース URL。
 * @param {string} [options.soundBaseURL=''] - サウンドアセットのベース URL。
 * @param {string} [options.videoBaseURL=''] - ビデオアセットのベース URL。
 * @returns {string[]} ロードされたアセットのキーの配列。
 */
export default function loadResource(scene, allAssets, options = null) {
  const xhrSettings = options && options.xhrSettings ? options.xhrSettings : null
  const imageBaseURL = options && options.imageBaseURL ? options.imageBaseURL : ''
  const soundBaseURL = options && options.soundBaseURL ? options.soundBaseURL : ''
  const videoBaseURL = options && options.videoBaseURL ? options.videoBaseURL : ''

  let assets = []
  const supportedExtensions = [
    'png',
    'jpg',
    'jpeg',
    'webp',
    'svg',
    'ogg',
    'mp3',
    'wav',
    'mp4',
    'webm'
  ]

  const supportedBase64ImageTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml']
  const supportedBase64AudioTypes = ['audio/ogg', 'audio/mpeg', 'audio/wav']
  /**
   * アトラス用の JSON データを探します。
   *
   * @param {string} key - アセットのキー。
   * @returns {Object|null} 見つかった JSON データ、または null。
   */
  const findJsonForAtlas = (key) => {
    for (const [_key, _value] of Object.entries(allAssets)) {
      if (_key === key + '_data') {
        return _value
      }
    }
    return null
  }
  /**
   * オブジェクトがアトラスの JSON データかどうかを判定します。
   *
   * @param {Object} obj - 判定対象のオブジェクト。
   * @returns {boolean} アトラスの JSON データであれば true。
   */
  const isAtlasJson = (obj) => {
    return obj && obj.frames && obj.meta && obj.meta.image
  }
  /**
   * アセットをロードします。
   *
   * @param {string} key - アセットのキー。
   * @param {string} value - アセットのパスまたはデータ。
   */
  const loadAsset = (key, value) => {
    const isBase64 = value.startsWith('data:image') || value.startsWith('data:audio')
    if (isBase64) {
      // Base64 データの場合の処理
      // console.log('load base64 asset:', key, value)
      const parts = value.split(',')
      const type = parts[0].split(':')[1].replace(/;base64$/, '')
      if (supportedBase64ImageTypes.includes(type)) {
        if (!scene.textures.exists(key)) {
          scene.textures.addBase64(key, value)
          assets.push(key)
          // console.log(`load base64 image asset: ${key}`, value)
        }
      } else if (supportedBase64AudioTypes.includes(type)) {
        if (!scene.cache.audio.exists(key)) {
          const arrayBuffer = base64ToArrayBuffer(value);
          scene.sound.decodeAudio(key, arrayBuffer)
          scene.sound.on('decoded', (audioKey) => {
            if (audioKey === key) {
              scene.sound.add(key)
              assets.push(key)
            }
          })
          // scene.load.audio(key, value)
          // assets.push(key)
          // console.log(`load base64 audio asset: ${key}`, value)
        }
      } else {
        console.warn(`Unsupported base64 resource type: ${type}`)
      }
      return

    } else {
      // ファイルパスの場合の処理

      if (typeof value !== 'string' || value === null || !value.includes('.')) return
  
      const parts = value.split('.')
      const extension = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : null
  
      if (!extension) return
      if (!supportedExtensions.includes(extension)) {
        console.warn(`Unsupported resource type: ${extension}`)
        return
      }
  
      if (['png', 'jpg', 'jpeg', 'webp'].includes(extension)) {
        if (!scene.textures.exists(key)) {
          // スプライトシートやアトラスの判定
          const spriteRegex = /_([0-9]+)x([0-9]+)(-[^.]+)?\.[a-zA-Z0-9]+$/
          const spritematch = value.match(spriteRegex)
          const atlasRegex = /_atlas(-[^.]+)?\.[a-zA-Z0-9]+$/
          const atlasmatch = value.match(atlasRegex)
          if (spritematch) {
            // スプライトシートのロード
            const width = parseInt(spritematch[1])
            const height = parseInt(spritematch[2])
            scene.load.spritesheet(
              key,
              imageBaseURL + value,
              {
                frameWidth: width,
                frameHeight: height
              },
              xhrSettings
            )
          } else if (atlasmatch) {
            // アトラスのロード
            // console.log("load atlas:" + key + ", path: " + imageBaseURL + value)
            const json = findJsonForAtlas(key)
            scene.load.atlas(key, imageBaseURL + value, json, xhrSettings)
          } else {
            // 通常の画像のロード
            scene.load.image(key, imageBaseURL + value, xhrSettings)
          }
          assets.push(key)
          // console.log("load image:" + key + ", path: " + imageBaseURL + value)
        }
      } else if (['svg'].includes(extension)) {
        if (!scene.textures.exists(key)) {
          scene.load.svg(key, imageBaseURL + value, undefined, xhrSettings)
          assets.push(key)
        }
      } else if (['ogg', 'mp3', 'wav'].includes(extension)) {
        if (!scene.cache.audio.exists(key)) {
          scene.load.audio(key, soundBaseURL + value, null, xhrSettings)
          assets.push(key)
          // console.log("load audio:" + key + ", path: " + soundBaseURL + value)
        }
      }
      if (['mp4', 'webm'].includes(extension)) {
        if (!scene.cache.video.exists(key)) {
          scene.load.video({
            key: key,
            url: videoBaseURL + value,
            asBlob: true,
            noAudio: false,
            xhrSettings: xhrSettings
          })
          assets.push(key)
          // console.log("load video:" + key + ", path: " + videoBaseURL + value)
        }
      }
    }
  }

  /**
   * アセットオブジェクトを再帰的にトラバースし、各アセットをロードします。
   *
   * @param {Object|Array} assets - アセットのオブジェクトまたは配列。
   * @param {string[]} [parentKeys=[]] - 親キーの配列（再帰的なキーの組み合わせ）。
   */
  const traverseAssets = (assets, parentKeys = []) => {
    if (isAtlasJson(assets)) return
    if (assets && typeof assets === 'object' && !Array.isArray(assets)) {
      for (const [key, value] of Object.entries(assets)) {
        if (key === 'movie') continue
        const newKeys = [...parentKeys, key]
        if (typeof value === 'string' && value) {
          loadAsset(newKeys.join('_'), value)
        } else {
          traverseAssets(value, newKeys)
        }
      }
    } else if (Array.isArray(assets)) {
      assets.forEach((item, index) => {
        if (typeof item === 'string') {
          loadAsset([...parentKeys, index.toString()].join('_'), item)
        } else {
          traverseAssets(item, [...parentKeys, index.toString()])
        }
      })
    } else {
      console.warn(`Unsupported asset type: ${typeof assets}`, assets)
    }
  }

  // アセットのトラバースとロードを開始
  traverseAssets(allAssets)
  // ロードを開始
  scene.load.start()

  if (assets.length > 0) {
    console.log('\n----------------------------------------')
    console.log(`%cScene ${scene.scene.key} Loading assets:`, `font-weight: bold; color: #60c6d2;`)
    if (options) {
      console.log('options:', options)
    }
    console.log('assets keys: ', assets)
    console.log('----------------------------------------\n')
  } else {
    // console.log('%cNo new assets to load', 'color: red;')
  }

  return assets
}
