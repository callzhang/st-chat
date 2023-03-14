type ResultType<O> =
  | {
    type: 'pending';
    value: Promise<O>;
  }
  | {
    type: 'loaded';
    value: O;
  }
  | {
    type: 'error';
    value: Error;
  };

type Fetcher<O> = {
  (input: string): Promise<O>;
  cache?: { [key: string]: ResultType<O> };
};

export function suspenseFetch<T>(fetcher: Fetcher<T>) {
  const cache = fetcher.cache ?? {};
  fetcher.cache = cache;
  const read = (input: string): T => {
    const ref = cache[input];
    if (ref == null) {
      const fetching = fetcher(input);
      cache[input] = {
        type: 'pending',
        value: fetching,
      };
      fetching
        .then((value) => {
          cache[input] = {
            type: 'loaded',
            value,
          };
        })
        .catch((e) => {
          cache[input] = {
            type: 'error',
            value: e,
          };
        });
      throw fetching;
    }
    if (ref.type !== 'loaded') {
      throw ref.value;
    }
    return ref.value;
  };
  return {
    read,
    prefetch: async (i: string) => {
      try {
        read(i);
      } catch (e) {
        await e;
      }
    },
  };
}

export const imageFetcher = suspenseFetch(async (url: string) => {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
      });
    };
    img.onerror = () => {
      resolve({
        width: 0,
        height: 0,
      });
    };
  });
});
