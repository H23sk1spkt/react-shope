function Err(props) {
  const errors = props.errors;
  function renderList() {
    if (Object.keys(errors).length > 0) {
       return Object.keys(errors).map((error) => {
        return <li>{errors[error]}</li>;
      });
    }
  }
  return (
    <>
      <ul>{renderList()}</ul>
    </>
  );
}
export default Err;
