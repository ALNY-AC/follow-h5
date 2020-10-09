<template>
    <div class="CountDown">
		<span class="CountDown-num">{{ o_h }}</span><span class="CountDown-margin"><slot name="h">:</slot></span><span class="CountDown-num">{{ o_m }}</span><span class="CountDown-margin"><slot name="m">:</slot></span><span class="CountDown-num">{{ o_s }}</span><span class="CountDown-margin"><slot name="s"></slot></span>

    </div>
</template>
<script src="./CountDown.js"></script>
<style lang="scss" scoped>
@import "CountDown.scss";
</style>