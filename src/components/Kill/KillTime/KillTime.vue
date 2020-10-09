<template>
	<div class="kill_time">
		<!-- kill-time -->
		<div class="kill_time_left">
			<img class="kill_time_left_img" src="@/assets/kill/details_icon_second.svg" alt="">
		</div>
		<div class="kill_time_middle">
			<img class="kill_time_middle_img" src="@/assets/kill/details_bg_second.png" alt="">
		</div>
		<div class="kill_time_right">
			<span v-if="1">距结束</span>
			<span v-else>距开始</span>
			<count-down @on-end="onEnd()" class="time" :time="time">
				<span slot="h">时</span>
				<span slot="m">分</span>
				<span slot="s">秒</span>
			</count-down>
		</div>
	</div>
</template>
<script src="./KillTime.js"></script>

<style lang="scss" scoped>
@import "KillTime.scss";
</style>