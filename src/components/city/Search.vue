<template>
  <div>
    <div class="search">
      <input class="search-input" type="text" placeholder="输入城市名或拼音" v-model="keyword" />
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li
          class="search-item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleCityClick(item.name)"
        >{{item.name}}</li>
        <li class="search-item" v-show="!hasNodata">没有匹配到数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import { mapMutations } from 'vuex'
export default {
  name: "CitySearch",
  props: {
    cities: Object
  },
  data() {
    return {
      keyword: '',//搜索关键字
      list: [],//列表数组
      timer: null,//定时器
    }
  },
  methods: {
    handleCityClick(city) {
      this.changeCity(city)
      this.$router.push('/')
    },
    ...mapMutations(['changeCity'])
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities) {
          this.cities[i].forEach((value) => {
            if (value.spell.includes(this.keyword) || value.name.includes(this.keyword)) {
              result.push(value)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  computed: {
    hasNodata() {
      return this.list.length
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.search)
  },
  updated() {
    this.scroll.refresh()
  }
}
</script>

<style lang="less" scoped>
@import url("~styles/varibles.less");
.search {
  height: 0.72rem;
  padding: 0.1rem;
  background: @bgColor;
  .search-input {
    box-sizing: border-box;
    height: 0.62rem;
    line-height: 0.62rem;
    padding: 0.1rem;
    width: 100%;
    text-align: center;
    border-radius: 0.06rem;
    color: #666;
  }
}
.search-content {
  z-index: 1;
  position: absolute;
  overflow: hidden;
  top: 1.68rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  .search-item {
    line-height: 0.62rem;
    padding-left: 0.2rem;
    color: #666;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
}
</style>