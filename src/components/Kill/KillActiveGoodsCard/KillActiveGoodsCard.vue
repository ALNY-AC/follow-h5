<template>
	<!-- 秒杀商品卡片 -->
	<div class="kill_active_goods_card" @click.stop="stock_num>0?showInfo():false">
		<div class="kill_active_goods_card_img">
			<img class="kill_active_goods_card_img_info" :src="$getUrl(goods.goods_banner)" alt="">
			<div class="kill_active_goods_card_img_icon" v-if=" goodInfo.stock_num = 0">
				<img src="@/assets/kill/list_icon_sellout.svg" alt="">
			</div>

		</div>
		<div class="kill_active_goods_card_box">
			<div class="kill_active_goods_card_box_title">{{ goodInfo.goods_title }}</div>
			<div class="kill_active_goods_card_box_info">{{ goodInfo.sub_title }}</div>
			<div class="kill_active_goods_card_box_money">
				<span class="kill_active_goods_card_box_money_new">&yen;{{ goodInfo.price }}</span>
				<s class="kill_active_goods_card_box_money_old">&yen;{{ goodInfo.origin_price }}</s>
			</div>
			<div class="kill_active_goods_card_box_bottom">
				<div class="kill_active_goods_card_box_bottom_left">
					<div class="kill_active_goods_card_box_bottom_left_progress">
						<van-progress color="#1A2A35" :percentage="killPercentage" :show-pivot=false />
					</div>
					<div class="kill_active_goods_card_box_bottom_left_num">
						<div class="kill_active_goods_card_box_bottom_left_num_sold">已售{{ sell }}件</div>
						<div class="kill_active_goods_card_box_bottom_left_num_surplus">剩余{{ stock_num }}件</div>
					</div>
				</div>
				<div class="kill_active_goods_card_box_bottom_right">
					<button v-if="stock_num>0" class="kill_active_goods_card_box_bottom_right_btn">立刻抢购</button>
					<button v-else class="kill_active_goods_card_box_bottom_right_btn_false" disabled="disabled">已售罄</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./KillActiveGoodsCard.js"></script>

<style lang="scss" scoped>
@import "KillActiveGoodsCard.scss";
</style>