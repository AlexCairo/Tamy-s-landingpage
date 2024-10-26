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
      <div className="relative overflow-hidden">
        <div
          className="bg-cover bg-center h-[600px] md:h-[700px] lg:h-[800px] relative"
          style={{ backgroundImage: `url('images/bannerContactanos.webp')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
            <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-bold">
              Contáctate con nosotros
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] lg:h-[200px] bg-white clip-diagonal"></div>
        </div>
      </div>

      <section className="lg:flex-row lg:items-start lg:gap-32 gap-8 my-24 flex flex-col justify-center items-center">
        {loading ? (
          <div className="min-h-[19rem]">Cargando datos ...</div>
        ) : (
          <>
            <div className="gap-6 text-black text-lg flex flex-col justify-center items-center max-w-56 text-center">
              <div className="bg-gray-300 mb-4 rounded-full p-8 hover:bg-[#438D42] transition-all duration-200 flex justify-center items-center h-[10rem] w-[10rem]">
                <img
                  className=""
                  src="/images/locationIcon.svg"
                  alt="Ubicación Icono"
                />
              </div>
              <strong>Ubicación</strong>
              <p>{info.contactos.direccion}</p>
            </div>

            <div className="gap-4 text-black text-lg flex flex-col justify-center items-center max-w-56 text-center">
              <div className="bg-gray-300 mb-4 rounded-full p-8 hover:bg-[#438D42] transition-all duration-200 flex justify-center items-center h-[10rem] w-[10rem]">
                <img
                  className=""
                  src="/images/phoneIcon.svg"
                  alt="Teléfono Icono"
                />
              </div>
              <strong>Teléfono</strong>
              <p>{info.contactos.telefono}</p>
            </div>

            <div className="gap-4 text-black text-lg flex flex-col justify-center items-center max-w-56 text-center">
              <div className="bg-gray-300 mb-4 rounded-full p-8 hover:bg-[#438D42] transition-all duration-200 flex justify-center items-center h-[10rem] w-[10rem]">
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
