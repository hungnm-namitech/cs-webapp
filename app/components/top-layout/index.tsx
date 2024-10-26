'use client';
import { useParams } from 'next/navigation';
import useSWRImmutable from 'swr/immutable';
import * as App from '../../api/entities/app';
import algoliasearch from 'algoliasearch';
import { Configure, InstantSearch } from 'react-instantsearch';
import { history } from 'instantsearch.js/es/lib/routers';
import { simple } from 'instantsearch.js/es/lib/stateMappings';
import Loading from '../loading';

export default function TopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const applicationId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
  const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;
  const searchClient = algoliasearch(applicationId || '', apiKey || '');

  const routing = {
    router: history({
      createURL({ location, routeState }) {
        const { origin, pathname, hash } = location;
        const url = new URL(origin);
        const params = url.searchParams;
        const indexState = routeState[indexName || ''] || {};
        const encoding = encodeURIComponent(indexState.query || '');
        if (indexState.query) {
          params.set('q', encoding);
        } else {
          params.delete('q', encoding);
          return `${origin}${pathname}${hash}`;
        }
        return `${origin}${pathname}?${params.toString()}`;
      },
    }),
    stateMapping: simple(),
  };
  const { slug } = useParams();

  const { data: app, isLoading } = useSWRImmutable('application', () => {
    if (typeof slug === 'string') {
      return App.getAppDetail(slug);
    }
  });
  if (isLoading) return <Loading />;
  return (
    <>
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        routing={routing}
      >
        {children}
        {app?.data[0] && (
          <Configure filters={`application_id = ${app.data[0].id}`} />
        )}
      </InstantSearch>
    </>
  );
}
