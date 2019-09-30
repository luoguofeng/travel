<template>
  <div>
    <div class="recommend-title">热销推荐</div>
    <ul>
      <router-link
        tag="li"
        :to="'/detail/'+item.id"
        class="item border-bottom"
        v-for="(item, index) in listList"
        :key="index"
      >
        <img class="item-img" :src="item.imgUrl" alt />
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    listList: Array
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/mixins.less");
.recommend-title {
  line-height: 0.8rem;
  background: #eee;
  text-indent: 0.2rem;
}
.item {
  display: flex;
  height: 1.9rem;
  overflow: hidden;
  .item-img {
    width: 1.7rem;
    height: 1.7rem;
    padding: 0.1rem;
  }
  .item-info {
    flex: 1;
    padding: 0.1rem;
    min-width: 0;
    .item-title {
      line-height: 0.54rem;
      font-size: 0.32rem;
      @ellipses();
    }
    .item-desc {
      line-height: 0.4rem;
      color: #ccc;
      @ellipses();
    }
    .item-button {
      background: #ff9300;
      padding: 0.2rem;
      border-radius: 0.06rem;
      line-height: 0.04rem;
      margin-top: 0.16rem;
      color: #fff;
    }
  }
}
</style>