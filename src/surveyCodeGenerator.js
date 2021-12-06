var links = []
for (var i = 0; i < 10; i++) {
  links[i] = createLink(makeid(i));
  console.log(links[i]);
  console.log("\n");
}

function createLink(surveyID) {

  // public key is returned as part of url
  const baseURL = "www.co2rechner.de"; // TODO adjust baseURL
  var encryptedSurveyID = Buffer.from("surveyID=" + surveyID).toString('base64');
  // console.log("encrypted survey id: " + encryptedSurveyID);

  // Okay die aktuellen public keys sind halt einfach VIEL zu lang

  var fullURL = baseURL + "/" + encryptedSurveyID;
  return fullURL;
}


// function decodeLink(link) {
//   // TODO
// }

// We need to remember which codes are currently in use on server side
function makeid() {

  const length = 24; // multiple of 3 needed to avoid equal signs as padding. base64 encryption uses triplets as it seems
  var code;
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  var codeInUse = true;

  while (codeInUse) {
    code = '';
    // generate new code
    for (var i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() *
        characters.length));
    }

    // check if code is in use
    // TODO replace false by server request
    codeInUse = false;
  }
  return code;
}