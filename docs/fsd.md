# FSD(features-sliced design)

> FSD는 느슨한 결합과 높은 응집을 통해 `coupling`을 최소하고하고 쉽게 확장할 수 있는 프로그램을 만드는 것을 기초로 합니다. 해당 프로젝트에서는 FSD를 아래와 같이 정의합니다.

## Layer

FSD에서 최상위의 폴더를 Layer라고 부릅니다. 해당 프로젝트에서의 레이어는 아래와 같이 정의하며 느슨한 결합을 위하여 우리가 규정한 절대적인 layer의 역할을 기억해야합니다. 단, 프로젝트의 아키텍쳐는 구현해야하는 서비스마다 다를 수 있으므로, 팀원 간의 맥락 공유와 소통이 가장 중요합니다.

`app`

> layout, providers, style, app, routes와 같이 앱의 진입점으로 최상위의 존재해야하는 파일을 위치합니다. 해당 파일에 존재하는 파일은 app에서만 사용할 수 있어야합니다.

<br/>
<br/>

`pages`

<br/>
<br/>

> not-found, main, post과 같은 하위 컴포넌트를 조립하는 상위 컴포넌트들로 구성됩니다. 단 이때 주소 이름과 폴더 명이 같아야함을 명심해야하며, 해당 레이어에서는 비즈니스에 필요한 기능은 최소화 되어야합니다.
> <br/> <br/>
> ex) "/post-list" -> /post-list/post-list.tsx

<br/>
<br/>

`widgets`

> widget은 독립적으로 사용할 수 있는 interface component입니다. 자체만으로 하나의 역할을 부여받기 때문에 비즈니스에 필요한 설계가 정의되는 곳이기도 합니다.

```javascript
// before
const PostList = ({ type }) => {
  const { data } = useFetchPostList(type);
  // type에 따라 호출하는 post가 다르게 설계
};

// after
const PostList = () => {
  const { data } = useFetchPostList();
  // ... your interface
};

const PostPopularList = () => {
  const { data } = usePopularPostList();
  // ... your interface
};
```

> `before`는 외부에서부터 type을 주입받아 type에 따라 다른 PostList를 정의합니다. 그러나 이는 `popular-post`와 - `all-post`로부터 커플링을 발생시키고 훗날 interface의 개선이 필요할 때 확장이 어려운 베이스의 코드가 생산됩니다. fsd는 명확한 `역할`에 따라 사용가능한 레이어를 최소화하여 느슨한 결합을 만드는 것을 목표로 하고 있습니다. 따라서 `after`과 같이 하나의 역할을 부여받은 컴포넌트가 사용되는 레이어를 명확하게 함으로서 그 사이에 있는 관계를 느슨하게 만들 수 있습니다

> `widgets`의 가장 큰 핵심은 무분별한 재사용보다 부여받은 역할이 있는 레이어 만들기 입니다.

<br/>
<br/>

`features`

> features는 다른 인스턴스와 상호작용 가능한 레이어이며, 우리의 비즈니스적 가치를 가져다주는 레이어입니다. 따라서 우리에게 필요한 비즈니스 도메인을 기준으로 폴더가 분리되어야하며 interface를 분리하는 view layer로 는 존재해서는 안됩니다.

```javascript
/* "src/features/post/write-post/ui/submit-button "*/
const WritePostSubmitButton = ({ ...props }) => {
  // props는 widget 혹은 pages에서 내려줄 수 있습니다.

  const { mutateAsync } = useWritePostsMutation(); // imported from entities

  const handleWritePostSubmit = async () => {
    await mutateAsync(...props);
  };

  // features에서는 interface를 정의하지 않습니다. 따라서 관련된 interface는 반드시 entities나 shaded에서 정의하여 참조할 수 있도록 합니다
  return (
    // imported from shared
    <ResponsiveSupportedButton tableSize="medium" desktopSize="large">
      제출
    </ResponsiveSupportedButton>
  );
};

/* "src/features/post/update-post/ui/submit-button "*/
const UpdatePostSubmitButton = () => {};
```

<br/>
<br/>

`entities`

> 엔터티란 필요한 정보를 저장하기 위한 집합입니다. 데이터 정보의 저장을 위해 서버에서 보내주는 데이터와 맵핑이 되는 핵심 클레스이기도 합니다.

> 따라서 이곳에서는 api를 통해 실제로 앱상에서 사용가능한 데이터로 파싱하는 맵핑 함수와 컴포넌트가 정의되는 레이어입니다.

```javascript
// fetchPost는 자체만으로 'Post'라는 entity를 맵핑하는 클래스일 수 있습니다.

// 그러나 우리가 앱에서 사용하기 위해 실제 필요한 데이터는 data, isLoading, error와 같은 유틸 객체와 post entity가 포함된 객체입니다. 따라서 이를 맵핑할 수 있는 query-hook 또한 entities에 정의하며, 앱에서 사용되는 실제 객체 타입에 따라 샤딩하여 관리할 수 있도록 합니다

/* "src/entities/post/lib/query " */
const useFetchPostList = () => {
  return useQuery();
};

const useFetchPopularList = () => {
  return useQuery();
};

// 또한 서버에서 응답받은 Post에는 우리가 필요한 데이터가 있을 수 있고 있지 않을 수 있습니다. 예를들어 Post객체에서는 조회수가 존재하지만 `post-list-item`에서는 필요하고 `post-card`에서는 필요하지 않을 수 있습니다.

// 따라서 정말 우리가 필요한 객체를 지정하고 사용가능한 ui 또한 entities에 정의하고 사용합니다.

/* "src/entities/post/ui " */
const PostListItem = () => {
  return <div> :D </div>;
};

const PostCard = () => {
  return <div> :D </div>;
};
```

> entities의 가장 큰 핵심은 `우리가 필요한 데이터`를 저장하는 것입니다.

<br/>
<br/>

`shared`

> shared는 상단의 모든 레이어들이 사용할 수 있는 ui / config / lib / model 등 모든 slice들이 정의 될 수 있습니다. 중요한 것은 `shared`가 공유하는 것이라하여 공통으로 사용되는 domain business를 정의하여서는 안됩니다. 비즈니스가 정의되는 순간 shared는 본연의 기능을 상실하고 해당 도메인에 종속되는 결과를 초래할 수 있습니다.

```javascript
// post-card는 post-list, post-widget에 공유되니까 shared로 분리하여서 관리해야겠어! ❌
// shared가 아닌 post라는 도메인에 종속됩니다.

// Good Example
// shared
const Card = () => {};

// entities
const PostCard =({...props}) => {

    // imported from shared
    return <Card {...}>  🙆🏻‍♂️
}

```

## Example Folder Structure

```plaintext
src
│
├─ app
│   └─ layout
│      ├─ config
│      │   └─ metadata.ts
│      │
│      ├─ gnb.ts
│      ├─ snb.ts
│      └─ index.ts
│
├─ pages
│   ├─ main.tsx
│   ├─ post-list
│   │    ├─ config
│   │    │   └─ metadata.ts
│   │    |
│   │    └─ post-list.tsx
│   │
│   ├─ post-detail
│   └─ post-write
│
├─ widgets
|   ├─ list
│   │   ├─ config
│   │   └─ metadata.ts
│   │
│   └─ dialog
│       ├─ alert-dialog.tsx
│       ├─ confirm-dialog.tsx
│       └─ post-detail-dialog.tsx
│
├─ features
│   ├─ user
│   │   ├─ authenticate
│   │   └─ updated-user
│   │
│   └─ post
│       ├─ update-post
│       └─ write-post
│          ├─ model
│          ├─ lib
│          └─ ui
│
├─ entities
│   ├─ user
|   |   ├─model
│   │   ├─ lib
│   │   └─ ui
│   │
│   └─ post
|       ├─model
│       ├─ lib
│       └─ ui
|
└─ shared
    ├──ui
    ├──lib
    ├──core
    └─ api
```

## Caution

`파일이 너무 많아질까봐 걱정됩니다`

FSD의 가장 중요한 핵심은 역할과 책임에 따라 레이어와 스코프를 구분하는 것입니다. 따라서 파일이 많아 지더라도 사용될 수 있는 영역이 한정적이기 때문에 이를 걱정해서는 안됩니다.

하지만 그럼에도 위와 같은 문제가 발생하면 우리는, fsd가 아닌 다른 folder structure를 고민해야할 수도 있습니다. 우리가 바라고 있는 것이 레이어에 기능을 한정하는 것이 아닌, 단순히 도메인으로 분리하는 것이라면 우리는 기존의 hooks folder structure에 domains라는 folder를 추가하는 것만으로 해결할 수도 있기 때문입니다.
