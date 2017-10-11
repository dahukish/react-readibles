export const getCategories = () => {
    const headers = new Headers({
        'Authorization': 'ds123'
    });

    return fetch(`http://localhost:3001/categories`, {
        headers,
        method: 'get'
    })
        .then(res => res.json())
        .then(data => data);
};
