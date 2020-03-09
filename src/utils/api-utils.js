import hash from 'hash-handler';
// import log4js from 'log4js';
import { ALADIN_STATE_VERSION_KEY } from '../App';

// const logger = log4js.getLogger(__filename);
export function authorizationHeaderValue(coreAPIPassword) {
  return `bearer ${coreAPIPassword}`;
}

export function getCoreAPIPasswordFromURL() {
  const coreAPIPassword = hash.getInstance().get('coreAPIPassword');
  if (!coreAPIPassword || coreAPIPassword === 'off') {
    return null;
  }
  hash.getInstance().set('coreAPIPassword', 'off');
  return coreAPIPassword;
}

export function getLogServerPortFromURL() {
  const logServerPort = hash.getInstance().get('logServerPort');
  if (!logServerPort || logServerPort === 'off') {
    return null;
  }
  hash.getInstance().set('logServerPort', 'off');
  return logServerPort;
}

export function getRegTestModeFromURL() {
  const regTestMode = hash.getInstance().get('regtest');
  if (!regTestMode || regTestMode === 'off') {
    return null;
  }
  hash.getInstance().set('regtest', 'off');
  return regTestMode === '1';
}

function findAndSetApiUrls(
  api,
  regTestMode,
  coreAPIPassword,
  toFindUrl,
  toSetUrl
) {
  const apiOut = { ...api, regTestMode, coreAPIPassword };
  Object.keys(apiOut).forEach(key => {
    const value = apiOut[key];
    if (typeof value === 'string' || value instanceof String) {
      if (value.startsWith(toFindUrl)) {
        const suffix = value.slice(toFindUrl.length);
        apiOut[key] = `${toSetUrl}${suffix}`;
      }
    }
  });

  return apiOut;
}

/*
 * Returns true if the current state version is a legacy version
 *  which relies on localhost:6270 -- this is true if the
 *  existing state version is < 13 (when we migrated away from shipping a
 *  local api endpoint)
 * @returns {boolean}
 * @private
 */
export function hasLegacyCoreStateVersion() {
  let existingVersion = localStorage.getItem(ALADIN_STATE_VERSION_KEY);
  if (!existingVersion) {
    existingVersion = 0;
  }
  return existingVersion < 13;
}

/* Expects a JavaScript object with a key containing the config for each storage
 * provider
 * Example:
 * const config = { dropbox: { token: '123abc'} }
 */
export function setCoreStorageConfig() {
  // logger.debug('setCoreStorageConfig called in a core-less build');
  return Promise.resolve('OK');
}
