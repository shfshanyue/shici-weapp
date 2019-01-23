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

.svg {
  width: 32Px;
  height: 32Px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32Px 32Px;
}

</style>
