export default function toValue(value){
  const realValue = JSON.parse(value)
  if(typeof realValue === "string"){
    return `"${realValue}"`
  }
  return value
}
