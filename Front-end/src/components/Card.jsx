const Card = ({ imageUrl }) => {
  return (
      <div className="h-full rounded-[2rem] text-white overflow-hidden relative">
          <img 
              src={imageUrl} 
              alt="Descripción de la imagen" 
              className="h-full w-full object-fill rounded-[2rem] bg-cover bg-center" 
          />
          
      </div>
  );
};

export default Card;