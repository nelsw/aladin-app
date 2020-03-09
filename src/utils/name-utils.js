// import log4js from 'log4js'

// const logger = log4js.getLogger(__filename)

export function isAAladinName(s) {
  return /^[a-z0-9_-]+\.[a-z0-9_-]+$/.test(s);
}

export function isAAladinIDName(s) {
  return /^[a-z0-9_]+\.id$/.test(s);
}

export function isAAladinAppName(s) {
  return /^[a-z0-9-]+\.app$/.test(s);
}

export function hasNameBeenPreordered(domainName, localIdentities) {
  let nameHasBeenPreordered = false;
  localIdentities.map(identity => {
    if (identity.username === domainName) {
      nameHasBeenPreordered = true;
    }
    return null;
  });
  return nameHasBeenPreordered;
}

export function isNameAvailable(lookupUrl, domainName) {
  // console.log(domainName);
  return new Promise((resolve, reject) => {
    const url = lookupUrl.replace('{name}', domainName);
    fetch(url)
      .then(response => {
        if (response.ok) {
          resolve(false);
        } else if (response.status === 404) {
            resolve(true)
          } else {
            // logger.error('isNameAvailable', response)
            reject('Error')
          }
      })
      .catch(error => {
        // logger.error('isNameAvailable', error)
        reject(error);
      });
  });
}

/**
 * Performs a basic check to differentiate subdomains from other Aladin
 * names
 * @param  {String}  name a Aladin name
 * @return {Boolean} `true` if it is a subdomain, otherwise false
 */
export function isSubdomain(name) {
  return name.split('.').length === 3;
}

/**
 * Given a aladin subdomain name, returns the
 * parent domain.
 * @param  {String} name a Aladin subdomain name
 * @return {String}  the parent domain without leading period
 */
export function getNameSuffix(name) {
  if (!isSubdomain(name)) {
    throw new Error('Only works with subdomains');
  }
  const nameTokens = name.split('.');
  const suffix = name.split(`${nameTokens[0]}.`)[1];
  return suffix;
}

export function getNamePrices(priceUrl, domainName) {
  return new Promise((resolve, reject) => {
    if (!isAAladinName(domainName)) {
      reject('Not a Aladin name');
      return;
    }

    const url = `${priceUrl.replace('{name}', domainName)}?single_sig=1`;

    fetch(url)
      .then()
      .then(response => {
        if (response.ok) {
          response
            .text()
            .then(responseText => JSON.parse(responseText))
            .then(responseJson => {
              resolve(responseJson);
            });
        } else {
          // logger.error('getNamePrices: error parsing price result')
          reject('Error');
        }
      })
      .catch(error => {
        // logger.error('getNamePrices: error retrieving price', error)
        reject(error);
      });
  });
}
