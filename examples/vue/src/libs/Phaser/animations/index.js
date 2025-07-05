import { getFileNameWithoutExtension } from 'phaser-ez/utils';

/**
 * @module PhaserLibsAnimations
 * @description Phaser共通テンプレートのアニメーションライブラリをまとめたもの
 */
const modules = import.meta.glob('./*.{js,ts}', { eager: true });
const allExports = {};

for (const path in modules) {
  const mod = modules[path].default;
  allExports[getFileNameWithoutExtension(path)] = mod;
}
export const { 
  createAngleAnimation,
  createFallAnimation,
  createFallAnimation2,
  createFloatAnimation,
  createFrameAnimation,
  createKiraAnimation,
  createPenAnimation,
  createRotateAnimation,
  createScaleAnimation,
  createShowAnimation,
  createXYAnimation,
 } = allExports;

export default allExports;