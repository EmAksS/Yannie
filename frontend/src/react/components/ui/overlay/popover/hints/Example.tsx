import HintsTemplate from "./_popoverHintsTemplate";

interface ExampleProps{
    children: string;
}

const Text = () => {
    return (
        <p>Здесь будет отображен какой-то текст</p>
    )
}

export const Example : React.FC<ExampleProps> = ({ children }) => {
    return (
        <HintsTemplate title="подсказка" text={<Text /> }>
            { children }
        </HintsTemplate>
    )
}

export default Example;