<template>
  <div id="Bag">
    <van-nav-bar title="购物袋" fixed>
      <template slot="right">
        <span @click="isEdit=!isEdit;setChecked(false)">
          {{isEdit?'完成':'编辑'}}
        </span>
      </template>
    </van-nav-bar>

    <div class="goods-list-box">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="blank" v-if="bagList.length==0">
          <img class="blank_img" src="@/assets/blank/Shoppingbag_msg.svg" alt="">
          <div>
            <span class="blank_title">您的购物袋空空如也</span>
          </div>
          <div>
            <button class="blank_btn" @click="goHome">去逛逛</button>
          </div>
        </div>
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
        <div class="goods-list">
          <van-checkbox-group class="card-goods" v-model="checkedGoods" v-if="bagList.length>0">

            <van-checkbox v-for="(item) in bagList" :key="item.id" class="card-goods__item" :name="item.id" :disabled="item.snapshot['no_sku'] || !isEdit &&!item.snapshot.goods_info">

              <van-card class="bag-item" :thumb="$getUrl(item.snapshot.img)">
                <div slot="title" :class="['goods-title',{'text-info':item.snapshot['no_sku'] && !item.snapshot.goods_info}]" @click.stop="openGoodsInfo(item)">
                  <span>{{item.snapshot.goods_title}}</span>
                </div>

                <div slot="tags" style="font-size:14px" class="goods-price" @click.stop="openGoodsInfo(item)">
                  <template v-if="!item.snapshot['no_sku'] && item.snapshot.goods_info">
                    ￥ {{item.snapshot.price | money}}
                  </template>
                  <template v-else>
                    <van-tag plain type="danger">商品已失效</van-tag>
                  </template>
                </div>

                <div slot="desc" class="desc" style="font-size:11px" @click.stop="openGoodsInfo(item)">

                  <template v-if="!item.snapshot['no_sku'] && item.snapshot.goods_info">
                    <span v-for="n in 3" :key="n">{{item.snapshot['s'+n]}}
                      <span v-if="item.snapshot['s'+(n+1)]"> - </span>
                    </span>
                  </template>

                  <div class="goods-label-box">
                    <div class="goods-label hot-label" v-if="item.snapshot.is_time">
                      <span>特卖</span>
                    </div>
                  </div>

                </div>

                <div slot="footer">

                  <van-stepper integer @change="updateNum(item)" v-if="!item.snapshot['no_sku'] && item.snapshot.goods_info" v-model.number="item.snapshot.count" :max="item.snapshot.sku.stock_num" :disable-input="true" @click.native.stop />

                </div>
              </van-card>

            </van-checkbox>

          </van-checkbox-group>
        </div>

        <div class="not-time-goods" v-if="notTimeGoods.length>0">
          <!-- 未到时间的 -->

          <div class="not-time-goods-header">
            预热商品
          </div>

          <div class="not-tiem-goods-item" v-for="(item) in notTimeGoods" :key="item.id">
            <div class="not-tiem-goods-item-header">
              <div class="not-time-label">预热</div>
              <div class="time">{{item.snapshot.time.f_start_time}}开始</div>
            </div>

            <van-card class="bag-item" :thumb="$getUrl(item.snapshot.img)">
              <div slot="title" style="font-size:14px" :class="[{'text-info':item.snapshot['no_sku'] && !item.snapshot.goods_info}]" @click.stop="openGoodsInfo(item)">
                <span v-if="item.snapshot.is_time" class="hot-label">特卖</span> {{item.snapshot.goods_title}}
              </div>

              <div slot="tags" style="font-size:14px" class="goods-price" @click.stop="openGoodsInfo(item)">
                <template v-if="!item.snapshot['no_sku'] && item.snapshot.goods_info">
                  ￥ {{item.snapshot.price | money}}
                </template>
                <template v-else>
                  <van-tag plain type="danger">商品已失效</van-tag>
                </template>
              </div>

              <div slot="desc" class="text-info" style="font-size:11px" @click.stop="openGoodsInfo(item)">

                <template v-if="!item.snapshot['no_sku'] && item.snapshot.goods_info">
                  <span v-for="n in 3" :key="n">{{item.snapshot['s'+n]}}
                    <span v-if="item.snapshot['s'+(n+1)]"> - </span>
                  </span>
                </template>

              </div>
              <div slot="footer">
                <van-stepper integer @change="updateNum(item)" v-if="!item.snapshot['no_sku'] && item.snapshot.goods_info" v-model.number="item.snapshot.count" :max="item.snapshot.sku.stock_num" @click.native.stop />
              </div>
            </van-card>
          </div>

        </div>

        <div class="failed-goods" v-if="failedGoods.length">
          <div class="failed-goods-header">
            失效商品
          </div>

          <van-card v-for="(item) in failedGoods" :key="item.id" class="card-goods__item bag-item" :thumb="$getUrl(item.snapshot.img)">
            <div slot="title" :class="['goods-title',{'text-info':item.snapshot['no_sku'] && !item.snapshot.goods_info}]" @click.stop="openGoodsInfo(item)">
              <span>{{item.snapshot.goods_title}}</span>
            </div>
            <div slot="tags" style="font-size:14px" class="goods-price" @click.stop="openGoodsInfo(item)">
            </div>

            <div slot="desc" class="desc" style="font-size:11px" @click.stop="openGoodsInfo(item)">

              <template v-if="!item.snapshot['no_sku'] && item.snapshot.goods_info">
                <span v-for="n in 3" :key="n">{{item.snapshot['s'+n]}}
                  <span v-if="item.snapshot['s'+(n+1)]"> - </span>
                </span>
              </template>
              <div class="goods-label-box">
                <div class="goods-label not-label">
                  <span>失效</span>
                </div>
              </div>

            </div>

            <div slot="footer">

              <van-stepper integer @change="updateNum(item)" v-if="!item.snapshot['no_sku'] && item.snapshot.goods_info" v-model.number="item.snapshot.count" :max="item.snapshot.sku.stock_num" @click.native.stop />
              <!-- <div @click.stop="del(item,index,bagList)" class="del-bag">
                <van-icon name="delete" />
              </div> -->
            </div>
          </van-card>

          <div class="failed-goods-footer">
            <van-button type="default" @click="emptyFailed()" size="mini">清空失效商品</van-button>
          </div>
        </div>
        <recommend scene="Bag"></recommend>

      </van-pull-refresh>
    </div>

    <transition name="van-slide-bottom">
      <!-- 结算 -->
      <van-submit-bar v-show="!isEdit" :price="totalPrice" :button-text="submitBarText" @submit="onSubmit" :disabled="!checkedGoods.length">
        <van-checkbox v-model="checked" @change="setChecked(checked)">全选</van-checkbox>
      </van-submit-bar>
    </transition>

    <transition name="van-slide-bottom">
      <!-- 删除 -->
      <!-- #FEA128 -->
      <van-submit-bar v-show="isEdit" class="delete-btn" :button-text="delText" @submit="delAll" :disabled="!checkedGoods.length">
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </transition>

  </div>
</template>

<script src="./Bag.js"></script>
<style lang="scss" scoped>
@import "Bag.scss";
</style>
