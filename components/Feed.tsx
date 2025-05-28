'use client';

import useSWRInfinite from 'swr/infinite';
import Card from './Card';
import Loader from './Loader';
import { useRef, useEffect, Fragment } from 'react';

const PAGE_SIZE = 10;

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Feed() {
  const {
    data,
    error,
    size,
    setSize,
    isValidating
  } = useSWRInfinite(
    index => `/api/news?page=${index}&size=${PAGE_SIZE}`,
    fetcher,
    { revalidateFirstPage: false }
  );

  const items = data ? data.flat() : [];
  const end = data && data[data.length - 1]?.length < PAGE_SIZE;

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current || end) return;
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setSize(size + 1);
      }
    });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [sentinelRef.current, size, end]);

  if (error) return <p className="text-red-500">Failed to load</p>;

  return (
    <Fragment>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item: any, idx: number) => (
          <Card key={idx} item={item} />
        ))}
      </section>
      {isValidating && <Loader />}
      {!end && <div ref={sentinelRef} className="h-1" />}
      {end && <p className="text-center py-10 opacity-60">That&apos;s all!</p>}
    </Fragment>
  );
}