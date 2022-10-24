import type { IconProps } from '#types/props';

type Props = {
  strokeWidth?: number;
  opacity?: number;
} & IconProps;

function Search(iconProps: Props) {
  const { strokeWidth, className, style, fill, size, opacity } = iconProps;
  return (
    <svg
      {...{ className, style }}
      width={size || '22'}
      height={size || '22'}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity={opacity || '0.5'}
        x="15"
        y="17.8286"
        width={strokeWidth || '4'}
        height="5"
        transform="rotate(-45 15 17.8286)"
        fill={fill || '#936DFF'}
      />
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke={fill || '#936DFF'}
        strokeWidth={strokeWidth || '4'}
      />
    </svg>
  );
}
export { Search };
