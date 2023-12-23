import styled from "styled-components";


const OptionTag = (prop) => {

    return(
        prop.trigger
        ?
        <OptionTagBackground>
            <p>this is tag</p>
        </OptionTagBackground>
        :
        <OptionTagBackground>
            <p>nothing</p>
        </OptionTagBackground>
    )
};

export default OptionTag;

const OptionTagBackground = styled.section`
    background:yellow;
    width:max-content;
`;