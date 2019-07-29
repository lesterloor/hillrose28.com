import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import "../styles/contact.scss"
import { Form, Input, Radio, Row, Button, } from 'antd';

class ContactPage extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    componentDidMount = () => {
        console.log("loaded, residences")

    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="contact-container">
                <Row>
                    <div className="contact-form-container" >
                        <h3>
                            <span>SCHEDULE A TOUR</span>
                            <br />
                            AT YOUR CONVENIENCE
                            </h3>
                        <p>
                            Please contact us to schedule a private<br /> tour of our onsite model residences
                            </p>
                        <Form onSubmit={this.handleSubmit}>
                            <Row className="input-row" type="flex" justify="end">
                                <Form.Item className="name-item first-name">
                                    {getFieldDecorator('first-name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your First name!',
                                            },
                                        ],
                                    })(
                                        <div>
                                            <Input />
                                            <p className="input-label">First name*</p>
                                        </div>
                                    )}
                                </Form.Item>
                                <Form.Item className="name-item last-name">
                                    {getFieldDecorator('last-name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your Last name!',
                                            },
                                        ],
                                    })(
                                        <div>
                                            <Input />
                                            <p className="input-label">Last name*</p>
                                        </div>

                                    )}
                                </Form.Item>
                                <Form.Item className="contact-form-item">
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ],
                                    })(
                                        <div>
                                            <Input />
                                            <p className="input-label">Email*</p>
                                        </div>

                                    )}
                                </Form.Item>
                                <Form.Item className="contact-form-item broker">
                                    {getFieldDecorator('broker')(
                                        <Radio.Group>
                                            <span className="broker-text">Are you a broker?</span>
                                            <Radio value="true">Yes</Radio>
                                            <Radio value="false">No</Radio>
                                        </Radio.Group>,
                                    )}
                                </Form.Item>
                                <Form.Item className="contact-form-item">
                                    {getFieldDecorator('notes', {
                                    })(
                                        <div>
                                            <Input />
                                            <p className="input-label">Notes</p>
                                        </div>

                                    )}
                                </Form.Item>

                            </Row>

                            <Form.Item >
                                <Button className="submit-btn" type="primary" htmlType="submit">
                                    Submit
                                    </Button>

                            </Form.Item>
                            <p className="terms">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rutrum tempus nisi. Maecenas porta nisi in massa ullamcorper auctor. Praesent tincidunt, ligula sit amet vehicula elementum, massa lacus dignissim libero, eu laoreet lorem tortor scelerisque nibh. Suspendisse potenti. Proin tortor turpis, scelerisque sed mauris eget, vehicula efficitur arcu. Curabitur pulvinar et elit sed viverra. Cras ornare neque nec tortor vehicula condimentum.</p>
                        </Form>
                    </div>
                </Row>
            </div >

        )
    }
}
const ContactForm = Form.create({ name: 'contact' })(ContactPage);

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)