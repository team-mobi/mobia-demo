# Tagged Error

> **TLDR**: [effect](https://effect.website) 에서 제공하는 모나드 자료구조를 활용하여 함수의 성공 타입과 실패 타입을 모두 정의합니다.

## Error as Value

빠른 속도로 일정 품질을 준수하는 제품을 만들기 위해서는 사용하는 함수의 이름과 함수의 시그니처를 통해 코드를 안보고 동작을 파악할 수 있어야 합니다.
함수가 어떤 역할을 하는지는 함수명으로 추론을 할 수 있으며, 함수의 리턴 타입을 통해 프로그램의 다음 플로우를 생각해볼 수 있습니다. 그러나 함수(동작)가 **실패**하는 케이스는 타입 레벨에서 파악하기 어렵습니다.<br />

```ts
function divide(a: denominator, b: numerator): number {
  if (b === 0 || b === -0) {
    throw new RangeError("numerator cannot be 0");
  }
  return a / b;
}

const divideResult = divide(10 / 0);
```

`divide` 함수는 함수 이름으로 인자로 전달받은 두 수를 나누겠구나 추론을 할 수 있습니다. 그러나 실제 함수 내부 구현체에서는 `b === 0`일 때 `RangeError`를 던질 수도 있기에, 개발자는 직접 구현체를 찾아봐야하죠. 타입스크립트의 타입 시스템 자체로는 **실패에 해당하는 케이스**를 파악할 수 없습니다. 이는 개발 생산성에 (안좋은 의미로) 큰 영향을 미칠 수 있습니다. [effect](https://effect.website)는 함수형 프로그래밍의 모나드 컨셉을 사용하여 `divide` 함수를 다음과 같이 표현하도록 자료구조들을 제공합니다.

```ts
import { Effect } from "effect";

function divide(
  a: denominator,
  b: numerator
): Effect.Effect<number, RangeError> {
  if (b === 0 || b === -0) {
    return Effect.fail(new RangeError("numerator cannot be 0"));
  }
  return Effect.succeed(a / b);
}
```

동작이 실패하는 케이스를 신경쓰기 시작하면 코드의 품질은 더더욱 좋아집니다. 그리고 개발자는 타입과 함수명만을 보고 동작을 쉽게 예측할 수 있습니다.

## TaggedError

자바스크립트의 built-in 에러는 `instanceof` 연산자만을 통해 실패 케이스가 어떤 것인지를 파악할 수 있습니다. 하지만 `TaggedError`를 사용하면 `error._tag`만을 이용하여 실패 케이스에 대한 컨트롤 플로우를 빠르게 구축할 수 있습니다. <br/>

TaggedError는 다음과 같은 방식으로 정의합니다.

```ts
import { Data } from "effect";

export class FooError extends Data.TaggedError("FooError") {}

// 추가 프로퍼티를 넣을 수도 있습니다.
export class BarError extends Data.TaggedError("BarError") {
  constructor(public yourProperties: string) {
    super();
  }
  doYourMethod() {}
}

declare function singleError(a: number): Effect.Effect<number, FooError>;

declare function multipleError(
  a: number
): Effect.Effect<number, FooError | BarError>;
```

TaggedError는 다음과 같은 방식으로 사용합니다.

```ts
import { FooError, BarError } from "~/error-path";

function mustError(input: boolean): Effect.Effect<void, FooError | BarError> {
  if (input) {
    return Effect.fail(new FooError());
  }
  return Effect.fail(new BarError(""));
}
const process = mustError(true).pipe(
  Effect.catchTags({
    BarError: (err) => Effect.succeed("Recovering from BarError"),
    FooError: (err) => {
      // error recovering
      return Effect.succeed("Recovering from FooError");
    },
  })
);
Effect.runPromiseExit(process).then(console.log);

main();
```

# Precautions for using effects

무분별한 Effect의 사용은 오히려 난잡한 명령문을 만들 수 있습니다. 이를 위해 Effect를 인용할 때는 아래의 상황에 따라 명확한 경우에만 사용할 수 있도록 해주세요

1. 시그니처를 통해 발생할 수 있는 에러를 파악해야하는 상황인가 (주요한 exception인가)

2. exception 상황별 처리해야하는 분기의 경우가 다양한 상황인가

3. 연속적인 함수 실행 혹은 지연 평가를 통해 promise를 execute 시켜야하는 상황인가

```javascript
// Bad Example
// "/widgets/list/ui/popular-post.list.ts"

const postElementScrollDown = (
  postId: string
): Effect.Effect<void, BadClientRequest> => {
  if (isLoading) {
    return Effect.fail(new BadClientRequest("Request is currently loading"));
  }
  const postElement = postRefs.current[postId];
  if (!postElement)
    return Effect.fail(new BadClientRequest("Post element not found"));

  postElement.scrollIntoView({ behavior: "smooth" });
  return noop();
};
```

위의 상황에서는 단순히 isLoading 상태에 따라 사용자의 요청을 막기 위해 작성된 되어있는 코드입니다.

BadClientRequest가 던져지고 이후의 핸들링이 전혀 이루어지지 않고 있으며 연속적인 함수의 실행을 위해 pipe나 지연평가를 해야하는 요소도 보이지 않습니다.

따라서 해당 함수는 Effect를 사용하는 것보다 일반 함수 선언을 통해 BadClientRequest를 throw하고 cause를 작성하는 것이 더 올바른 사용법일 수 있습니다.
