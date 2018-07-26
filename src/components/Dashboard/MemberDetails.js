import React, { Component } from 'react';
import { DropdownButton, MenuItem, Table } from 'react-bootstrap';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class MemberDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchValue: '',
            filteredDataList: [],
            selectedOption: '',
            sortBy: '',
            sortDir: ''
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/profile/')
            .then((res) => res.json())
            .then((result) => {
                console.log('result', result)
                this.setState({ data: result });
            })
    }

    searchBy(value) {
        const { data, selectedOption } = this.state;
        if (selectedOption) {
            console.log('eventKey', selectedOption)
            const tableData = data.filter((info) => {
                return (info[`${selectedOption.label}`].toLowerCase()).includes(value.toLowerCase())
            })
            this.setState({ filteredDataList: tableData })
        }
    }

    // _onFilterChange(cellDataKey, value) {
    //     const { data, filteredDataList } = this.state;
    //     console.log(cellDataKey)
    //     if (!value) {
    //         this.setState({
    //             filteredDataList: data,
    //         });
    //     }
    //     var filterBy = value.toString().toLowerCase();
    //     var size = data.length;
    //     var filteredList = [];
    //     for (var index = 0; index < size; index++) {
    //         var v = data[index][cellDataKey];
    //         if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
    //             filteredList.push(data[index]);
    //         }
    //     }
    //     this.setState({
    //         filteredDataList: filteredList,
    //     });
    //     console.log('filter', filteredDataList)
    // }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    renderDropdownButton() {
        return (
            <Select
                style={{ width: '25%', marginLeft: '35%', marginRight: '35%' }}
                name="form-field-name"
                value={this.state.selectedOption}
                onChange={this.handleChange}
                menuContainerStyle={{ width: '25%', marginLeft: '35%', marginRight: '35%' }}
                options={[
                    { value: 'FullName', label: 'FullName' },
                    { value: 'Fathers_Name', label: 'Fathers_Name' },
                    { value: 'Age', label: 'Age' },
                    { value: 'Address', label: 'Address' },
                    { value: 'Occupation', label: 'Occupation' },
                ]}
            />
            // <DropdownButton
            //     title="Search By"
            //     id={Date.now()}
            // >
            //     <MenuItem eventKey="1" active onSelect={(eventKey) => this.searchBy(eventKey)}>FullName</MenuItem>
            //     <MenuItem eventKey="2" onSelect={(eventKey) => this.searchBy(eventKey)}>Fathers_Name</MenuItem>
            //     <MenuItem eventKey="3" onSelect={(eventKey) => this.searchBy(eventKey)}>Address</MenuItem>
            //     <MenuItem eventKey="4" onSelect={(eventKey) => this.searchBy(eventKey)}>Age</MenuItem>
            // </DropdownButton>
        );
    }

    sortData(key) {
        var sortDir = this.state.sortDir;
        var sortBy = key;
        if (sortBy === this.state.sortBy) {
            sortDir = this.state.sortDir === 'ASC' ? 'DESC' : 'ASC';
        } else {
            sortDir = 'DESC';
        }
        var rows = this.state.data.slice();
        rows.sort((a, b) => {
            var sortVal = 0;
            if (a[sortBy] > b[sortBy]) {
                sortVal = 1;
            }
            if (a[sortBy] < b[sortBy]) {
                sortVal = -1;
            }

            if (sortDir === 'DESC') {
                sortVal = sortVal * -1;
            }
            return sortVal;
        });

        this.setState({ sortBy, sortDir, data: rows });
    }

    render() {
        const { data, filteredDataList, selectedOption, sortBy, sortDir } = this.state;
        console.log('tableData', data);

        let sortDirArrow = "";
        if (sortDir !== null) {
            sortDirArrow = sortDir === 'DESC' ? ' ↓ ' : ' ↑ ';
        }

        return (
            <div style={{ width: '70%', marginLeft: '15%', marginRight: '15%', marginTop: '15px' }}>
                <div>
                    <h4 style={{ float: 'left' }}> Search By </h4>
                    <div style={{ float: 'center' }}>{this.renderDropdownButton()}</div>
                </div>
                <br /><br />
                {selectedOption ?
                    <div className="search">
                        <span className="fa fa-search"></span>
                        <input style={{ width: '300px', height: '35px', borderRadius: '5px' }} type="text" onChange={(e) => this.searchBy(e.target.value)} placeholder="Search..." />
                    </div>
                    : ''}
                <br /><br />

                <Table bordered hover style={{ align: 'center' }}>
                    <thead >
                        <tr>
                            {/* <th>ID</th> */}
                            <th onClick={() => this.sortData('FullName')}>{'FullName' + (sortBy === 'FullName' ? sortDirArrow : '')} </th>
                            <th onClick={() => this.sortData('Fathers_Name')}>{'Fathers Name' + (sortBy === 'Fathers_Name' ? sortDirArrow : '')}</th>
                            <th onClick={() => this.sortData('Age')}>{'Age' + (sortBy === 'Age' ? sortDirArrow : '')}</th>
                            <th onClick={() => this.sortData('Address')}>{'Address' + (sortBy === 'Address' ? sortDirArrow : '')}</th>
                            <th onClick={() => this.sortData('Occupation')}>{'Occupation' + (sortBy === 'Occupation' ? sortDirArrow : '')}</th>
                        </tr>
                        {/* <tr>
                            <td>
                                <input style={{ width: '90%' }} onChange={(e) => this._onFilterChange('FullName', e.target.value)} />
                            </td>
                            <td>
                                <input style={{ width: '90%' }} onChange={(e) => this._onFilterChange('Fathers_Name', e.target.value)} />
                            </td>
                            <td>
                                <input style={{ width: '90%' }} onChange={(e) => this._onFilterChange('Age', e.target.value)} />
                            </td>
                            <td>
                                <input style={{ width: '90%' }} onChange={(e) => this._onFilterChange('Address', e.target.value)} />
                            </td>
                            <td>
                                <input style={{ width: '90%' }} onChange={(e) => this._onFilterChange('Occupation', e.target.value)} />
                            </td>
                        </tr> */}
                    </thead>
                    <tbody>
                        {filteredDataList.length > 0 ?
                            filteredDataList.map((row, id) =>
                                (
                                    <tr key={row.id}>
                                        {/* <td> {row.id} </td> */}
                                        <td> {row.FullName} </td>
                                        <td> {row.Fathers_Name} </td>
                                        <td> {row.Age}</td>
                                        <td> {row.Address} </td>
                                        <td> {row.Occupation} </td>
                                    </tr>
                                )
                            )
                            :
                            data.map((row, id) =>
                                (
                                    <tr key={row.id}>
                                        <td> {row.FullName} </td>
                                        <td> {row.Fathers_Name} </td>
                                        <td> {row.Age}</td>
                                        <td> {row.Address} </td>
                                        <td> {row.Occupation} </td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default MemberDetails;