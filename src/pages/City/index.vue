<template>
  <div>
    <city-header></city-header>
    <city-search></city-search>
    <city-list :cities="cities" :hotCities="hotCities" :letter="letter"></city-list>
    <city-aiphabet :cities="cities" @change="handelLetterChange"></city-aiphabet>
  </div>
</template>

<script>
import axios from 'axios'
import CityHeader from '@/components/city/Header'
import CitySearch from '@/components/city/Search'
import CityList from '@/components/city/List'
import CityAiphabet from '@/components/city/Aiphabet'
export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAiphabet
  },
  data() {
    return {
      cities: {}, //存放字母对应的城市
      hotCities: [], //存放热门城市
      letter: '', //字母组件传过来的值
    }
  },
  methods: {
    getCityInfo() {
      axios.get('/api/city.json').then(res => {
        res = res.data
        if (res.ret && res.data) {
          const data = res.data
          this.cities = data.cities
          this.hotCities = data.hotCities
        }
      })
    },
    handelLetterChange(letter) {
      this.letter = letter
    }
  },
  mounted() {
    this.getCityInfo()
  }
}
</script>

<style lang="less" scoped>
</style>