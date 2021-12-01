import { useContext, useState } from "react";
import { CarritoContext } from "../context/carritoContext";
import { useForm } from "react-hook-form"; //useForm es un hook personalizado, para manejar formularios
import { guardarVenta } from "../service/VentasService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Cargando from "../components/Cargando";

export default function CheckOutView() {
  const { currentUser } = useContext(AuthContext);
  const { carrito } = useContext(CarritoContext);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let total = 0;

  total = carrito.reduce((acum, prod) => {
    return acum + prod.cantidad * prod.precio;
  }, 0);

  // hook forms
  //register: es necesario para registrar c/input, messirve como referencia de los input
  //handleSubmit: función que me permite manejar el evento submit del form
  //errors: me permite por c/input mostrar un mensajito de error
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const recibirSubmit = async (data) => {
    setLoading(true);
    const poder = currentUser === null ? false : true;

    try {
      let nuevaVenta = {
        ...data, //nombreCompleto, telefono, email, direccion
        productos: carrito,
        total,
      };
      if (poder) {
        await guardarVenta(nuevaVenta);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Venta Realizada",
          showConfirmButton: true,
          text: "Revise su correo para ver el metodo de pago",
        });
        reset();
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debes iniciar sesion para continuar 🥺!",
          footer: "Te recomendamos ver las politicas de privacidad",
        });
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading === true ? (
        <Cargando />
      ) : (
        <div className="container mt-4">
          <h1>
            <i className="fas fa-user-lock mb-4"></i> COMPRA SEGURA
          </h1>
          <div className="row my-2">
            <div className="col-12 col-md-6">
              <h5>Verifique el carrito</h5>
              <ul className="list-group">
                {carrito.map((prod, i) => (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    key={i}
                  >
                    <div>
                      <h6 className="fw-bold">{prod.nombre}</h6>
                      <small>Cantidad: {prod.cantidad}</small>
                    </div>
                    <div className="badge bg-dark rounded-pill p-4">
                      {/* toFixed(entero), me permite manejar decimales en un número */}
                      S/ {(prod.cantidad * prod.precio).toFixed(2)}
                    </div>
                  </li>
                ))}
                {/* pondré total */}
                {total > 0 ? (
                  <li className="list-group-item d-flex justify-content-between fw-bold">
                    <span className="fw-bold">TOTAL:</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </li>
                ) : (
                  <li className="list-group-item">
                    Todavía no ha agregado ningún producto.
                  </li>
                )}
              </ul>
            </div>
            {/* formulario */}
            <div className="col-12 col-md-6">
              <form onSubmit={handleSubmit(recibirSubmit)}>
                <div className="mb-2">
                  {currentUser === null ? (
                    <h5 className="text-danger fs-6">
                      'Inicia sesion para efectuar la compra'
                    </h5>
                  ) : (
                    ""
                  )}
                  <label className="form-label">Nombres y Apellidos</label>
                  <input
                    type="text"
                    placeholder="Ej. Juan Perez"
                    className="form-control"
                    {...register("nombreCompleto", { required: true })}
                  />
                  {/* errors.prop existe && retorna esto */}
                  {errors.nombreCompleto && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="mb-2">
                  <label className="form-label">Télefono</label>
                  <input
                    type="text"
                    placeholder="Ej. 926384679"
                    className="form-control"
                    {...register("telefono", {
                      required: { value: true, message: "Es requerido" },
                      minLength: { value: 6, message: "Se require 6 dígitos" },
                      maxLength: { value: 14, message: "Máximo 14 dígitos" },
                    })}
                  />
                  {errors.telefono && (
                    <small className="text-danger">
                      {errors.telefono.message}
                    </small>
                  )}
                </div>

                <div className="mb-2">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    placeholder="Ej. jperez@tecsup.edu.pe"
                    className="form-control"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <small className="text-danger">
                      Este correo es obligatorio
                    </small>
                  )}
                </div>
                <label className="form-label">Departamento</label>
                <div className="mb-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register("departamento", { required: true })}
                  >
                    <option selected>Seleccionar</option>
                    <option value="1">Lima</option>
                    <option value="2">Callao</option>
                    <option value="3">Arequipa</option>
                  </select>
                  {errors.email && (
                    <small className="text-danger">
                      Seleccionar Departamento
                    </small>
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Dirección</label>
                  <input
                    type="text"
                    placeholder="Ej. Urb Los Arces F 67"
                    className="form-control"
                    {...register("direccion", { pattern: /^[A-Za-z0-9]*$/ })}
                  />
                  {errors.direccion && (
                    <small className="text-danger">
                      Solo se acepta letras y dígitos
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-dark btn-lg mb-3"
                  disabled={carrito.length <= 0}
                >
                  Comprar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
