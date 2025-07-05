/**
 * Phaser.Scene、Phaser.GameObjects.Sprite、および回数を引数に取り、ペンアニメーションを作成します。
 *
 * @param context アニメーションを作成するシーン。
 * @param introPen アニメーションの対象となるスプライト。
 * @param times アニメーションを繰り返す回数（デフォルトは1）。
 * @returns 作成したアニメーションのAPI。startメソッドでアニメーションを開始し、stopメソッドでアニメーションを破棄します。
 */
import createShowAnimation from './createShowAnimation'
import createXYAnimation from './createXYAnimation'

interface PenAnimationAPI {
  start: () => void
  stop: (introArrow: Phaser.GameObjects.Sprite, introText: Phaser.GameObjects.Sprite) => void
}
export default function createPenAnimation(
  context: Phaser.Scene,
  introPen: Phaser.GameObjects.Sprite,
  times = 1
) {
  const penStartConfig = []
  for (let i = 0; i < times; i++) {
    penStartConfig.push(
      {
        at: i * 700,
        run: () => {
          createXYAnimation(context, introPen, 100, {
            x: introPen.x - 10,
            y: introPen.y - 10,
            ease: 'Quad.easeInOut',
            delay: 200
          }) // Add easing
        }
      },
      {
        at: i * 700 + 300,
        run: () => {
          createXYAnimation(context, introPen, 200, {
            x: introPen.x + 10,
            y: introPen.y + 10,
            ease: 'Quad.easeInOut'
          }) // Add easing
        }
      }
    )
  }
  const startTimeline = context.add.timeline(penStartConfig)

  const api = {
    start: () => {
      startTimeline.play()
    },
    stop: (introArrow: Phaser.GameObjects.Sprite, introText: Phaser.GameObjects.Sprite) => {
      createShowAnimation(context, [introPen, introArrow, introText], 300, {
        reverse: true,
        onComplete: () => {
          introPen.destroy()
        }
      })
    }
  }
  return api
}
