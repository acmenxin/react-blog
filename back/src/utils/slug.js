var uniqueSlug = require('unique-slug')

let randomSlug = ()=>{
    let slug = uniqueSlug()
    return slug;
}
module.exports=randomSlug