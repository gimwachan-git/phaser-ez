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
export default function createKiraAnimation(
  context: Phaser.Scene,
  sprites: Phaser.GameObjects.Sprite | Phaser.GameObjects.Sprite[],
  options?: AnimationOptions
) {
  if (!Array.isArray(sprites)) {
    sprites = [sprites]
  }

  return context.tweens.add({
    targets: sprites,
    alpha: { from: 0, to: 1 },
    yoyo: true,
    repeat: -1,
    ease: 'Power1',
    duration: 500,
    onComplete: options?.onComplete
  })
}
