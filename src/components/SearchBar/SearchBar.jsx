import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

const SearchBar = ({searchTerm,onSearch}) => {
	const handleSearch = (e) => {
		onSearch(e.target.value);
	};
	return (
		<InputGroup>
			<InputLeftElement pointerEvents="none">
				<SearchIcon color="gray.300" />
			</InputLeftElement>
			<Input
				onChange={handleSearch}
				type="search"
				value={searchTerm}
				placeholder="Search"
				border="2px solid"
				borderColor="black"
				borderRadius="1rem"
				w="40%"
				_focus={{
					borderColor: "black",
					boxShadow: "none",
					outline: "none",
				}}
			/>
		</InputGroup>
	);
};

export default SearchBar;
