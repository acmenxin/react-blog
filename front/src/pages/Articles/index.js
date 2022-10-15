import { memo } from "react";
const Articles = props =>{
    const {articles} = props
    //不存在
    if(!articles){
        return <div className="article-preview">loading</div>
    }
    //存在 但为0
    if(articles&&articles.length==0){
        return(
            <div className="article-preview">
               这里还没有文章
            </div>
        )
    }
    //有文章
    //文章数据 / 条数<=5不做分页  >5做分页
    return(
        <div>
            {
                articles.map(article=>{
                    return <div>
                    {article.title}  
                    </div>
                })
            }
        
        </div>
    )

}
export default memo(Articles)