import React from 'react'
import { useContext,useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'
export default function ContrasenaView() {
    const { resetPassword} = useContext(AuthContext)
    const [form, setForm] = useState({
        email: "",
        password: "",
      });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value,
        });
      };
    async function handleSubmit(e) {
        e.preventDefault();
        
        try {
         
          await resetPassword(form.email)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `'Mensaje de recuperacion enviado a ${form.email}'`,
            showConfirmButton: false,
            timer: 1500
          })
        } catch(error) {
          console.log(error)
        }
    
      }


    return (
    
        <div>
             <div className="row mt-3 d-flex justify-content-center mt-5">
      <div>
      <h1 className="text-center">Olvidaste tu contraseña</h1>
      </div> 

      <form onSubmit={handleSubmit} className="col-lg-3 col-md-6 col-9  mt-3 ">
        <div class="col-lg-12">
          <label for="inputEmail4" class="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="inputEmail4  "
            placeholder="Ingrese email"
            value={form.email}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="col-lg-12  mt-3 text-center border">
            <p>De no encontrar el correo, recuerde revisar su carpeta de span</p>
          <button
            type="submit"
            className="btn btn-outline-danger      m-3"
            
          >
            Recuperar Contraseña
          </button>
         
        </div>
      </form>
      </div>
      </div>
    )
}
