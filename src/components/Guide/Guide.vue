<template>
    <div class="guide" v-if="isShow">
        <div class="gallery-mask-box">
            <swiper :options="swiperOptionMask" ref="swiperMask" class="gallery-mask">

                <swiper-slide>
                    <div class="guide-mask">
                        <img src="static/b11.png" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="guide-mask">
                        <img src="static/b22.png" alt="">
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="guide-mask" @click.stop="ok">
                        <img src="static/b33.png" alt="">
                    </div>
                </swiper-slide>

            </swiper>
        </div>

        <swiper :options="swiperOption2" ref="swiper2" class="gallery-2">

            <swiper-slide>
                <div class="guide-page swiper2 s1" style="background-image: url(static/b1.png)">

                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="guide-page swiper2 s2" style="background-image: url(static/b2.png);">

                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="guide-page swiper2 s3" style="background-image: url(static/b3.png);">

                </div>
            </swiper-slide>

        </swiper>

        <!-- <div class="s-b"> -->
        <!-- <img src="@/assets/guide/s_b.png" alt=""> -->
        <!-- </div> -->

    </div>
</template>
<script src="./Guide.js"></script>

<style lang="scss" scoped>
@import "Guide.scss";
</style>