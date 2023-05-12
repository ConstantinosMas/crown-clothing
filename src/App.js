import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication';

const Shop = () => {
  return <h1>This is the shop</h1>
} 

const App = () => {

  return (
    <Fragment>

    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
    
    </Fragment>
  )

}

export default App;
