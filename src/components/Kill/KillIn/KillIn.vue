<template>
	<!-- 秒杀入口 -->

	<div class="kill-in" @click="goKill()">
		<div class="kill-in-box">
			<div class="kill-in-top">
				<div class="kill-icon">
					<img src="@/assets/kill/index_icon_second.svg" alt="">
				</div>
				<count-down @on-end="update()" :time="time"></count-down>
			</div>
			<div class="kill-goods">
				<div class="kill-goods-info" v-for="item in killGoods">
					<div class="kill-goods-img">
						<img :src="$getUrl(item.goods_head)" alt="">
					</div>
					<div class="kill-goods-money">
						<span class="kill-goods-money-new">
							&yen;{{item.price}}
						</span>
						<s class="kill-goods-money-old">
							&yen;{{item.origin_price}}
						</s>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="./KillIn.js"></script>

<style lang="scss" scoped>
@import "KillIn.scss";
</style>