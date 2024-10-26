import { useState, useEffect } from "react";
import { obtenerInformación } from "../services/about_service";

function NosotrosSection(){

    const [info, setInfo ] = useState();
    const [loadingInfo, setLoadingInfo] = useState(true)

    const getInfo = async() => {
        const result = await obtenerInformación();
        setInfo(result.data)
        setLoadingInfo(false);
    }

    useEffect(() => {
        getInfo();
    })

    return(
       <>
         <div id="Nosotros" className="relative overflow-hidden mt-40">
            <div
            className="bg-cover bg-center h-[600px] md:h-[700px] lg:h-[800px] relative"
            style={{ backgroundImage: `url('images/bannerNosotros.webp')` }}
            >
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
                <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-bold">
                Acerca de nosotros
                </h1>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[100px] md:h-[150px] lg:h-[200px] bg-white clip-diagonal"></div>
            </div>
        </div>
        <section className="bg-white min-h-[100vh]  flex justify-center items-center md:mx-auto">
            {loadingInfo ? <span className="min-h-[19rem] text-center block">Cargando datos ...</span>
            :
            <div className="container justify-start mx-auto md:max-w-[90rem] px-4 md:px-10 lg:px-20">
                <div className="text-start mb-[8rem]">
                    <h2 className="text-5xl font-bold mb-14">¿Quiénes sómos?</h2>
                    <p className="text-base max-w-[35rem]">{info.sobre_nosotros.acerca_de}
                    </p>
                </div>
                <div className="flex gap-14 flex-col lg:flex-row justify-between mb-12">
                    <div className="text-start">
                        <h2 className="text-5xl font-bold mb-3 text-[#d3db5a] tracking-tighter">01</h2>
                        <h3 className="text-xl mb-6 uppercase tracking-[0.5rem]">Misión</h3>
                        <p className="text-base max-w-[22rem]">{info.sobre_nosotros.mision}
                        </p>
                    </div>
                    <div className="text-start">
                        <h2 className="text-5xl font-bold mb-3 text-[#d3db5a] tracking-tighter">02</h2>
                        <h3 className="text-xl mb-6 uppercase tracking-[0.5rem]">Visión</h3>
                        <p className="text-base max-w-[22rem]">{info.sobre_nosotros.vision} 
                        </p>
                    </div>
                    <div className="text-start">
                        <h2 className="text-5xl font-bold mb-3 text-[#d3db5a] tracking-tighter">03</h2>
                        <h3 className="text-xl mb-6 uppercase tracking-[0.5rem]">Lema</h3>
                        <p className="text-base max-w-[22rem]">{info.sobre_nosotros.lema} 
                        </p>
                    </div>
                </div>
            </div>}
        </section>
       </>
    )
}

export default NosotrosSection;