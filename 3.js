const pf = require('./pf.js');
pf(Number.MAX_SAFE_INTEGER)

const fa = (v) => fetch('https://game.yandex?value='+v.toLocaleString('fullwide', {useGrouping:false}))

const solve = async () => {
    let l = 0;
    let r = Number.MAX_SAFE_INTEGER;

    while (l < r) {
        const m = Math.floor((l + r) / 2);
        const res = await fa(m).then((res) => res.json());
        
        if(res?.error) {
            console.error(res.error);
            return new Error(res.error);
        }

        const resP = res?.result;

        if(resP === 'equal') {
            return m;
        } else if (resP === 'more') {
            l = m + 1;
        } else if(resP === 'less') {
            r = m;
        }
    }

    return l;
}

solve()
module.exports = solve;
