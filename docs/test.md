# TEST CODE

> **TLDR** 테스크 코드 작성에서 중요하게 생각해야하는 것과 우리가 어떤 관점에서 테스트 코드를 작성해야핬는지를 정의하기 위한 문서입니다.

## Bad Test

가장 나쁜 테스트는 `의미 없는` 무분별한 테스트를 의미합니다. 우리가 테스트 코드를 작성할 때에는 우리가 `왜 이 코드를 테스트 해야하는가?`를 명확하게 알고 있어야합니다.

테스트 코드를 작성할 때는 내가 증명하고 싶어하는 가치가 무엇인지 명확하게 하는 것이 중요합니다. 만약 테스트 코드를 작성해야한다면 코드의 오염이 발생했을 때 어떤 결과를 초래할 수 있을지 주석으로 이를 명확히 정의한 후 테스트할 수 있도록 합니다

## Unit Test

`unit`은 가장 작은 단위의 테스트이며 lib에 정의된 함수의 input과 output이 항상 보장되어야한다는 것을 의미합니다. 특히 lib에 정의된 함수는 대부분 input의 값을 연산하여 새로운 output을 출력하게 되며 해당하는 레이어에서는 언제든 재사용 될 수 있습니다.

따라서 소스 코드의 오염이 발생한다면 다른 서비스에서의 사이드 이펙트를 일으킬 수 있기 때문에 우리는 우리가 정의한 lib 함수들의 `input과 output은 항상 같은 값을 보장한다는 것`을 테스트 해야합니다.

```javascript
/**
 * 지정된 길이를 초과하면 텍스트를 줄여주는 함수
 * @param text - 원본 텍스트
 * @param maxLength - 최대 글자 수
 * @returns 줄여진 텍스트
 */
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

// 우리는 위 함수의 input과 output을 보장해야한다고 생각하였을 때 비어있는 텍스트가 들어가거나 띄어쓰기에 따라 다양한 케이스에 따라 출력이 항상 보장되지 못할 수 있습니다.
```

> 따라서 아래와 같이 텍스트의 목적과 실패했을 때 어떤 케이스가 예상되는지 정의해야합니다.

```javascript
// 테스트 목적: 텍스트를 지정된 길이로 줄여주는 truncateText 함수의 동작을 검증합니다.
// 이 테스트가 실패할 경우: 텍스트가 올바르게 줄여지지 않거나, 불필요하게 줄여질 수 있습니다.

describe("truncateText", () => {
  it("should return the same text if it is shorter than the max length", () => {
    const text = "Hello";
    const maxLength = 10;
    const result = truncateText(text, maxLength);
    expect(result).toBe(text);
  });

  it('should truncate the text and add "..." if it exceeds the max length', () => {
    const text = "Hello, world!";
    const maxLength = 5;
    const result = truncateText(text, maxLength);
    expect(result).toBe("Hello...");
  });

  it("should handle empty text", () => {
    const text = "";
    const maxLength = 5;
    const result = truncateText(text, maxLength);
    expect(result).toBe(text);
  });

  it("should handle max length of 0", () => {
    const text = "Hello";
    const maxLength = 0;
    const result = truncateText(text, maxLength);
    expect(result).toBe("...");
  });

  it("should not truncate text when max length is exactly the text length", () => {
    const text = "Hello";
    const maxLength = 5;
    const result = truncateText(text, maxLength);
    expect(result).toBe(text);
  });
});
```

## Scenario Test

시나리오 테스트는 사용자의 입장에서 우리가 보장해야하는 시나리오 대로 흘러가고 있는지 확인하기 위한 테스트입니다. 따라서 시나리오는 특정 도메인에 종속되는 것이 좋습니다.

단, 시나리오를 작성할 때는 최대한의 변동이 잦고 사용자의 경험을 보장해야하는 우리의 메인 비즈니스인 것이 좋습니다.

만약 우리의 서비스가 게시글을 등록하는 것이라고 한다면 사용자가 처음 게시글을 등록하고 등록 된 이후 어떤 결과를 보게 될 것인지를 단계별로 명확하게 구분하여 테스트를 구성하는 것이 좋습니다

```
시나리오

1. 사용자가 게시글 작성 페이지에 접근합니다.
2. 사용자가 제목과 내용을 입력하고 게시글을 제출합니다.
3. 게시글이 성공적으로 등록됩니다.
4. 사용자는 게시글 목록 페이지로 리다이렉트됩니다.
5. 게시글 목록 페이지에서 방금 등록한 게시글이 목록에 표시됩니다.
```

> 위의 시나리오는 post의 메인 비즈니스 시나리오이며 해당 비즈니스는 사용자의 반응에 따라 기획의 변동이 없이 항상 같은 시나리오를 유지한다는 것을 전제히에 테스트 코드를 작성합니다.

```javascript
test("User can create a post and see it in the post list", async () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const user = userEvent.setup();

  // Step 1: 게시글 작성 페이지로 이동
  await user.click(screen.getByText("Create Post"));

  // Step 2: 제목과 내용을 입력하고 제출
  await user.type(screen.getByLabelText("Title"), "New Post");
  await user.type(screen.getByLabelText("Content"), "This is a new post.");
  await user.click(screen.getByText("Submit"));

  // Mock 서버 설정: 게시글 등록 성공 응답
  server.use(
    rest.post("/api/posts", (req, res, ctx) => {
      return res(
        ctx.status(201),
        ctx.json({ id: 1, title: "New Post", content: "This is a new post." })
      );
    })
  );

  // Step 3: 게시글 등록 성공 확인 및 목록 페이지로 리다이렉트
  await waitFor(() => {
    expect(screen.getByText("Post created successfully!")).toBeInTheDocument();
  });

  // Step 4: 게시글 목록 페이지로 이동
  await user.click(screen.getByText("Go to Posts"));

  // Step 5: 방금 등록한 게시글이 목록에 표시되는지 확인
  await waitFor(() => {
    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(screen.getByText("This is a new post.")).toBeInTheDocument();
  });
});
```

## E2E Test

E2E 테스트는 사용자가 실제로 애플리케이션을 사용하는 방식과 동일하게 시스템 전체를 테스트하여 애플리케이션의 다양한 기능이 예상대로 작동하는지 확인하는 것을 목표로 합니다.

<br>

사용자 시나리오에서 시나리오 테스트와 비슷하다고 불 수 있지만, 시나리오 테스트는 E2E 테스트의 하위 집합으로 E2E 테스트는 실제 브라우저 환경에서 실행되며, 사용자 시나리오를 통해 애플리케이션의 메인 비즈니스 프로세스를 보장합니다.

<br>

해당 프로젝트에서는 cypress를 기반으로 e2e 테스트를 진행하며 사용자의 모든 사용 시나리오를 기반으로 자동화 테스트를 구현해야합니다.

<br>

단, 아직 우리 웹 사이트가 안정적이지 않은 환경에서의 테스트를 구상하거나 잦은 변화에 대응하기는 어렵기에 우리 웹 사이트가 커다란 변화 없이 안정적인 환경에 들어왔을 때 코드를 작성하는 것이 유의미합니다.

<br>

만약 우리 웹사이트의 메인 비즈니스가 모호하고 interface의 변화가 잦은 경우 e2e test는 팀 단위에서 한번 더 고민하고 도입 여부를 재고할 필요가 있습니다.
