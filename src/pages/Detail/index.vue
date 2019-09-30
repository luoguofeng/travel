<template>
  <div>
    <detail-banner></detail-banner>
    <detail-header></detail-header>
    <div class="content"></div>
  </div>
</template>

<script>
import DetailBanner from '@/components/detail/Banner'
import DetailHeader from '@/components/detail/Header'
export default {
  name: 'Detail',
  components: {
    DetailBanner,
    DetailHeader
  }
};
</script>

<style scoped lang="less">
.content {
  height: 50rem;
}
</style>
