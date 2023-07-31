
import { useEffect, useState } from 'react';
import './App.css';




function App() {

    const [counter, setCounter] = useState(0);

    const [isCounting, setIsCounting] = useState(false);

    const [inputValue, setinputValue] = useState('');

    const [timer, setTimer] = useState('hh:mm:ss')


    // функция ограничвает ввод букв в input. функция вызывается при каждом вводе символа в input из-за обработчика события onInput
    const handleInput = (event) => {

        // создаём регулярное выражение для валидации вводимых символов
        const regex = /^[0-9]+$/;

        // если ввёденное значение не число из regex, ограничиваем ввод
        if (!regex.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[^\d]/g, '');
        }

        setinputValue(event.target.value);
    }


    // нажатие на btn для запуска таймера
    const handleStart = () => {
        setIsCounting(true);
    }

    
    // нажатие на btn для остановки таймера
    const handleStop = () => {
        setIsCounting(false);
    }


    // фукцния обрабатывает нажатие на Enter внутри input и запускает таймер
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            setIsCounting(true);
            handleBtnClick();
        }
    }


    // обрабатываем нажатие на кнопку для сохранения значения числа из input в стейт counter
    const handleBtnClick = () => {
        // если в input ввели значение, то перезаписываем стейт counter 
        if (inputValue) {

            // сохраняем преорбразованное в число значние inputValue в стейт counter
            setCounter(+inputValue);
            setinputValue('');
        }
    }


    // функция форматирует число в формат таймера для тега <span>
    const formatTime = (num) => {
        const hours = Math.floor(num / 3600);
        const minutes = Math.floor((num % 3600) / 60);
        const seconds = num % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };
 


    // если isCounting=true, то хук включает счётчик. хук вызывается при каждом изменении isCounting.
    useEffect(() => {

        let interval;

        // увеличиваем счётчик на + 1 каждую 1сек
        if (isCounting) {
            interval = setInterval(() => {
                setCounter(counter => counter + 1)
            }, 1000)
        }

        return () => clearInterval(interval);
    }, [isCounting])



    // хук будет обновлять значение таймера (timer) при каждом обновлении счётчика (counter)
    useEffect(() => {
        if(counter > 0) {
            setTimer(formatTime(counter));
        }
    }, [counter])



    return (
        <div className='main'>
            <input 
                type="text" 

                value={inputValue}
                
                onKeyDown={handleEnter}

                onChange={handleInput}
    
                placeholder="Seconds" />


            {
                !isCounting ? 

                <button onClick={ () => {
                    handleBtnClick();
                    handleStart()
                }}>Start</button>
                    
                :
                <button onClick={handleStop}>Stop</button> 
            }

            <br />
            <br />

            <span>{timer}</span>
            
        </div>
    );
}

export default App;
