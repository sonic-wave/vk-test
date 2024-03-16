import Button from './Button'
import TextField from './TextField'
import { styled } from 'styled-components'
import { useState, useRef } from 'react'

const FactSectionContainer = styled.section`
    display: flex;
    flex-direction: column;
`;

export default function FactSection() {
    const [fact, setFact] = useState('');
    const textAreaRef = useRef(null);

    function handleChange(e) {
        setFact(e.target.value);
    }

    function setCursor() {
        textAreaRef.current.focus();
        setTimeout(() => textAreaRef.current.setSelectionRange(textAreaRef.current.value.indexOf(' '), textAreaRef.current.value.indexOf(' ')), 100);
    }

    async function handleButtonClick() {
        const response = await fetch('https://catfact.ninja/fact');
        const result = await response.json();
        setFact(result.fact);
        setCursor();
    }

    return (
        <FactSectionContainer>
            <h1>Интересные факты:</h1>
            <TextField fact={fact} onChange={handleChange} ref={textAreaRef} />
            <Button onClick={handleButtonClick}>Узнать факт</Button>
        </FactSectionContainer>
    )
}