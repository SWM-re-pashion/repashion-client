import type { StyleProps } from 'types/props';

type Props = {
  onClick?: () => void;
} & StyleProps;

function Arrow({ className, style, onClick }: Props) {
  return (
    <svg
      {...{ className, style, onClick }}
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 1L2 7L8 13" stroke="white" strokeWidth="2" />
      <line x1="3" y1="7" x2="18" y2="7" stroke="white" strokeWidth="2" />
    </svg>
  );
}
export { Arrow };
