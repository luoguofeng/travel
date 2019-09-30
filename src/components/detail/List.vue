<template>
  <div>
    <div class="item" v-for="(item, index) in list" :key="index">
      <div class="item-title">
        <span class="item-title-icon"></span>
        {{item.title}}
      </div>
      <div v-if="item.children" class="item-children">
        <detail-list :list="item.children"></detail-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    list: Array
  }
};
</script>

<style scoped lang="less">
.item-title {
  line-height: 0.5rem;
  font-size: 0.32rem;
  padding: 0.2rem;
  border-bottom: 1px solid #ccc;
  .item-title-icon {
    position: relative;
    display: inline-block;
    left: 0.06rem;
    top: 0.06rem;
    width: 0.36rem;
    height: 0.36rem;
    background: url("http://s.qunarzz.com/piao/image/touch/sight/detail.png") 0 -0.45rem
      no-repeat;
    margin-right: 0.1rem;
    background-size: 0.4rem 3rem;
  }
}
.item-children {
  padding: 0 0.2rem;
}
</style>
