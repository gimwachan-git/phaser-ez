import App from './App.vue'
import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg/single-page'
import { useAppStore } from '@/stores/useAppStore'
import 'core-js/features/promise/all-settled'
// import 'core-js/stable';

export const createApp = ViteSSG(App, ({ app, initialState }) => {
  const pinia = createPinia()
  app.use(pinia)

  if (import.meta.env.SSR) {
    // this will be stringified and set to window.__INITIAL_STATE__
    initialState.pinia = pinia.state.value
  } else {
    pinia.state.value = initialState.pinia || {}
    // on the client side, we restore the state
  }

  const store = useAppStore(pinia)
  store.initialize()
})
