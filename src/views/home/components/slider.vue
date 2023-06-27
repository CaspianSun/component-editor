<script lang="ts" setup>
import _ from 'lodash'
import { useStore } from '@/store'
import componentProperty, { GroupEnum } from '@/componentProperty'

interface ComponentItem {
  title: string
  icon: string
  component: string
}

interface DataItem {
  title: string
  componentsList: ComponentItem[]
}
const activeNames = reactive([1, 2, 3])

const data = Array.from(componentProperty.values())
  .sort((a, b) => {
    return (a.sort ?? 0) - (b.sort ?? 0)
  })
  .reduce((acc, cur) => {
    const groupName = GroupEnum[cur.group]
    const groupIndex = acc.findIndex((item) => item.title === groupName)
    if (groupIndex === -1) {
      acc.push({
        title: groupName,
        componentsList: []
      })
    }
    acc[groupIndex !== -1 ? groupIndex : acc.length - 1].componentsList.push({
      title: cur.cName,
      icon: '',
      component: cur.component
    })
    return acc
  }, [] as DataItem[])

const { dataStore } = useStore()
const { components } = storeToRefs(dataStore)
const handleClick = (item: ComponentItem) => {
  const component = componentProperty.get(item.component)
  if (component) {
    const componentNum = components.value.map((v) => v.component === item.component).length
    const newComponent = _.cloneDeep(component)
    newComponent.id = componentNum
    components.value.push(newComponent)
  } else {
    ElMessage({
      message: `组件 ${item.title} 不存在`,
      type: 'error'
    })
  }
}
</script>

<template>
  <div class="slider-assembly">
    <div class="container">
      <el-collapse v-model="activeNames">
        <el-collapse-item
          v-for="(items, index) in data"
          :key="index"
          :name="index + 1"
          :title="items.title"
        >
          <template #title>
            <span class="title">{{ items.title }}({{ items.componentsList.length }})</span>
          </template>
          <div class="list">
            <div
              v-for="(item, ind) in items.componentsList"
              :key="ind"
              class="list-item"
              @click="handleClick(item)"
            >
              <i v-if="item.icon" class="iconfont" :class="item.icon" />
              <p>{{ item.title }}</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider-assembly {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 300px;
  overflow-y: scroll;
  box-sizing: border-box;
  background: #fff;
  height: calc(100vh - 64px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0000;
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    background-color: #f4f6f8;
  }
  .container {
    padding: 16px;
    background-color: #fff;
    .title {
      flex: 1 0 90%;
      order: 1;
    }
    :deep(.el-collapse) {
      border: none;
      .el-collapse-item__header,
      .el-collapse-item__wrap {
        border: none;
        overflow: unset;
        border-bottom: 0 !important;
      }
      .el-collapse-item__header {
        height: 40px !important;
        line-height: 40px !important;
        padding-left: 16px;
        margin-bottom: 10px;
        border-radius: 4px;
        font-size: 15px !important;
      }
      .el-collapse-item__content {
        font-size: 14px !important;
      }
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 20px;

    .list-item {
      position: relative;
      width: 72px;
      height: 72px;
      margin-right: 18px;
      margin-top: 16px;
      cursor: pointer;
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
      box-shadow: 0 0 6px #0000000f;
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
      &:hover {
        z-index: 99;
        border: 1px solid #155bd4;
      }
      &:nth-child(3n) {
        margin-right: 0 !important;
      }
      i {
        font-size: 32px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        color: #b0a8a8;
        margin-top: 4px;
      }
      p {
        font-size: 12px;
        color: #323233;
        margin-top: 4px;
      }
      span {
        color: #7d7e80;
        margin-top: 4px;
        font-size: 10px;
      }
    }
  }
}
</style>
