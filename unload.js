window.addEventListener('beforeunload', ev => {
    ev.returnValue = 
        'Are you sure you want to leave?';
});
const data = JSON.stringify({ action: 'close',
 when: +new Date
});
window.addEventListener('beforeunload', ev => {
    navigator.sendBeacon('/analytics', data);
});
const pendingOps = new Set();

function updatePage() {
    const promise = fetch('/new-content');


pendingOps.add(promise);

const cleanup = 
    () => pendingOps.delete(promise);
promise.then(cleanup).catch(cleanup);
}