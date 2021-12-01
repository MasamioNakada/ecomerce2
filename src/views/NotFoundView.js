import search from "../assets/search.svg"
import "../css/hvh.css"
export default function NotFoundView() {
    return (
        <div className="container" id="hvh">
            <div className='row d-flex justify-content-center align-items-center text-center'>

            <div className="col-lg-6 ">
              <img src={search} id="img" width="60%" height="400px" alt="" />
            </div>
            <h1>Error! pagina no encontrada</h1>
              <p>
                Sigue buscando!
              </p>
            </div>
        </div>
    )
}
