import changeCase from 'change-case';


export default {
  camelCase(str) {
    //=> "testString"
    return changeCase.camelCase(str);
  },
  constantCase(str) {
    //=> "TEST_STRING"
    return changeCase.constantCase(str);
  },
  dotCase(str) {
    //=> "test.string"
    return changeCase.dotCase(str);
  },
  headerCase(str) {
    //=> "Test-String"
    return changeCase.headerCase(str);
  },
  lowerCase(str) {
    //=> "test_string"
    return changeCase.lowerCase(str)
  },
  lowerCaseFirst(str) {
    //=> "tEST"
    return changeCase.lowerCaseFirst(str);
  },
  upperCase(str) {
    //=> "TEST_STRING"
    return changeCase.constantCase(str);
  },
  paramCase(str) {
    // "test-string"
    return changeCase.paramCase(str);
  },
  pascalCase(str) {
    //=> "TestString"
    return changeCase.pascalCase(str);
  },
  sentenceCase(str) {
    //=> "Test string"
    return changeCase.sentenceCase(str);
  },
  snakeCase(str) {
    //=> "test_string"
    return changeCase.snakeCase(str);
  },
  titleCase(str) {
    //=> "A Simple Test"
    return changeCase.titleCase(str);
  }
}
