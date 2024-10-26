import { useState, useMemo, useCallback } from "react";

function FilterBar({ productos, onCategoryChange }) {
  const [expandedCategories, setExpandedCategories] = useState({});

  const categorias = useMemo(() => {
    const categoriasTemp = {};
    productos.forEach((producto) => {
      const categoria = producto.categoria.toLowerCase();
      const subCategoria = producto.subCategoria.toLowerCase();

      if (!categoriasTemp[categoria]) {
        categoriasTemp[categoria] = [];
      }

      if (!categoriasTemp[categoria].includes(subCategoria)) {
        categoriasTemp[categoria].push(subCategoria);
      }
    });
    return categoriasTemp;
  }, [productos]);

  const toggleCategory = useCallback((categoria) => {
    setExpandedCategories((prevExpanded) => ({
      ...prevExpanded,
      [categoria]: !prevExpanded[categoria],
    }));
  }, []);

  const handlePromotions = useCallback(() => {
    onCategoryChange(null, null, true);
  }, [onCategoryChange]);

  return (
    <ul className="text-sm">
      <li className="mb-5 w-[11.25rem]">
        <span className="cursor-pointer flex items-center justify-between text-white bg-red-700 p-1 font-bold" onClick={handlePromotions}>
          Promociones
          <i className="fas fa-exclamation-circle text-white"></i>
        </span>
      </li>
      {Object.keys(categorias).map((categoria, index) => (
        <li key={index} className="mb-2 relative">
          <span
            className="cursor-pointer"
            onClick={() => onCategoryChange(categoria, null)}
          >
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
          </span>
          <span
            className="cursor-pointer absolute right-32"
            onClick={() => toggleCategory(categoria)}
          >
            {expandedCategories[categoria] ? '-' : '+'}
          </span>
          {expandedCategories[categoria] && (
            <ul>
              {categorias[categoria].map((subcategoria, subIndex) => (
                <li
                  className="cursor-pointer mt-1 ml-4"
                  key={subIndex}
                  onClick={() => onCategoryChange(categoria, subcategoria)}
                >
                  {subcategoria.charAt(0).toUpperCase() + subcategoria.slice(1)}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default FilterBar;