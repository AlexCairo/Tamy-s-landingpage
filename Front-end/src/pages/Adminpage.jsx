import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import {
  agregarProducto,
  obtenerProductos,
  eliminarProducto,
  actualizarProducto,
} from "../services/productos_service";
import Swal from "sweetalert2";
import {
  obtenerInformación,
  editarInformación,
} from "../services/about_service";
import { IMG_URL } from "../helpers/config";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";

function AdminPage() {
  const navigate = useNavigate();
  const token = localStorage.token;
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [productos, setProductos] = useState([]);
  const [info, setInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const { logout } = useContext(UserContext);
  const [idProduct, setIdProduct] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const filteredProducts = productos.slice(
    (currentPage - 1) * 7,
    currentPage * 7
  );

  let newInfo = {
    sobre_nosotros: {
      acerca_de: "",
      mision: "",
      vision: "",
      lema: "",
    },
    contactos: {
      gmail: "",
      telefono: "",
      direccion: "",
    },
  };

  const updateInfo = async (data) => {
    const response = await editarInformación(data);
    return response.data.message;
  };

  const handleDiscountToggle = () => {
    setIsDiscountEnabled(!isDiscountEnabled);
  };

  const addProduct = async (data) => {
    const response = await agregarProducto(data);
    return response.data.message;
  };

  const deleteProduct = async (id) => {
    const response = await eliminarProducto(id);
    return response.data.message;
  };

  const updateProduct = async (id, data) => {
    const response = await actualizarProducto(id, data);
    return response.data;
  };

  const handleEditProduct = async (product) => {
    setIsEditing(true);
    const form = document.getElementById("product_form");
    form.nombreProducto.value = product.nombreProducto;
    form.precio.value = product.precio;
    form.descripcion.value = product.descripcion;
    form.categoria.value = product.categoria;
    form.subCategoria.value = product.subCategoria;
    form.stock.value = product.stock;
    form.codigoProducto.value = product.codigoProducto;
    if (product.descuento == 0) {
      setIsDiscountEnabled(false);
      form.descuento.value = "";
    } else {
      setIsDiscountEnabled(true);
      form.descuento.value = product.descuento;
    }
    setIdProduct(product.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { acerca_de, mision, vision, lema, gmail, telefono, direccion } =
      e.target;
    newInfo = {
      sobre_nosotros: {
        acerca_de: acerca_de.value,
        mision: mision.value,
        vision: vision.value,
        lema: lema.value,
      },
      contactos: {
        gmail: gmail.value,
        telefono: telefono.value,
        direccion: direccion.value,
      },
    };
    Swal.fire({
      title: "Deseas guardar los cambios realizados ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        updateInfo(newInfo)
          .then((response) => {
            Swal.fire(`${response}`, "", "success");
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrió un error",
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron guardados", "", "info");
      }
    });
  };

  const clearForm = () => {
    setIsEditing(false);
    const form = document.getElementById("product_form");
    form.reset();
    setIsDiscountEnabled(false);
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Estás seguro ?",
      text: "No se podrán revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .then((response) => {
            Swal.fire({
              title: "Eliminado!",
              text: response,
              icon: "success",
            });
            getProducts();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrió un error : " + error,
            });
          });
      }
    });
  };

  const handleCloseSesion = () => {
    logout();
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const {
      nombreProducto,
      stock,
      precio,
      categoria,
      subCategoria,
      descripcion,
      codigoProducto,
      descuento,
      imagen,
    } = e.target;
    if (!isDiscountEnabled) {
      formData.append("descuento", 0);
    } else {
      formData.append("descuento", descuento.value);
    }
    formData.append("nombreProducto", nombreProducto.value);
    formData.append("precio", precio.value);
    formData.append("descripcion", descripcion.value);
    formData.append("categoria", categoria.value);
    formData.append("subCategoria", subCategoria.value);
    formData.append("stock", stock.value);
    formData.append("codigoProducto", codigoProducto.value);
    if (imagen.files.length > 0) {
      formData.append("imagen", imagen.files[0]);
    }
    if (isEditing) {
      Swal.fire({
        title: "Deseas actualizar este producto?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        denyButtonText: `No actualizar`,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          updateProduct(idProduct, formData)
            .then((response) => {
              Swal.fire(`Producto actualizado!`, "", "success");
              getProducts();
              clearForm();
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error",
              });
            });
        } else if (result.isDenied) {
          Swal.fire("Los cambios no fueron guardados", "", "info");
        }
      });
      return setIsEditing(false);
    }

    Swal.fire({
      title: "Deseas añadir este producto?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: `No agregar`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        addProduct(formData)
          .then((response) => {
            Swal.fire(`${response}`, "", "success");
            clearForm();
            getProducts();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrió un error",
            });
          });
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron guardados", "", "info");
      }
    });
  };

  const showImage = (image) => {
    Swal.fire({
      imageUrl: `${IMG_URL}${image}`,
      imageHeight: 400,
      imageAlt: "A tall image",
    });
  };

  const getProducts = async () => {
    const response = await obtenerProductos();
    const reversedProducts = response.data.toReversed();
    setProductos(reversedProducts);
    const totalProducts = response.data.length;
    setTotalPages(Math.ceil(totalProducts / 7));
    setLoadingProductos(false);
  };

  const getInfo = async () => {
    const response = await obtenerInformación();
    setInfo(response.data);
    setLoadingInfo(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getProducts();
    getInfo();
  }, []);

  return (
    <>
      {loadingProductos || loadingInfo ? (
        <Loader />
      ) : (
        <>
          <section className="md:max-w-[90rem] mx-auto px-4 md:px-10 lg:px-20 mt-20 md:mt-30">
            <div className="flex flex-row-reverse justify-between items-center mb-10">
              <h1 className="text-xl md:text-3xl text-end">Datos generales</h1>
              <div className="w-1/2 md:w-3/4 border-t-4 rounded-lg border-[#308e42]"></div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="acerca_de"
                >
                  Acerca de
                </label>
                <textarea
                  defaultValue={info.sobre_nosotros.acerca_de}
                  className="shadow min-h-[8rem] appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="acerca_de"
                  name="acerca_de"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mision"
                >
                  Misión
                </label>
                <textarea
                  defaultValue={info.sobre_nosotros.mision}
                  className="shadow min-h-[8rem] appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="mision"
                  name="mision"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="vision"
                >
                  Visión
                </label>
                <textarea
                  defaultValue={info.sobre_nosotros.vision}
                  className="shadow min-h-[8rem] appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="vision"
                  name="vision"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lema"
                >
                  Lema
                </label>
                <textarea
                  defaultValue={info.sobre_nosotros.lema}
                  className="shadow min-h-[8rem] appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="lema"
                  name="lema"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col md:flex-row col-span-full gap-7 md:gap-10 md:mb-4 mt-10 items-end w-full">
                <label
                  className="flex flex-row w-full md:w-1/3"
                  htmlFor="gmail"
                >
                  <div className="bg-[#252525] flex justify-center items-center p-2 shadow-md appearance-none">
                    <img
                      className="w-6 h-auto"
                      src="images/gmailIcon.svg"
                      alt="gmailIcon"
                    />
                  </div>
                  <input
                    defaultValue={info.contactos.gmail}
                    placeholder="Correo electrónico"
                    className="shadow appearance-none border rounded-e w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="gmail"
                    id="gmail"
                  />
                </label>
                <label
                  className="flex flex-row w-full md:w-1/3"
                  htmlFor="telefono"
                >
                  <div className="bg-[#252525] flex justify-center items-center p-2 shadow-md appearance-none">
                    <img
                      className="w-6 h-auto"
                      src="images/phoneIconForm.svg"
                      alt="gmailIcon"
                    />
                  </div>
                  <input
                    defaultValue={info.contactos.telefono}
                    placeholder="Teléfono"
                    className="shadow appearance-none border rounded-e w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="telefono"
                    id="telefono"
                  />
                </label>
                <label
                  className="flex flex-row w-full md:w-1/3"
                  htmlFor="direccion"
                >
                  <div className="bg-[#252525] flex justify-center items-center p-2 shadow-md appearance-none">
                    <img
                      className="w-6 h-auto"
                      src="images/directionIcon.svg"
                      alt="gmailIcon"
                    />
                  </div>
                  <input
                    defaultValue={info.contactos.direccion}
                    placeholder="Dirección"
                    className="shadow appearance-none border rounded-e w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="direccion"
                    id="direccion"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-green-600 rounded-full w-[5rem] flex items-center justify-center h-[5rem] mt-2 col-span-full justify-self-end text-2xl hover:brightness-150 transition-all py-2 px-4 cursor-pointer"
              >
                <img
                  src="images/saveIcon.svg"
                  className="w-10 h-auto"
                  alt="saveIcon"
                />
              </button>
            </form>
          </section>
          <section className="md:max-w-[90rem] md:mx-auto px-4 md:px-10 lg:px-20 mt-10 md:mt-24">
            <div className="flex flex-row-reverse justify-between items-center mb-10">
              <h1 className="text-xl md:text-3xl text-end">Productos</h1>
              <div className="w-1/2 md:w-3/4 border-t-4 rounded-lg border-[#308e42]"></div>
            </div>
            <form
              id="product_form"
              className="w-full pt-6 mb-4 grid grid-cols-2 md:grid-cols-5 gap-4 items-center justify-center"
              onSubmit={submitProduct}
            >
              <div className="col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="nombreProducto"
                >
                  Nombre
                </label>
                <input
                  className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombreProducto"
                  name="nombreProducto"
                  required
                  type="text"
                  placeholder="Ej: Bebe koala niña"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
                  Precio en soles
                </label>
                <input
                  min={0}
                  className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="precio"
                  name="precio"
                  step="any"
                  type="number"
                  required
                  placeholder="Ej: 162"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="precio"
                >
                  Código
                </label>
                <input
                  className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="codigoProducto"
                  name="codigoProducto"
                  type="text"
                  required
                  placeholder="Ej: FC-0NV"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="descuento"
                >
                  Descuento (%)
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="descuentoCheck"
                    id="descuentoCheck"
                    checked={isDiscountEnabled}
                    onChange={handleDiscountToggle}                    
                  />
                  <input
                    className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                    id="descuento"
                    name="descuento"
                    type="number"
                    min={0}
                    disabled={!isDiscountEnabled}
                    required={isDiscountEnabled}
                    placeholder="Ej: 10"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stock"
                >
                  Stock
                </label>
                <input
                  min={1}
                  className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="stock"
                  name="stock"
                  type="number"
                  required
                  placeholder="Ej: 20"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="categoria"
                >
                  Categoría
                </label>
                <input
                  className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="categoria"
                  type="text"
                  name="categoria"
                  required
                ></input>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="subCategoria"
                >
                  Subcategoría
                </label>
                <input
                  className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subCategoria"
                  type="text"
                  name="subCategoria"
                  required
                ></input>
              </div>
              <div className="col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="imagen"
                >
                  Imagen (MÁX 1MB)
                </label>
                <input
                  className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="imagen"
                  name="imagen"
                  type="file"
                  required={isEditing ? false : true}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                />
              </div>
              <div className="col-span-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="descripcion"
                >
                  Descripción
                </label>
                <textarea
                  className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="descripcion"
                  name="descripcion"
                  required
                  placeholder="Ej: Elegante arreglo en canasta de mimbre..."
                ></textarea>
              </div>
              <button
                className="bg-green-600 col-span-full md:col-span-1 flex justify-center items-center h-[4.5rem] w-[4.5rem] justify-self-center text-3xl hover:brightness-150 rounded-full transition-all text-white font-bold"
                type="submit"
              >
                <img
                  src="images/saveIcon.svg"
                  className="w-10 h-auto"
                  alt="saveIcon"
                />
              </button>
              <div
                onClick={clearForm}
                className={`bg-red-900 hover:bg-red-600 transition-all cursor-pointer mt-2 justify-self-center md:justify-self-start col-span-full md:col-span-1 text-white py-2 px-3 font-bold rounded ${
                  isEditing ? "block" : "hidden"
                }`}
              >
                Dejar de editar
              </div>
            </form>
          </section>
          <section className="md:max-w-[90rem] md:mx-auto px-4 md:px-10 lg:px-20 mt-10 md:mt-24 mb-40">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-sm md:text-xl text-start w-[15rem] font-extrabold">
                Catálogo de productos
              </h1>
              <div className="w-1/2 md:w-3/4 border-t-[1px] rounded-lg border-gray-500"></div>
            </div>
            <div className="flex w-full flex-col">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-xs md:text-base overflow-x-auto border-collapse text-center mb-4 md:overflow-x-auto">
                  <thead>
                    <tr className="bg-gray-100 border-b-2 border-gray-200">
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Nombre
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Código
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Precio original(S/.)
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Precio con descuento(S/.)
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-2/11">
                        Descuento (%)
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-2/11">
                        Descripción
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Categoría
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Subcategoría
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Stock
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Imagen
                      </th>
                      <th className="py-2 px-4 text-gray-700 font-bold md:w-1/11">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((elem) => {
                      return (
                        <tr
                          className="h-[7rem] border-b border-gray-200"
                          key={elem.id}
                        >
                          <td className="py-2 overflow-x-auto max-w-[10rem] px-1 text-gray-700 md:w-1/11">
                            {elem.nombreProducto}
                          </td>
                          <td className="h-[7rem] py-2 text-gray-700 md:w-1/11">
                            {elem.codigoProducto}
                          </td>
                          <td className="bg-slate-100 h-[7rem] py-2 px-1 text-gray-700 md:w-1/11">
                            {elem.precio}
                          </td>
                          <td className="h-[7rem] py-2 px-1 text-gray-700 md:w-1/11">
                            {(() => {
                              const precio = parseFloat(elem.precio);
                              const descuento = parseFloat(elem.descuento);

                              if (!isNaN(precio) && !isNaN(descuento)) {
                                const descuentoCalculado =
                                  precio - precio * (descuento / 100);
                                return descuentoCalculado;
                              }
                              return 0;
                            })()}
                          </td>
                          <td className="bg-slate-100 h-[7rem] py-2 px-1 text-gray-700 md:w-1/11">
                            {elem.descuento}
                          </td>
                          <td className="h-[7rem] px-1 text-gray-700 md:w-2/11 overflow-x-auto">
                            <div className="etiquetaFirefox text-start whitespace-break-spaces max-w-[25rem] max-h-[5rem] overflow-y-scroll lg:overflow-y-visible">
                              {elem.descripcion}
                            </div>
                          </td>
                          <td className="h-[7rem] py-2 px-1 text-gray-700 md:w-1/11">
                            {elem.categoria}
                          </td>
                          <td className="h-[7rem] py-2 px-1 text-gray-700 md:w-1/11">
                            {elem.subCategoria}
                          </td>
                          <td className="h-[7rem] py-2 px-1 text-gray-700 md:w-1/11">
                            {elem.stock}
                          </td>
                          <td className="h-[7rem] py-2 px-1 text-gray-700 md:w-1/11">
                            <button
                              onClick={() => showImage(elem.imagen)}
                              className="bg-orange-500 border-2 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                            >
                              <img
                                src="images/viewImage.svg"
                                className="w-6 h-auto"
                                alt="viewImage"
                              />
                            </button>
                          </td>
                          <td className="h-[7rem] py-2 px-1 flex flex-col items-center justify-center min-h-full text-gray-700 md:w-1/11">
                            <button
                              onClick={() => handleEditProduct(elem)}
                              className="border-2 bg-green-400 hover:bg-green-600 transition-all font-bold py-2 px-4 rounded-t-md"
                            >
                              <img
                                src="images/editIcon.svg"
                                className="w-6 h-auto"
                                alt="editIcon"
                              />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(elem.id)}
                              className="border-2 bg-red-400 hover:bg-red-600 transition-all font-bold py-2 px-4 rounded-b-md"
                            >
                              <img
                                src="images/deleteIcon.svg"
                                className="w-6 h-auto"
                                alt="deleteIcon"
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Pagination
                className="mt-[80rem]"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <button
              onClick={handleCloseSesion}
              className="mb-10 md:w-auto text-lg w-full border-b-2 py-2 mt-10"
            >
              🔙 Cerrar sesión
            </button>
          </section>
        </>
      )}
    </>
  );
}

export default AdminPage;
