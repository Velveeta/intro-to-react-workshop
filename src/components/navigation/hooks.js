import { useContext, useEffect } from 'react';

import { Context } from './context';

const useRegisterNavLink = (url, title) => {
  const { addNavLink, removeNavLink } = useContext(Context);

  useEffect(() => {
    addNavLink(url, title);

    return () => {
      removeNavLink(url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export {
  useRegisterNavLink,
};
