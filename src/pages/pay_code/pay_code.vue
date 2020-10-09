<template>
    <div id="pay_code">
        <van-nav-bar title="" left-arrow @click-left="$back()"></van-nav-bar>

        <get-code ref="getCode" v-show="isShowPwd" hide-cancel @on-success="success" :agreement="false" title="修改支付密码" message="请输入手机号以继续" input-info="请输入手机号"></get-code>

        <template v-if="isShowCode">
            <div style="padding-top:30puser_idx">
                <!-- 密码输入框 -->
                <van-password-input :value="value" info="密码为 6 位数字" />
            </div>
            <!-- 数字键盘 -->
            <van-number-keyboard :show="true" @input="onInput" @delete="onDelete" />
        </template>
        
    </div>
</template>
    
<script src="./pay_code.js"></script>
<style lang="scss" scoped>
@import "pay_code.scss";
</style>