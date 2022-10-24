import $ from './style.module.scss';

interface Props {
  width: number;
  borderWidth: number;
  color: string;
}

export default function LoadingSpinner({ width, borderWidth, color }: Props) {
  return (
    <div className={$.loading}>
      <div
        style={{
          width: `${width}px`,
          height: `${width}px`,
          borderWidth: `${borderWidth}px`,
          borderTopColor: color,
          borderBottomColor: color,
          borderRightColor: color,
        }}
        className={$.spinner}
      />
    </div>
  );
}
