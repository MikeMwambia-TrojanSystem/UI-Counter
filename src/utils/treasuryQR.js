const QRCode = require('qrcode');

function treasuryQR(treasury){
return QRCode.toDataURL(treasury).then(url => {
    return url;
  }).catch(err => {
    return err;
  })
}

export default treasuryQR;