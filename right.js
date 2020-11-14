import React, { useState } from 'react';
import logo from './logo.svg';
import profile from './img/account_circle-24px.svg';
import edit from './img/edit.svg';
import './App.css';
import Creatable from 'react-select/creatable';
import './radioButtons.scss';
import './Buttons.css';
import './animations.css';

import store from './app/store';
import { useSelector, useDispatch } from 'react-redux';
import {switchToPage} from './app/pageSwitcherSlice';
import {addCar, replaceCarList, chooseCar} from './app/carSlice';

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
    const current_page = useSelector(state => state.pages.page);

    return (
        <div>
            <div className="form_radio_btn">
                <input id={"menu-" + props.toPage} type="radio" name="menu_radio" value={props.toPage}
                       onChange={() => {dispatch(switchToPage(props.toPage))}}
                       checked={props.toPage === current_page}/>
                <label htmlFor={"menu-" + props.toPage}>{props.text}</label>
            </div>
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

class MainPage extends React.Component {
    render() {
        return (
            <div className={"client-cloth"}>
                <p>Main</p>
            </div>
        );
    }
}

function CarOption(props) {
    const current_car = props.current_car
    // const current_car = useSelector(state => state.cars.chosen_car);
    // console.log(current_car)

    return (
        <div>
            <li className={"radio-li"}>
                <input id={"car-radio-" + props.value} type="radio" name={props.name} value={props.value}
                       onChange={props.handler}
                       checked={props.value === current_car}/>
                <label htmlFor={"car-radio-" + props.value}>{props.text}</label>
            </li>
        </div>
    );
}

function RegistrationAutomobile(props) {
    const cars_list = useSelector(state => state.cars.car_list);
    const dispatch = useDispatch();

    const listItems = cars_list.map((car, index) =>
        <CarOption key={index} value={index} handler={()=>{props.setChosenCar(index)}} current_car={props.chosen_car}
                   name={"car-radio-registration"} text={car.mark + ' ' + car.model + ' ' + car.year}/>
    );

    let add_car_btn;
    if (cars_list.length === 0) {
        add_car_btn = <div><button className={"blue-button"} onClick={() => {dispatch(switchToPage('Automobiles'))}}>Добавить автомобиль</button></div>
    } else {
        add_car_btn = <div/>
    }

    return(
        <div>
            {add_car_btn}
            <ul className={"radio-ul"}>
                {listItems}
            </ul>
            {/*<button className={"next-stage-button"} onClick={() => {props.setCurrentStage(props.next_stage)}}>Далее</button>*/}
        </div>
    );
}

function Services(props) {
    return(
        <div>
            <p>Услуги</p>
            {/*<button onClick={() => {props.setCurrentStage(props.next_stage)}}>Далее</button>*/}

        </div>
    );
}

function Address(props) {
    return(
        <div>
            {/*<button onClick={() => {props.setCurrentStage(props.next_stage)}}>Далее</button>*/}

        </div>
    );
}

function Time(props) {
    return(
        <div>
            {/*<button onClick={() => {props.setCurrentStage(props.next_stage)}}>Далее</button>*/}

        </div>
    );
}

function Confirm(props) {
    return(
        <div>
            {/*<button onClick={() => {props.setCurrentStage(props.next_stage)}}>Далее</button>*/}

        </div>
    );
}

function DropdownBlockHeader(props) {
    return (
        <div onClick={() => {props.setCurrentStage(props.number)}} className={"dropdown-block-header"}>
            <div className={"dropdown-block-header-number"}>
                <span>{props.number}</span>
            </div>
            <div className={"dropdown-block-header-text"}>
                <span>{props.header_text}</span>
            </div>
        </div>
    )
}

function DropdownContent(props) {

    let className;
    if (props.current_stage === props.number) {
        className = 'slide-out';
    } else {
        className = 'slide-in';
    }

    return (
        <div style={{
            transition: 'transform 0.5s ease-out',
            overflow: 'hidden', transformOrigin: 'top'}} className={className}>
            {props.content}
        </div>
    );
}

function RegistrationPage() {
    const [chosen_car, setChosenCar] = useState(useSelector(state => state.cars.chosen_car));
    const [chosen_services, setChosenServices] = useState([]);
    const [chosen_adress, setChosenAdress] = useState('');
    const [chosen_time, setChosenTime] = useState('');
    const [current_stage, setCurrentStage] = useState(1);

    const automobiles = <RegistrationAutomobile chosen_car={chosen_car} setChosenCar={setChosenCar}/>
    const services = <Services/>
    const address = <Address/>
    const time = <Time/>
    const confirm = <Confirm/>

    return (
        <div className={"client-cloth"} style={{
            display: 'flex',
            justifyContent: 'center'}}>
            <div className={"content-transparent-box"} style={{
                alignSelf: 'center',
                width: '70%',
                height: '90%'}}>
                <div className={"content-transparent-box-header"}>
                    <div style={{display: "inline-block", verticalAlign: "middle"}}>
                        <img src={edit} alt={"edit"}/>
                    </div>
                    <div style={{display: "inline-block"}}>
                        <p>Запись в автосервис</p>
                    </div>
                </div>
                <div className={"dropdown-block"}>
                    <DropdownBlockHeader number={1}
                                         current_stage={current_stage}
                                         header_text={"Автомобиль"}
                                         setCurrentStage={setCurrentStage}/>
                    <DropdownContent number={1}
                                     current_stage={current_stage}
                                     content={automobiles}/>
                </div>
                <div className={"dropdown-block"}>
                    <DropdownBlockHeader number={2}
                                         current_stage={current_stage}
                                         header_text={"Услуги"}
                                         setCurrentStage={setCurrentStage}/>
                    <DropdownContent number={2}
                                     current_stage={current_stage}
                                     content={services}/>
                </div>
                <div className={"dropdown-block"}>
                    <DropdownBlockHeader number={3}
                                         current_stage={current_stage}
                                         header_text={"Адрес"}
                                         setCurrentStage={setCurrentStage}/>
                    <DropdownContent number={3}
                                     current_stage={current_stage}
                                     content={address}/>
                </div>
                <div className={"dropdown-block"}>
                    <DropdownBlockHeader number={4}
                                         current_stage={current_stage}
                                         header_text={"Время"}
                                         setCurrentStage={setCurrentStage}/>
                    <DropdownContent number={4}
                                     current_stage={current_stage}
                                     content={time}/>
                </div>
                <div className={"dropdown-block"}>
                    <DropdownBlockHeader number={5}
                                         current_stage={current_stage}
                                         header_text={"Подтверждение"}
                                         setCurrentStage={setCurrentStage}/>
                    <DropdownContent number={5}
                                     current_stage={current_stage}
                                     content={confirm}/>
                </div>
                {/*<DropdownBlock content={automobiles} id={'automobiles'} text={"Автомобиль"}/>*/}

            </div>
        </div>
    );
}

class AutoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            optionsMark: [
                { value: 0, label: 'Nissan' },
                { value: 1, label: 'Toyota' },
                { value: 2, label: 'Porsche' }
            ],
            selectedMark: null,
            optionsModel: [
                [ { value: 0, label: 'Qashqai'},
                    { value: 1, label: 'X-Trail'} ],
                [ { value: 0, label: 'RAV4'},
                    { value: 1, label: 'Camry'} ],
                [ { value: 0, label: 'Cayenne'},
                    { value: 1, label: '911'} ],
            ],
            selectedModel: null,
            selectedYear: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.changePage();
    }

    handleChangeMark = (selectedOption) => {
        this.setState(  { selectedMark: selectedOption.value });
    }

    handleChangeModel = (selectedOption) => {
        this.setState(  { selectedModel: selectedOption.value });
    }

    handleChangeYear = (selectedOption) => {
        this.setState(  { selectedYear: selectedOption.value });
    }

    render() {
        const optionsMark = this.state.optionsMark;
        const optionsModel = this.state.optionsModel;
        const selectedMark = this.state.selectedMark;
        const customStyle = {
            control: (provided) => ({
                ...provided,
                backgroundColor: 'transparent',
                border: 'none',
                fontWeight: 'bold',
                borderBottom: '3px solid black',
                borderRadius: 'none',
                height: 50,
            }),
        }
        return (
            <div className="content-transparent-box" style={{width:'70%', height:'90%', alignSelf:'center'}}>
                <div className={'big-block'}>
                    <div className={'text-block'}>
                        <b>Марка автомобиля:</b>
                        <Creatable styles={customStyle}
                                   onChange={this.handleChangeMark}
                                   options={optionsMark}
                                   placeholder={"Выберите марку..."}/>
                    </div>
                    <div className={'text-block'}>
                        <b>Модель автомобиля:</b>
                        <Creatable styles={customStyle}
                                   onChange={this.handleChangeModel}
                                   options={optionsModel[selectedMark]}
                                   placeholder={"Выберите модель..."}/>
                    </div>
                    <div className={'text-block'}>
                        <b>Год выпуска автомобиля:</b>
                        <Creatable styles={customStyle}
                                   onChange={this.handleChangeYear}
                                   noOptionsMessage={() => null}
                                   placeholder={"Введите год..."}/>
                    </div>
                    <div className={'text-block'}>
                        <button className={"blue-button"} onClick={this.handleSubmit}>Добавить</button>
                    </div>
                </div>
            </div>
        );
    }
}

function AutoList(props) {
    const cars_list = useSelector(state => state.cars.car_list);
    const current_car = useSelector(state => state.cars.chosen_car);
    const dispatch = useDispatch();

    const listItems = cars_list.map((car, index) =>
        <CarOption key={index} value={index} handler={() => {dispatch(chooseCar(index))}} current_car={current_car}
                   name={"car-radio-registration"} text={car.mark + ' ' + car.model + ' ' + car.year}/>
    );

    function handleClick() {
        props.changePage();
    }

    return (
        <div className="content-transparent-box" style={{width:'70%', height:'90%', alignSelf:'center'}}>
            <div className={'big-block'}>
                <div className={"text-block"}>
                    <b>Выберите автомобиль по умолчанию:</b>
                </div>
                <div className={"text-block"}>
                    <ul className={"radio-ul"}>
                        {listItems}
                    </ul>
                </div>
                <div className={"text-block"}>
                    <button onClick={handleClick} className={"blue-button"}>+ Добавить новый автомобиль</button>
                </div>
            </div>
        </div>
    )
}

class AutomobilesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAuto: false
        };
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangePage() {
        this.setState({newAuto: !this.state.newAuto})
    }

    render() {
        if (this.state.newAuto === false)
            return (
                <div className={"client-cloth"} style={{display:'flex', justifyContent:'center'}}>
                    <AutoForm changePage={this.handleChangePage}/>
                </div>
            );
        else
            return (
                <div className={"client-cloth"} style={{display:'flex', justifyContent:'center'}}>
                    <AutoList changePage={this.handleChangePage}/>
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
