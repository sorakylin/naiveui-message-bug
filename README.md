# Naive ui message test

在SSR情况下使用 Naive ui Message 控件的无Icon bug复现。

<br/>

### 说明

只有**第一个**弹出来框的会有Icon， 从第二个开始就没了。

<br/>

### 测试方式

* 在项目根目录执行 `npm install`
* 在项目根目录执行 `npm run dev`
* 访问: http://localhost:3000/

本项目弹框逻辑所在处：@/layout/DefaultLayout.vue
<br/>

