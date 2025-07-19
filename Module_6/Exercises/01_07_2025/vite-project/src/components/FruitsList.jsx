const FruitsList = () => {
    let fruits = ['Apple', 'Banana', 'Mango'];
  return (
    <>
    <h4>3.Fruits List</h4>
      <ul>
        {fruits.map((fruit) => (
          <li>{fruit}</li>
        ))}
      </ul>
    </>
  );
};

export default FruitsList;
