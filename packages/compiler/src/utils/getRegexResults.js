export function getRegexResults(regex, text) {
  let result;
  const results = [];
  while((result = regex.exec(text)) !== null) {
    results.push({...result.groups, fullText: result[0]});
  }
  return results;
}
