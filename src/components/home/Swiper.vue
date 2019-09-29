<template>
  <div class="warpper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <swiper-slide v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imgUrl" class="swiper-img" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  data() {
    return {
      swiperOption: {
        pagination: ".swiper-pagination",
        loop: true,
        autoplay: 3000
      }, //轮播图配置
    };
  },
  props: {
    bannerList: Array
  },
  computed: {
    showSwiper() {
      return this.bannerList.length;//当传递过来的是空数组的时候,不创建swiper
    }
  },
};
</script>
<style>
* {
  touch-action: none;
}
</style>
<style lang="less" scoped>
.warpper {
  /deep/ .swiper-pagination-bullet-active {
    background: #fff;
  }
}
.warpper {
  width: 100%;
  height: 0;
  padding-bottom: 26.7%;
  background-color: #eee;
  .swiper-img {
    width: 100%;
  }
}
</style>