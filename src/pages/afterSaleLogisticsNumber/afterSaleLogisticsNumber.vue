<template>
    <div id="afterSaleLogisticsNumber">
        <van-nav-bar title="提交退货信息" left-arrow @click-left="$back()"></van-nav-bar>

        <van-cell-group>
            <van-field label="物流单号" v-model.number="number" placeholder="请输入物流单号" />
        </van-cell-group>
        <div style="padding:8px">
            <van-button type="primary" @click="submit" bottom-action>提交</van-button>
        </div>

    </div>
</template> 
<script src="./afterSaleLogisticsNumber.js"></script>
<style lang="scss" scoped>
@import "afterSaleLogisticsNumber.scss";
</style>