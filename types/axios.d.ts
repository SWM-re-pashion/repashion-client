import { ACCESSTOKEN } from '@constants/api';
import 'axios';

declare module 'axios' {
  export interface HeadersDefaults {
    Cookie?: string;
    [ACCESSTOKEN]?: string;
  }
}
