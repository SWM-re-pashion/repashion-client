import type { StyleProps } from '#types/props';

function Kakao({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="23.96px"
      height="23.96px"
    >
      <path
        fill="#000000"
        d="M24,4C12.402,4,3,11.611,3,21c0,5.99,3.836,11.245,9.618,14.273l-2.219,7.397c-0.135,0.449,0.366,0.82,0.756,0.56l8.422-5.615C21.004,37.863,22.482,38,24,38c11.598,0,21-7.611,21-17S35.598,4,24,4z"
      />
    </svg>
  );
}
export { Kakao };
