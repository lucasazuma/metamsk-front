import './App.css';
import Button from '@mui/material/Button';
import api from "./services/api";

function App() {

    async function personalSign(account, message) {
        const signature = await window.ethereum.request({ method: 'personal_sign', params: [ message, account ] });
        return signature;
    }

    async function getUser(address){
        return await api
            .get(`/api/v1/users/${address}`)
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            })
    }

    async function connectWallet(){
        if (window.ethereum) { //check if Metamask is installed
            try {
                const address = await window.ethereum.request({ method: 'eth_requestAccounts' }); //connect Metamask
                let user = await getUser(address)
                console.log(user)
                if (user.data.data.nonce){
                    const requestTime = new Date().getTime();
                    const signature = await personalSign(address[0], user.data.data.nonce)
                    api
                        .post("/api/v1/sessions", { public_address: address, request_time: requestTime, signature: signature  })
                        .catch((error) => console.log(error));
                }else{
                    alert('assina ai pai')
                }
                return address;

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
