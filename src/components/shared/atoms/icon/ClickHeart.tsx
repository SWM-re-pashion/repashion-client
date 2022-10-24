import type { StyleProps } from '#types/props';

function ClickHeart({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 20L9.55 18.6332C4.4 13.7978 1 10.6087 1 6.69482C1 3.50572 3.42 1 6.5 1C8.72764 1 10 2.5 11 4.16403C12 2.5 13 1 15.5 1C18.58 1 21 3.50572 21 6.69482C21 10.6087 17.6 13.7978 12.45 18.6436L11 20Z"
        fill="#FF9635"
        fillOpacity="0.5"
        stroke="#FF9635"
        strokeWidth="2"
      />
    </svg>
  );
}
export { ClickHeart };
