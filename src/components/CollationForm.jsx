import React from 'react'

import FormElementContainer from './FormElementContainer.jsx'

import ControlledVocabularyInput from './form-elements/ControlledVocabularyInput.jsx'
import TextInput from './form-elements/TextInput.jsx'
import TextArea from './form-elements/TextArea.jsx'

const T = React.PropTypes

const WorkMetadataForm = React.createClass({
    propTypes: {
	data: T.object.isRequired,
	getAutocompleteTerms: T.func.isRequired,
	onAddValueField: T.func.isRequired,
	onChange: T.func.isRequired,
	onRemoveValueField: T.func.isRequired,
	onSubmit: T.func.isRequired,
	schema: T.array.isRequired,
	autocompleteTerms: T.object,
    },
    
    getDefaultProps: function () {
	return {
	    autocompleteTerms: {},
	}
    },

    mapFormElements: function () {
	const schema = this.props.schema
	const data = this.props.data

	return schema.map((scheme, index) => {
	    const key = scheme.name
	    const label = scheme.label || key

	    // skip schema things for which we don't have data
	    if (!data.hasOwnProperty(key))
		return

	    const values = data[key]

	    // for now, skip single values
	    // (later, these will either be ReadOnly or we'll somehow set it straight)
	    if (!Array.isArray(values))
		return

	    if (!values.length)
		values.push('')

	    // for now, skip object values
	    if (Object.prototype.toString.call(values[0]) === '[object Object]')
		return

	    const InputElement = this.determineFormElement(scheme)

	    const wrapperProps = {
		    ...this.props,
		key: key+'-wrapper',
		label,
		onAddValueField: this.handleAddValueField.bind(null, key),
		onChange: this.handleChange.bind(null, key),
		onRemoveValueField: this.handleRemoveValueField.bind(null, key),
	    }

	    const inputProps = {}

	    if (InputElement.displayName === 'ControlledVocabularyInput') {
		inputProps.vocabulary = this.getAutocompleteTerms(scheme.authorities)
	    }

	    // when creating each value element, be sure to include the value
	    // as part of the `key` prop. if it's omitted, when the element is
	    // supposed to be removed from the DOM, React will see the key
	    // `prop0` (for example) for the element and assume that, because
	    // it still exists, that it shouldn't be re-rendered. using keys
	    // like `prop0val` and `prop1val2` will ensure that when `prop0val`
	    // is removed, the previously-second value will now have the key
	    // `prop0val2`, which indicates that it's a different element
	    return (
		    <FormElementContainer {...wrapperProps}>
		    {values.map((v, i) => (
			    <InputElement
			{...inputProps}
			key={key+i+(v||'empty')}
			value={v}
			    />
		    ))}
		</FormElementContainer>
	    )

	})
    },

    render: function () {
	return (
		<form onSubmit={this.handleSubmit}>
		{this.mapFormElements()}
		<button onClick={this.handleSubmit}>Submit changes</button>
		</form>
	)
    },
})

export default CollationForm
