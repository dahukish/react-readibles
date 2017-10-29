export const sortBy = (sortBy, order) => {
    return (a, b) => {
        return (order === 'desc') ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    };
};

export const commentsFilter = (comments, currentPost) => {
    return comments.filter(comment => comment.parentId === currentPost.id).length || 0;
}