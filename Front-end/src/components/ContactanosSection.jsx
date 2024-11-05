import MapView from "./Map.jsx";
import { obtenerInformación } from "../services/about_service.js";
import { useState, useEffect } from "react";

function ContactanosSection() {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    const response = await obtenerInformación();
    setInfo(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <section id="Contactanos">
      <div className="relative mt-40">
        <div className="relative h-[300px] md:h-[700px] lg:h-[800px]">
          <img
            src="images/bannerContactanos.webp"
            alt="Banner Nosotros"
            className="object-fill w-full h-full"
          />
          <div className="absolute bottom-[-1px] left-0 w-full h-[100px] md:h-[150px] lg:h-[200px] bg-white clip-diagonal"></div>
        </div>
      </div>

      <section className="lg:flex-row lg:items-start lg:gap-32 gap-8 mt-8 mb-12 md:mt-28 md:mb-36 flex flex-col justify-center items-center">
        {loading ? (
          <div className="min-h-[19rem]">Cargando datos ...</div>
        ) : (
          <>
            <div className="gap-2 md:gap-8 text-black text-sm md:text-lg flex flex-col justify-center items-center max-w-56 text-center">
              <div className="bg-gray-300 mb-4 rounded-full p-4 md:p-8 hover:bg-[#438D42] transition-all duration-200 flex justify-center items-center h-[5rem] w-[5rem] md:h-[10rem] md:w-[10rem]">
                <img
                  className=""
                  src="/images/locationIcon.svg"
                  alt="Ubicación Icono"
                />
              </div>
              <strong>Ubicación</strong>
              <p>{info.contactos.direccion}</p>
            </div>

            <div className="gap-2 md:gap-8 text-black text-sm md:text-lg flex flex-col justify-center items-center max-w-56 text-center">
              <div className="bg-gray-300 mb-4 rounded-full p-4 md:p-8 hover:bg-[#438D42] transition-all duration-200 flex justify-center items-center h-[5rem] w-[5rem] md:h-[10rem] md:w-[10rem]">
                <img
                  className=""
                  src="/images/phoneIcon.svg"
                  alt="Teléfono Icono"
                />
              </div>
              <strong>Teléfono</strong>
              <p>{info.contactos.telefono}</p>
            </div>

            <div className="gap-2 md:gap-8 text-black text-sm md:text-lg flex flex-col justify-center items-center max-w-56 text-center">
              <div className="bg-gray-300 mb-4 rounded-full p-4 md:p-8 hover:bg-[#438D42] transition-all duration-200 flex justify-center items-center h-[5rem] w-[5rem] md:h-[10rem] md:w-[10rem]">
                <img
                  className=""
                  src="/images/emailIcon.svg"
                  alt="Email Icono"
                />
              </div>
              <strong>Email</strong>
              <p>{info.contactos.gmail}</p>
            </div>
          </>
        )}
      </section>
      <MapView />
    </section>
  );
}

export default ContactanosSection;
