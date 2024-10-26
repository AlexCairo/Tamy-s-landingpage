import { useState, useEffect } from "react";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleMenu = () => setOpenMenu(!openMenu);

  // Función para manejar el scroll
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg">
        <aside
          style={{ fontFamily: "calibri" }}
          className="flex px-2 flex-row justify-around text-[#252525] font-bold items-center text-center text-sm lg:text-lg xl:text-xl mx-auto max-w-screen-xl"
        >
          <div className="flex items-center gap-2 justify-center flex-row w-full text-center">
            <i className="fas fa-truck text-[#438D42] text-2xl sm:text-3xl lg:text-4xl"></i>
            <div className="text-left">
              <span className="text-xs sm:text-base lg:text-lg text-gray-700">
                Envios:
              </span>
              <p className="text-xs sm:text-sm lg:text-sm text-gray-500">
                Lima Metropolitana
              </p>
            </div>
          </div>
          <div className="block border-l border-r border-[#438D42] mx-4 h-8"></div>

          <div className="flex items-center gap-2 justify-center flex-row w-full text-center">
            <i className="fas fa-clock text-[#438D42] text-2xl sm:text-3xl lg:text-4xl"></i>
            <div className="text-left">              
              <p className="text-xs sm:text-sm lg:text-sm text-gray-500">
                Lunes a Domingo de 08:00 a 23:00
              </p>
            </div>
          </div>
        </aside>
      </div>
      <header
        className={`sticky bg-[#438D42] py-1 top-0 left-0 z-50 w-full gap-20 flex justify-around md:justify-center items-center transition-all duration-300`}
      >
        <img
          className="w-[12rem] md:w-[15rem] h-auto"
          src="/images/LogoNavbar2.webp"
          alt="Logo navbar"
        />
        <button onClick={toggleMenu} className="md:hidden h-auto">
          <img
            className="w-12 h-auto"
            src="/images/HamburguerIcon.svg"
            alt="HamburguerIcon"
          />
        </button>
        <nav
          className={`text-white font-semibold text-sm uppercase fixed top-0 left-0 w-full h-full md:w-auto md:h-full md:relative md:visible md:opacity-100 flex justify-center items-center transition-all duration-300
        ${
          openMenu
            ? `opacity-100 visible ${
                window.innerWidth < 768 ? "bg-[#308e42]" : ""
              }`
            : "opacity-0 invisible"
        } `}
        >
          <ul className="flex flex-col items-center md:justify-center md:flex-row">
            <button
              onClick={toggleMenu}
              className="w-[5.5rem] h-auto absolute top-2 right-2 md:hidden"
            >
              <img src="/images/CloseIcon.svg" alt="Close Menu" />
            </button>
            <li className="my-4 md:mx-4 md:my-0">
              <a
                className="py-2 tracking-widest border-b-2 border-transparent hover:border-white hover:border-solid"
                href="#Inicio"
                onClick={toggleMenu}
              >
                Inicio
              </a>
            </li>
            <li className="my-4 md:mx-4 md:my-0">
              <a
                className="py-2 tracking-widest border-b-2 border-transparent hover:border-white hover:border-solid"
                href="#Productos"
                onClick={toggleMenu}
              >
                Productos
              </a>
            </li>
            <li className="my-4 md:mx-4 md:my-0">
              <a
                className="py-2 tracking-widest border-b-2 border-transparent hover:border-white hover:border-solid"
                href="#Nosotros"
                onClick={toggleMenu}
              >
                Nosotros
              </a>
            </li>
            <li className="my-4 md:mx-4 md:my-0">
              <a
                className="py-2 tracking-widest border-b-2 border-transparent hover:border-white hover:border-solid"
                href="#Contactanos"
                onClick={toggleMenu}
              >
                Contáctanos
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
