import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface Props {
  children: React.ReactNode;
}

const AuthChecker = ({ children }: Props) => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const auth_state = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
    return () => auth_state();
  }, [auth, navigate]);

  return <>{children}</>;
};

export default AuthChecker;