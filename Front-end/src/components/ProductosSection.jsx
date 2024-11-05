import Card from "./Card";

function ProductosSection(){
    return(
        <section className="gap-6 md:max-w-[110rem] md:mx-auto px-4 md:px-10 lg:px-20 mt-20 md:mt-40 bg-white row min-h-screen grid grid-cols-1 lg:grid-cols-5">
        <div className="col-span-full lg:col-span-3 h-[20rem] md:min-h-[35rem]">
            <Card
                pre_tittle="Para aquellas"
                title="Ocasiones Especiales"
                description="Encuentra el detalle perfecto para cada momento inolvidable."
                buttonText="Descubrir"
                imageUrl="images/ProductSection1.webp"
            />
        </div>
        <div className="col-span-full lg:col-span-2 h-[20rem] md:min-h-[35rem]">
            <Card
                pre_tittle="El arte se encuentra en las"
                title="Galería de Arreglos"
                description="Diseños únicos y exclusivos que hablan por ti."
                buttonText="Ver Galería"
                imageUrl="images/ProductSection3.webp"
            />
        </div>
        <div className="col-span-full lg:col-span-2 h-[20rem] md:min-h-[35rem]">
            <Card
                pre_tittle="El regalo perfecto comienza con nuestras"
                title="Flores Frescas"
                description="Elige entre una amplia variedad de flores frescas y exóticas."
                buttonText="Explorar"
                imageUrl="images/ProductSection2.webp"
            />
        </div>
        <div className="col-span-full lg:col-span-3 h-[20rem] md:min-h-[35rem]">
            <Card
                pre_tittle="El toque final con"
                title="Ramos y Cajas"
                description="Crea momentos memorables con nuestros ramos y cajas elegantes."
                buttonText="Personalizar"
                imageUrl="images/ProductSection4.webp"
            />
        </div>
    </section>
    );
}

export default ProductosSection;