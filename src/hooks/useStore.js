import { useContext } from 'react';
import OrbitContext from '../contexts/orbit';

export default function useStore() {
  return useContext(OrbitContext);
}
