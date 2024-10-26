const Card = ({ pre_tittle, title, description, imageUrl }) => {
    return (
      <div className="h-full rounded-[2rem] text-white px-10 pt-10 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="min-h-44 flex gap-3 flex-col">
          <strong className="font-extrabold">{pre_tittle}</strong>
          <h2 className="text-5xl">{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  };
  
  export default Card;