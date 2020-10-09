<template>
    <div class="temp-node">
        <div class="work">
            <div class="temp-node-list">
                <div class="temp-node-row" v-for="(node,i) in tree.node" :key="i" :style="node.style">
                    <div class="temp-node-col" @click="show(col,node)" v-for="(col,j) in  node.node" :key="j" :style="[{width:(100/node.node.length)+'%'}]">
                        <img v-lazy="$getUrl(col.images)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./TempNode.js"></script>
<style lang="scss" scoped>
@import "TempNode.scss";
</style>