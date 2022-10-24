export type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
  pullDownRef: React.RefObject<HTMLDivElement>;
  childrenRef: React.RefObject<HTMLDivElement>;
  children: JSX.Element;
  refreshingContent: JSX.Element | string | null;
  backgroundColor?: string;
  className?: string;
};

function PullToRefreshView(viewProps: Props) {
  const { containerRef, pullDownRef, childrenRef, children } = viewProps;
  const { refreshingContent, backgroundColor, className } = viewProps;
  return (
    <div
      className={className}
      style={{
        backgroundColor,
        position: 'relative',
      }}
      ref={containerRef}
    >
      <div
        ref={pullDownRef}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {refreshingContent}
      </div>
      <div
        ref={childrenRef}
        style={{
          position: 'absolute',
          width: '100%',
          transition: 'transform 0.2s cubic-bezier(0, 0, 0.31, 1)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default PullToRefreshView;
