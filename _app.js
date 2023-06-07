import React, { useEffect } from 'react';

const LoginSession = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    useEffect(() => {
      console.log('See if user is logged here');
    }, []);

    return <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
};

export default LoginSession;