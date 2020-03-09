export function openInNewTab(url) {
  const win = window.open(url, '_blank')
  win.focus()
}

export function isWindowsBuild() {
  const isWindowsBuildCompileFlag = false
  return isWindowsBuildCompileFlag === true
}

export function isWebAppBuild() {
  const isWebAppCompileFlag = ( process.env.NODE_ENV === 'production' && typeof process.env.WEBAPP !== 'undefined' )
  return isWebAppCompileFlag
}

const mobileWindowWidth = 768

export function isMobile() {
  if (window.innerWidth <= mobileWindowWidth) {
    return true
  } else {
    return false
  }
}
