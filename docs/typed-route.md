# Typed Route

> **TLDR**: react의 react-router는 type safety한 route 이동이 불가능합니다. 이를 위해서 type safety한 navigate를 지원하는 hook을 생성합니다.

## Type Safety Route

만약 navigate를 해야하는 상황이라면 우리는 아래와 같은 코드로 화면을 라우트합니다.

```javascript
const navigate = useNavigate();
navigate("/post", routeOption);
```

하지만 이는 전혀 타입이 안정적이지 않기에 우리는 몇가지 옵션을 통해 typeSafety하게

### hooks function

```javascript
const { mainNavigate, postNavigate } = useNavigateHook();
postNavigate(routeOption);
```

### constants

```javascript
const navigate = useNavigate();
navigate(PATH.POST);
```

그러나 이러한 route는 path의 유용성은 보장하지만 parameter type을 보장하지 않아 DX에 좋지않은 영향을 끼칠 수 밖에 없습니다.

해당 프로젝트에서는 react-naive-route에서 paramsList type을 generic으로 전달하는 것에 영감을 받아 type-safety한 route에서 url을 관리하는 것이 가능합니다.

### useTypedNavigate

```javascript
export type ParamsList = {
  "/post-list": {
    params: { postId?: string };
  };
  "/post-list/:postId": {
    segments: { postId?: string };
  };
};

const navigate = useTypedNavigate<ParamsList>();

navigate("/post", { // type safety "/post"
    params: {
        postId: 3, //type safety "postId"
          // to "/post?postId=3"
    },
    options: {
        // ...routeOption
    }
})

navigate("/post/:postId", { // type safety
    segments: {
        postId: 3, //type safety "postId"
        // to "/post/3"
    },
    options: {
        // ...routeOption
    }
})

```

## useTypedSearchParams

```typescript
const [params, setSearchParams] = useTypedSearchParams<ParamsList>("/post");
// type safety
// "/:"가 포함되지 않은 route만 허용합니다.

console.log(params.postId); // type safety
setSearchParams({
  postId: 3, //type safety
});
```

## useTypedParams

```javascript
const parma = useTypedParams < ParamsList > "/post/:postId";

// type safety
// "/:"가 포함된 route만 허용합니다.

console.log(params.postId); // type safety
```
