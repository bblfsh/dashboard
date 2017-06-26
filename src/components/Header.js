import React from 'react';
import styled from 'styled-components';

import bblfshLogo from '../img/babelfish_logo.svg';
import githubIcon from '../img/github.svg';

const borderColor = '#dad7d0';
const accentColor = '#F54F00';

const Container = styled.header`
  height: 70px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  background: #f9f7f5;
  border-bottom: 1px solid ${borderColor};
  z-index: 9999;
  box-shadow: 0 5px 25px rgba(138, 128, 115, 0.14);
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: normal;
  padding: 0;
  margin: 0;
  height: 100%;
  border-right: 1px solid ${borderColor};
  padding-right: 1rem;
`

const TitleImage = styled.img`
  height: 40px;
`

const DashboardTitle = styled.span`
  margin-left: .8rem;
`

const Actions = styled.div`
  width: 100%;
  display: flex;
  margin-left: 1rem;
  height: 100%;
`

const Label = styled.label`
  color: grey;
  margin-right: 1em;
  font-size: .8rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #636262;
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  border-right: 1px solid ${borderColor};
  padding-right: 1rem;

  & + & {
    margin-left: 1rem;
  }

  &:last-child {
    border-right: none;
  }
`

const Select = styled.select`
  border-radius: 3px;
  border: 1px solid ${borderColor};
  background: white;
  padding: .5em .5em;
  text-transform: uppercase;
  font-weight: bold;
  font-size: .7rem;
`

const RunButton = styled.button`
  padding: .7rem 1.8rem;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  background: ${accentColor};
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  font-size: .8rem;
  letter-spacing: .05em;
  transition: box-shadow 300ms ease-in-out;

  &[disabled] {
    opacity: .6;
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 5px 15px rgba(191, 76, 50, 0.48);
  }
`

const DriverCodeBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: .5rem;
`

const DriverCodeIcon = styled.img`
  width: 20px;
  opacity: .7;
  margin-right: .3rem;
`

const DriverCodeText = styled.span`
  border-bottom: 1px solid rgba(0, 0, 0, .05);
`

const DriverCodeLink = styled.a`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  font-size: .9rem;

  &:hover {
    color: ${accentColor}; 
  }

  &:hover ${DriverCodeText} {
    border-bottom-color: ${accentColor};
  }

  &:hover ${DriverCodeIcon} {
    opacity: 1;
  }
`

export function DriverCode({ languages, selectedLanguage, actualLanguage }) {
  const driver = selectedLanguage === 'auto' 
    ? actualLanguage
    : selectedLanguage;

  return (
    <DriverCodeBox>
      <DriverCodeLink
        href={languages[driver].url} 
        target='_blank'>
        <DriverCodeIcon src={githubIcon} alt='GitHub' />
        <DriverCodeText>Driver Code</DriverCodeText>
      </DriverCodeLink>
    </DriverCodeBox>
  );
}

export default function Header({
  selectedLanguage, 
  languages, 
  onLanguageChanged,
  onRunParser,
  loading,
  actualLanguage,
  userHasTyped,
}) {
  const languageOptions = Object.keys(languages)
    .map(k => {
      const name = k === 'auto' 
        ? `${languages[actualLanguage].name} ${languages[k].name}`
        : languages[k].name;
      return (
        <option value={k} key={k}>{name}</option>
      );
    });

  return (
    <Container>
      <Title>
        <TitleImage src={bblfshLogo} alt='bblfsh' />
        <DashboardTitle>Dashboard</DashboardTitle>
      </Title>

      <Actions>
        <InputGroup>
          <Label>Language</Label>
          <Select 
            id='language-selector'
            onChange={onLanguageChanged}
            value={selectedLanguage}>
            {languageOptions}
          </Select>

          <DriverCode 
            languages={languages}
            selectedLanguage={selectedLanguage}
            actualLanguage={actualLanguage} />
        </InputGroup>

        <InputGroup>
          <RunButton 
            id='run-parser'
            onClick={onRunParser}
            disabled={loading || !userHasTyped}>
            Run parser
          </RunButton>
        </InputGroup>
      </Actions>
    </Container>
  );
}
