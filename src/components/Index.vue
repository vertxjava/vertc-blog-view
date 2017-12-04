<template>
  <div>
    <div class="category">
      当前分类：{{category==''?'全部':category}} &nbsp;<span v-if="category != ''" v-on:click="clearCategory()"><Icon class="clear_category" type="close-round"></Icon></span> |&nbsp;&nbsp;&nbsp;当前关键词：{{formItem.keyword ===''?'无':formItem.keyword}} &nbsp;
      <span
        v-if="formItem.keyword != ''" v-on:click="clearKeyword()">
        <Icon class="clear_category" type="close-round"></Icon>
        </span>
        <div style="width:40px;height:34px;margin:13px 30px 13px 10px;float:right;">
          <i-form :label-width="0">
            <Form-item>
              <i-button type="primary" @click="handleSubmit()">搜索</i-button>
            </Form-item>
          </i-form>
        </div>
        <div style="width:300px;height:34px;margin:13px 0px 13px 5px;float:right;">
          <i-form :model="formItem" :label-width="0">
            <Form-item>
              <i-input v-model="formItem.keyword" placeholder="请输入关键词搜索"></i-input>
            </Form-item>
          </i-form>
        </div>
    </div>
    <div v-for="article in articles" class="vb-article">
      <div class="vb-article-title">
        <router-link class="vb-article-title_link" :to="{path:'/detail',query: {id: article.id}}">
          {{article.title}}
        </router-link>
      </div>
      <div class="vb-article-desc">
        {{article.description}}
      </div>
      <div class="vb-article-other">
        {{article.createDate}} &nbsp;&nbsp; By {{article.author}} &nbsp;&nbsp;
        <{{article.category}}>&nbsp;&nbsp;阅读量：{{article.reads}}
      </div>
    </div>
    <div class="layout-type">
      <div style="width:100%;height:auto;background-color:#ffffff;">
        <Row style="background:#eee;padding:0px;text-align:left">
          <i-col span="24">
            <Card>
              <p slot="title">文章分类</p>
              <div v-for="(categoryCount,index) in categoryCounts" v-on:click="chooseCategory(categoryCount.category)" style="width:95%;height:28px;line-height:28px;padding-left:5%;color:#3399ff;border-bottom:1px solid #f5f5f5;cursor: pointer;">
                {{index+1}}.{{categoryCount.category}}
                <span style="width:auto;height:28px;line-height:28px;float:right;color:#aaaaaa;font-size:12px;">
                            共 {{categoryCount.count}} 篇文章
                          </span>
              </div>
            </Card>
          </i-col>
        </Row>
      </div>
      <div style="width:100%;height:auto;background-color:#ffffff;margin-top:10px;">
        <Card style="width:240px">
          <div>
            <img src="http://ovfz2ppts.bkt.clouddn.com/2017/8/31/wzq.png" style="width:100%">
          </div>
          <div style="width:100%;height:30px;line-height:30px;font-size:18px;">
            Jack
          </div>
        </Card>
      </div>
    </div>
    <Page :total="paging.total" :current="paging.page" :page-size="paging.pageSize" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-sizer style="margin-top:20px;text-align:left"></Page>
    <Back-top></Back-top>
  </div>
</template>

<script>
  export default {
    name: "ArticleList",
    data() {
      return {
        articles: [],
        categoryCounts: [],
        paging: {
          page: 1,
          total: 0,
          pageSize: 10
        },
        category: "",
        formItem: {
          keyword: ""
        }
      };
    },
    mounted: function() {
      this.$Loading.start();
      var _this = this;
      this.$nextTick(function() {
        this.$http.get(this.getRequestUrl()).then(
          response => {
            _this.articles = response.data;
            this.$Loading.finish();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          },
          error => {
            this.$Loading.error();
          }
        );
        this.$http.get("http://www.vertxjava.com/api/index/article/count").then(
          response => {
            _this.paging.total = response.data.count;
            this.$Loading.finish();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          },
          error => {
            this.$Loading.error();
          }
        );
      });
      this.$http
        .get("http://www.vertxjava.com/api/index/article/categoryCount")
        .then(
          response => {
            _this.categoryCounts = response.data;
          },
          error => {}
        );
    },
    methods: {
      getRequestUrl() {
        return (
          "http://www.vertxjava.com/api/index/article/listByPage?page=" +
          this.paging.page +
          "&pageSize=" +
          this.paging.pageSize +
          "&category=" +
          this.category +
          "&keyword=" + this.formItem.keyword
        );
      },
      pageChange(page) {
        this.paging.page = page;
        this.$http.get(this.getRequestUrl()).then(
          response => {
            this.articles = response.data;
            this.$Loading.finish();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          },
          error => {
            this.$Loading.error();
          }
        );
      },
      pageSizeChange(pageSize) {
        this.paging.pageSize = pageSize;
        this.$http.get(this.getRequestUrl()).then(
          response => {
            this.articles = response.data;
            this.$Loading.finish();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          },
          error => {
            this.$Loading.error();
          }
        );
      },
      chooseCategory(category) {
        this.category = category;
        this.$http.get(this.getRequestUrl()).then(
          response => {
            this.articles = response.data;
            this.$Loading.finish();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          },
          error => {
            this.$Loading.error();
          }
        );
      },
      clearCategory() {
        this.category = "";
        this.$http.get(this.getRequestUrl()).then(
          response => {
            this.articles = response.data;
            this.$Loading.finish();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          },
          error => {
            this.$Loading.error();
          }
        );
      },
      clearKeyword(){
        this.formItem.keyword = ''
        this.$http.get(this.getRequestUrl()).then(
          response => {
            this.articles = response.data;
            this.$Loading.finish();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          },
          error => {
            this.$Loading.error();
          }
        );
      },
      handleSubmit() {
        if (this.formItem.keyword === "") {
          this.$Message.error("请输入关键词");
          return;
        }
        this.$http.get(this.getRequestUrl()).then(
          response => {
            this.articles = response.data;
            this.$Loading.finish();
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          },
          error => {
            this.$Loading.error();
          }
        );
      }
    }
  };
</script>
    
<style>
  .category {
    width: 100%;
    height: 60px;
    color: #657180;
    background-color: #ffffff;
    border-bottom: 2px solid #e3e8ee;
    line-height: 60px;
    text-align: left;
    padding-left: 10px;
    cursor: pointer;
  }
  .clear_category:hover {
    color: #3399ff;
  }
  .layout-type {
    width: 240px;
    min-height: 800px;
    float: left;
    position: absolute;
    top: 90px;
    right: 30px;
  }
  .vb-article {
    width: 800px;
    min-height: 100px;
    border-bottom: 1px solid #cccccc;
    background-color: #ffffff;
    padding: 5px 5px 5px 20px;
  }
  .vb-article-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }
  .vb-article-title_link {
    color: #333333;
  }
  .vb-article-title_link:hover {
    color: #ca0c16;
  }
  .vb-article-desc {
    width: 100%;
    min-height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333333;
  }
  .vb-article-other {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #aaaaaa;
  }
  .vb-article {
    width: 100%;
    min-height: 100px;
    border-bottom: 1px solid #cccccc;
    text-align: left;
  }
  .vb-article-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }
  .vb-article-title:hover {
    color: #ca0c16;
  }
  .vb-article-desc {
    width: 100%;
    min-height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333333;
  }
  .vb-article-other {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #aaaaaa;
  }
</style>
