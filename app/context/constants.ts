export interface myProductsFromDatabaseProps {
      id: string,
      title: string,
      price: string,
      category : string[],
      colors: string[],
      desc: string,
      images: string[],
      isNew: boolean,
      rating: number,
}

export interface myProductsFromDatabasePeopsWithId {
    
    id: string,
    catagory : string,
    color: string,
    colors: string[],
    desc: string,
    image: string,
    isNew: boolean,
    price: string,
    rating: number,
    title: string,
    isLiked: boolean,
    totalPurchase : number
    }

export  const  PRODUCT_COLORS = {
        colors : [
        //1. Monochromatic:
"#000000",
"#333333", 
"#666666",
"#999999", 
"#CCCCCC", 

//2. Analogous:


"#D32F2F",
"#E91E63",
"#F44336",
"#FF5722",
"#FF8722",

//3. Complementary:
"#244568",
"#2196F3",
"#03A9F4",

"#FFC107",
"#FF9800",
"#FFEB3B",

//4. Triadic:
"#4CAF50",
"#8BC34A",
"#9C27B0",

//5. Tetradic:
"#D500F9",

    ]}