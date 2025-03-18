import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./App";

export default function Home() {
  const {request} = useContext(AppContext);   // ~~ Injection

  const [categories, setCategories] = useState([]);

  useEffect( () => {
    request( "/api/category" )
    .then( data => setCategories( data.categories ))
    .catch( console.error );
    
    // fetch("https://localhost:7048/api/category")
    // .then(r => r.json()).then(j => {
    //   setCategories( j.data.categories );
    // });
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