import Button from './Button'
import TextField from './TextField'
import { styled } from 'styled-components'
import { useState, useEffect } from 'react'

const PersonSectionContainer = styled.section`
    display: flex;
    flex-direction: column;
`;

export default function PersonSection() {
    const [name, setName] = useState('');
    const [usedNames, setUsedNames] = useState([]);
    const [answer, setAnswer] = useState('');
    const [abortController, setAbortController] = useState(new AbortController());

    useEffect(() => {
        if (name && !usedNames.includes(name)) {
            const timerId = setTimeout(() => {
                handleButtonClick(name);
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [name, usedNames]); 

    function handleChange(e) {
        setName(e.target.value);
    }

    async function handleButtonClick(name) {
        if (usedNames.includes(name)) {
            alert('Данное имя уже было использовано');
            return;
        }

        abortController.abort(); 
        const newAbortController = new AbortController();
        setAbortController(newAbortController);

        try {
            const response = await fetch(`https://api.agify.io/?name=${name}`, { signal: newAbortController.signal });
            const result = await response.json();
            const age = result.age;
            setUsedNames(prevNames => [...prevNames, name]);
            if (age === undefined || age === null) {
                alert('Вы ввели неправильное имя или лимит запросов превышен');
                return;
            }
            setAnswer(`Возраст ${name} равен ${age}`);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error("Fetch error:", error);
            }
        }
    }

    return (
        <PersonSectionContainer>
            <h1>Угадай возраст:</h1>
            <TextField value={name} onChange={handleChange} />
            <p>Введите имя латинскими буквами и нажмите кнопку Отправить</p>
            <p>Ответ: {answer}</p>
            <Button onClick={() => handleButtonClick(name)}>Отправить</Button>
        </PersonSectionContainer>
    )
}