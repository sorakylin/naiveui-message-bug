import { createSSRApp } from "vue";
import { createRouter } from "@/router";
import { createStore, key } from "./stores/init";
import naive from "@/core/naive-use";
import App from "./App.vue";

export function createApp() {
    const app = createSSRApp(App);
    const router = createRouter();
    const { store } = createStore();

    app.use(store, key);
    // app.use(store);
    app.use(router);
    app.use(naive);

    return { app, router, store };
}
