<template>
    <div id="WeiXinLogin">
        <get-code v-if="isShow" @on-success="success" title="绑定手机号" message="第一次登陆需要绑定手机号" input-info="输入手机号获取验证码"></get-code>
    </div>
</template>
<script src="./WeiXinLogin.js"></script>
<style lang="scss" scoped>
@import "WeiXinLogin.scss";
</style>