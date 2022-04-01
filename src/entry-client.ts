import {createApp} from "./main";
import {executeAsyncData, getMatchedComponents, getNeedExecuteComponents} from '@/utils/share'

const {app, router, store} = createApp();

router.isReady().then(async () => {

    //如果已经有初始数据了，则表示是SSR渲染出的页面，直接 replaceState 替换就行，否则代表是客户端渲染，调用asyncData

    // @ts-ignore
    if (window.__INITIAL_STATE__) {
        // State hydration
        // pinia.state.value = window.__INITIAL_STATE__ || {}

        // @ts-ignore
        store.replaceState(Object.assign({}, window.__INITIAL_STATE__));
    } else {
        const route = router.currentRoute.value
        await executeAsyncData(getMatchedComponents(route), {route, store})
    }

    // detele __INITIAL_STATE__
    // @ts-ignore
    window.__INITIAL_STATE__ = null

    // 路由钩子函数
    router.beforeResolve(async (to, from) => {
        // 执行asyncData
        await executeAsyncData(
            getNeedExecuteComponents(getMatchedComponents(to), getMatchedComponents(from)),
            {route: to, store},
        )
        // metaInfo
        // useMeta()
    })

    app.mount('#app')
});
