# Event Observe

> **TLDR**: 사이드 이펙트 때문에 한 곳에 가둘 수 있는 값을 중앙에서 관리해야한다면 추적이 어려워질 수 있습니다. 이러한 문제를 이벤트 옵저브를 통해 해결할 수 있습니다.

## Side Effect

예를들면 /popular-posts.tsx에 존재하는 상단의 인기 게시글을 누르면 해당 게시글이 있는 곳까지 스크롤이 밑으로 내려간다고 가정합니다. 단 이때 해당 게시글은 /posts-list.tsx에 존재합니다.

```
/popular-posts.tsx에
`post click`
|
|
|scroll-down-value(??)
|
|
/posts-list.tsx
'scroll down'
```

scroll down을 위해서는 post가 클릭했다는 것을 posts-list에 전달 할 필요가 있으며 이를 위해 on/off와 dom 같은 특정 값을 공유할 필요가 없습니다.

단지 이 사이에 post가 클릭되었다는 명령을 subscribe하고, 해당 명령이 전달되었다면 post-list 내에서만 해결하면 되는 문제입니다. 만약 이 두개의 컴포넌트가 이벤트 전달을 위해 공통적인 값을 공유한다면 컴포넌트 사이 간의 `coupling`이 발생할 수 밖에 없습니다.

## Event Emitter

이 문제를 해소하기 위해 카드를 클릭했을 때의 event를 eventEmitter를 통해 observe 하여 스크롤 이동시키는 스코프를 [post-list.tsx]()에 한정할 수 있었습니다.

```javascript
///

const handlePressPopularPost = () => {
  postObserve.emit("popular-post-click", id);
};

///

const onInit = useEvent(() => {
  const removeListener = postsObserve.addListenerRemovable(
    "popular-post-click",
    async (id: string) => {
      // side-effect
    }
  );
  return removeListener;
});

useEffect(() => {
  const removeListener = onInit();
  return () => {
    // must delete eventListener
    removeListener();
  };
}, [onInit]);
```
