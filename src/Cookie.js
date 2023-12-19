class Cookies{
	/**
	 * Sets the cookie at the given identifier to the given value overwritting the existing value. Duration is given in days.
	 */
	setCookie (identifier, value, duration) {
		let date = new Date()
		date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000))

		document.cookie = identifier + "=" + value + "; SameSite=Lax; expires=" + date.toUTCString() 
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
}
   
export default new Cookies