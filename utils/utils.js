function joinProductsIntoBag(product, bag){
    if(bag.length === 0){
        bag.push(product)
        return bag
    }
    let repeat = false

    bag.map((productBag,index)=>{
        // vai ver se tem o msm item que está sendo add na bag e se tiver ele so vai aumentar a quantidade do item
        
        if(productBag._id === product._id){
            repeat = true
            productBag.amount += product.amount 
        }

        if(!repeat && bag.length == index + 1){
            bag.push(product)
        }
    })

    return bag
}

function checkChange(product, informations){
    const chargedVariables = {}
    Object.keys(product).map(keyProduct=>{
        if(keyProduct != "_id" && keyProduct != "amount" && keyProduct !="commits" && product[keyProduct] != informations[keyProduct])
            if(typeof product[keyProduct] == 'object'){
               if(product[keyProduct].length < informations[keyProduct].length || product[keyProduct].length > informations[keyProduct].length){
                chargedVariables[keyProduct] = informations[keyProduct]
               }else{
                    product[keyProduct].map((elements,index)=>{
                        if(elements != informations[keyProduct][index])
                            chargedVariables[keyProduct] = informations[keyProduct]
                    }) 
                }
               
            }else
                chargedVariables[keyProduct] = informations[keyProduct]
    })

    return chargedVariables
}



module.exports = {
    joinProductsIntoBag,
    checkChange
}