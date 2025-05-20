//load items func
async function loadItems() {
  try {
    const response = await fetch("http://localhost:8000/api/items");
    if (response && response.status === 200) {
      const data = await response.json();
      console.log(data);
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
