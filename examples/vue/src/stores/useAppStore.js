import { defineStore } from "pinia";
import { toLocalISOString } from "@/utils/toLocalISOString";

export const useAppStore = defineStore("app", {
    state: () => ({
        isLoading: true,
        isError: false,
        scenes: [],
        today: toLocalISOString(new Date()),
    }),
    actions: {
        initialize() {
            if (this.isReady) return;
            this.isLoading = true;
            this.isError = false;
            this.today = toLocalISOString(new Date());
            this.scenes = [];
        },
        setToday(date) {
            this.today = date;
        },
        setLoading(value) {
            this.isLoading = value;
        },
        setError(value) {
            this.isError = value;
        },
        addScene(sceneKey) {
            this.scenes.push({
                sceneKey,
                isLoading: false,
            });
        },
        setSceneLoading(sceneKey, value) {
            const scene = this.scenes.find((s) => s.sceneKey === sceneKey);
            if (scene) {
                scene.isLoading = value;
                this.updateAppLoading();
            }
        },
        updateAppLoading() {
            if (this.scenes.some((s) => s.isLoading)) {
                this.isLoading = true;
            } else {
                this.isLoading = false;
            }
        },
    },
});
