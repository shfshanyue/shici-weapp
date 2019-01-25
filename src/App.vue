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
  width: 54Px;
  height: 54Px;
  box-shadow: 0 1Px 3Px rgba(26, 26, 26, 0.1);
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 24Px 24Px;
  background-color: #fff;
}

</style>
