const Products = ( props ) => {

    const {products} = props;
    const {addToCart} = props;

    return (
        <div className="products">
            <div className="grid products-grid">
                <div className="row">
                { 
                    products && products.map(product => 
                        <div key={product.id} className="col-sm-12 col-md-4 mb-4 mt-5 card">
                            <div className="card-img-top" style={{ height: 255, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {product.image && <img src={product.image} alt={product.name} width="100%" className="img-fluid"/>}
                            </div>
                            <div className="caption absolu card-body">
                                <h2 className="name"> {product.name} </h2>

                                {product.description && <p className="description card-text">{product.description}</p>}
                                {product.price && <p className="price bold txt-6">  {product.price} €</p>}

                                <button className="add-to-cart-button btn btn-primary" onClick={ () => addToCart(product.id)} >
                                    <span>Add to cart</span>
                                </button>
                            </div>
                        </div>)
                }
                 </div>
            </div>
        </div>
    );
}
export default Products

//"homepage": "https://Tchouka-Vanelle.github.io//react-cart"
//"predeploy": "npm run build",
//"deploy": "gh-pages -d build"