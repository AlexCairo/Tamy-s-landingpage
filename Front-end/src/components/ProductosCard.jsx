import { IMG_URL } from "../helpers/config";
import Swal from "sweetalert2";

function formatPrice(price) {
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    return "S/.0.00";   }
  return `S/.${numericPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

const calcularPrecioFinal = (price,descuento) => {
  const descuentoFloat = parseFloat(descuento);
  const priceFloat = parseFloat(price);
  const precioFinalFloat = priceFloat - (priceFloat * (descuentoFloat / 100));
  return precioFinalFloat
}
function ProductosCard({ name, price, imagen, descripcion, descuento }) {
  const showDetail = (image) => {
    Swal.fire({
      title: `<font size="5">${name}</font>`,
      html: `
        ${descuento != 0 ? `<span class="top-10 left-[15%] absolute bg-red-600 text-white px-4 py-2 font-bold rounded-md text-center">${descuento}%</span>` : ''}
        <p style="text-align: start; font-size: 15px; margin-bottom: 25px;">
          <b>Descripción:</b> ${descripcion.replace(/\r\n/g, "<br>")}
        </p>
        ${descuento != 0 ? `
          <p class="flex justify-between text-[12px]">
            <span>Antes</span>
            <s>${formatPrice(price)}</s>
          </p>
          <p class="flex justify-between font-extrabold">
            <span>Ahora</span>
            <span class="text-red-600 tracking-tighter">${formatPrice(calcularPrecioFinal(price, descuento))}</span>
          </p>
        ` : `
          <p class="flex justify-between font-extrabold">
            <span>Precio</span>
            <span class="text-red-600 tracking-tighter">${formatPrice(price)}</span>
          </p>
        `}
      `,
      imageUrl: `${IMG_URL}${image}`,
      imageWidth: 300,
      imageHeight: 350,
      imageAlt: "Custom image",
    });
  };

  return (
    <div className="shadowAnimation w-full max-h-[18rem] min-h-[15rem] relative md:min-h-[27rem] flex flex-col bg-[#fafafa] text-black rounded-lg overflow-hidden transition-shadow duration-500">
      <button onClick={() => showDetail(imagen)} className="flex-1 min-h-[65%] md:min-h-[75%]">
        <img
          src={`${IMG_URL}${imagen}`}
          alt={name}
          className="w-full h-full object-cover bg-white"
        />
      </button>
      
      {descuento != 0 && (
        <span className="absolute bg-red-600 text-white px-4 py-2 font-bold rounded-tl-sm text-center text-lg top-0">
          {descuento}%
        </span>
      )}
      
      <div className="py-2 min-h-28 h-[30%] flex flex-col justify-between items-center gap-4">
        <button onClick={() => showDetail(imagen)} className="text-center capitalize text-xs md:text-base px-2">
          {name}
        </button>
        
        <div className="flex flex-col gap-2 px-3 pb-2 w-full">
          {descuento != 0 ? (
            <>
              <p className="flex justify-between text-[12px]">
                <span>Antes</span>
                <s>{formatPrice(price)}</s>
              </p>
              <p className="flex justify-between text-sm md:text-base font-extrabold">
                <span>Ahora</span>
                <span className="text-red-600 tracking-tighter">{formatPrice(calcularPrecioFinal(price, descuento))}</span>
              </p>
            </>
          ) : (
            <p className="flex justify-between font-extrabold text-sm md:text-base">
              <span>Precio</span>
              <span className="text-red-600 tracking-tighter">{formatPrice(price)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductosCard;