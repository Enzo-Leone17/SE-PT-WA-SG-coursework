const Greeting = () => {
  let randomNumber = Math.floor(Math.random() * 10000);
  randomNumber = randomNumber.toString().padStart(4, "0");
  return (
    <div>
      <h1>1.Hello World</h1>
      <p>Here's a random lucky 4 digit number: {randomNumber}</p>
    </div>
  );
};
export default Greeting;
