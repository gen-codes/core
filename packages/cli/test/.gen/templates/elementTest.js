import React from 'react';
import ReactDOM from 'react-dom';
import { render,cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {{name}} from './{{name}}';

afterEach(cleanup);

Enzyme.configure({ adapter: new Adapter() });
// Generic Tests
it('should find {{lowerCase(name)}}', () => {
    const wrapper = mount(<{{nane}} />)
    const text = wrapper.find({{name}});
    expect(text).toHaveLength(1);
})

it("{{name}} renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<{{name}} />, div)
})
// Component-specific tests
{{for test in tests}}
it("{{test.name}}", () => {
  const { getByTestId } = render({{test.render}});
  expect(getByTestId("{{lowerCase(name)}}")).{{test.check}};
})
{{/for}}
// Snapshot tests
it("{{name}} matches snapshots", () => {
    const tree = renderer.create(<{{name}}></{{name}}>).toJSON();
    expect(tree).toMatchSnapshot();
})


