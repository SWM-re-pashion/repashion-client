import { memo } from 'react';

import Button from '@atoms/Button';
import Span from '@atoms/Span';
import { Modal } from '@templates/Modal';
import classnames from 'classnames';

import $ from './style.module.scss';

type Props = {
  id: string;
  label: string;
  isOpen: boolean;
  isVerticalBtn?: boolean;
  title?: string;
  content?: string;
  clickText: string;
  cancelText: string;
  onCancel: () => void;
  onClick: () => void;
};

function DialogModal(dialogProps: Props) {
  const { id, label, isOpen, isVerticalBtn, onCancel, onClick } = dialogProps;
  const { title, content, clickText, cancelText } = dialogProps;

  return (
    <Modal id={`${id}-dialog-modal`} {...{ isOpen }}>
      <div
        className={$['dialog-modal']}
        aria-describedby={`${label} 다이얼로그`}
      >
        {title && <h2 className={$.title}>{title}</h2>}
        {content && <Span className={$.content}>{content}</Span>}

        <div
          className={classnames($['btn-box'], {
            [$['vertical-box']]: isVerticalBtn,
          })}
        >
          <Button
            className={classnames($.btn, $['cancel-btn'])}
            onClick={onCancel}
            label="취소 버튼"
          >
            {cancelText}
          </Button>
          <Button
            className={classnames($.btn, $['click-btn'])}
            onClick={onClick}
            label="확인 버튼"
          >
            {clickText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default memo(DialogModal);
