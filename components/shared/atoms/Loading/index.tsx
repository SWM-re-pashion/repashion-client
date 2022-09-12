import Lottie from 'lottie-react';
import loading from 'public/assets/loading.json';

import $ from './style.module.scss';

function Loading() {
  return <Lottie animationData={loading} className={$.loading} />;
}

export default Loading;
