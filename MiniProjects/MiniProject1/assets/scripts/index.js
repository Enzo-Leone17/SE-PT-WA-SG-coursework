

//load items func
async function loadItems() {
  try {
    const response = await fetch("http://localhost:8000/api/items");
    if (response && response.status === 200) {
      console.log(response.json());
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
