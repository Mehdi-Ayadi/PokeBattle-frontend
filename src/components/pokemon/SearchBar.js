import React from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';

export default function SearchBar(props) {
    const { handleChangeSearch, search } = props

    return (
        <Form classsName='SearchBar'>
            <InputGroup className="mb-3">
                <FormControl
                    onChange={handleChangeSearch}
                    placeholder="Search pokemon"
                    value={search}
                />
            </InputGroup>
        </Form>
    )
}