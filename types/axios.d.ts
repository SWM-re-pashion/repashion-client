import { ACCESSTOKEN } from '@constants/api';
import 'axios';

declare module 'axios' {
  export interface HeadersDefaults {
    [ACCESSTOKEN]?: string;
  }
}
