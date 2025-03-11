import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

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
    <h1>Category {category.name}</h1>
        <ul>
        {category.products.map(p => <li>{p.name}</li>)}
      </ul>
    </>;
  }
  