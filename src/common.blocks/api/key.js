/* eslint-disable */

/*
Convert a string into an ArrayBuffer
*/
function str2ab(str) {
  const buf = new ArrayBuffer(str.length)
  const bufView = new Uint8Array(buf)
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}

const pemEncodedKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDL27s2ITyOa2RY
yO0BB/ghFIXS7P5JdB33FqoKxBUO7/Ff1RSDa8JUlUZhVSBDOspm/lSJEbpQ7hb4
/SMPME9BKeb8O3d8scRG/iy1LUT464cqkOKeJVVIP/S3B2jer6vFlWEqAc5jKkjq
MOBOk5Ww/ybhKjFh9O51V4XJlVUu/wT7Jm2MUwZAOV3hcDbLKf9Kq+O27Um0j+Y9
hnLOUQ7SbDlNCmcPchkuZQRpBgvCIzD7hSJzvOCYv4yWSMgwJGFjGx4nKVGVY7pb
DUTCVzhtSbzgXhY+8NLLpa+fdHo3aVDonA/qvwpLHnsxLFsyTMYMwMPNmBiLcZ3j
mTvZNv/PAgMBAAECggEABargM4sNAfCeY5GCdUrhbRoC9nA8SZJ+2sW4iIAXDclB
7qYf4d93EZ7sy/vv366cvexIMV9azLEx1k5DUULIkUk28MA+fCr9B/Q9DfRqPHlf
0qEgi8EB8/ZDOWttUPOVVPLoNqDCOiOMz2X4dnbH7JnLXOstYEnM71o1j/sk2R+V
MXnjBCQlgHsia4rTlr6bOTSiylhK840WezZZY19I2RxcL7cwMGhmoJzHVDxxKt3B
2hNmma93xkcZ/CVWQn1iwJ8KbOxes3j6bN7gpnmw0Amwqb7HRPBN+tClULNEutij
maOzPpIjCkUI8U2Wm+X66zFvHrr7/EToHeFHOxr1YQKBgQDo4coUooX/pjXXoQA6
cufsuO+CPBoqRQkcll2hxhZ7xNh23jD+ijgP6zbvswqECNpmLr0ZIjFqmHsbsyx9
vXnSVGstgG1jUIVNT8CAMcvu10P9AbYMRhbSh6vtoclIzTLLuPiBXJa7ZuqkDFLp
ruligVS1cbuqCtsF9iX+trrWxwKBgQDgGF2u5fwBLJyMVr46ghnkgpTCSla7+ubj
drWEoviBkysKpFQ5FiUYk1ntOhbfNwv+P4nWlYohu9veTkVC4o7YZmQziWW2prSR
4K8wSEbSMemMzifBguMlM5bS8YDXMdGTMowb3X06UhEbGdC+lQJTXLmSIR2Gfjb+
8pflH+3muQKBgEBfycCSfIACrfeBJdMCWGHzbSGPA5yToMUqO4+wdh6Yd03Edb6m
7oBYAMOZtlpxKA3+9X6xGP/iToWFrdLEQZyGgWn+ij5dz7tjRE8rdLf9AWo6wtv5
s+1WW4xAoKdjMZtm8iqwMWp0NIBMd87o7tKv9X6CheGnRowLUs1qLZOZAoGAZqVi
jBFWTCdmEbZN7jjXqV7SyugIMJStm7UtUfLgR2HkzjwVRAzLsyUThOEdxuLNAImU
FpFqsyb8gChz+z4RVjgYX67owzA697LmLAR/RBqOsutfNHlCmDC4PilW7bspFvaJ
TN44VTVwFmzNu+4/IXYQnknC328Cu+bdApuMeikCgYBCNPTHMIPYBJUkjiqP5eLj
c/f2otClZC5YNYuim9vNgn4m1XbXlig2F9Iq1tFBJjv32/aN4zHhZyVezfCqrYGO
MUQrCPXWd6nGArpQ1WaEQP3Hc3x/3RGQKT6cMr7yeb3go5qCoJBoWZoq/RnTCMws
8VlvpIhZWVAKJvtmLajj1A==
-----END PRIVATE KEY-----`

let publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy9u7NiE8jmtkWMjtAQf4
IRSF0uz+SXQd9xaqCsQVDu/xX9UUg2vCVJVGYVUgQzrKZv5UiRG6UO4W+P0jDzBP
QSnm/Dt3fLHERv4stS1E+OuHKpDiniVVSD/0twdo3q+rxZVhKgHOYypI6jDgTpOV
sP8m4SoxYfTudVeFyZVVLv8E+yZtjFMGQDld4XA2yyn/Sqvjtu1JtI/mPYZyzlEO
0mw5TQpnD3IZLmUEaQYLwiMw+4Uic7zgmL+MlkjIMCRhYxseJylRlWO6Ww1Ewlc4
bUm84F4WPvDSy6Wvn3R6N2lQ6JwP6r8KSx57MSxbMkzGDMDDzZgYi3Gd45k72Tb/
zwIDAQAB
-----END PUBLIC KEY-----`

/*
Import a PEM encoded RSA private key, to use for RSA-PSS signing.
Takes a string containing the PEM encoded key, and returns a Promise
that will resolve to a CryptoKey representing the private key.
*/
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
      // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign']
  )
}

function importRsaKey(pem) {
  // fetch the part of the PEM string between header and footer
  const pemHeader = '-----BEGIN PUBLIC KEY-----'
  const pemFooter = '-----END PUBLIC KEY-----'
  const pemContents = pem.substring(
    pemHeader.length,
    pem.length - pemFooter.length
  )
  // base64 decode the string to get the binary data
  const binaryDerString = window.atob(pemContents)
  // convert from a binary string to an ArrayBuffer
  const binaryDer = str2ab(binaryDerString)

  return window.crypto.subtle.importKey(
    'spki',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: { name: 'SHA-256' },
    },
    true,
    ['verify']
  )
}

let pubkey

importRsaKey(publicKeyPem).then((k) => {
  console.log('pubkey', k)
  pubkey = k
})

const data = new TextEncoder().encode('Привет мир!')
let sig

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
    sig = new Uint8Array(signature)

    return window.crypto.subtle.verify(
      {
        name: 'RSASSA-PKCS1-v1_5',
      },
      pubkey, //from generateKey or importKey above
      sig, //ArrayBuffer of the signature
      data //ArrayBuffer of the data
    )
  })
  .then(function(isvalid) {
    //returns a boolean on whether the signature is true or not
    console.log(isvalid)
  })
