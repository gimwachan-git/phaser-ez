/**
 * Phaser.Scene、Phaser.GameObjects.Sprite、およびオプションを引数に取り、浮遊アニメーションを作成します。
 *
 * @param context アニメーションを作成するシーン。
 * @param sprites アニメーションの対象となるスプライト。単一のスプライトまたはスプライトの配列を指定できます。
 * @param options アニメーションのオプション（オプション）。paused（一時停止）、onStart（開始時のコールバック）、onComplete（完了時のコールバック）を設定できます。
 * @returns 作成したアニメーション。
 */
interface AnimationOptions {
  paused?: boolean
  onStart?: () => void
  onComplete?: () => void
}
export default function createFloatAnimation(
  context: Phaser.Scene,
  sprites: Phaser.GameObjects.Sprite | Phaser.GameObjects.Sprite[],
  options?: AnimationOptions
) {
  if (!Array.isArray(sprites)) {
    sprites = [sprites]
  }

  return context.tweens.add({
    targets: sprites,
    y: '+=10',
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
    duration: 500,
    paused: options?.paused,
    onStart: options?.onStart,
    onComplete: options?.onComplete
  })
}
