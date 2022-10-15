import { PureComponent } from 'react'
import {connect} from 'react-redux';
import * as action  from '../../actions/article'
import Errors from '../../components/Errors'
class ArticleNew extends PureComponent {
    changeTitle = (ev)=>{
        console.log('changeTitle');
        this.props.changeTitle('title',ev.target.value)
    }
    changeDesc= ev =>{
        this.props.changeDesc('description',ev.target.value)
    }
    changeBody=ev=>{
        this.props.changeBody('body',ev.target.value)
    }
    changeTag=ev=>{
        this.props.changeTag('tag',ev.target.value)
    }
    watchEnter=ev=>{
        if(ev.keyCode===13){ //enter键
            console.log(ev.keyCode)
            ev.preventDefault()
            this.props.addTag()

        }
    }

    // removeTag=tag=>ev=>this.props.removeTag(tag)
    removeTag=(tag)=>{
       return ev=>{
            this.props.removeTag(tag)
        }
    }
  //state 是在组件里
  onSubmitForm = (article)=>(ev)=>{
    ev.preventDefault()
    this.props.createArticle(article)
  }

  render() {
    const {title,description,body,tag,tags,errors} = this.props
    return (
        <div className='editor-page'>
        <div className='container page'>
            <div className='row'>
                <div className='col-md-10 offset-md-1 col-xs-12'>
                    <h1>创建文章</h1>
                    {/* 错误信息 */}
                    <Errors errors={errors}/>
                    {/* 编辑文章 */}
                    <form>
                        <fieldset className='form-group'>
                            <input 
                                className='form-control form-control-lg'
                                type="text"
                                placeholder='文章标题'
                                value={title||""}
                                onChange={this.changeTitle}
                            />
                        </fieldset>
                        <fieldset className='form-group'>
                            <input 
                                className='form-control form-control-lg'
                                type="text"
                                placeholder='文章描述'
                                value={description||""}
                                onChange={this.changeDesc}
                            />
                        </fieldset>
                        <fieldset className='form-group'>
                            <textarea 
                                className='form-control form-control-lg'
                                rows={12}
                                placeholder='用markdown编辑文章'
                                value={body||""}
                                onChange={this.changeBody}
                            />
                        </fieldset>
                        <fieldset className='form-group'>
                             <input 
                                className='form-control form-control-lg'
                                type="text"
                                placeholder='输入标签'
                                value={tag||""}
                                onChange={this.changeTag}
                                onKeyUp={this.watchEnter}
                             />
                             {/* 显示已输入标签 */}
                             {
                                tags.map(tag=>{
                                    return (
                                        <span
                                        className='tag-default tag-pill' 
                                        key={tag} 
                                        onClick={this.removeTag(tag)}
                                        > {tag}
                                        </span> 
                                    )
                                })
                             }

                        </fieldset>
                        <button
                            className='btn btn-primary pull-xs-right'
                            type='button'
                            onClick={this.onSubmitForm({title,description,body,tags})}
                            >
                                发布文章
                        </button>
                    </form>
                </div>
            </div>
        </div>
       </div>
    )
  }
  componentWillUnmount(){
    // 清理仓库数据
    this.props.onUnload()
  }
}
const mapState= state=>({...state.article})
//行为
const mapDispatch = dispatch=>{
  return {
    changeTitle:(key,value)=>dispatch(action.articleFieldUpdate(key,value)), 
    changeDesc:(key,value)=>dispatch(action.articleFieldUpdate(key,value)),  
    changeBody:(key,value)=>dispatch(action.articleFieldUpdate(key,value)),
    changeTag:(key,value)=>dispatch(action.articleFieldUpdate(key,value)),
    addTag:()=>dispatch(action.articleAddTag()),
    removeTag:(tag)=>dispatch(action.articleRemoveTag(tag)),
    createArticle:(article)=>dispatch(action.createArticle(article)),
    onUnload:()=>dispatch(action.unload())
  }
}


export default connect(mapState,mapDispatch)(ArticleNew)