export default async function fetchDog() {
  const res = await fetch('https://dog.ceo/api/breeds/image/random');
  const dog = await res.json(); 
  return dog.message;
}