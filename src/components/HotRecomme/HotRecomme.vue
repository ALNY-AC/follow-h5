<template>
    <div class="HotRecomme">
    	<div class="HotRecomme_title">爆款推荐</div>
    	
    	<nav-goods-list :nav-id="item.nav_id" :lock="i!=tapActive-1"></nav-goods-list>
    </div>
</template>
<script src="./HotRecomme.js"></script>

<style lang="scss" scoped>
@import "HotRecomme.scss";
</style>