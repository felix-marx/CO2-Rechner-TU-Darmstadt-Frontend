import Cookies from "./Cookie";

class Authentication{
   /**
    * Prüft ob der Nutzer einen noch gueltigen Sessiontoken registriert hat.
    * Falls der Token abgelaufen ist, werden die Cookiedaten geloescht.
    */
   async postCheckLogin() {
     let request = await fetch(process.env.VUE_APP_BASEURL + "/auth/pruefeSession", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         username: Cookies.getCookieAttribut('username'),
         sessiontoken: Cookies.getCookieAttribut('sessiontoken')
       }),
     })
     let response = await request.json()

     return response
   }
}
   
   export default new Authentication