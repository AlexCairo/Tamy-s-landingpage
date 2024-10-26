import Banner from "../components/Slider";
import ProductosSection from "../components/ProductosSection";
import ProductosSlider from "../components/ProductosSlider";
import ProductosCatalog from "../components/ProductosCatalog";
import ContactanosSection from "../components/ContactanosSection";
import NosotrosSection from "../components/NosotrosSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { obtenerInformación } from "../services/about_service";
import Loader  from "../components/Loader";


function Homepage() {

  const [ info, setInfo ] = useState();
  const [ loading, setLoading ] = useState(true);

  const getInfo = async() => {
    const response = await obtenerInformación();
    setInfo(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getInfo();
  },[])

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <Navbar />
          <Banner/>
          <ProductosSection />
          <ProductosSlider />
          <ProductosCatalog />
          <NosotrosSection />
          <ContactanosSection />
          <Footer />
        </>
      )}
    </>  
  );
}

export default Homepage;