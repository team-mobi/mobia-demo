# Error handling

> **TLDR**: 본 프로젝트에서 어떻게 에러를 핸들링하고 있는지 정의합니다.

## Layer

해당 프로젝트의 에러 플로우는 아래와 같이 총 3단계로 핸들링합니다.

### 1. throw Tagged Error

service에서 `exception`이 발생하면 [TaggedError](/src/shared//core/error/interface.ts)를 통해 정의한 에러를 `throw` 합니다.

```javascript
export class NetworkError extends Data.TaggedError("NetworkError") {}
export class BadRequest extends Data.TaggedError("BadRequest") {}

const ThrowTaggedError = () => {
  throw new BadRequest();
};
```

만약 api의 response error라고 한다면 handle response 혹은 try/catch를 통해 관련된 Tagged error를 throw 해주세요

```javascript
  "/shared/api/base.ts"
  async handleResponse<TResult>(response: Response): Promise<TResult> {
    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new BadRequest();
        case 500:
          throw new NetworkError();
      }
    }
    return await response.json();
  }
```

### 2. ErrorBoundary

상위 처리문으로 던져진 `exception`은 컴포넌트 레이어에서 처리가 불가능하면 [ErrorBoundary](/src/shared//core/error/error-boundary.tsx)에 도달합니다.

해당 영역에서는 exception을 ErrorFallback에서 `error_tag`에 따라 `분기`대로 처리 하거나 인터페이스를 보여주거나 분기에 해당하지 않는다면 다시 error를 throw하여 상위 처리문으로 exception을 전달합니다.

```javascript
function MustError(a: number) () => {
    throw new TaggedError('NetWorkError')
};

// error boundary
<ErrorBoundary fallback={ErrorFallback}>
  <MustError />
</ErrorBoundary>;

// error fallback function
const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  if (error?._tag === "NetworkError") {
    return <NetWorkError resetErrorBoundary={resetErrorBoundary} />;
  }
  if (error?._tag === "BadRequest") {
    return <BadRequestError />;
  }

  throw error;
};
```

### 3. RootRouteError

RootRouteError는 ErrorFallback에서 처리하지 못한 분기가 처리되는 에러이며, 이는 우리가 `예측하지 못한 에러`입니다. 경우에 따라 심각한 에러가 발생할 수 있는 에러 로깅 도구를 사용한다면 명확히 `격리`해야할 필요가 있습니다.

```javascript
export const router = createBrowserRouter([
  {
    errorElement: <RootRouteError />,
    children: [
      // ... router path
    ],
  },
]);
```
