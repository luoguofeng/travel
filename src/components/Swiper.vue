<template>
  <div class="warpper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in swiperList" :key="index">
        <img :src="item.imageUrl" class="swiper-img" />
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
      this.$axios.get("/banner").then(backData => {
        this.swiperList = backData.data.banners;
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
  touch-action: pan-y;
}
.warpper {
  /deep/ .swiper-pagination-bullet-active {
    background: #fff;
  }
}
.warpper {
  width: 100%;
  height: 31.25vw;
  background-color: #eee;
  .swiper-img {
    width: 100%;
  }
}
</style>