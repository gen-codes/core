if({{state.condition}}){
  {{> (dynamicPartial "action" action.type) action=state.action}
}{{if state.else}}else{
  {{> (dynamicPartial "action" action.type) action=state.else}
}
{{/if}}
