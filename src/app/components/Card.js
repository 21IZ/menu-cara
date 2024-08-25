const Card = ({ imagen, nombre, precio, descripcion, id }) => {
  const { setSelectedItem } = useMenuContext();
  const [imgSrc, setImgSrc] = useState(imagen);
  const [retryCount, setRetryCount] = useState(0);

  const handleClick = () => {
    setSelectedItem({ imagen, nombre, precio, descripcion, id });
  };

  const handleImageError = () => {
    if (retryCount < 3) {
      // Retry loading the image
      setRetryCount(prevCount => prevCount + 1);
      setImgSrc(`${imagen}?retry=${retryCount + 1}`);
    } else {
      // After 3 retries, use a placeholder
      setImgSrc("/placeholder.jpg");
    }
  };

  // Check if the item is valid before rendering
  if (!nombre || !precio) {
    return null; // Don't render invalid items
  }

  return (
    <Link href={`/menuDetail/${encodeURIComponent(id)}`} onClick={handleClick} className="card-link">
      <div className="card">
        <Image 
          src={imgSrc} 
          alt={nombre} 
          width={200}
          height={130}
          className="card-image"
          onError={handleImageError}
        />
        <div className="card-content">
          <h2 className="card-title">{nombre}</h2>
          <p className="card-price">${precio}</p>
        </div>
      </div>
    </Link>
  );
};