<template>
    <div id="Class">
        <van-nav-bar title="商品分类" fixed left-arrow @click-left="$back()"></van-nav-bar>

        <div class="class-box">
            <div class="class-left-panel">
                <div class="class-left-list">
                    <div @click="show(item)" :class="['class-left-item',{'active':item.active}]" v-for="(item,i) in rootList" :key="i">{{item.class_title}}</div>
                </div>
            </div>
            <div class="class-right-panel">

                <div class="class-right-body">

                    <div class="class-right-title">— 分类 —</div>

                    <van-row>
                        <van-col span="8" v-for="(item) in list" :key="item.class_id" @click.native.stop="open(item)">
                            <div class="class-cube-item">
                                <img :src="$getUrl(item.img)" class="class-img">
                                <span class="class-title">{{item.class_title}}</span>
                            </div>
                        </van-col>
                    </van-row>

                </div>

            </div>
        </div>

    </div>
</template>
<script src="./Class.js"></script>
<style lang="scss" scoped>
@import "Class.scss";
</style>