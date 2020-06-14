import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';

function SearchInput({ onClick, onChange, fullWidth }) {
	const [ searchTerm, setSearchTerm ] = useState('');

	const handleChange = ({ target }) => {
		setSearchTerm(target.value);
		onChange && onChange(target.value.toLowerCase());
	};

	const handleClick = () => {
		onClick && onClick(searchTerm.toLowerCase());
	};

	return (
		<FormControl variant="outlined" fullWidth={fullWidth}>
			<InputLabel htmlFor="search">Pesquisar</InputLabel>
			<OutlinedInput
				type="text"
				id="search"
				name="search"
				value={searchTerm}
				onChange={handleChange}
				endAdornment={
					<InputAdornment position="end">
						<IconButton onClick={handleClick} edge="end">
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				}
				labelWidth={72}
			/>
		</FormControl>
	);
}

SearchInput.propTypes = {
	onChange: PropTypes.func,
	onClick: PropTypes.func,
	fullWidth: PropTypes.bool,
};

export default SearchInput;
