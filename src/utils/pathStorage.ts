export function getPrevPath() {
  return localStorage.getItem('prevPath') || '/';
}

export function getCurrentPath() {
  return localStorage.getItem('currentPath') || '/';
}

export function setPathValue(currentUrl: string) {
  const prevPath = getCurrentPath() || '/';
  if (prevPath !== currentUrl) {
    localStorage.setItem('prevPath', prevPath);
    localStorage.setItem('currentPath', currentUrl);
  }
}
