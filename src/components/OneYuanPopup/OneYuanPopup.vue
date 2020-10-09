<template >
    <van-popup class="york-popup" v-model="popupShow">
      <div class="popup-div">
        <div class="popup-img-box">
          <img class="popup-img" @click="oneYuanGoods()" src="@/assets/popup/home_popup02.png" alt="">
          <img  class="popup-close" @click="popupShow=false" src="@/assets/popup/close.png" alt="">
        </div>
      </div>  
    </van-popup>
</template>
<script src="./OneYuanPopup.js"></script>
<style lang="scss" scoped>
@import "OneYuanPopup.scss";
</style>