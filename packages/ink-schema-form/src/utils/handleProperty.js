import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import CheckBox from '../components/Checkbox';
import MultiSelectInput from '../components/MultiSelectInput';
import ArrayField from "../fields/ArrayField";
import ObjectField from '../fields/ObjectField';
export function handleProperty(name, prop, condition = "", schema) {
  const placeholder = name
  const validate = undefined
	if(Array.isArray(prop)) {
		// choice
		return {
			name,
			label: name,
			placeholder: `Select ${name}`,
			Input: SelectInput,
			validate,
			condition,
			inputConfig: {
				limit: 5,
				items: prop.map(choice => ({label: choice, value: choice}))
			}
		};
	}
	else if(typeof prop === "object") {
		if(prop.enum && prop.multiple) {
			return {
				name,
				label: name,
				placeholder: `Select ${name}`,
				Input: MultiSelectInput,
				validate,
				condition,
				inputConfig: {
					limit: 5,
					items: prop.enum.map(choice => ({label: choice, value: choice}))
				}
			};
			// multipleChoice
		}
	}
	else if(typeof prop === "string") {
		if(prop.match(/^[A-Z]/)) {
			// object -> Array or Object
			const isPlural = schema.some(obj => obj.plural === prop);
			if(isPlural) {
				prop = schema.find(obj => obj.plural === prop).name;
				return {
					name,
					label: name,
					placeholder: `Add ${name}`,
					Input: ArrayField,
					validate,
					condition,
					inputConfig: {
						objectType: prop,
						schema
					}
				};
			}
			return {
				name,
				label: name,
				placeholder:`Set ${name}`,
				Input: ObjectField,
				validate,
				condition,
				inputConfig: {
					objectType: prop,
					schema
				}
			};
		}
		else {
			if(prop === "boolean") {
				return {
					name,
					label: name,
					placeholder:`Set ${name}` ,
					Input: CheckBox,
					condition,
					validate,
					inputConfig: {
						trueString: "Yes",
						falseString: "No"
					}
				};
			}
			// scalar
			return {
				name,
				label: name,
				placeholder: `Type ${name}`,
				condition,
				validate,
				placeholder: name,
				Input: TextInput
			};
		}
	}
}
