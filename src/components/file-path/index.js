import React from 'react';

import Highlight from '../highlight';

import './index.css';

const FilePath = ({ children }) => <Highlight className="file-path">{children}</Highlight>;

export default FilePath;
