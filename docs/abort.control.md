# Abort Control

> **TLDR** 지연이나 컴포넌트 unmount로 인한 request 요청을 취소해야할 때에 대하여 정의합니다.

## RaceWith TimeOut

race with timeout은 요청에 대한 지연을 위해 사용합니다. 특정 시간이 오래 걸리는 요청이 발생하였을 때 프론트엔드에서 우리는 어떤 조치를 취해야할까요?

이것은 우리의 비즈니스가 정해야하는 것입니다. 해당 프로젝트에서는 아래와 같은 상황에 세가지의 방안을 제시합니다.

<hr>

**(1) 지연으로 인한 대기열/로딩화면을 보여주어야할 때**

요청이 성공할 때 까지 로딩화면을 보여주거 서버의 `sent event`를 통해 실시간으로 남아있는 큐의 개수를 통해 대기열의 감소를 보여주어야합니다.

<hr>

**(2) 특정 시간이 지나면 다른 callback request를 요청해야할 때**

본 프로젝트에서는 `raceWithTimeout` 함수를 제공합니다.

만약 요청이 실패하였다면 해당 함수를 통해 기존 요청을 abort control하고 다른 callback으로 요청을 재시도 할 수 있습니다.

단, 단순한 reject가 아닌 요청 자체의 취소를 위해 반드시 `Abort Control instance`와 함께 사용해야합니다.

```typescript
export const raceWithTimeout = <T>(
  promise: Promise<T> | T,
  timeoutMs: number,
  onTimeout?: () => void
) => {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      onTimeout?.();
      reject();
    }, timeoutMs);
  });
  return Promise.race<T>([timeout, promise]);
};
```

<hr>

**(3) 일시적 서버의 부하로 요청을 취소하고 retry해야할 때**

`Exponential Backoff`를 통해 시스템 로드와 실패 가능성을 줄이기 위해 각 재시도 후 대기 시간을 두 배로 늘려야합니다

이를 위해 "axios-retry"의 exponentialDelay를 사용하거나 react query 환경에서는 retryDelay option을 사용합니다

ex) 1초 - 실패 - 2초 - 실패 - 4초 - 실패 - 8초 - 성공

```typescript
// axios-retry
axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });

// react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
```

## React query AbortSignal

만약 사용자가 다른 페이지 혹은 컴포넌트로 이동하여 해당 컴포넌트가 언마운트 되었다면 언마운트 된 컴포넌트의 요청의 응답은 더이상 필요로 하지 않기 때문에 기존 request를 cancel 할 수 있습니다.

그러나 해당 프로젝트에서는 react-query를 data management 도구로 사용합니다. 이에 따라 리엑트 쿼리에서는 컴포넌트의 언마운트에 따른 요청 취소를 권하지 않습니다.

데이터가 전달된다고 하더라도 react-query에서는 `queryMap`을 활용하여 해당 데이터를 `캐싱 및 관리`하고 있기 때문입니다.

<br>

따라서 만약 queryFn의 axios에서 abort Control을 한다고 하더라도 실제 query 요청은 취소되지 않습니다. 그러나, 요청의 시간이 충분히 지연될 수 있는 상황이라면 `리소스 감소`를 위해 우리는 이러한 상황에서도 abort control 해야할 수 있으며 react query에서는 이를 위해 queryFn의 인자로 `signal`을 전달합니다.

```javascript
export const useFetchPostList = () => {
  const postApi = PostApi();

  return useSuspenseQuery({
    queryKey: ["query-key"],
    queryFn: ({ signal }) => fetch("", { signal }),
  });
};
```

해당 signal을 전달하면 사용자가 페이지를 벗어나 컴포넌트가 unmount 된다면 요청을 취소하고 query hash도 지니지 않습니다.
