import React from 'react';

const DiscoInput = ({ id, onChange, value, label }) => (
	<label>{label}
		<input id={id} onChange={onChange} value={value} />
	</label>
);

export default DiscoInput;