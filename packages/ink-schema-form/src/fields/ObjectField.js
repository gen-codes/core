import React, {useEffect, useContext} from 'react'
// import {Form, Field, FormSpy} from 'react-final-form'
import {Color, Text, Box, useApp, getCursorPosition} from '@gen-codes/ink-cli'
import yaml from "js-yaml";


// import useInput from "../hooks/useInput"
import Error from '../components/Error'
import Spinner from 'ink-spinner'
import Code from "../components/Code"
import DisplayData from '../components/DisplayData';
import {handleProperties} from '../utils/handleProperties';
import {checkCondition} from '../utils/checkCondition';
import Divider from "../components/Divider"
import {FormContext} from "../index"
import Search from '../components/Search';

import log from "../utils/logger"
import logger from '../utils/logger';

export default function ObjectField({objectType, schema, prefix = "", ...props}) {
  const {config, currentForm, setCurrentForm, pressedKey, updateExternal, getField, setField} = useContext(FormContext)
  const [activeField, setActiveField] = React.useState(-1)
  const [submission, setSubmission] = React.useState()
  const [formData, setFormData] = React.useState(getField(prefix) || {})
  // const formData = props.value || {}

  const [currentFields, setCurrentFields] = React.useState([])
  // const formData = getField(prefix) || {}
  const onChange = (value) => {
    setField(prefix, value)
    setFormData(value)
    logger(value)
  }
  const [errorsObj, setErrors] = React.useState({})
  const objSchema = schema.find(obj => obj.name === objectType)
  if(objSchema.data) {
    return (
      <Search
        title={objSchema.title}
        data={objSchema.data}
        properties={objSchema.properties}
        value={props.value}
        onChange={(v) => {
          onChange(v)
          props.onSubmit()
        }}
        config={config}
      // onSubmit={props.onSubmit}
      />
    )
  }
  useEffect(() => {
    logger("filter", formData)
    const newFields = fields.filter((field) => {
      if(field.condition) {
        // logger.info(field.condition);
        // logger.info(formData);
        return checkCondition(field.condition, formData)
      }
      if(field) {
        return true
      }
      return false
    })
    if(newFields.length != currentFields.length) {
      setCurrentFields(newFields)
      setActiveField(activeField+1)
    }
  }, [formData])
  useEffect(() => {
    if(currentForm === prefix) {
      if(pressedKey.leftArrow) {
        if(activeField !== 0) {
          setActiveField(activeField - 1)
        }
      }
      if(pressedKey.rightArrow) {
        if(activeField !== currentFields.length - 1) {
          setActiveField(activeField + 1)
        }
      }
    }
  }, [pressedKey])

  // useEffect(()=>{
  //   if(currentForm===prefix){
  //     enable()
  //   }else{
  //     disable()
  //   }
  // }, [currentForm])
  
  useEffect(() => {
    const previousForm = currentForm
    setCurrentForm(prefix)
    return () => {
      setCurrentForm(previousForm)
    };
  }, [prefix])
  const onSetSubmission = (data) => {
    props.onSubmit()
    // if(onChange) {
    //   // onChange(data)
    // } else {
    //   setSubmission(data)
    // }
  }

  const schemaProperties = objSchema.properties
  const fields = handleProperties(
    schemaProperties,
    "",
    schema,
    prefix
  )

  return (
    <Box flexDirection="column" >
      <Divider width={20} title={`Edit ${objectType}`} titleColor={"cyan"} dividerColor={"red"} />
      <Box flexDirection={"row"}>
        <Divider width={1} height={currentFields.length}
          direction={"column"} dividerChar="|"
          alignItems={"flex-start"} dividerColor={"red"} />
        <Divider width={1} height={currentFields.length || 1}
          dividerChar="|"
          justifyContent={"flex-end"}
          dividerColor={"red"}
        />
        <Box flexDirection={"column"}   >
          {currentFields.map(
            (
              {
                name,
                label,
                placeholder,
                format,
                validate,
                Input,
                inputConfig,
                condition,
                prefix,
                default: defaultValue

              },
              index,
            ) => {
              const ShowErrors = errorsObj[name] && errorsObj[name].length ?
                <Box marginLeft={2} flexDirection={"column"}>
                  {errorsObj[name].map(err => <Color key={err} red>✖ {err}</Color>)}
                </Box> : ""
              const defaultType = typeof (defaultValue)
              if(defaultType.match(/string|number|boolean/)) {
                if(formData[name] === undefined) {
                  setFormData({...formData, [name]: defaultValue})
                }
                placeholder = defaultValue
              }

              return (
                <Box flexDirection="column" key={name}>
                  <Box>
                    {name !== "id" && <Text bold={activeField === index}>{label}: </Text>}
                    {activeField === index ? (
                      <Input
                        {...inputConfig}
                        value={formData[name]}
                        prefix={prefix}
                        active={true}
                        placeholder={placeholder}
                        onChange={(data) => {
                          // logger("change", data, name)
                          // setFormData({...formData, [name]: data})
                          const {errors} = validate({data, errors: []})
                          errorsObj[name] = errors
                          setErrors(errorsObj)
                          onChange({...formData, [name]: data})
                        }}
                        updateExternal={updateExternal}
                        onSubmit={() => {

                          let data = formData[name]
                          // logger("submit", props.value)
                          if(!data) {
                            const defaultType = typeof (defaultValue)
                            if(defaultType.match(/string|number|boolean/)) {
                              if(formData[name] === undefined) {
                                logger("onChange", 181)
                                onChange({...formData, [name]: defaultValue})
                                errorsObj[name] = []
                                setErrors(errorsObj)
                              }
                              // placeholder=defaultValue
                            }
                          }

                          logger(activeField, currentFields.length - 2)
                          if(activeField === currentFields.length - 2) {
                            logger("submit")

                            props.onSubmit()
                          } else {
                            setActiveField(value => value + 1)
                          }
                        }}
                      />
                    ) : (
                        (typeof (formData[name]) === "string" && formData[name] && <Box><Text>{formData[name]}</Text></Box>) ||
                        (formData[name] !== undefined && <DisplayData formData={formData[name]}></DisplayData>) ||
                        (placeholder && <Color gray>{placeholder}</Color>)
                      )}
                    {ShowErrors}
                    {/* {validating && name === 'name' && (
																		<Box marginLeft={1}>
																			<Color yellow>
																				<Spinner type="dots" />
																			</Color>
																		</Box>
																	)}
																	{meta.invalid && meta.touched && (
																		
																	)}
																	{meta.valid && meta.touched && meta.inactive && (
																		
																	)} */}
                  </Box>
                  {/* {JSON.stringify(errorsObj)} */}
                  {/* {meta.error && meta.touched && <Error>{meta.error}</Error>} */}
                </Box>
              )
              // 	}}
              // </Field>
              // )
            }
          )}
        </Box>
      </Box>
      <Divider width={25}
        direction={"row"}
        dividerChar="_"
        alignItems={"flex-end"}
        dividerColor={"red"}
      />


    </Box>
  )
  // }}
  // </Form>)
}
