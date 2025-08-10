

const SingleCat = ({name, latinName, image}) => {
    return (
        <div className="flex flex-row items-center justify-between gap-4">
            <p>Name: {name}, Latin name: {latinName}</p>
            <img src={image} alt={name} className="rounded-full border w-60 h-60  overflow-hidden"/>
        </div>
    );

}

export default SingleCat;