import React, { useMemo, useState } from 'react';

const Context = React.createContext();
const { Provider } = Context;

const LinksProvider = ({ children }) => {
  const [navLinks, setNavLinks] = useState({
    'https://github.com/Velveeta/intro-to-react-workshop': 'GitHub',
  });

  const value = useMemo(() => ({
    addNavLink: (url, title) => {
      setNavLinks(currentNavLinks => ({
        ...currentNavLinks,
        [url]: title,
      }));
    },

    navLinks,

    removeNavLink: removedUrl => {
      setNavLinks(currentNavLinks => Object
        .keys(currentNavLinks)
        .filter(url => url !== removedUrl)
        .reduce((acc, url) => {
          acc[url] = currentNavLinks[url];
          return acc;
        }, {})
      );
    },
  }), [navLinks, setNavLinks]);

  return (
    <Provider value={value}>
      {children}
    </Provider>
  );
};

export {
  Context,
  LinksProvider as Provider,
};
