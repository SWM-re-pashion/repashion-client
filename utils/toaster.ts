import toast from 'react-hot-toast';

import { StyleProps } from '#types/props';

type Props = {
  message: string;
} & StyleProps;

export const toastSuccess = ({ message, style }: Props) => {
  toast.success(message, {
    id: message,
    duration: 2000,
    icon: null,
    style: { background: '#000000b3', color: '#fff', ...style },
  });
};

export const toastError = ({ message, style }: Props) => {
  toast.error(message, {
    id: message,
    duration: 2000,
    icon: null,
    style: { background: '#000000b3', color: '#fff', ...style },
  });
};
