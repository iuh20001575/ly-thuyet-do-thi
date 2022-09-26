const maxInt = Number.MAX_SAFE_INTEGER;
// const matrix = [
//     [maxInt, 33, 17, maxInt, maxInt, maxInt],
//     [33, maxInt, 18, 20, maxInt, maxInt],
//     [17, 18, maxInt, 16, 4, maxInt],
//     [maxInt, 20, 16, maxInt, 9, 8],
//     [maxInt, maxInt, 4, 9, maxInt, 14],
//     [maxInt, maxInt, maxInt, 8, 14, maxInt],
// ];
// const labels = [1, 2, 3, 4, 5, 6];

const matrix = [
    [maxInt, 2, maxInt, 7, maxInt, 2, maxInt],
    [2, maxInt, 1, 4, 3, 5, maxInt],
    [maxInt, 1, maxInt, maxInt, 4, 4, maxInt],
    [7, 4, maxInt, maxInt, 1, maxInt, 5],
    [maxInt, 3, 4, 1, maxInt, maxInt, 7],
    [2, 5, 4, maxInt, maxInt, maxInt, maxInt],
    [maxInt, maxInt, maxInt, 5, 7, maxInt, maxInt],
];
const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

prim(matrix, labels, 'G');

function prim(matrix, labels, start) {
    let index = labels.indexOf(start);
    const length = matrix.length;
    const arr = new Array(length).fill(null);
    const c = [labels[index]];
    const d = [];
    let sum = 0;

    arr[index] = {
        value: '-',
    };

    while (arr.filter((i) => i?.value === '-').length < length) {
        let indexMin = null;
        matrix[index].forEach((item, _index) => {
            if (arr[_index]?.value === '-') return;
            if (arr[_index] === null || item < arr[_index].value)
                arr[_index] = {
                    value: item,
                    label: labels[index],
                };
            if (indexMin === null || arr[_index]?.value < arr[indexMin]?.value)
                indexMin = _index;
        });
        sum += arr[indexMin].value;
        arr[indexMin].value = '-';
        c.push(labels[indexMin]);
        d.push([arr[indexMin].label, labels[indexMin]]);
        index = indexMin;
    }

    console.log(`Đỉnh: ${c.join(', ')}`);
    console.log(`Cạnh: ${d.map((i) => i.join('')).join(', ')}`);
    console.log(`Độ dài cây khung nhỏ nhất: ${sum}`);
}
