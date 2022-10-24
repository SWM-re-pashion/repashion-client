import { toast, ToastBar, Toaster } from 'react-hot-toast';

import { Close } from '@atoms/icon';

import $ from './style.module.scss';

function Toast() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      containerClassName={$['toast-msg']}
      containerStyle={{
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <>
              {icon}
              {message}
              {t.type !== 'loading' && (
                <button
                  type="button"
                  aria-label="toast message close button"
                  onClick={() => toast.dismiss(t.id)}
                  className={$['toast-msg-button']}
                >
                  <Close stroke="#fff" size={10} />
                </button>
              )}
            </>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

export default Toast;
