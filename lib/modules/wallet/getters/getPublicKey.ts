const axios = require("axios");

export interface Response {
  publicKeyId: string;
  publicKeyX: string;
  publicKeyY: string;
  deviceData: object;
}

export default async function getPublicKey(
  apikey: string,
  publicKeyId: string
): Promise<any> {
  const apiUrl = `https://api.connect.cometh.io/webauthn-signer/public-key-id/${publicKeyId}`;

  const headers = {
    apikey,
  };

  return axios
    .get(apiUrl, { headers })
    .then(function (res: any) {
      let response: Response = {
        publicKeyId: res.data.webAuthnSigner.publicKeyId,
        publicKeyX: res.data.webAuthnSigner.publicKeyX,
        publicKeyY: res.data.webAuthnSigner.publicKeyY,
        deviceData: res.data.webAuthnSigner.deviceData,
      };

      return response;
    })
    .catch(function (error: string) {
      console.error("API Error:", error);
    });
}
