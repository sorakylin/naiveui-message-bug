// 服务器和浏览器通用方法

import {RouteComponent, RouteLocationNormalizedLoaded} from "vue-router";

/**
 * 提取匹配的组件
 */
export function getMatchedComponents(matchedComponent: RouteLocationNormalizedLoaded) {
    return matchedComponent.matched.map(({components}) => {
        return components.default
    })
}

/**
 * 优化过滤所有需要执行asyncData的组件
 */
export function getNeedExecuteComponents(toMatchedComponents: RouteComponent[], fromMatchedComponents: RouteComponent[]) {
    let isSameCompoent = false
    return toMatchedComponents.filter((compnent, index) => {
        return isSameCompoent || (isSameCompoent = fromMatchedComponents[index] !== compnent)
    })
}

/**
 * 执行asyncData钩子函数
 * @param {*} components
 * @param {*} context
 * @returns
 */
export async function executeAsyncData(components: RouteComponent[], context: any) {
    return Promise.all(
        components.map(compnent => {
            // @ts-ignore
            if (compnent.asyncData) {
                // @ts-ignore
                return compnent.asyncData(context)
            }
        }),
    )
}