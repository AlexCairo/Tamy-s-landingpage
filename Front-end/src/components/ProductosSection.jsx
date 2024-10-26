import Card from "./Card";

function ProductosSection(){
    return(
        <section id="Productos" className="gap-6 md:max-w-[90rem] md:mx-auto px-4 md:px-10 lg:px-20 mt-20 md:mt-40 bg-white row min-h-screen grid grid-cols-1 lg:grid-cols-5">
        <div className="col-span-full lg:col-span-3 h-[25rem] md:min-h-full">
            <Card
                pre_tittle="Para aquellas"
                title="Ocasiones Especiales"
                description="Encuentra el detalle perfecto para cada momento inolvidable."
                buttonText="Descubrir"
                imageUrl="images/ImgSlide1.webp"
            />
        </div>
        <div className="col-span-full lg:col-span-2 h-[25rem] md:min-h-full">
            <Card
                pre_tittle="El arte se encuentra en las"
                title="Galería de Arreglos"
                description="Diseños únicos y exclusivos que hablan por ti."
                buttonText="Ver Galería"
                imageUrl="images/ImgSlide2.webp"
            />
        </div>
        <div className="col-span-full lg:col-span-2 h-[25rem] md:min-h-full">
            <Card
                pre_tittle="El regalo perfecto comienza con nuestras"
                title="Flores Frescas"
                description="Elige entre una amplia variedad de flores frescas y exóticas."
                buttonText="Explorar"
                imageUrl="images/ImgSlide3.webp"
            />
        </div>
        <div className="col-span-full lg:col-span-3 h-[25rem] md:min-h-full">
            <Card
                pre_tittle="El toque final con"
                title="Ramos y Cajas"
                description="Crea momentos memorables con nuestros ramos y cajas elegantes."
                buttonText="Personalizar"
                imageUrl="images/ImgSlide4.webp"
            />
        </div>
    </section>
    );
}

export default ProductosSection;