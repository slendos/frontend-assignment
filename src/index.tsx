import {StrictMode} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';
import {RouterProvider} from '@tanstack/react-router';
import {createRoot} from 'react-dom/client';

import WebVitals from './WebVitals';
import GlobalStyles from './GlobalStyles';
import {store} from './store';
import theme from './theme';
import {router} from './screens';
import './i18n/i18n';

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

const root = createRoot(MOUNT_NODE);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme} resetCSS>
        <HelmetProvider>
          <RouterProvider router={router} />
          <GlobalStyles />
          <WebVitals showStatusInConsoleLog />
        </HelmetProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
