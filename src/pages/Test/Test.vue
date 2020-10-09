<template>
    <div id="Test">
        <van-nav-bar v-nav title="Test Page" fixed left-arrow @click-left="$back()"></van-nav-bar>

        <mu-container>
            <p>
                <mu-button full-width color="error" @click="test">生成分享红包</mu-button>
            </p>
            <p>
                <mu-button full-width color="error" @click="updateUser">刷新数据</mu-button>
            </p>
            <h3>用户数据：</h3>
            <div class="code-info">
                <div class="code-info-item" v-for="(item,i) in $userInfo" :key="i">
                    <span class="key">{{i}}</span>
                    <span>:</span>
                    <span class="value">{{item}}</span>
                </div>
            </div>
            <h3>localStorage</h3>
            <div class="code-info">
                <div class="code-info-item" v-for="(item,i) in localStorage" :key="i">
                    <span class="key">{{i}}</span>
                    <span>:</span>
                    <span class="value">{{item}}</span>
                </div>
            </div>

            <h3>运行环境</h3>
            <div class="code-info">
                <div class="code-info-item">
                    <span class="key">web</span>
                    <span>:</span>
                    <span class="value">{{$isWeb()}}</span>
                </div>
                <div class="code-info-item">
                    <span class="key">plus</span>
                    <span>:</span>
                    <span class="value">{{$isPlus()}}</span>
                </div>
                <div class="code-info-item">
                    <span class="key">cube</span>
                    <span>:</span>
                    <span class="value">{{$isCube()}}</span>
                </div>
            </div>

        </mu-container>

    </div>
</template>
<script src="./Test.js"></script>
<style lang="scss" scoped>
@import "Test.scss";
</style>