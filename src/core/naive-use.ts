import {
    // create naive ui
    create,
    // components
    NButton, NInput, NInputGroup, NInputGroupLabel, NIcon,
    NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter,
    NSpace, NGrid, NGridItem,
    NMenu,
    NCard,
} from 'naive-ui'

const naive = create({
    components: [
        NButton, NInput, NInputGroup, NInputGroupLabel, NIcon,
        NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter,
        NSpace, NGrid, NGridItem,
        NMenu,
        NCard
    ]
})

export default naive;
