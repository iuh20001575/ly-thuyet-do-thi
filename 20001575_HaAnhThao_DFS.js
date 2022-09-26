function Stack() {
    const stack = [];

    return {
        push(item) {
            return stack.push(item);
        },

        pop() {
            return stack.pop();
        },

        peek() {
            return stack[this.length - 1];
        },

        get length() {
            return stack.length;
        },

        isEmpty() {
            return this.length === 0;
        },
    };
}

/**
 * DFS
 * @param {*} dsKe danh sách kề
 * @param {*} start đỉnh bắt đầu duyệt
 * @returns một object gồm: thứ tự duyệt và cây duyệt DFS được biểu diễn bằng danh sách kề
 */
function DFS(dsKe, start) {
    const stack = Stack();
    const v = [start];
    const d = { [start]: [] };
    stack.push(start);

    while (stack.length > 0) {
        const top = stack.peek();
        const arrTop = dsKe[top];
        for (let i = 0; i < arrTop.length; i++)
            if (!v.includes(arrTop[i])) {
                stack.push(arrTop[i]);
                v.push(arrTop[i]);
                if (d[top]) d[top].push(arrTop[i]);
                else d[top] = [arrTop[i]];
                break;
            } else if (i === arrTop.length - 1) stack.pop();
    }

    console.log(`Thứ tự duyệt: ${v.join(', ')}`);
    console.log('Danh sách kề DFS: ', d);
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

DFS(dsKe, 1);
