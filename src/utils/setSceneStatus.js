const setSceneStatus = (scenesStaus, sceneKey, isLoading) => {
	if (scenesStaus.get(sceneKey) === isLoading) return
	scenesStaus.set(sceneKey, isLoading)
    return scenesStaus
}

export default setSceneStatus