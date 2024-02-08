import '../App.css';

function getText(isActive: boolean, isWorking: boolean) {
  if (isActive) {
    return isWorking ? 'Get to work!' : 'Time for a break!';
  }
  return 'Ready when you are!';
}

interface SpeechBubbleProps {
  isActive: boolean;
  isWorking: boolean;
}
export default function SpeechBubble({isActive, isWorking}: SpeechBubbleProps) {
  const text = getText(isActive, isWorking);
  return (
    <div id="speech">
      <div className="bubble shadow">
        <span id="dog-speech">{text}</span>
      </div>
      <div className="pointer" />
    </div>
  );
}
