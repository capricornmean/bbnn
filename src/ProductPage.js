import { useState } from "react";
import ProductDetails from "./ProductDetails";

export default function ProductPage() {
    const [products, setProducts] = useState([{ src: "1", name: "Set 1", description: "Hi", price: "$100" },
                                              { src: "2", name: "Set 2", description: "Buy me", price: "$100" },
                                              { src: "3", name: "The Boyz Dreamlike", description: "35 photocards", price: "$350"}]);

    return (<div className="h-screen">
        {products.map((product, id) => {
            return (
                <div className="w-1/2 h-5/6 inline-block align-top mb-10">
                    <div className="border-2 w-11/12 h-full m-auto border-teal-500 rounded-md">
                        <ProductDetails key={id} details={product} />
                    </div>
                </div>)
        })}
    </div>);
}