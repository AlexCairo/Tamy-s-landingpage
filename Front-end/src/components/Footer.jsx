import FacebookIcon from "/images/FacebookIcon.png";
import TwitterIcon from "/images/TwitterIcon.png";
import InstagramIcon from "/images/InstagramIcon.png";
import { Link } from "react-router-dom";
import Swal  from "sweetalert2";
import emailjs from "emailjs-com";

function Footer(){

    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm('service_f1m3gsa','template_7vkv5ys',e.target,'Rc45a79Q7kvR4lG1l')
        .then(res=>{
            Swal.fire({
                icon: 'success',
                title: 'Enviado',
                text: 'El mensaje fue enviado!',
            })
        })
    }

    return(
        <footer className="bg-[#d4dc4b] max-w-full">
            <main className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 lg:gap-15 w-full py-14">
                <div>
                    <img className="h-36 mb-10" src="images/Logo_alterno2.webp" alt="Logo alterno" />
                    <ul className="flex items-center justify-center md:justify-start p-2 gap-1">
                        <li><Link><img className="h-16 w-auto hover:brightness-125 transition-all duration-200" src={FacebookIcon} alt="FacebookIcon" /></Link></li>
                        <li><Link><img className="h-16 w-auto hover:brightness-125 transition-all duration-200" src={TwitterIcon} alt="TwitterIcon" /></Link></li>
                        <li><Link to={"https://www.instagram.com/tamysfloristeria/"} target="_blank"><img className="h-16 w-auto hover:brightness-125 transition-all duration-200" src={InstagramIcon} alt="InstagramIcon" /></Link></li>
                    </ul>
                </div>
                <ul className="font-normal flex p-4 border-y-[1px] border-solid border-[#438D42] w-[80%] md:border-y-0 md:w-auto flex-col gap-4 text-center md:text-start lg:mr-20">
                    <li className="hover:list-disc"><a href="#Inicio">Inicio</a></li>
                    <li className="hover:list-disc"><a href="#Productos">Productos</a></li>   
                    <li className="hover:list-disc"><a href="#">Nosotros</a></li> 
                    <li className="hover:list-disc"><a href="#Contactanos">Contáctanos</a></li>
                </ul>
                <form onSubmit={sendEmail} className="max-w-90 md:max-w-80 flex flex-col justify-center px-8 md:p-0">
                    <h3 className="text-center">Si tienes alguna consulta déjanos tu mensaje y en breve te contestaremos.</h3>
                    <div className="flex flex-col gap-3 mt-5">
                        <input required placeholder="Nombres y Apellidos" className="focus:outline-none p-2 rounded-lg" type="text" name="nombre" id="nombre" />
                        <input required placeholder="Correo electrónico" className="focus:outline-none p-2 rounded-lg" type="email" name="email" id="email" />
                        <input required placeholder="Teléfono" className="focus:outline-none p-2 rounded-lg" type="text" name="telefono" id="telefono" />
                        <textarea required placeholder="Mensaje" className="focus:outline-none p-2 rounded-lg h-40" name="mensaje" id="mensaje" />
                    </div>
                    <button className="bg-[#438D42] hover:opacity-80 transition-opacity duration-200 mt-3 rounded-lg  text-white p-3" type="submit">Enviar</button>
                </form>
            </main>
            <section className="bg-[#438D42] text-white p-1 text-[0.5rem] md:text-xs tracking-wide font-bold text-center">Floristería Tamy's 2024 © Todos los derechos reservados</section>
            <Link className = "group fixed bottom-10 right-6 z-[2] w-[3.5rem] h-auto" target = "_blank" to = "https://api.whatsapp.com/send?phone=928904941">
                <img src = "images/whatsappIcon.svg" alt = "wsp.webp" />
                <span className="bg-white pointer-events-none absolute opacity-0 transition-all w-max md:group-hover:opacity-100 px-3 py-1 rounded-xl shadow-lg top-3 right-[110%]">😊 !Estamos online!</span>
            </Link>
        </footer>
    );
}

export default Footer;