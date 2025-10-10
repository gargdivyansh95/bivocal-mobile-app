// export const debounce = (func, delay) => {
//     let timeout;
//     return (...args) => {
//         clearTimeout(timeout);
//         timeout = setTimeout(() => func(...args), delay);
//     };
// };

export const debounce = (func, delay) => {
    let timeout;
    const debounced = (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
    debounced.cancel = () => {
        clearTimeout(timeout);
    };
    return debounced;
};
