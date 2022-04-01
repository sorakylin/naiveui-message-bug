// store.ts
import {InjectionKey} from "vue";
import {RouteLocationNormalized} from "vue-router";
import {createStore as _createStore, Store} from "vuex";

// 为 store state 声明类型
export interface State {
    client: string[];
    testData: any
}

export interface AsyncDataParam {
    store: Store<State>;
    route: RouteLocationNormalized;
}

// // 定义 injection key
export const key: InjectionKey<Store<State>> = Symbol();

export function createStore() {
    const store = _createStore<State>({
        state: {
            client: [],
            testData: null
        },
        mutations: {
            setClient(state, data) {
                state.client = data;
            },
            setTestData(state, data) {
                state.testData = data;
            },
        },
        actions: {
            AYSNC_CLIENT({commit}) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit("setClient", ["vue3", "vue-router", "vuex"]);
                        resolve(true);
                    }, 20);
                });
            },
            ASYNC_SERVER({commit}) {
                console.log("Action: 'ASYNC_SERVER'")

                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit("setTestData", "服务端数据");
                        resolve(true);
                    }, 1000);
                });
            },
        },
    });

    // 替换state
    // @ts-ignore
    /*if (!import.meta.env.SSR && window && window.__INITIAL_STATE__) {
        // @ts-ignore
        store.replaceState(window.__INITIAL_STATE__);
    }*/

    return {store};
}
