/**
 * Tìm cây khung nhỏ nhất
 * Thuật toán Kruskal
 */

const maxInt = Number.MAX_SAFE_INTEGER;

/**
 * Thuật toán kruskal
 * @param {*} arr ma trận kề
 * @param {*} labels tên các đỉnh của ma trận
 */
function kruskal(arr, labels) {
    const c = [];

    /**
     * Lấy danh sách các cạnh, trọng số, 2 đỉnh của cạnh và thêm vào mảng c
     */
    arr.forEach((item, index) => {
        for (let i = 0; i <= index; i++) {
            if (item[i] !== maxInt)
                c.push({
                    trongSo: item[i],
                    viTri: [index, i],
                });
        }
    });

    /**
     * Sắp xếp các cạnh theo trọng số tăng dần
     */
    const cSort = c.sort((a, b) => a.trongSo - b.trongSo);

    let count = 1;
    let sum = cSort[0].trongSo;
    const v = new Array(arr.length).fill(null);
    const doThi = [cSort[0].viTri];
    const d = {
        [cSort[0].viTri[0]]: [cSort[0].viTri[1]],
    };

    v[cSort[0].viTri[0]] = 0;
    v[cSort[0].viTri[1]] = 0;

    cSort.forEach((item, index) => {
        if (index === 0) return;

        const { viTri, trongSo } = item;
        if (v[viTri[0]] === v[viTri[1]]) {
            if (v[viTri[0]] !== null) {
                return;
            }
            v[viTri[0]] = count;
            v[viTri[1]] = count;
            count++;
            doThi.push(viTri);
            d[viTri[0]] = [viTri[1]];
            sum += trongSo;
            return;
        }
        // TH số vs null
        if (v[viTri[0]] === null || v[viTri[1]] === null) {
            let indexNumber = viTri[0],
                indexNull = viTri[1];

            if (v[viTri[0]] === null) {
                indexNull = viTri[0];
                indexNumber = viTri[1];
            }
            v[indexNull] = v[indexNumber];
            doThi[v[indexNumber]].push(indexNull);
            if (d[indexNumber]) d[indexNumber].push(indexNull);
            else d[indexNumber] = [indexNull];
            sum += trongSo;

            return;
        }

        // TH số vs số
        let vt0 = Math.min(v[viTri[0]], v[viTri[1]]);
        let vt1 = Math.max(v[viTri[0]], v[viTri[1]]);
        doThi[vt0].push(...doThi[vt1]);
        for (let i = 0; i < v.length; i++) if (v[i] === vt1) v[i] = vt0;
        doThi.splice(vt1, 1);
        d[viTri[0]].push(viTri[1]);
        sum += trongSo;
    });

    console.log('Danh sách kề cây khung nhỏ nhất');
    if (labels)
        Object.keys(d).forEach((item) => {
            console.log(`${labels[+item]}: [${d[item].map((i) => labels[i])}]`);
        });
    else console.log(d);
    console.log(`Tổng trọng số: ${sum}`);
}

const arr = [
    [maxInt, 33, 17, maxInt, maxInt, maxInt],
    [33, maxInt, 18, 20, maxInt, maxInt],
    [17, 18, maxInt, 16, 4, maxInt],
    [maxInt, 20, 16, maxInt, 9, 8],
    [maxInt, maxInt, 4, 9, maxInt, 14],
    [maxInt, maxInt, maxInt, 8, 14, maxInt],
];
const labels = [1, 2, 3, 4, 5, 6];

kruskal(arr, labels);
