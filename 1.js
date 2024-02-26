const fs = require('fs');


/**
 * @param {number} n 
 * @param {number[]} dependencies 
 * @returns {number[] | 0}
 */
function solve(n, dependencies) {
    let queue = []; // int[]

    const targets = Array(n);
    const byLength = Array(n);
    const visited = Array(n).fill(false);
    let visitedN = 0;
    const prev = Array(n).fill(-1);
    
    for(let i=0; i<n; i++) {
        const el = dependencies[i];
        const reversed = -el-1;
        
        if(el > 0) {
            if(!byLength[el]) {
                byLength[el] = [i]
            } else {
                byLength[el].push(i);
            }
            continue;
        }
        if(el === 0) {
            queue.push(i)
            continue;
        }
        
        if (!targets[reversed]) {
            targets[reversed] = [i];
        } else {
            targets[reversed].push(i);
        }
    }

    let last = -1;
    let queueIdx = -1;
    while(visitedN !== n) {
        ++queueIdx;

        const cur = queue[queueIdx];
        if (cur === undefined) { return 0; }
        prev[cur] = last;
        last = cur;

        visited[cur] = true;
        ++visitedN;

        let unlocked = targets[cur] ?? [];
        queue.push(...unlocked);

        unlocked = byLength[visitedN] ?? [];
        queue.push(...unlocked)
    }

    let cur = last;
    let path = [last];
    while(prev[cur] !== -1) {
        cur = prev[cur]
        path.push(cur)
    }

    return path.reverse();
}

try {
    const lines = fs.readFileSync('input.txt', 'utf-8').split('\n');
    const n = Number(lines[0]);
    const dependencies = lines[1].split(' ').map(Number);

    const result = solve(n, dependencies);

    if (result === 0) {
        fs.writeFileSync('output.txt', "0");
        return;
    }

    fs.writeFileSync('output.txt', result.map((a) => a + 1).join(' '));
} catch (error) {
    console.error('An error occurred:', error);
}
