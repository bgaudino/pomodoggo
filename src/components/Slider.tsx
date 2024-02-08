interface SliderProps {
  label: string;
  show: boolean;
  value: number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function Slider({label, show, value, onChange}: SliderProps) {
  return (
    <div className={`col-md-6 ${show ? 'd-block' : 'd-none d-md-block'}`}>
      <label htmlFor={label} className="form-label">
        {label}
        <br />
        <strong>{value}</strong>
      </label>
      <input
        id={label.toLowerCase().replace(' ', '_')}
        className="form-range"
        type="range"
        min={1}
        max={60}
        step={1}
        onChange={onChange}
        value={value}
      ></input>
    </div>
  );
}
