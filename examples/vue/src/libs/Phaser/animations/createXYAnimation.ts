/**
 * Phaser.Scene、Phaser.GameObjects.Sprite（またはその配列）、アニメーションの持続時間、およびオプションを引数に取り、XY座標アニメーションを作成します。
 *
 * @param context アニメーションを作成するシーン。
 * @param sprites アニメーションの対象となるスプライト（またはその配列）。
 * @param duration アニメーションの持続時間（ミリ秒）。
 * @param options アニメーションのオプション。xオプションとyオプションで移動先の座標を指定、easeオプションでイージング関数を指定、delayオプションでアニメーションの開始を遅延させ、onCompleteオプションでアニメーション完了時のコールバック関数を指定できます。
 * @returns 作成したアニメーション。
 */

interface AnimationOptions {
  x?: number
  y?: number
  ease?: string
  delay?: number
  onComplete?: () => void
}
export default function createXYAnimation(
  context: Phaser.Scene,
  sprites: Phaser.GameObjects.Sprite | Phaser.GameObjects.Sprite[],
  duration?: number,
  options?: AnimationOptions
) {
  if (!Array.isArray(sprites)) {
    sprites = [sprites]
  }
  const tweenConfig: Phaser.Types.Tweens.TweenBuilderConfig = {
    targets: sprites,
    ease: options?.ease ? options.ease : 'Linear',
    delay: options?.delay ? options.delay : 0,
    duration: duration ? duration : 300,
    onComplete: options?.onComplete
  }

  if (options?.x !== undefined) {
    tweenConfig.x = options.x
  }
  if (options?.y !== undefined) {
    tweenConfig.y = options.y
  }

  return context.tweens.add(tweenConfig)
}
