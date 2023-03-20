import { StyleProps } from '#types/props';
import classnames from 'classnames';
import Lottie from 'lottie-react/build/index';
import loading from 'public/assets/loading.json';

import $ from './style.module.scss';

function Loading({ className, style }: StyleProps) {
  return (
    <Lottie
      animationData={loading}
      className={classnames($.loading, className)}
      {...{ style }}
    />
  );
}

export default Loading;
