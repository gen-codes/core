import React, {useState, useEffect} from "react";
import "./styles.css";
import JSONPretty from "react-json-view";
import parse from "@gen-codes/json-transformer";
import languages from "./languages";
import Editor from 'react-simple-code-editor';
import {highlight, languages as hllanguages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
export default function App() {
  const [showData, setShow] = useState(true);
  const [language, setLanguage] = useState("typescript");
  const [data, setData] = useState({});
  const [json, setJSON] = useState({});
  const [save, setSave] = useState(true);
  const [code, setCode] = useState({});
  const [rules, setRules] = useState({});
  useEffect(() => {
    if(save){

      if(languages[language].rules) {
        if(!code[language]) {
          setRules({...rules, [language]: languages[language].rules})
          setCode({...code, [language]: languages[language].code})
  
        } else {
          try {
            const ast = languages[language].getAst(code[language])
            const astClone = JSON.parse(JSON.stringify(ast));
            setJSON(ast);
            const dataExtracted = parse(
              astClone,
              rules[language],
              {location:false, helpers: languages[language].helpers}
            );
            setSave(false)
            setData(dataExtracted);
  
          } catch(err) {
            console.error(err)
          }
        }
      }
    }
  }, [language, save, code, rules]);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr  2fr  2fr",
      gridTemplateRows: "min-content 1fr 1fr",
      border: "3px dotted red",
      padding: "3px",
      height: "100vh",
      gridGap: "3px",
      gridTemplateAreas: `
    "menu . ."
    "code extractor ast"
    "data data ast"
    `}}>
      <div style={{gridArea: "menu", }}>

        <select
          value={language}
          onChange={({target: {value}}) => {
            setLanguage(value);
          }}
        >
          {Object.keys(languages).map(lang => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
        
        {showData && <button onClick={() => setSave(true)}>save</button>}
      </div>
      <div style={{
        gridArea: "data",
        border: "3px dotted blue",
        overflow: "auto",
        resize: "horizontal",
      }}>
        {data && <JSONPretty src={data} />}
      </div>
      <div style={{
        gridArea: "ast",
        border: "3px dotted blue",
        overflow: "auto",
        resize: "horizontal",
      }}>
        {json && <JSONPretty src={json} />}
      </div>
      <div style={{
        gridArea: "code",
        border: "3px dotted blue",
        overflow: "auto",
        resize: "both",
      }}>

        <Editor
          value={code[language] || "  "}
          onValueChange={text => setCode({...code, [language]: text})}
          highlight={code => highlight(code, hllanguages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>
      <div style={{
        gridArea: "extractor",
        border: "3px dotted blue",
        overflow: "auto",
        resize: "both",
      }}>

        <Editor
          value={JSON.stringify(rules[language], null, 2) || "  "}
          onValueChange={text => setRules({...rules, [language]: JSON.parse(text)})}
          highlight={code => highlight(code, hllanguages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </div>

    </div>
  );
}
