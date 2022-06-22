import React, {useEffect} from 'react'
import {useMoralis} from 'react-moralis'
import Moralis from 'moralis'


const ManualHeader = () => {
  const {enableWeb3, account, isWeb3Enabled, deactivateWeb3, isWeb3EnableLoading} = useMoralis()

  useEffect(() => {
    if (isWeb3Enabled) {
      return
    }
    if (localStorage.getItem('Connected')) {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (account === null) {
        deactivateWeb3()
        localStorage.removeItem('Connected')
      }
    })
  }, [])

  const handleClick = async () => {
    await enableWeb3()
    window.localStorage.setItem('Connected', 'Injected')
  }

  return (
    <div>
      {account
        ? <div>Connected to {account}</div>
        : (
          <button onClick={handleClick}
                  disabled={isWeb3EnableLoading}>
            Connect
          </button>)}

    </div>
  )
}

export default ManualHeader
