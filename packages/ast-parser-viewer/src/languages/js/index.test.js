import {traverse} from "../../traverse"
import js from "./example"
test("js traverse", () => {
  const data = traverse(
    js.ast,
    js.rules
  )
  console.log(JSON.stringify(data,null,2))
  expect(
    data
  )
});
