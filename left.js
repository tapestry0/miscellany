import React, { useState } from 'react';
import logo from './logo.svg';
import profile from './img/account_circle-24px.svg'
import twitter_button from './img/mock_button.png'
import facebook_button from './img/mock_button.png'
import instagram_button from './img/mock_button.png'
import vk_button from './img/mock_button.png'
import whatsapp_button from './img/mock_button.png'
import telegram_button from './img/mock_button.png'
import './App.css';
import './materialize.css';

import store from './app/store';
import { useSelector, useDispatch } from 'react-redux';
import {switchToPage} from './app/pageSwitcherSlice';
import {addCar, replaceCarList} from './app/carSlice';

function Profile(props) {
    return (
        <div>
            <img className={"account-img"} src={profile} alt={"profile"}/>
        </div>
    );
}

function GarageLogo(props) {
    return (
        <div>
            <img className={"header-garage-logo-img"} src={logo} alt={'logo'}/>
        </div>
    );
}

function MenuButton(props) {
    const dispatch = useDispatch();
    // console.log(page);
    return (
        <div>
            <button className={"menu-button"} onClick={() => {dispatch(switchToPage(props.toPage))}}>{props.text}</button>
        </div>
    );
}

function Header() {
    return (
        <div>
            <div className={"header-background"}>
            </div>
            <div className={"header"}>
                <div className={"header-flex"}>
                    <GarageLogo/>
                    <MenuButton text={'Главная'} toPage='Main'/>
                    <MenuButton text={'Запись'} toPage='Registration'/>
                    <MenuButton text={'Автомобили'} toPage='Automobiles'/>
                    <Profile/>
                </div>
            </div>
        </div>
    );
}


// должна создавать новую запись типа service
// запускается по клику на элемент комплекта услуг
function createNewServiceRecord(service) {}
function NewService(props) {
    const dispatch = useDispatch();
    // console.log(page);

    return (
        <div>
            <button className={"list-button"}
                    onClick={() => {dispatch(switchToPage('Registration'));
                        createNewServiceRecord(props.service);
                    }
                    }
            >
                {props.text}
            </button>
        </div>
    );
}

function AvailableServices() {
    return (
        <div>
            <p>Комплект услуг</p>
            <ul>
                <li>
                    <NewService service={'Автосервис'}
                                text={'Автосервис'}
                    />
                </li>
                <li>
                    <NewService service={'Шиномонтаж'}
                                text={'Шиномонтаж'}
                    />
                </li>
                <li>
                    <NewService service={'Диагностика'}
                                text={'Диагностика'}
                    />
                </li>
                <li>
                    <NewService service={'Кузовной ремонт'}
                                text={'Кузовной ремонт'}
                    />
                </li>
            </ul>
        </div>
    );
}

function ContactsNetworks(props) {
    return (
        <div>
            <p style={{marginBottom: '0px', marginTop: '0px'}}>Соцсети</p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {'twitter' in props.networks &&
                    <a href={props.networks.twitter}>
                        <img src={twitter_button}
                             style={{height: '30px', width: '30px'}}
                        />
                    </a>
                }
                {'facebook' in props.networks &&
                    <a href={props.networks.facebook}>
                        <img src={facebook_button}
                             style={{height: '30px', width: '30px'}}
                        />
                    </a>
                }
                {'instagram' in props.networks &&
                    <a href={props.networks.instagram}>
                        <img src={instagram_button}
                             style={{height: '30px', width: '30px'}}
                        />
                    </a>
                }
                {'vk' in props.networks &&
                <a href={props.networks.vk}>
                    <img src={vk_button}
                         style={{height: '30px', width: '30px'}}
                    />
                </a>
                }
            </div>
        </div>
    )
}

function ContactsMessengers(props) {
    return (
        <div>
            <p style={{marginBottom: '0px', marginTop: '0px'}}>Мессенджеры</p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                {'whatsapp' in props.messengers &&
                <a href={props.messengers.whatsapp}>
                    <img src={whatsapp_button}
                         style={{height: '30px', width: '30px'}}
                    />
                </a>
                }
                {'telegram' in props.messengers &&
                <a href={props.messengers.facebook}>
                    <img src={telegram_button}
                         style={{height: '30px', width: '30px'}}
                    />
                </a>
                }
            </div>
        </div>
    )
}

function ContactsEmail(props) {
    return (
        <div>
            <p style={{marginBottom: '0px', marginTop: '0px'}}>
                Электронная почта
            </p>
            {props.emails.map(email => {
                return (
                    <p style={{marginBottom: '0px', marginTop: '0px'}}>
                        {email}
                    </p>
                )
            })}
        </div>
    )
}

function ContactsPhoneNumbers(props) {
    return (
        <div>
            <p style={{marginBottom: '0px', marginTop: '0px'}}>
                Телефоны
            </p>
            {props.phoneNumbers.map(phoneNumber => {
                return (
                    <p style={{marginBottom: '0px', marginTop: '0px'}}>
                        {phoneNumber}
                    </p>
                )
            })}
        </div>
    )
}

function Contacts(props) {
    function checkEmpty (obj) {
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    }

    return (
        <div>
            <p>Контакты</p>
            <ul>
                {'networks' in props
                 && !checkEmpty(props.networks) &&
                    <li>
                        <ContactsNetworks
                            networks={props.networks}
                        />
                    </li>
                }
                {'messengers' in props
                 && !checkEmpty(props.messengers)
                    ? <li>
                        <ContactsMessengers
                            messengers={props.messengers}
                        />
                    </li>
                    : <li>
                        <p style={{marginBottom: '0px', marginTop: '0px'}}>
                            Мессенджеры
                        </p>
                        <p>
                            Отсутствует возможность связи через мессенджеры
                        </p>
                    </li>
                }
                {'emails' in props
                 && !checkEmpty(props.emails)
                    ? <li>
                        <ContactsEmail
                            emails={props.emails}
                        />
                    </li>
                    : <li>
                        <p style={{marginBottom: '0px', marginTop: '0px'}}>
                            Электронная почта
                        </p>
                        <p style={{marginBottom: '0px', marginTop: '0px'}}>
                            Отсутствует возможность связи через email
                        </p>
                    </li>
                }
                {'phoneNumbers' in props
                 && !checkEmpty(props.phoneNumbers)
                    ? <li>
                        <ContactsPhoneNumbers
                            phoneNumbers={props.phoneNumbers}
                        />
                    </li>
                    : <li>
                        <p style={{marginBottom: '0px', marginTop: '0px'}}>
                            Телефоны
                        </p>
                        <p style={{marginBottom: '0px', marginTop: '0px'}}>
                            Отсутствует возможность связи по телефону
                        </p>
                    </li>
                }
            </ul>
        </div>
    );
};

function Offers(props) {
    return (
        <div>
            <p>
                Акции и спецпредложения
            </p>
        </div>
    )
}

class MainPage extends React.Component {
    render() {
        const mainPageGridStyle = {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
        };

        const mainPageGridLeftColumnStyle = {
            gridColumn: '1',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 3fr',
            marginRight: '10%',
        }

        const mainPageGridRightColumnStyle = {
            gridColumn: '2',
            marginLeft: '10%',
            // height: '90%'
        }



        return (
            <div className={"client-cloth"}
                 style={mainPageGridStyle}
            >
                <div style={mainPageGridLeftColumnStyle}>
                    <div className={"content-transparent-box"}
                         style={{gridColumn: 1, gridRow: 1, }}
                    >
                        <AvailableServices/>
                    </div>
                    <div className={"content-transparent-box"}
                         style={{gridColumn: 2, gridRow: 1}}
                    >
                        <Contacts
                            networks={{
                                twitter: 'https://twitter.com/potus'}}
                            messengers={{
                                whatsapp: 'https://twitter.com/potus'}}
                        />
                    </div>
                    <div className={"content-transparent-box"}
                         style={{gridColumn: '1/3', gridRow: 2}}
                    >
                        <p>column 1/3 row 2</p>
                    </div>
                </div>
                <div style={mainPageGridRightColumnStyle}>
                    <div className={"content-transparent-box"}
                         style={{height: '100%'}}
                    >
                        right column
                        ggdhg
                        dfghf
                        hjfhjf
                        jfffffff
                        sdfsdfs
                        sdfsdfs
                        dfsdfsd
                    </div>
                </div>
                {/*<p style={{gridColumn: '1'}}>Main</p>*/}
                {/*<p style={{gridColumn: '2/3'}}>Mainp</p>*/}
            </div>
        );
    }
}

function RegistrationPage() {
    return (
        <div className={"client-cloth"} style={{
            display: 'flex',
            justifyContent: 'center'}}>
            <div className={"content-transparent-box"} style={{
                alignSelf: 'center',
                width: '70%',
                height: '90%'}}>
                <div className="radio-button">
                    <input id="radio-1" type="radio" name="radio" value="1" checked/>
                        <label htmlFor="radio-1">Radio button 1</label>
                </div>
                <div className="radio-button">
                    <input id="radio-2" type="radio" name="radio" value="2" />
                    <label htmlFor="radio-2">Radio button 2</label>
                </div>
                {/*<input type="radio" id="contactChoice1"*/}
                {/*       name="contact" value="email"/>*/}
                {/*<label htmlFor="contactChoice1">Email</label>*/}

                {/*<input type="radio" id="contactChoice2"*/}
                {/*       name="contact" value="phone"/>*/}
                {/*<label htmlFor="contactChoice2">Phone</label>*/}

                {/*<input type="radio" id="contactChoice3"*/}
                {/*       name="contact" value="mail"/>*/}
                {/*<label htmlFor="contactChoice3">Mail</label>*/}
                {/*<input name="dzen" type="radio" value="nedzen"/>*/}
                {/*<input name="dzen" type="radio" value="dzen"/>*/}
                {/*<input type="radio" id="Choice1"*/}
                {/*       name="car_list" value="fdffdd"/>*/}
                {/*<label htmlFor="Choice1">dfvdvdfd</label>*/}

                {/*<input type="radio" id="Choice2"*/}
                {/*       name="car_list" value="fdf"/>*/}
                {/*<label htmlFor="Choice2">fbffbfgbfgb</label>*/}
                {/*    <input type="radio" id="contactChoice2"*/}
                {/*           name="contact" value="phone">*/}
                {/*        <label htmlFor="contactChoice2">Phone</label>*/}

                {/*        <input type="radio" id="contactChoice3"*/}
                {/*               name="contact" value="mail">*/}
                {/*            <label htmlFor="contactChoice3">Mail</label>*/}
            </div>
        </div>
    );
}

class AutomobilesPage extends React.Component {
    render() {
        return (
            <div className={"client-cloth"}>
                <p>Automobiles</p>
            </div>
        );
    }
}

function ClientPages() {
    let page;
    const current_page = useSelector(state => state.pages.page);
    switch (current_page) {
        case 'Main':
            page = <MainPage/>
            break;
        case 'Registration':
            page = <RegistrationPage/>
            break;
        case 'Automobiles':
            page = <AutomobilesPage/>
            break;
    }
    return (
        <div>
            <div>
                <div className={"client-background"}>
                </div>
                <Header/>
            </div>
            {page}
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <ClientPages/>
        </div>
    );
}

export default App;
