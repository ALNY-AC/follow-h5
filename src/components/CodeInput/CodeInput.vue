<template>
    <van-popup v-model="show" position="right">
        <div class="code-input">
            <div class="code-input-panel">

                <div class="code-input-header">
                    <div class="title">
                        <slot name="title">
                            {{title}}
                        </slot>
                    </div>
                    <div class="message">
                        <slot name="message">{{message}}</slot>
                    </div>
                </div>

                <div class="input-panel">

                    <div class="code-body">
                        <input type="number" autofocus v-model="code" class="s-code-input">
                    </div>

                    <div class="info-box">
                        <span v-if="timeCount>0">
                            {{timeCount}}秒后重发
                        </span>
                        <span v-else @click="timeStart();pushCode()">没有收到？点击重发</span>
                        <p>{{info}}</p>
                    </div>

                </div>

            </div>
            <div class="cancel-box" v-if="!hideCancel">
                <span class="cancel" @click="show=false">{{back}}</span>
            </div>
            <div class="cancel-box" v-else>
                <span class="cancel" @click="$back()">{{back}}</span>
            </div>
        </div>
    </van-popup>
</template>
<script src="./CodeInput.js"></script>
<style lang="scss" scoped>
@import "CodeInput.scss";
</style>