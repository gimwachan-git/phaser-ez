/**
 * Phaser.Scene、Phaser.GameObjects.Sprite、およびオプションを引数に取り、落下アニメーションを作成します。
 *
 * @param context アニメーションを作成するシーン。
 * @param sprite アニメーションの対象となるスプライト。
 * @param options アニメーションのオプション（オプション）。delay（遅延）、onStart（開始時のコールバック）、onComplete（完了時のコールバック）を設定できます。
 * @returns 作成したアニメーション。
 */

interface AnimationOptions {
  delay?: number
  y?: number
  onStart?: () => void
  onComplete?: () => void
}
export default function createFallAnimation(
  context: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  options?: AnimationOptions
) {
  return context.tweens.add({
    targets: sprite,
    y: options?.y ? '+=' + options?.y : '+=343',
    // alpha: { from: 0, to: 1 },
    ease: 'Bounce',
    duration: 1500,
    delay: options?.delay ? options.delay : 0,
    onStart: options?.onStart,
    onComplete: options?.onComplete
  })
}
