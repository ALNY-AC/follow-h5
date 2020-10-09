<template>
    <div id="DrawMoney">
        <van-nav-bar title="提现记录" left-arrow @click-left="$back()"></van-nav-bar>

        <div class="empty" v-if="empty">
            暂无提现记录~
        </div>

        <div class="list">
            <div class="item" v-for="(item,i) in list" :key="i" @click="showInfo(item)">

                <div class="body">
                    <div class="header">提现金额</div>
                    <div class="money-box">
                        <div class="icon">￥</div>
                        <span class="money">
                            {{item.money | price | money}}
                        </span>
                        <div class="state">
                            <span v-if="item.state=='1'">待审核</span>
                            <span v-if="item.state=='2'" class="text-success">提现成功</span>
                            <span v-if="item.state=='3'" class="text-danger">提现失败</span>
                        </div>
                    </div>
                    <div class="time">
                        {{item.add_time}}
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>
<script src="./DrawMoney.js"></script>
<style lang="scss" scoped>
@import "DrawMoney.scss";
</style>