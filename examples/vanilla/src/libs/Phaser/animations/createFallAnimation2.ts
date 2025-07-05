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
  duration?: number
  onStart?: () => void
  onComplete?: () => void
}
export default function createFallAnimation2(
  context: Phaser.Scene,
  sprite: Phaser.GameObjects.Sprite,
  options?: AnimationOptions
) {
  return context.tweens.add({
    targets: sprite,
    y: options?.y ? '+=' + options?.y : '+=50',
    scale: { from: 1.8, to: 1 },
    alpha: { from: 0, to: 1 },
    ease: 'Bounce',
    duration: options?.duration ? options.duration : 1000,
    delay: options?.delay ? options.delay : 0,
    onStart: options?.onStart,
    onComplete: options?.onComplete
  })
}
