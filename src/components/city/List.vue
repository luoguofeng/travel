<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="aera">
        <div class="title border-topbottom">当前城市</div>
        <div class="buttonList">
          <div class="button-wrapper">
            <div class="button">北京</div>
          </div>
        </div>
      </div>
      <div class="aera">
        <div class="title border-topbottom">热门城市</div>
        <div class="buttonList">
          <div class="button-wrapper" v-for="(item, index) in hotCities" :key="index">
            <div class="button">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="aera" v-for="(item, key,index) in cities" :key="index" :ref="key">
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list">
          <div
            class="item border-bottom"
            v-for="(innerItem, index) in item"
            :key="index"
          >{{innerItem.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
  name: 'CityList',
  props: {
    hotCities: Array,
    cities: Object,
    letter: String
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
  watch: {
    letter() {
      if (this.letter) {
        const element = this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.border-topbottom {
  &:after {
    border-color: #ccc;
  }
}
.border-bottom {
  &:before {
    border-color: #ccc;
  }
}
.list {
  overflow: hidden;
  position: absolute;
  top: 1.58rem;
  left: 0;
  right: 0;
  bottom: 0;
  .title {
    line-height: 0.54rem;
    background: #eee;
    padding-left: 0.2rem;
    color: #666;
    font-size: 0.26rem;
  }
  .buttonList {
    padding: 0.1rem;
    overflow: hidden;
    padding: 0.1rem 0.6rem 0.1rem 0.1rem;
    .button-wrapper {
      float: left;
      width: 33.33%;
      .button {
        text-align: center;
        margin: 0.1rem;
        padding: 0.1rem 0;
        border: 0.02rem solid #ccc;
        border-radius: 0.06rem;
      }
    }
  }
}
.item-list {
  line-height: 0.76rem;
  padding-left: 0.2rem;
}
</style>