/**
 * Phaser.Scene、Phaser.GameObjects.Spriteの配列（または単一のSprite）、持続時間、およびオプションを引数に取り、角度アニメーションを作成します。
 *
 * `sprites`が配列でない場合、配列に変換します。
 *
 * @param context アニメーションを作成するシーン。
 * @param sprites アニメーションの対象となるスプライト（またはスプライトの配列）。
 * @param duration アニメーションの持続時間（オプション）。デフォルトは300。
 * @param options アニメーションのオプション（オプション）。angle（角度）、delay（遅延）、onComplete（完了時のコールバック）を設定できます。
 * @returns 作成したアニメーション。
 */

interface AnimationOptions {
  angle?: number
  delay?: number
  onComplete?: () => void
}
export default function createAngleAnimation(
  context: Phaser.Scene,
  sprites: Phaser.GameObjects.Sprite | Phaser.GameObjects.Sprite[],
  duration?: number,
  options?: AnimationOptions
) {
  if (!Array.isArray(sprites)) {
    sprites = [sprites]
  }

  return context.tweens.add({
    targets: sprites,
    angle: options?.angle ? options.angle : 180,
    ease: 'Linear',
    delay: options?.delay ? options.delay : 0,
    duration: duration ? duration : 300,
    onComplete: options?.onComplete
  })
}
