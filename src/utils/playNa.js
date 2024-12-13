import createManualPromise from "./createManualPromise";

/**
 * Phaser.Sound.BaseSoundを再生する関数
 * @param {Phaser.Sound.BaseSound} sound
 * @param {Object} callback
 * @returns
 * @example
 * const sound = this.sound.add("scene_5_narration0")
 * await playNa(sound, {
 *  onStart: () => {
 *      console.log("onStart")
 *  },
 *  onComplete: () => {
 *      console.log("onComplete")
 *  }
 * })
 */
const playNa = (
    sound,
    callback = {
        onStart: null,
        onComplete: null,
    },
) => {
    return new Promise((resolve, reject) => {
        if (!sound) {
            reject("音声が存在しません。");
            return;
        }
        sound.once("play", async () => {
            if (callback && callback.onStart) {
                if (callback.onStart instanceof Promise) {
                    await callback.onStart();
                } else {
                    callback.onStart();
                }
            }
        });
        sound.once("complete", async () => {
            if (callback && callback.onComplete) {
                await callback.onComplete();
            }
            resolve();
        });
        // console.log("playNa: sound", sound.key)

        sound.play();
    });
};

/**
 * Phaser.Sound.BaseSoundのリストを再生する関数
 * @param {Phaser.Scene} scene
 * @param {Phaser.Sound.BaseSound[]} soundList
 * @param {Object} option
 * @returns
 * @example
 *  const soundList = [
 *      this.sound.add("scene_5_narration0"),
 *      this.sound.add("scene_5_narration1"),
 *      this.sound.add("scene_5_narration2"),
 *  ]
 *  await playNaList(this, soundList, {
 *  delay: 1000,
 *  resolveDelay: false,
 *  onStart: [
 *      () => {
 *         console.log("onStart0")
 *      },
 *      () => {
 *          console.log("onStart1")
 *      },
 *      () => {
 *          console.log("onStart2")
 *      }
 *  ],
 *  onComplete: [
 *      () => {
 *          console.log("onComplete0")
 *      },
 *      () => {
 *          console.log("onComplete1")
 *      },
 *      () => {
 *          console.log("onComplete2")
 *      }
 *    ]
 *  })
 */

const playNaList = async (
    scene,
    soundList,
    option = {
        delay: null,
        resolveDelay: false,
        onStart: null,
        onComplete: null,
    },
) => {
    const delay = option?.delay || 0;
    const resolveDelay = option?.resolveDelay || false;
    const playPromises = soundList.map((sound, index) => async () => {
        const { promise, resolve } = createManualPromise();
        await playNa(sound, {
            onStart: () => {
                if (option && option.onStart && option.onStart[index]) {
                    option.onStart[index](resolve);
                }
            },
            onComplete: () => {
                if (option && option.onComplete && option.onComplete[index]) {
                    option.onComplete[index](resolve);
                }
            },
        });

        // playNaごとにdelayがある場合はdelayを実行
        if (delay !== 0 && !resolveDelay) {
            scene.time.delayedCall(delay, resolve);
        }

        await promise;
    });

    // playNaを順番に実行
    for (const playPromise of playPromises) {
        await playPromise();
    }
};

const playNaMethod = {
    playNa,
    playNaList,
};

export default playNaMethod;
