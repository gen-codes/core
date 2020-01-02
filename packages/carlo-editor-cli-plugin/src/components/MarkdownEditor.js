import React, {useState} from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import useKeyPress from "../useKeyPress"

// function loadSuggestions(text) {
//   return new Promise((accept, reject) => {
//     setTimeout(() => {
//       const suggestions = [
//         {
//           preview: "Andre",
//           value: "@andre"
//         },
//         {
  //           value: "@angela"
//           preview: "Angela",
//         },
//         {
//           preview: "David",
//           value: "@david"
//         },
//         {
//           preview: "Louise",
//           value: "@louise"
//         }
//       ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()));
//       accept(suggestions);
//     }, 250);
//   });
// }

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const MarkdownEditor = (props) => {
  const [value, setValue] = useState(props.value)
  const [selectedTab, setSelectedTab] = React.useState("write");
  const pressedKey = useKeyPress("ctrl-enter")
  if(pressedKey) {
    props.onChange(value)
    props.onSubmit()
  }
  return (
    <div className="container">
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        // loadSuggestions={loadSuggestions}
      />
    </div>
  );
}


export default MarkdownEditor