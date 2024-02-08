interface SliderProps {
  label: string;
  value: number;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function Slider({label, value, onChange}: SliderProps) {
  return (
    <div className="col-md-6">
      <label htmlFor={label} className="form-label">
        {label}<br/><strong>{value}</strong>
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
