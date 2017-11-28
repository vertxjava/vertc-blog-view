<template>
  <div class="layout">
    <div class="layout-ceiling">
      <div style="width:50px;height:50px;margin:5px 5px 5px 5px;float:left;">
        <img src="http://ovfz2ppts.bkt.clouddn.com/1504148682703-logo.png" width="100%" height="100%">
      </div>
      <div style="width:auto;font-size:22px;height:50px;margin:5px 5px 5px 5px;float:left;line-height:50px;font-weight:bolder;">
        <router-link :to="{path:'/'}" style="color:#cccccc">Vertc | BLOG</router-link>
      </div>
    </div>
    <div class="layout-type">
      
    </div>
    <div style="min-height: 800px;padding:30px 300px 30px 50px;">
      <router-view />
    </div>
    <div class="layout-copy">
      晋ICP备17006073号-1 | Copyright © 2017-2017, VERTC,VERTXJAVA.COM, All Rights Reserved
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ArticleList',
        data() {
            return {
                articles: []
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                this.$http.get('http://www.vertxjava.com/api/index/article/listByPage?page=1').then(response => {
                    _this.articles = response.data;
                }, error => {
                    //alert("报错了");
                });
            })
        }
  }
</script>

<style>
  .layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .layout-type {
    width: 240px;
    min-height: 400px;
    float: left;
    position: absolute;
    top: 90px;
    right: 30px;
    border: 1px solid #d7dde4;
    background-color: #ffffff;
  }
  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }
  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-ceiling {
    background: #464c5b;
    overflow: hidden;
    height: 60px;
  }
  .layout-ceiling-main {
    float: right;
    margin-right: 15px;
  }
  .layout-ceiling-main a {
    color: #9ba7b5;
  }
</style>
