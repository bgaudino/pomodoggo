export default function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(n: number): string {
  return n >= 10 ? n.toString() : `0${n}`;
}