import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Category from './Category';
import Layout from './Layout';
import Product from './views/product/Product';
import { createContext } from 'react';

export const AppContext = createContext(null);  // ~~ Builder.Services

function App() {
  const request = (url, conf) => url.startsWith('/') ? 
    new Promise( (resolve, reject) => {    
      url = "https://localhost:7048" + url;
      fetch(url, conf)
      .then( r => r.json() )
      .then( j => {
        /* RestResponseStatus Status = [  int Code , String Phrase , bool IsSuccess ]
            long CacheLifetime { get; set; } = 0L;
            String Description { get; set; } = "Self descriptive message";
            RestResponseManipulations Manipulations { get; set; } = new();
            Dictionary<String, Object> Meta { get; set; } = [];
            Object? Data { get; set; } */
        if(j.status.isSuccess) {
          resolve(j.data);
        }
        else {
          reject(j);
        }
      })}) : 
      fetch( url, conf );

  //                                     | ~~ AddScoped(request)
  return <AppContext.Provider value={ {request} }> 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="product/:id" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppContext.Provider>;
}

export default App;

/*

task = new Promise( (resolve, reject) => { resolve(result); / reject(err); } )
     ==
async function task() { return result; / throw err; }

task()
 .then( result => ... )
 .catch( err => ... )

*/
