import { memo } from 'react';

import Button from '@atoms/Button';
import Span from '@atoms/Span';
import { URL_REGEX } from '@constants/regExp';
import { Modal } from '@templates/Modal';
import classnames from 'classnames';
import { isSameRegExpCondition } from 'src/utils/regExp';

import $ from './style.module.scss';

type Props = {
  id: string;
  label: string;
  isOpen: boolean;
  isVerticalBtn?: boolean;
  title?: string;
  content?: string;
  emphasisContent?: string;
  clickText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onClick?: () => void;
};

function DialogModal(dialogProps: Props) {
  const { id, label, isOpen, isVerticalBtn, onCancel, onClick } = dialogProps;
  const { title, content, clickText, cancelText, emphasisContent } =
    dialogProps;
  const isUrl = isSameRegExpCondition(URL_REGEX, emphasisContent || '');

  return (
    <Modal id={`${id}-dialog-modal`} {...{ isOpen }}>
      <div
        className={$['dialog-modal']}
        aria-describedby={`${label} 다이얼로그`}
      >
        {title && <h2 className={$.title}>{title}</h2>}
        {content && <Span className={$.content}>{content}</Span>}

        {emphasisContent &&
          (isUrl ? (
            <a
              target="_blank"
              href={emphasisContent}
              rel="noreferrer"
              className={$.title}
            >
              {emphasisContent}
            </a>
          ) : (
            <h3 className={$.title}>{emphasisContent}</h3>
          ))}

        <div
          className={classnames($['btn-box'], {
            [$['vertical-box']]: isVerticalBtn,
          })}
        >
          {onCancel && cancelText && (
            <Button
              className={classnames($.btn, $['cancel-btn'])}
              onClick={onCancel}
              label="취소 버튼"
            >
              {cancelText}
            </Button>
          )}
          {onClick && clickText && (
            <Button
              className={classnames($.btn, $['click-btn'])}
              onClick={onClick}
              label="확인 버튼"
            >
              {clickText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default memo(DialogModal);
