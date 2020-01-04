import React, {useEffect, useContext} from 'react'
// import {Form, Field, FormSpy} from 'react-final-form'
import { Color, Text, Box, useApp} from '@gen-codes/ink-cli'
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
// const winston = require('winston');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with level `error` and below to `error.log`
//     // - Write all logs with level `info` and below to `combined.log`
//     //
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' })
//   ]
// });



export default function ObjectField({objectType, schema, prefix = "", ...props}) {
  const [activeField, setActiveField] = React.useState(0)
  const [submission, setSubmission] = React.useState()
  const [formData, setFormData] = React.useState(props.value || {})
  const [currentFields, setCurrentFields] = React.useState([])
  const {currentForm, setCurrentForm, pressedKey, updateExternal} = useContext(FormContext)

  useEffect(() => {
    const newFields = fields.filter((field) => {
      if(field.condition) {
        // logger.info(field.condition);
        // logger.info(formData);
        return checkCondition(field.condition, formData)
      }
      return true
    })
    if(newFields.length != currentFields.length) {
      setCurrentFields(newFields)
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
  const schemaProperties = schema.find(obj => obj.name === objectType).properties
  const fields = handleProperties(
    schemaProperties,
    "",
    schema,
    prefix
  )
  const onSetSubmission = (data) => {
    if(props.onChange) {
      props.onChange(data)
      props.onSubmit()
    } else {
      setSubmission(data)
    }
  }
  // return (
  // <Form onSubmit={onSetSubmission}
  // >
  // 	{({handleSubmit, validating, values}) => {
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

              },
              index,
            ) => {

              return (
                // <Field name={name} key={name} format={format} validate={validate}>
                // 	{({input, meta}) => {
                // 		// handleSubmit
                //     input.onChange(formData[name])
                // return (
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
                          setFormData({...formData, [name]: data})
                        }}
                        updateExternal={updateExternal}
                        onSubmit={() => {
                          if(activeField === currentFields.length - 1) {
                            onSetSubmission(formData)
                          } else {
                            setActiveField(value => value + 1)
                          }
                        }}
                      />
                    ) : (
                        (typeof (formData[name]) === "string" && formData[name] && <Box><Text>{formData[name]}</Text></Box>) ||
                        (typeof (formData[name]) === "object" && formData[name] && <DisplayData formData={formData[name]}></DisplayData>) ||
                        (placeholder && <Color gray>{placeholder}</Color>)
                      )}
                    {/* {validating && name === 'name' && (
																		<Box marginLeft={1}>
																			<Color yellow>
																				<Spinner type="dots" />
																			</Color>
																		</Box>
																	)}
																	{meta.invalid && meta.touched && (
																		<Box marginLeft={2}>
																			<Color red>✖</Color>
																		</Box>
																	)}
																	{meta.valid && meta.touched && meta.inactive && (
																		<Box marginLeft={2}>
																			<Color green>✔</Color>
																		</Box>
																	)} */}
                  </Box>
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
