<script lang="ts" setup>
import _ from 'lodash'
import { useStore } from '@/store'
import componentProperty from '@/componentProperty'
import { ElMessage } from 'element-plus'
const activeNames = reactive([1, 2, 3])
const data = reactive([
  {
    title: '基础组件',
    componentsList: [
      {
        text: '轮播图',
        icon: '',
        name: 'slideshow'
      },
      {
        text: '图文导航',
        icon: '',
        name: 'navigation'
      },
      {
        text: 'Error',
        icon: '',
        name: 'error'
      }
    ]
  }
])
const { dataStore } = useStore()
const { pageComponents } = storeToRefs(dataStore)
const handleClick = (name: string) => {
  const component = componentProperty.get(name)
  if (component) {
    pageComponents.value.push(_.cloneDeep(component))
  } else {
    console.log('组件不存在')
    ElMessage({
      message: '组件不存在',
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
            <span class="title">{{ items.title }}</span>
          </template>
          <div class="list">
            <div
              v-for="(item, ind) in items.componentsList"
              :key="ind"
              class="list-item"
              @click="handleClick(item.name)"
            >
              <i v-if="item.icon" class="iconfont" :class="item.icon" />
              <p>{{ item.text }}</p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 组件 */
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
      /* 图标 */
      i {
        font-size: 32px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        color: #b0a8a8;
        margin-top: 4px;
      }
      /* 标题 */
      p {
        font-size: 12px;
        color: #323233;
        margin-top: 4px;
      }
      /* 数量 */
      span {
        color: #7d7e80;
        margin-top: 4px;
        font-size: 10px;
      }
    }
  }
}
</style>
