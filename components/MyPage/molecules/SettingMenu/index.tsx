import Span from '@atoms/Span';

import $ from './style.module.scss';

type Props = {
  text: string;
  onClick?: () => void | Promise<boolean>;
  icon?: React.ReactNode | string;
};

function SettingMenu({ text, onClick, icon }: Props) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      aria-label={`${text} 버튼`}
      className={$['setting-menu']}
    >
      <Span className={$['setting-menu-text']}>{text}</Span>
      {icon}
    </div>
  );
}

export default SettingMenu;
