function DogImage({ src, tricking, trick }) {
  return (
    <>
      <div className='dog-img-container'>
        {src ? (
          <img
            className={`dog-img ${tricking ? trick : ""}`}
            src={src}
            alt='A random dog, usually a very cute & good one'
          />
        ) : (
          "🐕Fetching...🐕"
        )}
      </div>
    </>
  );
}

export default DogImage;
