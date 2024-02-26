/**
 * @param {()=>T} sendNotification
 * @return {[()=>void, ()=>void]} - array of two functions
*/
function solution(sendNotification) {
    let timeouts = {};
    let messages = {};

    let starts = {
        //  [name]: number
    };
    let timeoutId = null;
    // uses longest timeout to dispatch messages
    // and sends single object with {[name]: [messages]}
    const dispatch = (name) => {
        if(name !== null) {
            starts[name] = Date.now();
        }

        let newTimeout = Object.keys(starts)
            .map(el => {
                console.log(starts[el], timeouts[el])
                return starts[el] + timeouts[el];
            })
            .filter(a=>!isNaN(a))
            .sort((a, b) => b - a)[0];

        clearTimeout(timeoutId);
        

        console.log(newTimeout)
        if (isNaN(newTimeout)) {
            return;
        }

        timeoutId = setTimeout(() => {
            sendNotification(messages);
            messages = {};
            starts = {};
        }, newTimeout - Date.now());
    }

    /**
     * 
     * @param {string} name 
     * @param {*} message 
     */
    function onMessage(name, message) {
        messages[name] = message;
        dispatch(name);
    }

    /**
     * 
     * @param {string} name 
     * @param {number} time 
     * @returns {()=>void}
     */
    function addTimeout(name, time) {
        timeouts[name] = time;
        return (message) => onMessage(name, message);
    }

    /**
     * @param {string} name
     */
    function removeTimeout(name) {
        delete timeouts[name];
        delete messages[name];
        dispatch(null);
    }

    return [addTimeout, removeTimeout];
}