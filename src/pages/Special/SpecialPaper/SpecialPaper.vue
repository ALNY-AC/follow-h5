<template>
    <div id="SpecialPaper">
        <van-nav-bar class="bar" :title="$route.query.title" left-arrow @click-left="$back()">
            <template slot="right">
                <i @click="share" class="iconfont icon-fenxiang1"></i>
            </template>
        </van-nav-bar>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list class="paper-list" :immediate-check="true" v-model="loading" :finished="finished" @load="onLoad" :offset="300" :list="list">
            <div class="paper-card" v-for="(item,i) in list" :key="i">
                <div class="paper-body" @click="open(item)">
                    <div class="paper-head" :style="{backgroundImage:`url(${$getUrl(item.paper_head)})`}">
                    </div>
                    <div class="paper-title">
                        <span>{{item.paper_title}}</span>
                    </div>
                    <div class="paper-info">
                        <span>{{item.paper_info}}</span>
                    </div>
                </div>

            </div>
        </van-list>
        <div v-if="finished" class="empty">
          <span>没有更多了~</span>
        </div>

      </van-pull-refresh>
    </div>
</template>
<script src="./SpecialPaper.js"></script>
<style lang="scss" scoped>
@import "SpecialPaper.scss";
</style>
