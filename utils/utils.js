function joinProductsIntoBag(product, bag){
    if(bag.length === 0){
        bag.push(product)
        return bag
    }

    bag.map((productBag)=>{
        if(productBag.length !== product.length)
            return false

        Object.keys(productBag).map(keyObject => {
            let check = true
            if(!check) return

            if(keyObject != "amount" && productBag[keyObject] != product[keyObject])
                check = false
        })

        productBag.amount += product.amount
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