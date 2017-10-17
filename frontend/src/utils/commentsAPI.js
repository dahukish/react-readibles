const headers = new Headers({
    'Authorization': 'ds123',
    'Content-Type': 'application/json; charset=utf-8'
});

const requestBuilder = (postIDs) => {
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
            }).reduce((accumulator, currentValue) => {
                return accumulator.concat(currentValue);
            });
        });
};

export const addComment = (commentValues) => {
    console.log('commentValues', commentValues);
    return fetch('http://localhost:3001/comments', {
        headers,
        method: 'post',
        body: JSON.stringify(commentValues)
    })
        .then(res => res.json())
        .then(data => data);
};

export const updateComment = (id, commentValues) => {
    return fetch(`http://localhost:3001/comments/${id}`, {
      headers,
      method: 'put',
      body: JSON.stringify(commentValues)
    })
      .then(res => res.json())
      .then(data => data);
  };

  export const deleteComment = (id) => {
    return fetch(`http://localhost:3001/comments/${id}`, {
      headers,
      method: 'delete'
    })
      .then(res => res.json())
      .then(data => data);
  };