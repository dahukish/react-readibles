import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

const _Comment_ = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={(handleSubmit)}>
            <div>
                <label>Comment Author</label>
                <div>
                    <Field
                        name="author"
                        id="author"
                        component="input"
                        type="text"
                        placeholder="Enter Author name"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="employed">Comment Content</label>
                <div>
                    <Field
                        name="body"
                        id="body"
                        component="textarea"
                        placeholder="Enter post body"
                    />
                </div>
            </div>
        </form>
    )
};


const CommentForm = reduxForm({
    form: 'comment_form'
})(_Comment_);

export default connect(
    null,
    null
)(CommentForm);
