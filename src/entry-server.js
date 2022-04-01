import { createApp } from "./main"
import { renderToString } from "@vue/server-renderer"
import {setup} from '@css-render/vue3-ssr'
import { executeAsyncData, getMatchedComponents } from '@/utils/share'
import { basename } from 'path'

import serialize from "serialize-javascript";

export async function render(url, manifest){
    const { app, router, store } = createApp();

    // 去掉base路由才能正常访问
    router.push(url.replace(router.options.history.base, ""));
    // 需要手动触发,详细见：https://next.router.vuejs.org/zh/guide/migration/#%E5%B0%86-onready-%E6%94%B9%E4%B8%BA-isready
    await router.isReady();

    // 执行asyncData(); 注意顺序与renderToString的顺序
    const route = router.currentRoute.value
    await executeAsyncData(getMatchedComponents(route), { route, store })

    const {collect} = setup(app)
    const ctx = {};
    const html = await renderToString(app, ctx);

    const cssHtml = collect()
    // const cssHtml = 'css'

    const preloadLinks = renderPreloadLinks(ctx.modules, manifest);

    return {html, cssHtml , preloadLinks, stateStr: serialize(store.state)}
}


function renderPreloadLinks(modules, manifest) {
    let links = ''
    const seen = new Set()
    modules.forEach(id => {
        const files = manifest[id]
        if (files) {
            files.forEach(file => {
                if (!seen.has(file)) {
                    seen.add(file)
                    const filename = basename(file)
                    if (manifest[filename]) {
                        for (const depFile of manifest[filename]) {
                            links += renderPreloadLink(depFile)
                            seen.add(depFile)
                        }
                    }
                    links += renderPreloadLink(file)
                }
            })
        }
    })
    return links
}

function renderPreloadLink(file) {
    if (file.endsWith('.js')) {
        return `<link rel="modulepreload" crossorigin href="${file}">`
    } else if (file.endsWith('.css')) {
        return `<link rel="stylesheet" href="${file}">`
    } else if (file.endsWith('.woff')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
    } else if (file.endsWith('.woff2')) {
        return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
    } else if (file.endsWith('.gif')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
    } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
    } else if (file.endsWith('.png')) {
        return ` <link rel="preload" href="${file}" as="image" type="image/png">`
    } else {
        // TODO
        return ''
    }
}