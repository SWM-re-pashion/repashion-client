import $ from './style.module.scss';

type Props = {
  children: React.ReactNode;
  paddingTop?: string;
  paddingBottom?: string;
  height?: string;
};

function ProductListWrapperView(wrapperProps: Props) {
  const { paddingTop, paddingBottom, children, height } = wrapperProps;
  return (
    <section
      style={{ paddingTop, paddingBottom, height }}
      className={$['product-container']}
    >
      {children}
    </section>
  );
}

export default ProductListWrapperView;
