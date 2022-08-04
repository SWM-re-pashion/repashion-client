import React, { forwardRef, LegacyRef } from 'react';

import $ from './style.module.scss';

type Props = {
  id: string;
  accept: string;
  onChange: (e: React.ChangeEvent) => void;
  none?: boolean;
};

const InputFile = forwardRef(
  (imgProps: Props, ref: LegacyRef<HTMLInputElement> | null) => {
    const { id, accept, onChange, none } = imgProps;
    return (
      <input
        {...{ id, ref, accept, onChange }}
        type="file"
        multiple
        className={none ? $.none : ''}
      />
    );
  },
);

InputFile.displayName = 'InputFile';
export default InputFile;
