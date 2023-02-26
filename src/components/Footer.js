const Footer = ( props ) => {
    return (
        <footer><p>{props.text}</p></footer>
    );
}

export default Footer


/*les 3 declarations de fonctions ci-dessous sont equivalentes

function App(args){}
const App = function(args){}
const App = args => {}
*/