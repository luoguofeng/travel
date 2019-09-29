<template>
  <div class="icons">
    <swiper data-swiper-autoplay="">
      <swiper-slide v-for="(page, index) in pages" :key="index">
        <div class="icon" v-for="(item, index) in page" :key="index">
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl" :alt="item.desc" />
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeIcons",
  data() {
    return {
      iconList: [],//轮播图片地址
    };
  },
  created() {
    this.getIcons();
  },
  methods: {
    //获取图标数据的方法
    getIcons() {
      this.$axios.get('/static/json/icons.json').then(data => {
        this.iconList = data.data;
      });
    }
  },
  computed: {
    pages() {
      const pages = []
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      });
      return pages;
    }
  }
};
</script>

<style lang="less" scoped>
@import url("~styles/varibles.less");
@import url("~styles/mixins.less");
.icon {
  /deep/ .swiper-container {
    height: 0;
    padding-bottom: 50%;
  }
}
.icons {
  margin-top: 0.1rem;
  .icon {
    position: relative;
    overflow: hidden;
    float: left;
    width: 25%;
    height: 0;
    padding-bottom: 25%;
    .icon-img {
      position: absolute;
      right: 0;
      left: 0;
      top: 0;
      box-sizing: border-box;
      padding: 0.1rem;
      bottom: 0.44rem;
      .icon-img-content {
        display: block;
        margin: 0 auto;
        height: 100%;
      }
    }
    .icon-desc {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 0.44rem;
      line-height: 0.44rem;
      text-align: center;
      color: @darkTextColor;
      @ellipses();
    }
  }
}
</style>