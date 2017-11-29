<template>
    <div>
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
                {{article.createDate}} &nbsp;&nbsp; By {{article.author}} &nbsp;&nbsp;<{{article.category}}>&nbsp;&nbsp;阅读量：{{article.reads}}
            </div>
        </div>
        <Page :total="paging.total" :current="paging.page" :page-size="paging.pageSize" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-sizer style="margin-top:20px;text-align:left"></Page>
        <Back-top></Back-top>
    </div>
    
</template>

<script>
    export default {
        name: 'ArticleList',
        data() {
            return {
                articles: [],
                paging:{
                    page:1,
                    total:0,
                    pageSize:10
                },
                
            }
        },
        mounted: function() {
            this.$Loading.start();
            var _this = this;
            this.$nextTick(function() {
                this.$http.get('http://www.vertxjava.com/api/index/article/listByPage?page='+this.paging.page+"&pageSize="+this.paging.pageSize).then(response => {
                    _this.articles = response.data;
                     this.$Loading.finish();
                     document.body.scrollTop = 0
                     document.documentElement.scrollTop = 0
                }, error => {
                   this.$Loading.error();
                });

                this.$http.get('http://www.vertxjava.com/api/index/article/count').then(response => {
                    _this.paging.total = response.data.count;
                     this.$Loading.finish();
                     document.body.scrollTop = 0
                     document.documentElement.scrollTop = 0
                }, error => {
                   this.$Loading.error();
                });
            })
        },
        methods: {
            pageChange (page) {
                this.paging.page = page;
                this.$http.get('http://www.vertxjava.com/api/index/article/listByPage?page='+this.paging.page+"&pageSize="+this.paging.pageSize).then(response => {
                     this.articles = response.data;
                     this.$Loading.finish();
                     document.body.scrollTop = 0
                     document.documentElement.scrollTop = 0
                }, error => {
                    this.$Loading.error();
                });
            },
            pageSizeChange(pageSize){
                this.paging.pageSize = pageSize;
                this.$http.get('http://www.vertxjava.com/api/index/article/listByPage?page='+this.paging.page+"&pageSize="+this.paging.pageSize).then(response => {
                     this.articles = response.data;
                     this.$Loading.finish();
                     document.body.scrollTop = 0
                     document.documentElement.scrollTop = 0
                }, error => {
                    this.$Loading.error();
                });
            }
        }
    }
</script>
    
<style>
    .vb-article {
        width: 100%;
        min-height: 100px;
        border-bottom: 1px solid #cccccc;
        background-color: #ffffff;
        padding:5px 5px 5px 20px;
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
        color: #aaaaaa
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
        color: #aaaaaa
    }
</style>
