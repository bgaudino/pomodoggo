function parseBreed(dog: string) {
  if (!dog) {
    return '';
  }
  return dog.split('/')[4].split('-').reverse().join(' ');
}

export default function Dog({dog}: {dog: string}) {
  const breed = parseBreed(dog) || 'loading';
  return (
    <div>
      <figure className="figure">
        {dog ? (
          <img src={dog} className="figure-img rounded" alt={breed} />
        ) : (
          <div className="figure-img rounded placeholder" />
        )}
        <figcaption className="figure-caption">{breed}</figcaption>
      </figure>
    </div>
  );
}
