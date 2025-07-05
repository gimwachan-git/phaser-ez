/**
 * Phaser.Scene、キー、スプライトシート、フレーム数、フレームの幅、フレームの高さ、およびオプションを引数に取り、フレームアニメーションを作成します。
 * @param context アニメーションを作成するシーン。
 * @param key アニメーションのキー。
 * @param spriteSheet アニメーションの対象となるスプライトシート。
 * @param frameCount フレーム数。
 * @param frameWidth フレームの幅。
 * @param frameHeight フレームの高さ。
 * @param options アニメーションのオプション（オプション）。paused（一時停止）、onStart（開始時のコールバック）、onComplete（完了時のコールバック）を設定できます。
 * @returns
 */

interface AnimationOptions {
  paused?: boolean
  onStart?: () => void
  onComplete?: () => void
}
export default function createFrameAnimation(
  context: Phaser.Scene,
  key: string,
  spriteSheet: string,
  frameCount: number,
  frameWidth: number,
  frameHeight: number,
  options?: AnimationOptions
) {
  context.load.spritesheet(key, spriteSheet, {
    frameWidth: frameWidth,
    frameHeight: frameHeight
  })

  context.anims.create({
    key: key,
    frames: context.anims.generateFrameNumbers(key, {
      start: 0,
      end: frameCount - 1
    }),
    frameRate: 5,
    repeat: -1
  })

  const animConfig = {
    targets: key,
    duration: 500,
    ease: 'Sine.easeInOut',
    paused: options?.paused,
    onStart: options?.onStart,
    onComplete: options?.onComplete
  }

  return context.tweens.add(animConfig)
}
