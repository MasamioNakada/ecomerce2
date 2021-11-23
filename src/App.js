import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductosListaView from "./views/ProductosListaView";
import CarritoContextProvider from "./context/carritoContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductoComprarView from "./views/ProductoComprarView";
import Navigation from "./components/Navbar/Navigation";
import CarritoView from "./views/CarritoView";

function App() {
  return (
    <CarritoContextProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/carrito" element={<CarritoView />} />
          <Route path="/productos" element={<ProductosListaView />} />
          <Route
            path="/detalleproducto/:id"
            element={<ProductoComprarView />}
          />
        </Routes>
      </Router>
    </CarritoContextProvider>
  );
}

export default App;
