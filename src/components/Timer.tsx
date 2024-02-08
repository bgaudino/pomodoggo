import formatTime from '../utils/formatTime';

export default function Timer({seconds}: {seconds: number}) {
  return <h1 className="timer">{formatTime(seconds)}</h1>;
}
