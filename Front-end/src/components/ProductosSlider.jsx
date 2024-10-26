import { useState, useEffect } from "react";
import { obtenerProductos } from "../services/productos_service";
import ProductosCard from "./ProductosCard";

function ProductosSlider(){

    const [listaProductosRecientes,  setListaProductosRecientes] = useState([]);

    
    const getProducts = async() => {
        const response = await obtenerProductos();
        const productos = response.data.toReversed();
        const productosRecientes =  productos.slice(0, 4);
        setListaProductosRecientes(productosRecientes);
    }

    useEffect(()=>{
        getProducts()
    },[])

    return(
        <section className="px-4 md:px-10 lg:px-20 md:max-w-[90rem] md:mx-auto">
            <div className="flex mt-20 md:mt-30 justify-between items-center">
                <h2 className="text-3xl">Productos Recientes</h2>
                <div className="w-[75%] border-t-[1px] border-black"></div>                
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 mt-10 md:mt-20 gap-4">
                {listaProductosRecientes ? 
                    listaProductosRecientes.length === 0 ? (
                        <p className="col-span-full text-center">No hay productos</p>
                    ) : listaProductosRecientes.map(item => (
                        <ProductosCard
                            name={item.nombreProducto}
                            price={item.precio}
                            imagen={item.imagen}
                            descripcion={item.descripcion}
                            descuento={item.descuento}
                            key={item.id}
                        />
                    ))
                : <div className="min-h-[25rem]">Cargando datos ...</div>}
            </div>           
        </section>
    )
}

export default ProductosSlider;