
<template>
	<!-- 秒杀商品列表（未开始） -->
	<div class="kill-goods-list">
			<!-- 下拉刷新 -->
	    <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
	    
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
	  
			<div class="list-top">
				<span>距离开始</span>
				<count-down class="time" @on-end="update()" :time="time"></count-down>
			</div>

			<van-list :immediate-check="false" v-model="isLoading" :finished="finished" @load="onLoad" :offset="300">
		          <kill-goods-card  v-for="(goods) in goodsList" :goods="goods" :key="goods.goods_id"></kill-goods-card>
	      	</van-list>
			
		    <div class="empty" v-if="finished">
		    	没有更多了~
		    </div>
	    
	    </van-pull-refresh>

	</div>
</template>
<script src="./KillGoodsList.js"></script>

<style lang="scss" scoped>
@import "KillGoodsList.scss";
</style>