
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProductosListaView from "./views/ProductosListaView";
import CarritoContextProvider from "./context/carritoContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductoComprarView from "./views/ProductoComprarView";
import Navigation from "./components/Navbar/Navigation";
import CarritoView from "./views/CarritoView";
import NotFoundView from "./views/NotFoundView";

import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import { useContext } from "react";
import RutaPrivadaUser from "./components/RutaPrivadaUser";
import ContrasenaView from "./views/ContrasenaView";
import CheckOutView from "./views/CheckOutView";



function App() {
  return (
    <AuthProvider>
      <CarritoContextProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="*" element={<NotFoundView />} />
            <Route path="/carrito" element={<CarritoView />} />
            <Route path="/productos" element={<ProductosListaView />} />
            <Route
              path="/detalleproducto/:id"
              element={<ProductoComprarView />}
            />
            <Route
              path="/ContrasenaOlvidada"
              element={<ContrasenaView />}
            />
            <Route path="/checkout" element={
              
                <CheckOutView/>
              
            }/>
            <Route path="/login" element={
              <PrivateRoute>
                <LoginView />
              </PrivateRoute>} />
              <Route path="/register" element={
              <PrivateRoute>
                <RegisterView/>
               
              </PrivateRoute>} />
          </Routes>
        </Router>
      </CarritoContextProvider>
    </AuthProvider>
  );
}

export default App;
