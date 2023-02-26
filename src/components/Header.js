import logo from '../logo.svg';
const Header = ( props ) => {
    return (
        <header className='App-header'>
   
        <div className='App-logo flex align-center'>
          <div ></div>
            <img src={logo} className='logo mr-2 img-fluid' alt='logo' />
            <strong className=''>{props.title}</strong>
        </div>
        </header>
    );
}

export default Header;