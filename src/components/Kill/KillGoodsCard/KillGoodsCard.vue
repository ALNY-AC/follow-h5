<template>
	<!-- 秒杀商品卡片(未开始) -->
	<div class="kill_goods_card" @click="showInfo()">
		<div class="kill_goods_card_img">
			<img class="kill_goods_card_img_info" :src="$getUrl(goods.goods_banner)" alt="">
		</div>
		<div class="kill_goods_card_box">
			<div class="kill_goods_card_box_title">{{ goodInfo.goods_title }}</div>
			<div class="kill_goods_card_box_info">{{ goodInfo.sub_title }}</div>
			<div class="kill_goods_card_box_money">
				<span class="kill_goods_card_box_money_new">&yen;{{ goodInfo.price }}</span><s class="kill_goods_card_box_money_old">&yen;{{ goodInfo.origin_price }}</s>
			</div>
			<div class="kill_goods_card_box_bottom">
				<div class="kill_goods_card_box_bottom_left">
					<div class="kill_goods_card_box_bottom_left_progress">
						<van-progress
						  color="#1A2A35"
						  :percentage="killPercentage"
						  :show-pivot=false 
						/>
					</div>
					<div class="kill_goods_card_box_bottom_left_num">
						<div class="kill_goods_card_box_bottom_left_num_sold">存货{{ goodInfo.stock_num_total }}件</div>
						<!-- <div class="kill_goods_card_box_bottom_left_num_surplus">剩余{{ goodInfo.stock_num }}件</div> -->
					</div>
				</div>
				<div class="kill_goods_card_box_bottom_right">
					<button v-if="!remindMe"  class="kill_goods_card_box_bottom_right_btn_false" @click.stop="remindMeFun()">提醒我</button>
					<button v-else class="kill_goods_card_box_bottom_right_btn_true" @click.stop="remindMeFun()">取消提醒</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./KillGoodsCard.js"></script>

<style lang="scss" scoped>
@import "KillGoodsCard.scss";
</style>