import React, {useState, useEffect} from 'react'
import {InkTextInput, Box, InkTable, InkSelectInput, InkMultiSelect} from '@gen-codes/ink-cli'
import fetch from "isomorphic-fetch"
import dlv from 'dlv';
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'user-service'},
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({filename: 'combined.log'})
  ]
});
const cache = {};
const delve = path => obj => dlv(obj, path);
function useRest(term, amount, {service, resultsPath}, properties) {
  // if(term)
  const fetchPath = path => fetch(service(path)).then(res => res.json());

  const query = term.toLowerCase().replace(/ /g, '+');
  const [data, setData] = useState(cache[query] || []);

  const parse = results => {
    if(resultsPath) {
      results = dlv(resultsPath)(results)
    }
    const strObj = JSON.stringify(properties)
    const matches = strObj
      .match(/\{[a-zA-Z0-9\[\]\.]*\}/g)
    return results.slice(0, amount || 10).map((item) => {
      const value = matches.reduce((str, v) => {
        const path = v.match(/\{(.*?)\}/)[1]
        const newValue = delve(path)(item)
        return str.replace(v, newValue)
      }, strObj)
      return JSON.parse(value)
    });

  }

  useEffect(() => {
    if(term) {
      if(!cache[query]) {
        fetchPath(query).then(response => {
          cache[query] = parse(response.results);
          setData(cache[query]);
        });
      } else {
        setData(cache[query]);
      }
    }
  }, [query, term]);

  return data;
}

export default function Search(props) {
  const [term, setTerm] = useState("")
  const [search, setSearch] = useState(undefined)
  const [arr, setArr] = useState(props.value || [])
  const results = useRest(term, 10, props.remote, props.properties)
    .map(({_label, ...value}) => ({label: _label, value: JSON.stringify(value)}))

  const Results = (
    <InkSelectInput
      items={results}
      color={"red"}
      limit={5}

      onSelect={({value, label}) => {
        const realValue = JSON.parse(value)
        realValue._label = label
        props.onChange(realValue)
        // props.onSubmit(realValue)
      }} />
  )

  return (
    <Box flexDirection={"column"}>
      <InkTextInput
        onChange={setSearch}
        onSubmit={setTerm}
        value={search || ""}
      />
      {results === undefined ? "" : results.length ? Results : "No results!"}
    </Box>
  )
}