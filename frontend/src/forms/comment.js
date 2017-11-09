import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { required } from './index';

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
                        validate={[required]}
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
                        validate={[required]}
                        placeholder="Enter post body"
                    />
                </div>
            </div>
        </form>
    )
};

_Comment_.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

const CommentForm = reduxForm({
    form: 'comment_form'
})(_Comment_);

export default connect(
    null,
    null
)(CommentForm);
