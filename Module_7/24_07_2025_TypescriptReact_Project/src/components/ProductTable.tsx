
import useProducts from '../hooks/useProducts';
import Loading from './common/Loading';
import ErrorComponent from './common/Error';
import ProductCard from './ProductCard';



export default function ProductTable() {
    const { supplierResponse, loading, error } = useProducts();
    let newId = 0;
    if(loading) {
        return <Loading />;
    }

    if(error) {
        return <ErrorComponent message={error} />;
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-3 gap-4">
                {supplierResponse?.map((product) => (
                    <ProductCard key={newId++} title={product.source} property1={product.value} property2={product.currency} />
                ))}
            </div>
        </>
    );
}