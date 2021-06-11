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

**Utilisation de Web3 comme un context :**

```js
import React from "react"
import ReactDOM from "react-dom"
import { Web3Provider } from "web3-hooks"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
```

Puis on consomme le context dans les components :

```js
const [web3State, login] = useContext(Web3Context)
```

L'objet `web3State` contient plusieurs méthodes :

```js
// MetaMask intallé ? (bool)
web3State.isMetamask

// Web3 injecté ? (bool)
web3State.isWeb3

// Nom du réseau
web3State.networkName

// ID du réseau
web3State.chainId

// Adresse du compte connecté
web3State.account

// Balance du compte connecté (en ether)
web3State.balance
```

La mise à jour des balances s'effectue automatiquement à chaque block minés (UseEffect écoutant la blockchain).  
**Envoyer un montant prédéfinit d'Ethers :**

```js
await web3State.signer.sendTransaction({
  to: address,
  value: etherSend,
})
```

On utilise `signer` car un transaction à besoin d'un compte signant avec sa clé privé. La valuer en Ether doit être en WEI.  
Etant une promise, on l'utlise avec `await`, `async() => {}` et `try{} catch(e){}`

## Utilisation d'un smart contract

On commence par créer un fichier `js` ou `json` avec :

- L'adresse du contrat
- Le réseau sur lequel il est déployer (non obligatoire)
- l'ABI du contrat

On se sert ensuite de ces informations pour utiliser notre contrat.  
**Création du context lié à notre contrat :**

```js
export const ContractContext = createContext(null)

const Component = () => {
  return (
    <>
      <CounterContext.Provider>
        <Dapp />
      </CounterContext.Provider>
    </>
  )
}
```

Puis on utilise le hooks `useContract` :

```js
const contract = useContract(contractAddress, contractAbi)
```

Et on passe la variable de notre contrat dans le `Provider` :

```html
<CounterContext.Provider value="{contract}">
  <Dapp />
</CounterContext.Provider>
```

Et enfin on consume le context dans le component souhaité :

```js
import { ContractContext } from "../App"
import { useContext } from "react"

const Component = () => {
  const contract = useContext(ContractContext)

  // appelle des fonctions du contrat
  const handleContractInteraction = async () => {
    try {
      await contract.interaction()
    } catch (e) {
      console.log(e)
    }
  }
```

## Refactoring avec useReducer et des components

Component `<MetaMaskUsage />`

Contract in custom hook...

TODO:

- nb d operation pour être owner
- affichage de liste des owner ?
- utilisation d'un autre smart contract sur un autre reseau
- gestion des erreur (console)
- capter les events emit
