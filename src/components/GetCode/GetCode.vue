<template>
    <div class="get-code">

        <code-input ref="code-input" :hide-cancel="hideCancel"></code-input>

        <div class="get-code-panel">

            <div class="get-code-panel-header">
                <div class="title">
                    <slot name="title">{{title}}</slot>
                </div>

                <div class="message">
                    <slot name="message">
                        {{message}}
                    </slot>
                </div>
            </div>
            <div class="input-panel">

                <div class="input-box">
                    <input v-model.trim="phone" class="s-input" type="text" :placeholder="inputInfo" />
                </div>

                <div class="btn-box">
                    <mu-button :disabled="disabled" full-width large color="#4e4e4d" @click="next">下一步</mu-button>
                </div>

                <div class="agreement-box" v-if="agreement">
                    <van-checkbox class="checkbox" v-model="isCheck">
                        <span>点击下一步即表示您同意遵守
                            <Agreement></Agreement>
                        </span>
                    </van-checkbox>

                </div>

            </div>

        </div>
        <div class="cancel-box">
            <span class="cancel" @click="back()">返回</span>
        </div>
    </div>
</template>
<script src="./GetCode.js"></script>
<style lang="scss" scoped>
@import "GetCode.scss";
</style>
<style lang="scss">
.van-checkbox--checked {
  color: #fff;
  border-color: #232321 !important;
  background-color: #232321 !important;
}
.van-checkbox__icon {
  transform: scale(0.6);
}
</style>
