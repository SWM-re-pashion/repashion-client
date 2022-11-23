import $ from './style.module.scss';

function ProductDetailSkeleton() {
  return (
    <>
      <div className={$['skeleton-img-slide']} />
      <div className={$['skeleton-profile']} />
      <section className={$.skeleton}>
        <div className={$['skeleton-basic']} />
        <div className={$['skeleton-notice']} />
        <div className={$['skeleton-measure']} />
        <div className={$['skeleton-comment']} />
      </section>
    </>
  );
}

export default ProductDetailSkeleton;
