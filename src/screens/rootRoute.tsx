import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {Outlet, RootRoute} from '@tanstack/react-router';

function Root() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
      </Helmet>

      <Outlet />
    </>
  );
}

export const rootRoute = new RootRoute({
  component: Root,
});
