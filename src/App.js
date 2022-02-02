
import './App.css';
import Button from '@mui/material/Button';
import detectEthereumProvider from '@metamask/detect-provider';
import api from "./services/api";

function App() {

    async function personalSign(account, message) {
        const signature = await window.ethereum.request({ method: 'personal_sign', params: [ message, account ] });
        return signature;
    }

    async function connectWallet(){
        if (window.ethereum) { //check if Metamask is installed
            try {
                const address = await window.ethereum.request({ method: 'eth_requestAccounts' }); //connect Metamask
                let user = {}
                const obj = {
                    connectedStatus: true,
                    status: "",
                    address: address
                }
                await api
                    .get(`/api/v1/meta_login/${obj.address}`)
                    .then((response) => (user = response.data))
                    .catch((err) => {
                        console.error("ops! ocorreu um erro" + err);
                    });
                if (user.data.nonce){
                    const requestTime = new Date().getTime();
                    const signature = await personalSign(obj.address[0], user.data.nonce)


                }else{
                    alert('assina ai pai')
                }
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
