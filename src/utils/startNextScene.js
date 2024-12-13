const startNextScene = (preventScene, currentScene) => {
	if (!currentScene) return  
	preventScene.scene.sleep()
	if (preventScene.scene.isSleeping(currentScene.sceneKey))
	  preventScene.scene.wake(currentScene.sceneKey)
	currentScene.scene.start()
}

export default startNextScene