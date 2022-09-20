import $ from './style.module.scss';

type Props = {
  paddingTop?: string;
  paddingBottom?: string;
  children: React.ReactNode;
};

function ProductListWrapperView(wrapperProps: Props) {
  const { paddingTop, paddingBottom, children } = wrapperProps;
  return (
    <section
      style={{ paddingTop, paddingBottom }}
      className={$['product-container']}
    >
      {children}
    </section>
  );
}

export default ProductListWrapperView;
