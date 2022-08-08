import { forwardRef, LegacyRef } from 'react';

import type { StyleProps } from 'types/props';

const RangeBtn = forwardRef(
  ({ className, style }: StyleProps, ref: LegacyRef<SVGSVGElement> | null) => {
    return (
      <svg
        {...{ className, style }}
        ref={ref}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="20" height="20" rx="3" fill="#936DFF" />
        <rect
          x="5"
          y="6"
          width="1.66667"
          height="8"
          rx="0.833333"
          fill="white"
        />
        <rect
          x="13.3333"
          y="6"
          width="1.66667"
          height="8"
          rx="0.833333"
          fill="white"
        />
        <rect
          x="9.16666"
          y="6"
          width="1.66667"
          height="8"
          rx="0.833333"
          fill="white"
        />
      </svg>
    );
  },
);

RangeBtn.displayName = 'RangeButton';
export { RangeBtn };
