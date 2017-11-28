<template>
    <div id="articleDetail" style="border:1px solid #d7dde4">
         <div style="width:100%;height:80px;border-bottom:1px solid #e3e8ee;margin-bottom:10px;">
            <div style="width:100%;height:50px;line-height:50px;font-size:24px;font-weight:bolder;">{{article.title}}</div>
            <div style="width:100%;height:30px;color: #aaaaaa;font-size:13px;">
                {{article.createDate}} &nbsp;&nbsp; By {{article.author}} &nbsp;&nbsp;<{{article.category}}>&nbsp;&nbsp;阅读量：{{article.reads}}
            </div>
         </div>
        <textarea style="display:none;"></textarea>
    </div>
</template>
    
<script>
    export default {
        data() {
            return {
                article:''
            }
        },
        mounted: function() {
            var _this = this;
            this.$nextTick(function() {
                this.$http.get('http://www.vertxjava.com/api/index/article/detail?id='+this.$route.query.id).then(response => {
                    _this.article = response.data;
                    editormd.markdownToHTML("articleDetail", {
                        markdown: response.data.content, //+ "\r\n" + $("#append-test").text(),
                        //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
                        htmlDecode: "style,script,iframe", // you can filter tags decode
                        //toc             : false,
                        tocm: true, // Using [TOCM]
                        //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
                        //gfm             : false,
                        //tocDropdown     : true,
                        // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
                        emoji: true,
                        taskList: true,
                        tex: true, // 默认不解析
                        flowChart: true, // 默认不解析
                        sequenceDiagram: true, // 默认不解析
                    });
                }, error => {
                    //alert("报错了");
                });
            })
        }
    }
</script>

<style>

</style>
