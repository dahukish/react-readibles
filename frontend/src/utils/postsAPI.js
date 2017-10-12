const headers = new Headers({
  'Authorization': 'ds123',
  'Content-Type': 'application/json; charset=utf-8'
});

export const getPosts = () => {
  return fetch(`http://localhost:3001/posts`, {
    headers,
    method: 'get'
  })
    .then(res => res.json())
    .then(data => data);
};

export const getPost = (id) => { };

export const voteForPost = (id, vote) => {
  return fetch(`http://localhost:3001/posts/${id}`, {
    headers,
    method: 'post',
    body: JSON.stringify({ option: vote })
  })
    .then(res => res.json())
    .then(data => data);
};

export const createPost = (postValues) => {
  return fetch('http://localhost:3001/posts', {
    headers,
    method: 'post',
    body: JSON.stringify(postValues)
  })
    .then(res => res.json())
    .then(data => data);
};

export const deletePost = (id) => {
  return fetch(`http://localhost:3001/posts/${id}`, {
    headers,
    method: 'delete'
  })
    .then(res => res.json())
    .then(data => data);
};