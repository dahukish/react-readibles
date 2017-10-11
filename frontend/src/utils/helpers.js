export const sortBy = (sortBy, order) => {
    console.log(sortBy, order);
    return (a, b) => {
        return (order === 'desc') ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    };
};