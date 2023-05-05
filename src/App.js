import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';

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
      </Route>
    </Routes>
    
    </Fragment>
  )

}

export default App;
