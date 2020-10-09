<template>
    <div id="GoodsGroup">
        <van-nav-bar title=" " fixed left-arrow @click-left="$back()"></van-nav-bar>

        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh()">
            <template slot="pulling">
                <div class="head">
                    <o-pull-head>
                        <span>释放刷新</span>
                    </o-pull-head>
                </div>
            </template>
            <template slot="loosing">
                <div class="head">
                    <o-pull-head>
                        <span>释放刷新</span>
                    </o-pull-head>
                </div>
            </template>
            <template slot="loading">
                <div class="head">
                    <o-pull-head>
                        <van-loading color="black" />
                    </o-pull-head>
                </div>
            </template>

            <!-- banner -->
            <booth-group ref="boothGroup" v-if="groupInfo.booth_group_id.length>0" :booth-group-id="groupInfo.booth_group_id"></booth-group>

            <!-- // 模板页  -->

            <temp-node ref="temp" :tree="tree"></temp-node>

            <van-list :immediate-check="false" v-model="loading" :finished="finished" @load="onLoad" :offset="300">
                <!-- <goods-card v-for="(goods) in list" :card="false" :goods="goods" :key="goods.goods_id"></goods-card> -->
                <van-row>
                    <van-col span="12" v-for="(item,i) in list" :key="i">
                        <div class="item" @click="goInfo(item)">
                            <div class="item-content">
                                <div class="goods-head">
                                    <img :src="$getUrl(item.goods_head)">
                                </div>
                                <div class="goods-info-box">
                                    <div class="goods-title">
                                        <div class="title">
                                            {{item.goods_title}}
                                        </div>
                                    </div>
                                    <div class="goods-sub-title">
                                        <div class="title">{{item.sub_title}}</div>
                                    </div>
                                    <div class="goods-price">
                                        <span class="price">
                                            ￥{{item.sku[0].price}}
                                        </span>
                                    </div>
                                    <div class="goods-label" v-for="(label,i) in item.goodsLabel" :key="i">
                                        {{label.label}}
                                    </div>

                                </div>
                                <div class="goods-btn-list">
                                    <div class="goods-btn-item" @click.stop="share(item)">分享</div>
                                </div>
                            </div>
                        </div>
                    </van-col>

                </van-row>

            </van-list>

            <div v-if="finished" class="empty">
                <span>没有更多了~</span>
            </div>
        </van-pull-refresh>

    </div>
</template>
<script src="./GoodsGroup.js"></script>
<style lang="scss" scoped>
@import "GoodsGroup.scss";
</style>