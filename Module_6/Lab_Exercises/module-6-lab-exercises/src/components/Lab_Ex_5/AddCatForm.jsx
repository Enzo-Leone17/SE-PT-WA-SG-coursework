import { useBigCatContext } from "../../context/useBigCatContext";


export default function AddCatForm () {
    const { bigCatList, setBigCatList } = useBigCatContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let formResult = {
          name: formData.get('name'),
          latinName: formData.get('latinName'),
          image: formData.get('image'),
        }
        setBigCatList([...bigCatList, formResult])
        event.currentTarget.reset();
      };

    return (
        <>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold underline">Add Big Cat Information</h2>
            <label htmlFor="name">Name:</label>
            <input className="w-full p-2 border rounded shadow bg-gray-100 text-black" type="text" id="name" name="name" required />
            <label htmlFor="latinName">Latin Name:</label>
            <input className="w-full p-2 border rounded shadow bg-gray-100 text-black" type="text" id="latinName" name="latinName" required />
            <label htmlFor="image">Image:</label>
            <input className="w-full p-2 border rounded shadow bg-gray-100 text-black" type="text" id="image" name="image" required />
            <button className="w-full bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded" type="submit">Add Cat</button>
          </div>
        </form>
      </>
    );
}