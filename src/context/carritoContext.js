import { useState, useEffect, createContext } from "react";

export const CarritoContext = createContext();

const CarritoContextProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const anadirCarrito = (nuevoProducto) => {
    const existe = carrito.findIndex((prod) => prod.id === nuevoProducto.id);
    if (existe === -1) {
      setCarrito([...carrito, nuevoProducto]);
    } else {
      let carritoCopia = [...carrito];
      carritoCopia[existe].cantidad =
        carritoCopia[existe].cantidad + nuevoProducto.cantidad;
      setCarrito(carritoCopia);
    }
  };
  const limpiarCarrito = () => {
    setCarrito([]);
};

  return (
    <CarritoContext.Provider value={{ carrito, anadirCarrito,limpiarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
export default CarritoContextProvider