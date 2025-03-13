import { useEffect, useState } from "react";
import {  Link, useParams } from "react-router-dom";

export default function Category() {
    const {id} = useParams();
    const [category, setCategory] = useState({
      "id": "",
      "name": "",
      "description": "",
      "imagesCsv": "",
      "slug": "",
      "products": []
    });

    useEffect( () => {
        fetch("https://localhost:7048/api/category/" + id)
        .then(r => r.json()).then(j => {
            setCategory( j.data.category );
        });
    }, [id] ) ;
  
    return <>
    {!!category || <div className="text-center">
        <h1 className="display-4">Крамниця - розділ не знайдено</h1>
    </div>}

    {!!category && <>
      <div className="text-center">
        <h1 className="display-4">Крамниця - розділ {category.name}</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {category.products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>}

    </>;
  }
  
  function ProductCard({product}) {
    return <div className="col">
    <div className="card mx-3 h-100">
        <Link to={"/product/" + (product.slug || product.id)} >
            <img src={product.imagesCsv.split(',')[0]} className="card-img-top" alt="ProductImage"/>
        </Link>
        <div className="card-body">
            <div data-cart-product="@Model.Id" className="card-fab"><i className="bi bi-cart-plus"></i></div>

            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
        </div>
        <div className="card-footer">
            <strong>₴ {product.price}</strong>, у наявності - {product.stock}
            <i className="bi bi-star"></i> 
        </div>        
    </div>
</div>;
  }