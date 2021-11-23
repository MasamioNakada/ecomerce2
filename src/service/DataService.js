import axios from "axios";

//esta url e de mocp api
const URL = "https://616b5ec016c3fa0017171694.mockapi.io/Productos";

const LaData = async () => {
  try {
    const { data } = await axios.get(URL);
    // console.log('data de '  ,data)
    return data
  } catch (error) {
    throw error;
  }
};
const obtenerProductosPorPagina = async (pagina = 1, limite = 9) => {
  try {
      let { data } = await axios.get(`${URL}?page=${pagina}&limit=${limite}`);
      return data;
  } catch (error) {
      throw error;
  }
};
const obtenerProductoPorId = async (id) => {
  try {
      let { data } = await axios.get(`${URL}/${id}`);
      return data;
  } catch (error) {
      throw error;
  }
};
export {LaData,obtenerProductosPorPagina,obtenerProductoPorId}
