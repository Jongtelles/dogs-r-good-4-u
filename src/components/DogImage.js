function DogImage({ src, txt }) {
  return (
    <>
      <div className='dog-img-container'>
        <img className='dog-img' src={src} alt='random dog img' />
      </div>
      <h2>{txt}</h2>
    </>
  );
}

export default DogImage;
