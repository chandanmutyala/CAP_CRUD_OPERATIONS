module.exports = cds.service.impl(async function(){

        const { Products } = this.entities();
        
        this.on('READ', 'Products', async (req) => {
            const { productId } = req.data;           
            const product = await SELECT.one.from(Products).where({ productId });               
            if (!product) {
                console.log(`Product with ID '${productId}' not found`);
                return req.reject(404, `Product you searched  with ID '${productId}' is not found`);
            }
      
            console.log(`Product found: ${JSON.stringify(product)}`);
            return product;
        });

        this.on('Products','CREATE',async (req)=>{
            const {productId, productName, productPrice} = req.data ;
            return await INSERT.into(Products).entries({productId, productName, productPrice});
        })

        this.on('Products','DELETE',async (req)=>{
            const {productId} = req.data ;
            return await DELETE.from(Products).where({productId});
        })


        this.on('Products','UPDATE',async (req)=>{
            const {productId, productName, productPrice} = req.data ;
            return await UPDATE.from(Products).where({productId, productName, productPrice});
        })


});