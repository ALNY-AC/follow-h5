<template>
  <div id="Dynamic">

    <van-nav-bar title="发现" v-nav fixed>
      <template slot="right">
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

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
      <banner pages="发现页"></banner>

      <line-title @click.native="$push('/dynamic/upList')">
        <span>精选人物</span>
        <span slot="right">
          <span>全部</span>
          <i class="fa fa-angle-right"></i>
        </span>
      </line-title>

      <div class="push-user">
        <div class="push-user-body">
          <div class="push-user-item" v-for="(item,i) in upUsers" :key="item.user_id" v-if="i <= 4" @click="showUser(item)">
            <img :src="$getUrl(item.user_head)">
          </div>
          <div class="push-user-item" v-if=" upUsers.length>=4" @click="$push('/dynamic/upList')">
            查看全部
          </div>
        </div>
      </div>

      <van-list v-model="isLoading" :finished="finished" @load="onLoad" :offset="1000">
        <dynamic-list :list="dynamics"></dynamic-list>
      </van-list>
      <div v-if="finished" class="footer">没有更多数据了</div>
    </van-pull-refresh>

  </div>

</template>
<style lang="scss" scoped>
@import "Dynamic.scss";
</style>


<script src="./Dynamic.js"></script>
