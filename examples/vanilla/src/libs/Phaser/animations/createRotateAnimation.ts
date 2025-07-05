/**
 * Phaser.Scene、Phaser.GameObjects.Sprite（またはその配列）、およびオプションを引数に取り、キラキラアニメーションを作成します。
 *
 * @param context アニメーションを作成するシーン。
 * @param sprites アニメーションの対象となるスプライト（またはその配列）。
 * @param options アニメーションのオプション（オプション）。onComplete（完了時のコールバック）を設定できます。
 * @returns 作成したアニメーション。
 */

interface AnimationOptions {
  onComplete?: () => void
}
export default function createRotateAnimation(
  context: Phaser.Scene,
  sprites: Phaser.GameObjects.Sprite | Phaser.GameObjects.Sprite[],
  angle?: number,
  duration?: number,
  options?: AnimationOptions
) {
  if (!Array.isArray(sprites)) {
    sprites = [sprites]
  }

  return context.tweens.add({
    targets: sprites,
    angle: angle ? angle : 0,
    ease: 'Power1',
    duration: duration ? duration : 1000,
    onComplete: options?.onComplete
  })
}
