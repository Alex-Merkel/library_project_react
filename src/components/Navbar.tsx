import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, Providers } from '../config/firebase';

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  const dropDown = () => {
    setIsVisible(!isVisible)
  };

  const clicked = () => {
    setIsVisible(false);
  };

  const signOutOnClick = () => {
    signOut(auth)
      .then(() => {
        setIsVisible(false);
        navigate('/')
      })
  };

  const signInOnClick = async () => {
    const response = await signInWithPopup(auth, Providers.google);
    if (response.user) {
        setIsVisible(false)
        navigate('/dashboard')
    }
  };


  return (
    <nav className='flex items-center justify-between flex-wrap bg-sky-500 p-6'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <Link to='/' className='font-semibold text-xl tracking-tight'>
          Library
        </Link>
      </div>
      <div className='block'>
        <button
          onClick={dropDown}
          className='flex items-center px-3 py-2 text-sky-200 border rounded
             border-sky-400 hover:text-white hover:border-white'
        >
          <i className='fas fa-bars'></i>
        </button>
      </div>
      {isVisible ? (
        <div className='w-full block flex-grow items-center'>
          <div className='text-sm lg:flex-grow'>
            <button className='p-3 m-5 bg-sky-400'>
              <div>
                <Link to='/'onClick={clicked}
                className='flex place-items-center mt-4 lg:inline-block lg:mt-0 
                    text-sky-200 hover:text-white mr-4'
                >
                  Home
                </Link>
              </div>
            </button>
            <button className='p-3 m-5 bg-sky-400'>
              <div>
                <Link
                    to='/dashboard'
                    onClick={() => {
                        if (auth.currentUser) {
                            clicked();
                        } else {
                            signInOnClick()
                        }
                    }}
                  className='flex place-items-center mt-4 lg:inline-block
                    lg:mt-0 text-sky-200 hover:text-white mr-4'
                >
                  Dashboard
                </Link>
              </div>
            </button>
            {!auth.currentUser ? (
              <button className='p-3 m-5 bg-sky-400'>
                <div>
                  <Link to='/' onClick={() => {signInOnClick()}}
                    className='flex place-items-center mt-4 lg:inline-block
                        lg:mt-0 text-sky-200 hover:text-white'
                  >
                    Login
                  </Link>
                </div>
              </button>
            ) : (
              <button className='p-3 m-5 bg-sky-400'>
                <div>
                  <Link to='/' onClick={() => {signOutOnClick()}}
                    className='flex place-items-center mt-4 lg:inline-block 
                        lg:mt-0 text-sky-200 hover:text-white'
                  >
                    Logout
                  </Link>
                </div>
              </button>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
}

export default Navbar;
