import React from "react"
import { Box, Color, Text} from '@gen-codes/ink-cli'
export default function DisplayData({formData, objectType="", countFrom=1}){
	if(Array.isArray(formData)){
    if(formData.length && typeof(formData[0])==="string"){
      return (
        <Box flexDirection={"column"} >{formData.map((item, index) => {
          return <Color key={index} cyan>{item}</Color>
        })}</Box>
      )
    }
		return (
			<Box flexDirection={"column"} >{formData.map((item, index) => {
        if(item._label){
          return <Text key={index} >{item._label}</Text>
          
        }
				return <Box flexDirection={"column"} key={index}>
					<Box><Color red>{objectType} {index+countFrom}</Color></Box>
          {Object.keys(item).filter(f=>f!=="id")
          .map(key => <Box key={key}><Text bold>{key}:</Text><DisplayData formData={item[key]}/></Box>)}
				</Box>
			})}</Box>
		)
	}else if(typeof(formData) === "object"){
    if(formData._label){
      return <Text >{formData._label}</Text>
    }
    delete formData.constructor
    return (
      <Box flexDirection={"column"}>
      {Object.keys(formData).filter(f=>f!=="id").map(key => <Box  key={key}><Box><Text bold>{key}:</Text></Box><DisplayData formData={formData[key]}></DisplayData></Box>)}
      </Box>
    )
	}else if(formData === undefined || formData === null ){
		return <Box />
	}else{
		return <Text >{JSON.stringify(formData)}</Text>
	}
}
