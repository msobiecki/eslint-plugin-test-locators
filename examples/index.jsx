function Tester() {
  return <button>test</button>;
}

function App() {
  const test = "test";
  return (
    <div>
      <button data-test="button-save">Save</button>
      <input data-test="input-name" />
      <a data-test="text-">Home</a>
      <span role="button" data-test="">
        Home
      </span>
      <a role="span">button</a>
      <input type="search" data-test={`inputer-${test}`} />
      <input type="search" data-test={`input-search-${test}-inputer`} />
      <Button data-test="" />
      <Button data-test="" />
      <span role="checkbox" data-test="">
        test
      </span>
      <div>
        <button data-test="button-save">Save</button>
        <input data-test="input-name" />
        <a data-test="anchor-value">Home</a>
        <button data-test="text-save">Save</button>
        <input data-test="form-name" />
        <a data-test="hyperlink-value">Home</a>
      </div>
      <Tester />
    </div>
  );
}

export default App;
