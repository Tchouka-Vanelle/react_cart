const Cart = (props) => {

    const {cart} = props;
    const {products, updateQty, deleteItem, subtotal} = props;

    return (
        <div className="cart">
            <div className= 'cart'>Cart goes here</div>
            <h2>Your Cart</h2>
            {
                cart && cart.map(cartItem => {
                     const product = products.find(product => product.id === cartItem.id);
                     return(
                        <div key={product.id}  className="cartItem flex align-center mb-2">
                            {product.image && <img src={product.image} alt={product.name} className="imge img-fluid"/> }
                            <div className="product-info p-2">
                                <strong className="block">{product.name}</strong>
                                <div className="price flex align-center space-between">
                                    <input className="qty" type="number" value={cartItem.qty} onChange={e => updateQty( product.id, e.target.value)}></input>
                                    <span className="price bold txt-6">  { cartItem.qty * product.price} €</span>
                                </div>
                                <div className="flex flex-end"><button onClick={e => deleteItem(product.id)} >Delete</button></div>
                            </div>
                        </div>
                     );
                })
            }
            <div className="subtotal mt-4 p-2">
                    <strong className="flex space-between">Subtotal: <span className="price bold txt-6">{subtotal} €</span></strong>
            </div>
            <button className="mt-4">
                    <pan>Place order</pan>
            </button>
        </div>
    );


    /*
    findindex renvoit l'index  de l'elt, du tableau auquel tu applique la methode "findindex",
     alors que find renvoit la valeur meme ie l'elt du tableau (s'il y'en a et -1 s'il y'en a pas)*/
}
export default Cart