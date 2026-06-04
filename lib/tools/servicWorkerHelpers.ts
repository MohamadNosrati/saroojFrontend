class ServicWorkerHelpers {

  registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      throw new Error("Service Workers are not supported");
    }

    return navigator.serviceWorker.register("/sw.js");
  }
}

export const servicWorkerHelpers = new ServicWorkerHelpers();