<script>
export default {
  created () {
    const { model } = wx.getSystemInfoSync()
    let startBarHeight = 20
    if (model === 'iPhone X') {
      startBarHeight = 44
    }
    wx.setStorageSync('startBarHeight', startBarHeight)
  }
}
</script>

<style>
.container {
  background-color: #f8f8f8;
}
/* this rule will be remove */
view {
  transition: width 2s;
  box-sizing: border-box;
}
</style>
