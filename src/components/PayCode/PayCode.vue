<template>
    <div class="pay-code">
        <van-popup v-model="show" position="bottom">

            <div class="pay-code-panel">
                <!-- 密码输入框 -->
                <div style="padding-top:30px">
                    <van-password-input :value="pwd" info="密码为 6 位数字" />
                </div>
                <!-- 数字键盘 -->
                <van-number-keyboard :show="true" @input="onInput" @delete="onDelete" />
            </div>

        </van-popup>
    </div>
</template>
<script src="./PayCode.js"></script>
<style lang="scss" scoped>
@import "PayCode.scss";
</style>