import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Home from './pages/Home';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import AddProduct from './pages/AddProduct';
import User from './pages/User';
import Logout from './pages/Logout';



function App() {
  if(localStorage.getItem('token') === null){
    return(
      <Router>
        <Switch>
          <Route path='/' exact component={User} />
          <Route path='/logout' component={Logout} />
        </Switch>
      </Router>
    )
  }
  
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/shop' component={Products} />
          <Route path='/product/:id' component={SingleProduct} />
          <Route path='/add_product' component={AddProduct} />
          <Route path='/logout' component={Logout} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
