import $ from './style.module.scss';

type Props = {
  paddingTop: string | undefined;
  children: React.ReactNode;
};

function ProductListWrapperView({ paddingTop, children }: Props) {
  return (
    <section
      style={{ paddingTop: paddingTop || '185px' }}
      className={$['product-container']}
    >
      {children}
    </section>
  );
}

export default ProductListWrapperView;
