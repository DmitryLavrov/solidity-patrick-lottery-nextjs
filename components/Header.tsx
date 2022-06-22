import React from 'react'
import {ConnectButton} from 'web3uikit'

const Header = () => {
  return (
    <div className="border-b-2 py-6 my-6 flex flex-row">
      <h1 className="text-2xl font-medium">Decentralized Lottery</h1>
      <div className="ml-auto">
        <ConnectButton moralisAuth={false}/>
      </div>
    </div>
  )
}

export default Header
