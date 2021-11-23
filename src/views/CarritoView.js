import { useContext } from "react";
import { CarritoContext } from "../context/carritoContext";
import Swal from "sweetalert2";
export default function CarritoView() {
  const { carrito, limpiarCarrito } = useContext(CarritoContext);

  const manejarLimpiarCarrito = async () => {
    const accionUsuario = await Swal.fire({
      icon: "warning",
      title: "Seguro que quiere limpiar su carrito?",
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (accionUsuario.isConfirmed) {
      limpiarCarrito();
    }
  };
  console.log(carrito);
  return (
    <>
      <div className="container">
        <div className="my-4 text-center">
          <h1 className="fw-bold">
            <i class="fab fa-shopify me-2"></i>
            Tu Carrito de compras
          </h1>
        </div>
        {carrito.length === 0 ? (
          <div>
            <div className="d-flex justify-content-center my-4">
              <h1>Carrito Vacio!</h1>
            </div>
            <div className="fs-1 d-flex justify-content-center my-4">
              <i class="far fa-sad-tear text-danger"></i>
            </div>
          </div>
        ) : (
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((prod, i) => (
                  <tr key={i}>
                    <td>{prod.nombre}</td>
                    <td>S/ {prod.precio}</td>
                    <td>{prod.cantidad}</td>
                    <td>S/ {prod.precio * prod.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              
              <button className="btn btn-outline-success btn-lg me-3">Comprar</button>
              <button
                className="btn btn-outline-danger btn-lg "
                onClick={manejarLimpiarCarrito}
              >
                Limpiar Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
