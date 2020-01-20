import runGenerator from "../src";
import runCli from "../src/cli"
import context from "./context";
// test("runGenerator", () => {
//   expect(
//     runGenerator({
//       prefix: "./src/gen-repo",
//       generators: [
//         //
//         "javascript",
//         "mongoose",
//         "express", "git", "react","webpack", "npm", "api-client"],
//       plugins: ["account"],
//       template: ["mern"],
//       output: "./.generated/"
//     },
//     context));
// });
// test("runCli", () => {
//   expect(
//     runCli()
//     );
// });
test("runGenerator", () => {
  expect(
    runGenerator({
      prefix: "./src/gen-repo",
      generators: [
        "javascript",
        "test",
      ],
      plugins: [],
      template: ["testtemplate"]
    },
    context));
});
