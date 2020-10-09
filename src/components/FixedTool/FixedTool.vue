<template>
    <transition :name="position">
        <div :class="['fixed-tool',position]" v-show="isShow">
            <div class="fixed-tool-item" v-for="(item,i) in list" :key="i" @click="click(item)">
                <i :class="item.icon"></i>
            </div>
        </div>
    </transition>
</template>
<script src="./FixedTool.js"></script>
<style lang="scss" scoped>
@import "FixedTool.scss";
</style>