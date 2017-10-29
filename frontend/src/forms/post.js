import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getCategories } from '../selectors';

const _post_ = props => {
    const { handleSubmit } = props
    return (
        <form onSubmit={(handleSubmit)}>
            <div>
                <label>Post Title</label>
                <div>
                    <Field
                        name="title"
                        id="title"
                        component="input"
                        type="text"
                        placeholder="Enter title"
                    />
                </div>
            </div>
            <div>
                <label>Post Author</label>
                <div>
                    <Field
                        name="author"
                        id="author"
                        component="input"
                        type="text"
                        placeholder="Enter author"
                    />
                </div>
            </div>
            <div>
                <label>Post Category</label>
                <div>
                    <Field name="category" component="select">
                        <option />
                        {
                            props.categories && props.categories.map(category => (
                                <option key={category.path} value={category.name}>{category.name}</option>
                            ))
                        }
                    </Field>
                </div>
            </div>
            <div>
                <label htmlFor="employed">Post Content</label>
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

_post_.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired
};

const PostForm = reduxForm({
    form: 'post_form'
})(_post_);

const mapStateToProps = (state) => {
    return {
        categories: getCategories(state)
    };
};

export default connect(
    mapStateToProps,
    null
)(PostForm);
