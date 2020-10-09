<template>
    <div id="AfterSale">
        <van-nav-bar title="提交申请" left-arrow @click-left="$back()"></van-nav-bar>
        <template v-if="order">

            <div class="goods">

                <div class="goods-img">
                    <img :src="$getUrl(order.snapshot[0].img)" alt="">
                </div>
                <div class="goods-info">
                    <div class="goods-title">{{order.snapshot[0].goods_title}}</div>
                    <div class="goods-sku">
                        {{order.snapshot[0].s1}} - {{order.snapshot[0].s2}} - {{order.snapshot[0].s3}}
                    </div>
                </div>

            </div>
            <!-- // 退款原因 -->

            <van-cell-group>
                <van-cell title="退款原因" :value="reason" @click.native="show.reason=true" is-link />
                <van-field label="退款金额" v-model.number="refund" placeholder="退款金额" />
            </van-cell-group>

            <div class="refund">
                最多￥{{order.order.price|price}}，含发货邮费￥{{order.logistics.price |price}}
            </div>
            <van-popup v-model="show.reason" position="bottom">

                <van-radio-group v-model="reasonRadio">
                    <van-cell-group>
                        <van-cell @click="reasonRadio = i+1" v-for="(item,i) in reasonList" :title="`${item.label}`" :key="item.value">
                            <van-radio :name="item.value" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>

            </van-popup>

            <van-cell-group style="margin-bottom:8px">
                <van-field label="退款说明" v-model="info" placeholder="选填" />
            </van-cell-group>

            <van-panel title="上传凭证" style="margin-bottom:8px">
                <div class="img-list">
                    <div class="img-card" @click="showImg(i)" v-for="(item,i) in imgList" :style="{backgroundImage:`url(${$getUrl(item)})`}" :key="i">
                        <div class="del" @click.stop="delImg(item,i,imgList)">
                            <van-icon name="delete" />
                        </div>
                    </div>
                    <van-uploader accept="image/*" :max-size="3145728" @oversize="$toast('文件大小超出限制！')" :after-read="onRead" v-if="imgList.length<6">
                        <div class="add-img">
                            <i class="fa fa-plus"></i>
                            <div class="title">
                                (最多6张)
                            </div>
                        </div>
                    </van-uploader>
                </div>
            </van-panel>
            <div style="padding:8px">
                <van-button type="primary" @click="submit" bottom-action>提交</van-button>
            </div>

        </template>

    </div>
</template>
<script src="./AfterSale.js"></script>
<style lang="scss" scoped>
@import "AfterSale.scss";
</style>