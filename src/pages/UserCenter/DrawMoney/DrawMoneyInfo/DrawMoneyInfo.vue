<template>
    <div id="DrawMoneyInfo">
        <van-nav-bar title="提现详情" left-arrow @click-left="$back()"></van-nav-bar>
        <div class="body" v-if="data">
            <div class="header">提现金额</div>
            <div class="money-box">
                <div class="icon">￥</div>
                <span class="money">
                    {{data.money | price | money}}
                </span>
                <div class="state">
                    <span v-if="data.state=='1'">待审核</span>
                    <span v-if="data.state=='2'" class="text-success">提现成功</span>
                    <span v-if="data.state=='3'" class="text-danger">提现失败</span>
                </div>
            </div>
            <div class="time">
                {{data.add_time}}
            </div>
        </div>
        <div class="reason" v-if="data && data['reason']">
            <div class="title">失败原因</div>
            <div class="box">
                {{data.reason}}
            </div>
        </div>

    </div>
</template>
<script src="./DrawMoneyInfo.js"></script>
<style lang="scss" scoped>
@import "DrawMoneyInfo.scss";
</style>