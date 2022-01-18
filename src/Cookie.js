/**
* Sets the cookie at the given identifier to the given value overwritting the existing value
*/

class Cookies{
 setCookie (identifier, value) {
    document.cookie = identifier + "=" + value + "; SameSite=Lax"
  } 

/**
* Checks if identifier is set in cookie
*/
checkIfCookieAttributExists(identifier) {
    return document.cookie
      .split(";")
      .some((item) => item.trim().startsWith(identifier))
  }

/**
* Gets the value of the identifier set in the cookie if it is set else null
*/
getCookieAttribut(identifier) {
    if (this.checkIfCookieAttributExists(identifier)) {
      return document.cookie
        .split("; ")
        .find(row => row.startsWith(identifier))
        .split("=")[1]
    }
    return null
}

/**
* Deletes the value stored at the identifer in cookie
*/
deleteCookieAttribut(identifier) {
    //By setting the cookie expire date to an past date it automatically gets deleted
    document.cookie = identifier + "=; SameSite=Lax; expires=Thu, 18 Dec 2013 12:00:00 UTC"
}

/**
 * Checks the API for the correct user Role
 */
async postCheckUserRole(next){
  await fetch(process.env.VUE_APP_BASEURL + "/auth/pruefeNutzerRolle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: this.getCookieAttribut('username'),
      sessiontoken: this.getCookieAttribut('sessiontoken')
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //This is always the case when the backend returns a package
      if (data.status == "success") {
        if(data.data == 0){
          next('survey')
        } else if (data.data == 1) {
          next()
        } 
      }
      else{
        this.deleteCookieAttribut('username')
        this.deleteCookieAttribut('seesiontoken')
        next('/')
      }
    })
    .catch((error) => {
      //This is always the case when the backend returns nothing -> Timeout
      console.error("Error:", error)
  }); 
}

/**
 * Prueft die Rolle des Nutzers. Wenn Admin leite auf /admin weiter, sonst auf /survey
 */
async postCheckUserRoleForLoginPage(next){
  await fetch(process.env.VUE_APP_BASEURL + "/auth/pruefeNutzerRolle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: this.getCookieAttribut('username'),
      sessiontoken: this.getCookieAttribut('sessiontoken')
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status == "success") {
        if(data.data == 0){
          next('survey')
        } else if (data.data == 1) {
          next('admin')
        } 
      }
      else{
        this.deleteCookieAttribut('username')
        this.deleteCookieAttribut('sessiontoken')
        next(true)
      }
    })
    .catch((error) => {
      //This is always the case when the backend returns nothing -> Timeout
      console.error("Error:", error)
  }); 
}

/**
 * Prüft ob der Nutzer einen noch gueltigen Sessiontoken registriert hat.
 * Falls der Token abgelaufen ist, werden die Cookiedaten geloescht.
 */
async postCheckLogin(next) {
  await fetch(process.env.VUE_APP_BASEURL + "/auth/pruefeSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: this.getCookieAttribut('username'),
      sessiontoken: this.getCookieAttribut('sessiontoken')
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      //This is always the case when the backend returns a package
      if (data.status == "success") {
        next()
      }
      else{
        this.deleteCookieAttribut('username')
        this.deleteCookieAttribut('sessiontoken')
        next("/")
      }
    })
    .catch((error) => {
      //This is always the case when the backend returns nothing -> Timeout
      console.error("Error:", error)
    }); 
  }
}

export default new Cookies