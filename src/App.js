import logo from './logo.svg';
import './App.css';
//import './sass/app.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './components/Products';
import Cart from './components/Cart';
import React  from 'react';

class App extends React.Component {


constructor(props )
{
  super(props);

  this.state = {
    cart: [
      {id:2, qty:2},
      {id:1, qty:3},
    ],
    products: [
      {
        "name": "Voiture",
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "image": "./images/1.jpg",
        "description": "jolie voiture de luxe",
        "price": 1
      },
      {
        "name": "Chaussure",
        "id": 2,
        "title": "reprehenderit est deserunt velit ipsam",
        "image": "./images/2.jpg",
        "description": "chic chaussure pas chère",
        "price": 2
      },
      {
        "name": "Montre",
        "id": 3,
        "title": "xckj sq ,jljsm ;ks",
        "image": "./images/3.jpg",
        "description": "montre etrangère",
        "price": 3
      },
      {
        "name": "Chargeur",
        "id": 4,
        "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        "image": "./images/4.jpg",
        "description": "chargeur de multi-fonction",
        "price": 4
      },
      {
        "name": "Ordinateur",
        "id": 5,
        "title": "natus nisi omnis corporis facere molestiae rerum in",
        "image": "./images/5.jpg",
        "description": "ordinateur deuximème main",
        "price": 5
      },
      {
        "name": "Telephone",
        "id": 6,
        "title": "accusamus ea aliquid et amet sequi nemo",
        "image": "./images/6.jpg",
        "description": "teléphone nouvelle marque",
        "price": 6
      }
      
    ],
    subtotal:0,
  }

  this.addToCart = this.addToCart.bind(this);//ie que le this qui se trouve dans cette fonction doit correspondre a l'elt qui l'a creee ie "App" (et non pas a celui qui l'utilise par exple)
  this.updateQty = this.updateQty.bind(this);
  this.deleteItem = this.deleteItem.bind(this);
  this.updateSubtotal = this.updateSubtotal.bind(this);
}

componentDidMount ()
{
  const subtotal = this.updateSubtotal();
  this.setState(state => subtotal)
}

updateSubtotal()
{
  this.setState(state =>
    {
      const cart = [...state.cart];//en declarant cart en tant que const, on est est de jamais le modifier, ce qui est important ici vu que tout ce qui nous interesse c'est le prix et la qté
      const products = [...state.products];

      //reduce prend 2 paramétre: le premier est un efonction qui va etre appliqué a tous les elts de la variable sur laquel on boucle, et le second c'est la valeur initial, la valeur de depart de l'accumulateur
      //reduce est une fonction qui boucle sur un tableau et qui reduit les elt du tableau a une seule valeur (sans toute fois modifier le tableau)
      //item est un elt du cart
      const subtotal = cart.reduce((acc, item) => {
          const product = products.find( product => product.id === item.id);
          if(product)//ie si on trouve le produit
          {
            acc += parseInt( item.qty) * product.price;
          }
          return acc;
      }, 0)

      return {subtotal: subtotal}
    });
}


deleteItem(productId)
{
  this.setState( state => {
    let cart = [...state.cart];

    //la fonction filter lorsqu'elle renvoit vrai, on garde l'elt et lorsqu'elle renvoit faux, on le jete
    cart = cart.filter( item => {
      return item.id !==productId
    })

    return {cart}
  });
  this.updateSubtotal()
}

updateQty( productId, qty)
{
  this.setState(state => {
    let cart = [...state.cart];
    const index = cart.findIndex(item => item.id === productId);

    if( -1!==index && qty>0)
    {
      //cart[index] = {...cart[index], qty:qty}; //equivaut a l'eqtio ci-dessous
      cart[index] = {...cart[index], qty:parseInt(qty)};
    }
    return {cart};
  });

  this.updateSubtotal()
}
    
  addToCart (productId)
  {
    this.setState(state => {
      let cart = [...state.cart]/* donc dans ma constante "cart"
      j'ai donc une copie de mon etat "cart" a laquelle je vais ajouter mon produits passer en paramétre*/

      const index = cart.findIndex(item => item.id === productId);

      if( -1!==index)
      {
        cart[index] = {...cart[index], qty: parseInt(cart[index].qty) +1};//on copie cart[index], ensuite on surcharge, on ecrase, ie on remplace sa qter en l'incrementant de 1
      }
      else
        cart.push({id: productId, qty:1});

      
      return {cart: cart}//ce return retourne un cart qui sera fusionner, ie qui va remplacer le "cart" d'avant dans le state
      //return {cart} //est <=> au return du dessus
    });

    this.updateSubtotal();

    //il est toujours preferable d'utiliser une fonction dans le setstate plutot que de modifier l'etat directement pour eviter les ennuies
  }


  render() { 
    return(
      <div className='container bg-secondary'>
        <Header title="REACT-CART" />
        <main>
          <div className='row'>
            <div className='col-9'>
            <Products products={this.state.products} addToCart={this.addToCart}/>
            </div>
            <div className='col-3'>
            <Cart cart={this.state.cart} products={this.state.products} updateQty={this.updateQty} deleteItem={this.deleteItem}  subtotal={this.state.subtotal}/>
            </div>
          </div>
        </main>
        <Footer text = "Introduction to react"/>
      </div>
    );
}
}

export default App;
//vue que Cart et Product sont 2 composant (enfants) du meme niveau, alors il ne peuvent pas communiquer entre eux

//lorsqu'il faut changer l'etat d'un composant, il faut imperativement que celui-ci soit une class, mais s'il faut juste afficher, le composant peut etre une classe ou une fonction