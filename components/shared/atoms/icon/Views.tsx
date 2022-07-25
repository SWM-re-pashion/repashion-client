import type { StyleProps } from 'types/props';

function Views({ className, style }: StyleProps) {
  return (
    <svg
      {...{ className, style }}
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="8.83301"
        y="1.5"
        width="5.66632"
        height="8"
        rx="2.83316"
        stroke="#936DFF"
      />
      <path
        d="M11.8341 7.57647C11.8341 8.27419 11.2942 8.80724 10.6676 8.80724C10.0409 8.80724 9.50098 8.27419 9.50098 7.57647C9.50098 6.87876 10.0409 6.3457 10.6676 6.3457C11.2942 6.3457 11.8341 6.87876 11.8341 7.57647Z"
        fill="#936DFF"
        stroke="#936DFF"
      />
      <rect
        x="1.5"
        y="1.5"
        width="5.66632"
        height="8"
        rx="2.83316"
        stroke="#936DFF"
      />
      <path
        d="M4.50113 7.57647C4.50113 8.27419 3.96119 8.80724 3.33455 8.80724C2.70791 8.80724 2.16797 8.27419 2.16797 7.57647C2.16797 6.87876 2.70791 6.3457 3.33455 6.3457C3.96119 6.3457 4.50113 6.87876 4.50113 7.57647Z"
        fill="#936DFF"
        stroke="#936DFF"
      />
      <path
        d="M1 1C1.11111 1.46154 1.53331 2.38462 2.33326 2.38462"
        stroke="#936DFF"
      />
      <path
        d="M8.33203 1C8.44314 1.46154 8.86534 2.38462 9.6653 2.38462"
        stroke="#936DFF"
      />
    </svg>
  );
}
export { Views };
