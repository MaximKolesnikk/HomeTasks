import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthentication } from '../store/slices/userSlice';

const Initializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      dispatch(setAuthentication(!!token)); 
    }
  }, [dispatch]);

  return null; 
};

export default Initializer;