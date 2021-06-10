# Mise en place de la Dapp

## Installer les dépendances

**Ethers.js :**

```zsh
yarn add ethers
```

**Web3 Hooks :**

```zsh
yarn add web3-hooks
```

Utilisation de Web3 comme un context

      <p>Metamask installed: {web3State.isMetamask ? "yes" : "no"}</p>
            <p>Metamask installed: {window.ethereum.isMetaMask ? "yes" : "no"}</p>
      <p>Web3: {web3State.isWeb3 ? "injected" : "no-injected"}</p>


        {!web3State.isLogged && (
          <>
            <button onClick={login} className="btn btn-info">
              Login
            </button>
          </>
        )}


        <p>Network id: {web3State.chainId}</p>
        <p>Network name: {web3State.networkName}</p>
        <p>Account: {web3State.account}</p>
        <p>Balance: {web3State.balance}</p>

        PRovider représente la connexion entre le front et la blockchain (voir ether.js) = 1 account et 1 réseau

Le web3-hooks détecte les blocks quand ils sont miné

Provider != Signer
Provider écoute la blockchain (les fonctions view, ...)  
Signer écoute ce qui concerne l'account
