import type { IconProps } from '#types/props';

function SearchBlack({ className, style, fill }: IconProps) {
  return (
    <svg
      {...{ className, style }}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5063 12.9482L12.9479 10.5066L15.9998 13.5587L13.5583 16.0003L10.5063 12.9482Z"
        fill={fill || 'black'}
        fillOpacity="0.87"
      />
      <path
        d="M12.6747 7.33765C12.6747 10.2856 10.285 12.6753 7.33733 12.6753C4.38969 12.6753 2 10.2856 2 7.33765C2 4.38966 4.38969 2 7.33733 2C10.285 2 12.6747 4.38966 12.6747 7.33765Z"
        stroke={fill || 'black'}
        strokeOpacity="0.87"
        strokeWidth="4"
      />
    </svg>
  );
}
export { SearchBlack };
