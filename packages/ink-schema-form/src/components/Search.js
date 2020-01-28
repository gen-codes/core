import React, {useState, useEffect} from 'react'
import {InkTextInput, Box, InkTable, InkSelectInput, InkMultiSelect} from '@gen-codes/ink-cli'
import fetch from "isomorphic-fetch"
import dlv from 'dlv';
import logger from '../utils/logger';

const cache = {};
const delve = path => obj => dlv(obj, path);
function useData(term, amount, {type, service, resultsPath, transform, search}, properties, config) {
  let fetchData;
  if(type === "rest") {
    fetchData = query => {
      if(!query.length<2){
        return new Promise(resolve=>resolve([]))
      }
      return fetch(service(query)).then(res => res.json())
      if(resultsPath) {
        fetchData = async (query) => {
          const {results} = await fetchData(query)
          return new Promise(resolve => resolve(delve(resultsPath)(results)))
        }
      }
    }
  }
  if(type === "config") {
    let data = config[service]
    if(resultsPath) {
      data = delve(resultsPath)(data)
    }
    if(transform) {
      data = transform(data)
    }
    fetchData = (query) => {
      return new Promise(resolve => resolve(data.filter(item => {
        if(!query) return true
        if(search && search.some(field => item[field].match(new RegExp(query, "im")))) {
          return true
        } else if(!search && JSON.stringify(item).match(new RegExp(query, "im"))) {
          return true
        }
        return false
      })))

    }
  }
  const query = term.toLowerCase().replace(/ /g, '+');
  const [data, setData] = useState(cache[query] || []);

  const parse = results => {
    const strObj = JSON.stringify(properties)
    const matches = strObj
      .match(/\{[a-zA-Z0-9\[\]\.]*\}/g)
    return results.slice(0, amount || results.length).map((item) => {
      const value = matches.reduce((str, v) => {
        const path = v.match(/\{(.*?)\}/)[1]
        const newValue = delve(path)(item)
        return str.replace(v, newValue)
      }, strObj)
      return JSON.parse(value)
    });

  }

  useEffect(() => {
      if(!cache[query]) {
        fetchData(query).then(response => {
          cache[query] = parse(response);
          setData(cache[query]);
        });
      } else {
        setData(cache[query]);
      }
  }, [query, term]);

  return data;
}

export default function Search(props) {
  const [term, setTerm] = useState("")
  const [search, setSearch] = useState("")
  const [arr, setArr] = useState(props.value || [])

  const results = useData(props.data.realTime ? search : term, props.data.limit, props.data, props.properties, props.config)
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
      {props.title?`${props.title}:`:""}
      <InkTextInput
        onChange={setSearch}
        onSubmit={setTerm}
        value={search || ""}
      />
      {results === undefined ? "" : results.length ? Results : "No results!"}
    </Box>
  )
}