
import { createContext } from 'react';
import { ApiClient } from './api-client';

export const ApiContext = createContext(
  new ApiClient('https://localhost:7283')
);
