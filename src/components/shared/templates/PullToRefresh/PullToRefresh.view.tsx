export type Props = {
  pullDownRef: React.RefObject<HTMLDivElement>;
  childrenRef: React.RefObject<HTMLDivElement>;
  children: JSX.Element;
  refreshingContent: JSX.Element | string | null;
};

function PullToRefreshView(viewProps: Props) {
  const { pullDownRef, childrenRef, children } = viewProps;
  const { refreshingContent } = viewProps;
  return (
    <>
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
          transition: 'transform 0.2s cubic-bezier(0, 0, 0.31, 1)',
        }}
      >
        {children}
      </div>
    </>
  );
}

export default PullToRefreshView;
