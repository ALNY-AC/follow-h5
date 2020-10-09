<template>
    <div class="o-address-edit">

        <van-cell-group :style="{marginBottom:'20px'}">
            <van-field v-model="info.name" placeholder="收件人" />
            <van-field v-model="info.tel" placeholder="手机号码" />
            <van-field v-model="info.id_card" placeholder="身份证（可选填，购买部分跨境商品必填）" @click-icon="$dialog.alert({title:'提示',message: '收件人姓名必须和身份证号一致'})" icon="question" />
            <van-cell :title="area" is-link @click="showSelectArea=true" />
            <van-field v-model="info.address_detail" type="textarea" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" autosize />
        </van-cell-group>

        <van-cell-group :style="{marginBottom:'20px'}">
            <van-cell title="设为默认地址" center>
                <van-switch v-model="info.is_default" />
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell class="text-red" clickable title="删除" @click="$emit('on-delete')" />
        </van-cell-group>

        <van-popup get-container="body" v-model="showSelectArea" position="bottom">
            <van-area @confirm="areaConfirm" :area-list="areaList" :value="activeAreaCode" />
        </van-popup>

        <div class="fixed-btn" @click="save">
            <mu-ripple :opacity="0.2">
                保存
            </mu-ripple>
        </div>
    </div>
</template>
<script src="./OAddressEdit.js"></script>
<style lang="scss" scoped>
@import "OAddressEdit.scss";
</style>