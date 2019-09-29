<template>
  <div class="warpper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
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
        loop: true
      }, //轮播图配置
      swiperList: [] //轮播图片地址
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    getImg() {
      this.$axios.get("/static/json/banner.json").then(backData => {
        this.swiperList = backData.data;
      });
    }
  }
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