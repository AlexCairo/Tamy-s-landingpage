import { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import ProductosCard from "./ProductosCard";
import Pagination from "./Pagination";
import { obtenerProductos } from "../services/productos_service";

function ProductosCatalog() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [productsPerPage, setProductsPerPage] = useState(9);

  const getProducts = async () => {
    const response = await obtenerProductos();
    const reversedProducts = response.data.toReversed()
    setAllProducts(reversedProducts);
    setFilteredProducts(reversedProducts);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCategoryChange = (categoria, subCategoria, showPromotions) => {
    setSelectedCategory(categoria);
    setSelectedSubCategory(subCategoria);
  
    let filteredProducts = allProducts;
  
    if (categoria) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.categoria.toLowerCase() === categoria.toLowerCase();
      });
    }
  
    if (subCategoria) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.subCategoria.toLowerCase() === subCategoria.toLowerCase();
      });
    }
  
    if (showPromotions) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.descuento != 0;
      });
    }
  
    setFilteredProducts(filteredProducts);
    setCurrentPage(1);
  };

  const handleShowAllProducts = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setFilteredProducts(allProducts);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className="flex md:max-w-[90rem] md:mx-auto mb-10 md:mb-20 justify-between items-center px-4 md:px-10 lg:px-20 mt-10 md:mt-20">
        <h2 className="text-3xl">Productos</h2>
        <div className="w-1/2 md:w-3/4 border-t border-black"></div>
      </div>
      <section id="Productos" className="px-4 md:px-10 md:max-w-[90rem] md:mx-auto lg:px-20 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 lg:row-span-full">
          <strong className="mb-2 block">Categorías</strong>
          <button onClick={handleShowAllProducts} className="text-[#308e42] text-sm mt-4">Todos los Productos ({allProducts.length})</button>
          <FilterBar
            productos={allProducts}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 col-span-3 mt-10 lg:mt-0 gap-6">
          <strong className="col-span-full">
          {selectedCategory
              ? selectedSubCategory
                ? `Productos de ${selectedCategory} : ${selectedSubCategory}`
                : `Productos de ${selectedCategory}`
              : "Todos los productos"}
          </strong>
          {currentProducts.length === 0 ? (
            <span className="col-span-full text-center mt-[15rem ]">Sin datos</span>
          ) : (
            currentProducts.map((product) => (
              <ProductosCard
                name={product.nombreProducto}
                price={product.precio}
                imagen={product.imagen}
                descripcion={product.descripcion}
                descuento={product.descuento}
                key={product.id}
              />
            ))
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
}

export default ProductosCatalog;