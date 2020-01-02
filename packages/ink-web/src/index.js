import useInput from "./hooks/useInput";
import Box from "./components/Box";
import Color from "./components/Color";
import Text from "./components/Text";
import InkSelectInput from "./components/InkSelectInput";
import InkMultiSelect from "./components/InkMultiSelect";
import InkTextInput from "./components/InkTextInput";
import Divider from "./components/Divider"
const useApp = ()=>{return {exit: ()=>{}}}
export  {
  useApp,
  useInput,
  Box,
  Text,
  Color,
  InkMultiSelect,
  InkSelectInput,
  InkTextInput
}