import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [categories, setCategories] = useState([]);
    useEffect( () => {
      fetch("https://localhost:7048/api/category")
      .then(r => r.json()).then(j => {
        setCategories( j.data.categories );
      });
    }, [] ) ;
  
    return <>
    <div className="text-center">
        <h1 className="display-4">Крамниця</h1>
    </div>
    <div className='d-flex'>
      {categories.map(c => <Link to={"/category/" + c.slug} key={c.id} className='card mx-3' style={{"width": "12rem"}}>
        <img src={c.imagesCsv.split(',')[0]} alt='CategoryLogo' className="card-img-top" />
        <div className="card-body">
            <h5 className="card-title">{c.name}</h5>
            <p className="card-text">{c.description}</p>
        </div>    
      </Link>)}
    </div>
    </>;
  }