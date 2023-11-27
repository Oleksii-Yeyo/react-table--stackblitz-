import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';
import data from './data/data';

import Table from './Table';

const root = createRoot(document.getElementById('app'));

// enable filtering: put 'isFiltering' as a prop
// enable pagination: put 'isPagination' as a prop
root.render(<Table data={data} isFiltering isPagination />);
