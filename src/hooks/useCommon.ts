import { useContext } from 'react';
import { CommonContext } from '../store/CommonProvider';

export const useCommon = () => {
  return useContext(CommonContext)
}
