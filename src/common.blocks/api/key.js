/* eslint-disable */

import pemEncodedKey from './secret-key.js'
/*
Convert a string into an ArrayBuffer
*/

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}


function str2ab(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

function importPrivateKey(pem) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = '-----BEGIN PRIVATE KEY-----'
  const pemFooter = '-----END PRIVATE KEY-----'
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  )
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents)
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString)

  return window.crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign']
  )
}

const headerToSign = new Map()
headerToSign.set('WM_SEC.KEY_VERSION', '3')
headerToSign.set('WM_CONSUMER.ID', '4e510906-f2b5-4808-b30e-b9ecb437b61d')
headerToSign.set('WM_CONSUMER.INTIMESTAMP', Date.now())

const caninicalized = (map) => {
  let arrForSign = []
  for (let val of map.values()) {
    arrForSign.push(val)
  }
  let stringFOrSign = arrForSign.join(',')
  return stringFOrSign.replace(/,/g, '\n')
}

const data = new TextEncoder().encode(caninicalized(headerToSign))
console.log(data)

importPrivateKey(pemEncodedKey)
  .then((k) => {
    console.log(k)
    return window.crypto.subtle.sign(
      {
        name: 'RSASSA-PKCS1-v1_5',
      },
      k, //from generateKey or importKey above
      data //ArrayBuffer of data you want to sign
    )
  })
  .then(function(signature) {
    //returns an ArrayBuffer containing the signature
    let sig = new Uint8Array(signature)
    console.log(sig)
    let decodeString = new TextDecoder('utf-8').decode(sig)
    console.log(decodeString)
    let string = ab2str(sig)
    console.log(string)
    document.body.textContent = string
  })
