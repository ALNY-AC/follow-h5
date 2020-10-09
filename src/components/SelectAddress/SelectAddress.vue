<template>
    <div class="select-address">

        <van-contact-card :type="cardType" :name="currentContact.name" :tel="currentContact.tel" @click="showAddressList = true" />
        <!-- 联系人列表 -->
        <van-popup v-model="showAddressList" position="bottom">
            <div class="right-popup">
                <!-- <pre v-html="chosenContactId"></pre> -->
                <van-contact-list v-model="chosenContactId" :list="addressList" @add="onAdd" @edit="onEdit" @select="onSelect" />
            </div>
        </van-popup>
        <!-- 联系人编辑 -->
        <van-popup v-model="showEdit" position="bottom">
            <div class="right-popup">

                <o-address-edit v-model="editingContact" @on-save="onSave" @on-delete="onDelete"></o-address-edit>

                <!-- <van-address-edit :area-list="areaList" :address-info="editingContact" show-postal show-set-default @save="onSave" @delete="onDelete">
                    <van-field v-model.trim="id_card" label="身份证号" placeholder="请输入身份证号（选填）" />
                    <div class="text-red" style="padding: 0 15px;">
                        <small>海外购商品，必须填写身份证号，且收件人名字必须和身份证上的姓名一致。</small>
                    </div>
                </van-address-edit> -->

            </div>
        </van-popup>

    </div>
</template>
<script src="./SelectAddress.js"></script>
<style lang="scss" scoped>
@import "SelectAddress.scss";
</style>
