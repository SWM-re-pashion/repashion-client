/* eslint-disable react/display-name */
import { forwardRef, LegacyRef } from 'react';

import type { StyleProps } from 'types/props';

const RangeBtn = forwardRef(
  ({ className, style }: StyleProps, ref: LegacyRef<SVGSVGElement> | null) => {
    return (
      <svg
        {...{ className, style }}
        ref={ref}
        width="30"
        height="20"
        viewBox="0 0 30 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="30" height="20" rx="3" fill="#936DFF" />
        <rect x="9" y="6" width="2" height="8" rx="1" fill="white" />
        <rect x="19" y="6" width="2" height="8" rx="1" fill="white" />
        <rect x="14" y="6" width="2" height="8" rx="1" fill="white" />
      </svg>
    );
  },
);

export { RangeBtn };
