/**
 * Phaser.Scene、Phaser.GameObjects.Sprite（またはその配列）、アニメーションの持続時間、およびオプションを引数に取り、表示アニメーションを作成します。
 *
 * @param context アニメーションを作成するシーン。
 * @param sprites アニメーションの対象となるスプライト（またはその配列）。
 * @param duration アニメーションの持続時間（ミリ秒）。
 * @param options アニメーションのオプション。reverseオプションでアルファ値の変化の方向を逆にし、easeオプションでイージング関数を指定、delayオプションでアニメーションの開始を遅延させ、onCompleteオプションでアニメーション完了時のコールバック関数を指定できます。
 * @returns 作成したアニメーション。
 */

interface AnimationOptions {
  reverse?: boolean
  ease?: string
  delay?: number
  onComplete?: () => void
}
export default function createShowAnimation(
  context: Phaser.Scene,
  sprites: Phaser.GameObjects.Sprite | Phaser.GameObjects.Sprite[],
  duration?: number,
  options?: AnimationOptions
) {
  // If `sprites` is not an array, convert it to an array
  if (!Array.isArray(sprites)) {
    sprites = [sprites]
  }

  return context.tweens.add({
    targets: sprites,
    alpha: options?.reverse ? { from: 1, to: 0 } : { from: 0, to: 1 },
    ease: options?.ease ? options?.ease : 'Power1',
    delay: options?.delay ? options.delay : 0,
    duration: duration ? duration : 300, // Change this to control the speed of alpha change
    onComplete: options?.onComplete
  })
}
