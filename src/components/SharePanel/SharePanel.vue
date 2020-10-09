<template>
    <van-popup position="bottom" lock-scroll v-model="isShow" :get-container="getContainer">
        <div class="share-panel">

            <div class="share-panel-header">
                <div class="share-panel-title" v-if="conf.comp.title && conf.comp.title.length>0">{{conf.comp.title}}</div>
                <div class="share-panel-sub-title" v-if="conf.comp.subTitle && conf.comp.subTitle.length>0" v-html="conf.comp.subTitle" @click.stop="!!conf.comp['subClick']?conf.comp.subClick():subClick()"></div>
            </div>

            <div class="share-panel-body">
                <van-row>
                    <van-col span="8">
                        <div class="share-icon-box weixin" @click="share('weixin')" v-if="showBtn('weixin')&& !isWeb()">
                            <div class="share-icon ">
                                <i class="fa fa-weixin"></i>
                            </div>
                            <div class="share-icon-shadow"></div>
                            <div class="share-title">微信</div>
                        </div>
                    </van-col>
                    <van-col span="8">
                        <div class="share-icon-box weixin" @click="share('weixin_p')" v-if="showBtn('weixin_p')&& !isWeb()">
                            <div class="share-icon ">
                                <i class="fa fa-weixin"></i>
                            </div>
                            <div class="share-icon-shadow"></div>
                            <div class="share-title">朋友圈</div>
                        </div>
                    </van-col>

                    <!-- <van-col span="6">
                        <div class="share-icon-box qq" @click="share('qq')" v-if="showBtn('qq')">
                            <div class="share-icon ">
                                <i class="fa fa-qq"></i>
                            </div>
                            <div class="share-icon-shadow"></div>
                            <div class="share-title">QQ</div>
                        </div>
                    </van-col> -->
                    <van-col span="8">
                        <div class="share-icon-box weibo" @click="share('weibo')" v-if="showBtn('weibo')&& !isWeb()">
                            <div class="share-icon ">
                                <i class="fa fa-weibo"></i>
                            </div>
                            <div class="share-icon-shadow"></div>
                            <div class="share-title">微博</div>
                        </div>
                    </van-col>

                </van-row>
                <van-row>
                    <van-col span="8">
                        <div class="share-icon-box qrcode" @click="share('qrcode')" v-if="showBtn('qrcode')">
                            <div class="share-icon ">
                                <i class="fa fa-qrcode"></i>
                            </div>
                            <div class="share-icon-shadow"></div>
                            <div class="share-title">图片二维码</div>
                        </div>
                    </van-col>
                    <van-col span="8">
                        <div class="share-icon-box link" @click="share('link')" v-if="showBtn('link')">
                            <div class="share-icon ">
                                <i class="fa fa-link"></i>
                            </div>
                            <div class="share-icon-shadow"></div>
                            <div class="share-title">链接分享</div>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <!-- <van-icon name="close" /> -->
            <div class="share-panel-footer">
                <div class="close-icon" @click="hide">
                    <!-- <mu-ripple color="#ddd" :opacity="0.7">
                    </mu-ripple> -->
                    <i class="icon iconfont icon-close_circle_line"></i>
                </div>
            </div>
        </div>

        <van-popup v-model="isShowImage" :get-container="getContainer" lock-scroll>
            <div class="image-panel">
                <img :src="image" alt="">
                <div class="footer-info" v-if="isWeb()">
                    长按图片保存
                </div>
                <div v-else class="footer-tool">
                    <van-row>
                        <van-col span="4">

                            <div class="tool-item " @click.stop="down">
                                <div class="tool-item-icon down">
                                    <i class="fa fa-download"></i>
                                </div>
                                <span class="title">保存图片</span>
                            </div>

                        </van-col>

                        <van-col span="4">

                            <div class="tool-item " @click.stop="weixin">
                                <div class="tool-item-icon weixin">
                                    <i class="fa fa-weixin"></i>
                                </div>
                                <span class="title">微信</span>
                            </div>

                        </van-col>

                        <van-col span="4">

                            <div class="tool-item " @click.stop="weixin_p">
                                <div class="tool-item-icon weixin">
                                    <i class="fa fa-weixin"></i>
                                </div>
                                <span class="title">朋友圈</span>
                            </div>

                        </van-col>

                        <!--<van-col span="4">-->

                        <!--<div class="tool-item ">-->
                        <!--<div class="tool-item-icon qq">-->
                        <!--<i class="fa fa-qq"></i>-->
                        <!--</div>-->
                        <!--<span class="title">QQ</span>-->
                        <!--</div>-->

                        <!--</van-col>-->

                        <van-col span="4">

                            <div class="tool-item ">
                                <div class="tool-item-icon weibo" @click.stop="weibo">
                                    <i class="fa fa-weibo"></i>
                                </div>
                                <span class="title">微博</span>
                            </div>

                        </van-col>

                    </van-row>

                </div>
            </div>
        </van-popup>

    </van-popup>
</template>
<script src="./SharePanel.js"></script>
<style lang="scss" scoped>
@import "SharePanel.scss";
</style>
