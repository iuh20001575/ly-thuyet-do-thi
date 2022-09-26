function Queue() {
    const queue = [];

    return {
        push(item) {
            return queue.push(item);
        },
        font() {
            return queue[0];
        },

        back() {
            return queue[this.length - 1];
        },

        pop() {
            return queue.shift();
        },

        get length() {
            return queue.length;
        },

        isEmpty() {
            return queue.length === 0;
        },
    };
}

/**
 * BFS
 * @param {*} dsKe danh sách kề của đồ thị cần duyệt
 * @param {*} start đỉnh bắt đầu duyệt
 * @returns
 */
function BFS(dsKe, start) {
    const queue = Queue();
    const v = [start];
    const d = { [start]: [] };
    queue.push(start);

    while (queue.length > 0) {
        const font = queue.font();

        dsKe[font].forEach((item) => {
            if (!v.includes(item)) {
                queue.push(item);
                v.push(item);

                if (d[font]) d[font].push(item);
                else d[font] = [item];
            }
        });

        queue.pop();
    }

    console.log(`Thứ tự duyệt: ${v.join(', ')}`);
    console.log('Danh sách kề BFS: ', d);
}

// Danh sách kề của đồ thị cần duyệt
const dsKe = {
    1: [2, 3],
    2: [1, 4, 5, 8],
    3: [1, 4],
    4: [2, 3, 6, 7, 9, 10],
    5: [2, 8],
    6: [4, 7, 9, 10],
    7: [4, 6, 9, 11],
    8: [2, 5],
    9: [4, 6, 7, 11],
    10: [4, 6],
    11: [7, 9],
};
BFS(dsKe, 1);

// const dsKe = {
//     A: ['B', 'C'],
//     B: ['A', 'D', 'E', 'H'],
//     C: ['A', 'D'],
//     D: ['B', 'C', 'F', 'G', 'I', 'J'],
//     E: ['B', 'H'],
//     F: ['D', 'G', 'I', 'J'],
//     G: ['D', 'F', 'I', 'K'],
//     H: ['B', 'E'],
//     I: ['D', 'F', 'G', 'K'],
//     J: ['D', 'F'],
//     K: ['G', 'I'],
// };
// BFS(dsKe, 'A');
