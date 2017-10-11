
const requestBuilder = (postIDs) => {
    const headers = new Headers({
        'Authorization': 'ds123'
    });
    return postIDs.map(id => {
        return fetch(`http://localhost:3001/posts/${id}/comments`,
            {
                headers,
                method: 'get'
            })
            .then(function (res) {
                return res.json();
            });
    });
};

export const getAllComments = (postIDs) => {
    return Promise.all(requestBuilder(postIDs))
        .then(data => {
            return data.filter(item => {
                return item.length >= 1;
            }).reduce((accumulator, currentValue)=>{
                return accumulator.concat(currentValue);
            });
        });
};
