<template>
  <div class="time-row" v-if="isShow">
    <div class="time-box kill_time">
                  <div class="kill_time_left">
                    <img class="kill_time_left_img" src="@/assets/kill/details_icon_second.svg" alt="">
                  </div>
                  <div class="kill_time_middle">
                    <img class="kill_time_middle_img" src="@/assets/kill/details_bg_second.png" alt="">
                  </div>



                  <div class="time-value kill_time_right">

                      <div class="time-value-title bolder" v-if="state!='活动进行中'">
                        <span>{{state}}</span>
                      </div>

                      <div class="time-label-box" v-if="state=='活动进行中'">
                        <span>距结束</span>
                        <template v-if="d>0">
                          <div class="time-label">{{d}}</div>
                          <span class="bolder">天</span>
                        </template>

                        <div class="time-label">{{h}}</div>
                        <span class="bolder">时</span>
                        <div class="time-label">{{m}}</div>
                        <span class="bolder">分</span>
                        <div class="time-label">{{s}}</div>
                        <span class="bolder">秒</span>

                      </div>
                  </div>
    </div>
  </div>
</template>
<script src="./time-row.js"></script>
<style lang="scss" scoped>
@import "time-row.scss";
</style>
