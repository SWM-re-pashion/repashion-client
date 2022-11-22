import React, { memo } from 'react';

import Button from '@atoms/Button';
import Span from '@atoms/Span';
import { MAILTO, SMS } from '@constants/link';
import { EMAIL_REGEX, PHONE_REGEX, URL_REGEX } from '@constants/regExp';
import { Modal } from '@templates/Modal';
import classnames from 'classnames';
import { isSameMultipleRegExp } from 'src/utils/regExp';

import $ from './style.module.scss';

type Props = {
  id: string;
  label: string;
  isOpen: boolean;
  isVerticalBtn?: boolean;
  title?: string;
  content?: string | JSX.Element;
  emphasisContent?: string;
  emphasisIcon?: JSX.Element;
  clickText?: string;
  cancelText?: string;
  onCancel?: () => void;
  onClick?: () => void;
};

function DialogModal(dialogProps: Props) {
  const { id, label, isOpen, isVerticalBtn, onCancel, onClick } = dialogProps;
  const { title, content, clickText, cancelText } = dialogProps;
  const { emphasisContent, emphasisIcon } = dialogProps;
  const [isUrl, isPhone, isEmail] = isSameMultipleRegExp(
    [URL_REGEX, PHONE_REGEX, EMAIL_REGEX],
    emphasisContent || '',
  );
  const isContactType = isUrl || isPhone || isEmail;
  const smsStr = isPhone ? SMS : '';
  const mailStr = isEmail ? MAILTO : '';
  const strContent = (smsStr || mailStr) + emphasisContent;

  return (
    <Modal id={`${id}-dialog-modal`} {...{ isOpen }}>
      <div
        className={$['dialog-modal']}
        aria-describedby={`${label} 다이얼로그`}
      >
        {title && <h2 className={$.title}>{title}</h2>}
        {content && <Span className={$.content}>{content}</Span>}

        <div className={$.emphasis}>
          {emphasisContent &&
            (isContactType ? (
              <a
                target="_blank"
                href={strContent}
                rel="noreferrer"
                className={$['emphasis-content']}
              >
                {emphasisContent}
              </a>
            ) : (
              <h3 className={$['emphasis-content']}>{emphasisContent}</h3>
            ))}
          {emphasisContent && emphasisIcon && emphasisIcon}
        </div>

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
