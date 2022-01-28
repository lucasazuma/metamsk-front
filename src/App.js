
import './App.css';
import Button from '@mui/material/Button';
import detectEthereumProvider from '@metamask/detect-provider';

function App() {
    function startApp(provider) {

        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        } else{
            console.log('vc é uma maquina de vencer')
            console.log(provider)
        }
    }

    async function batata(){
        const provider = await detectEthereumProvider();

        if (provider) {
            console.log('É TETRA PORRA'); // Initialize your app
            startApp(provider)
        } else {
            console.log('SEM MetaMask!');
        }
    }

    async function connectWallet(){
        if (window.ethereum) { //check if Metamask is installed
            try {
                const address = await window.ethereum.enable(); //connect Metamask
                const obj = {
                    connectedStatus: true,
                    status: "",
                    address: address
                }
                console.log(obj)
                return obj;

            } catch (error) {
                return {
                    connectedStatus: false,
                    status: "🦊 Connect to Metamask using the button on the top right."
                }
            }

        } else {
            return {
                connectedStatus: false,
                status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
            }
        }
    };

  return (
    <div className="App">
      <header className="App-header">
        <Button  variant="outlined" onClick={() => { connectWallet() }}>login</Button>
      </header>
    </div>
  );
}

export default App;
