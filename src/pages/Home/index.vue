<template>
  <div>
    <home-header></home-header>
    <home-swiper :bannerList="bannerList"></home-swiper>
    <home-icons :iconList="iconList"></home-icons>
    <home-recommend :listList="listList"></home-recommend>
    <home-weekend :weekend="weekend"></home-weekend>
  </div>
</template>

<script>
import HomeHeader from "@/components/home/Header";
import HomeSwiper from "@/components/home/Swiper";
import HomeIcons from "@/components/home/Icons";
import HomeRecommend from "@/components/home/Recommend";
import HomeWeekend from "@/components/home/Weekend";
import axios from 'axios'
export default {
  name: "Home",
  data() {
    return {
      bannerList: [], // 轮播组件数据
      iconList: [], // 图标组件数据
      listList: [], // 热门推荐组件数据
      weekend: [], // 周末去哪儿组件数据
    }
  },
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommend,
    HomeWeekend
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get('/api/home.json').then(res => {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          this.bannerList = data.bannerList
          this.iconList = data.iconList
          this.listList = data.listList
          this.weekend = data.weekend
        }
      })
    }
  },
};
</script>

<style>
</style>