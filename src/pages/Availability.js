import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Input, Button, Icon, Modal, Row, Col } from 'antd';
import { fetchUnits } from "../state/actions/fetchAction"
import Highlighter from 'react-highlight-words';
import Coming_Soon from "../assets/images/comingsoon.jpg"
import Magnifier from "react-magnifier";
import ReactSVG from 'react-svg'

import svg from "../assets/images/building_svg.svg"
import "../styles/pages/availability.scss"
class HomePage extends Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            data: [],
            currentPlan: Coming_Soon,
            visible: false,
            photoIndex: 0,
            isOpen: false,
            loadedMagnifier: false

        }
    }
    componentDidMount = () => {
        $("#nav-wrapper").addClass("white-nav")

        const { units } = this.props.state
        const data = []
        units ?
            Object.keys(units).map((key, val) => {
                const all = units[key]
                Object.keys(all).map((keys, vals) => {
                    const price = (Math.floor(Math.random() * (9000 - 6000 + 1)) + 534521).toFixed(0);
                    var occupied = Math.random() >= 0.5;
                    var cc = (price * .001).toFixed(0)
                    var ret = (price * .001).toFixed(0)
                    var onSelect = (unit) => this.console.log("selected", unit)
                    // var floorplan = `https://www.ezblueprint.com/examples/floorplan${Math.floor(Math.random() * 44) + 1}.png`
                    Object.assign(units[key][keys], { price }, { occupied }, { cc }, { ret }, { onSelect });
                    return data.push(units[key][keys])
                }

                )
            }) :
            console.log("")
        console.log("data", data)
        this.setState({ data })
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    showFloorplanModal = (currentPlan) => {
        console.log("floorplan", currentPlan)
        const testPlan = "https://www.ezblueprint.com/examples/floorplan1.png"
        this.setState({
            visible: true,
            isOpen: true,
            currentPlan,
        });
    };
    closeFloorplanModal = () => {

        this.setState({
            visible: false,
            currentPlan: "",
            loadedMagnifier: false,
        });
    };

    handleMouseMove = e => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = (e.pageX - left) / width * 100;
        const y = (e.pageY - top) / height * 100;
        this.setState({ backgroundPosition: `${x}% ${y}%` });
    };

    onMouseLeave = (event, record, rowIndex) => {
        const { number } = record
        $(`.st3`).removeClass("selected-box")
    };
    onMouseEnter = (event, record, rowIndex) => {
        const { number } = record
        $(`#unit_x5F_${number === "PH1A" ? "PH1" : number} .st3`).addClass("selected-box")
    };

    render() {
        const { data, currentPlan, loadedMagnifier } = this.state
        const columns = [
            {
                title: 'Unit',
                dataIndex: 'number',
                key: 'number',
                ...this.getColumnSearchProps('number'),
            },
            {
                title: 'Beds',
                dataIndex: 'bedrooms',
                key: 'bedrooms',
            },
            {
                title: 'Baths',
                dataIndex: 'bathrooms',
                key: 'bathrooms',
            },

            {
                title: 'Ext.SqFt',
                dataIndex: 'exterior_sf',
                key: 'exterior_sf',
                render: (exterior_sf) => <span>{parseInt(exterior_sf).toFixed(0)}</span>

            },

            {
                title: 'Int.SqFt',
                dataIndex: 'interior_sf',
                key: 'interior_sf',
                render: (interior_sf) => <span>{parseInt(interior_sf).toFixed(0)}</span>
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'CC',
                dataIndex: 'cc',
                key: 'cc',
            },
            {
                title: 'RET',
                dataIndex: 'ret',
                key: 'ret',
            },
            {
                title: 'Floorplan',
                dataIndex: 'floorplan',
                key: 'floorplan',
                render: (currentPlan) => <Icon onClick={() => this.showFloorplanModal(currentPlan)} type="build" />,
            },
        ];
        const rowSelection = {
            onSelect: this.onSelectChange,
        }
        console.log("state", this.state)
        return (
            <React.Fragment>
                <div className="availability-page">
                    <Row type="flex" justify="end">
                        <Col className="building-col">
                            <ReactSVG className="building-svg" src={svg} />
                        </Col>




                        <Col className="table-col">
                            <Table
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: event => { },
                                        onDoubleClick: event => { },
                                        onContextMenu: event => { },
                                        onMouseEnter: event => { this.onMouseEnter(event, record, rowIndex) },
                                        onMouseLeave: event => { this.onMouseLeave(event, record, rowIndex) },
                                    };
                                }}
                                // onRowClick={unit => this.onSelectChange(unit)}
                                className="unit-table"
                                pagination={{
                                    pageSize: 5
                                }}
                                columns={columns}
                                dataSource={data}
                            />
                        </Col>
                    </Row>
                    <Modal
                        className="floor-plan-modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.closeFloorplanModal}
                        footer={false}
                    >
                        {loadedMagnifier ? <div /> :

                            <Row type="flex" className="loader-wrapper" justify="space-around" align="middle">
                                <Col>
                                    <Icon className="loader" type="loading" />
                                </Col>
                            </Row>
                        }
                        <div onLoad={() => this.setState({ loadedMagnifier: true })}>
                            <Magnifier
                                className="magnifier"
                                src={currentPlan}
                                mgShape="circle"
                                mgShowOverflow={false}
                                mgWidth={250}
                                mgHeight={250}
                                mgMouseOffsetX={0}
                                mgMouseOffsetY={0}
                                mgTouchOffsetX={0}
                                mgTouchOffsetY={0}

                            />
                        </div>


                    </Modal>
                </div>

            </React.Fragment >
        )
    }
}

const mapStateToProps = state => ({
    state: state.fetchReducer
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchUnits
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)