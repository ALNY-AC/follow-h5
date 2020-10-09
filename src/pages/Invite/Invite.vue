<template>
    <div id="Invite">
        <van-nav-bar title="邀请好友" fixed :z-index="200" left-arrow @click-left="$back()"></van-nav-bar>

        <div class="box">
            <div class="bg-icon">
                <img src="@/assets/invite/bg-icon.png">
            </div>
            <div class="panel">
                <img src="@/assets/invite/panel.png">
            </div>
            <div class="btn" @click="share">
                <img src="@/assets/invite/btn.png">
            </div>
            <div class="bottom-logo">
                <img src="@/assets/invite/bottom-logo.png">
            </div>
        </div>

    </div>
</template>
<script src="./Invite.js"></script>
<style lang="scss" scoped>
@import "Invite.scss";
</style>