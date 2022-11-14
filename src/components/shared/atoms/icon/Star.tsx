import type { StyleProps } from '#types/props';

function Star({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="163"
      height="150"
      viewBox="0 0 163 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M101.785 0.0973084L114.726 25.7678L144.241 26.7707L139.117 54.4174L162.831 71.8011L141.6 90.864L150.455 117.988L121.227 121.186L111.841 147.691L85.7783 133.802L61.7362 149.563L48.7955 123.892L19.2805 122.889L24.4042 95.2426L0.690197 77.8589L21.9212 58.796L13.0661 31.6716L42.2948 28.4739L51.681 1.9693L77.7431 15.8582L101.785 0.0973084Z"
        fill="#B3FF85"
      />
    </svg>
  );
}
export { Star };
