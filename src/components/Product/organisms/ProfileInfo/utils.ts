import copyClipBoard from '../ProductFooter/utils';

export function getCurrentUrl() {
  if (typeof window !== 'undefined')
    return `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  return '';
}

export function sharePage(props: { title: string; url: string }): () => void {
  return async () => {
    try {
      navigator.share({
        title: props.title,
        url: props.url,
      });
    } catch (err) {
      copyClipBoard()(props.url);
    }
  };
}
