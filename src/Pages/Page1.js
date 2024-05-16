import React, {useState} from 'react';
import styled from 'styled-components';
import logo from './image.png'
import done from './done.png';
import edit from './edit.png';
import SpeechInput from './SpeechInput'
import { GenericTextInputSection, GenericRadioInputSection } from './GenericInputSection';
import GiaWidget from '@globalization-partners/gia-widget';
import giaIcon from './GiaIcon.png';

export const guidedTexts = {
    'first-name':"We need to know the professional's legal first name so we can add it to their employment contract.",
    'last-name':"We need to know the professional's legal last name so we can add it to their employment contract.",
    'email-address':'',
    'mobile-number':"Please enter the personal mobile number for the professional.The professional will be able to change this once they are invited to the system."

}
const InputWithLabel = styled.div`
display: flex;
flex-direction: column;
label {
    font-weight: 500;
    margin: 16px;
}
`;
const InputRadioWithLabel = styled.div`
display: flex;
flex-direction: column;
p {
    font-size: 14px;
    font-weight: 500;
}
.lablegroup{
display: flex;
div {
    margin: 16px;
}
}
`;

const Page2 = (props)=>{
    return (
      <section className="section">
        <h1>Add the compensation for Either's new job.</h1>
        <InputGroupsSection>
          <h2>Annual Base Salary</h2>
          <InputWithLabel>
            <label htmlFor="amount">Enter Amount</label>
            <InputText id="amount" type="text" />
          </InputWithLabel>
        </InputGroupsSection>
        <InputGroupsSection>
          <h2>Sign-On Bonus</h2>
          <InputRadioWithLabel>
            <p htmlFor="bonus">Would you like to provide a Sign-On Bonus? *</p>
            <div className="lablegroup">
              <div>
                <label htmlFor="yes">Yes</label>
                <input type="radio" id="yes" name="bonus" value="yes" />
              </div>
              <div>
                <label htmlFor="no">No</label>
                <input type="radio" id="no" name="bonus" value="no" />
              </div>
            </div>
          </InputRadioWithLabel>
        </InputGroupsSection>
        <InputGroupsSection>
          <h2>Annual Bonus</h2>
          <InputRadioWithLabel>
            <p htmlFor="bonus">Would you like to provide an Annual Bonus? *</p>
            <div className="lablegroup">
              <div>
                <label htmlFor="yes">Yes</label>
                <input type="radio" id="yes" name="bonus" value="yes" />
              </div>
              <div>
                <label htmlFor="no">No</label>
                <input type="radio" id="no" name="bonus" value="no" />
              </div>
            </div>
          </InputRadioWithLabel>
        </InputGroupsSection>
      </section>
    );
}

const Page1Cont = (props) =>{
    return (
      <section className="section">
        <h1>Add the personal information for the professional.</h1>
        <InputGroupsSection>
          <h2>Legal Name</h2>
          <SpeechInput onFocus={props.setFocusGuideId} id={"first-name"} label={"First Name"}/>
          {/* <InputWithLabel>
            <label htmlFor="first-name">First Name</label>
            <InputText id="first-name" type="text" />
          </InputWithLabel> */}
        <SpeechInput onFocus={props.setFocusGuideId} id={"last-name"} label={"Last Name"}/>
          {/* <InputWithLabel>
            <label htmlFor="last-name">Last Name</label>
            <InputText id="last-name" type="text" />
          </InputWithLabel> */}
        </InputGroupsSection>
        <InputGroupsSection>
          <h2>Contact Details</h2>
          <SpeechInput onFocus={props.setFocusGuideId} id={"email-address"} label={"Email Address"}/>
          <SpeechInput onFocus={props.setFocusGuideId} id={"mobile-number"} label={"Mobile Number"}/>
          {/* <InputWithLabel>
            <label htmlFor="email-address">Email Address</label>
            <InputText id="email-address" type="email" />
          </InputWithLabel>
          <InputWithLabel>
            <label htmlFor="mobile-number">Mobile Number</label>
            <InputText id="mobile-number" type="text" />
          </InputWithLabel> */}
        </InputGroupsSection>
      </section>
    );
}
const GuidedTextContainer = styled.div`
    display: flex;
    position: fixed;
    top: 350px;
    right: 200px;
    .text {
        width: 150px;
        margin: 16px;
        padding: 16px;
        background-color: white;
        border-radius: 8px;
        font-size: 14px;
        margin-bottom: -32px;
    }
}
`;
const MainContainer = styled.div`
  nav.navbar {
    width: 20%;
    background-color: rgb(244, 244, 246);
    height: 100vh;
    li {
      font-size: 12px;
      line-height: 22px;
      margin: 16px 0;
    }
  }
  section.section {
    width: 80%;
    background: linear-gradient(
      214.21deg,
      rgb(225, 223, 163) 15.63%,
      rgb(0, 200, 224) 85%
    );
    height: 100vh;
  }
  display: flex;
  img.logo {
    height: 30px;
    width: 30px;
  }
  .completion {
    font-size: 12px;
  }
  footer {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    position: fixed;
    bottom: 2px;
    width: 100vw;
    padding: 16px;
    background-color: rgb(244, 244, 246);
    right: 2px;
    button {
      margin: 0 8px;
      cursor: pointer;
    }
    padding-right: 90px;
    .gia-widget {
      position: fixed;
      right: 8px;
      bottom: 9px;
    }
  }
`;
export const StyledButton = styled.button`
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
`;

const InputText = styled.input`
    padding: 12px 16px;
    border : 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 300;
    max-width: 250px;
    
`;
const InputGroupsSection = styled.section`
margin: 12px;
padding: 16px;
`;
const StyledImage = styled.img`
    width: 15px;
    height: 15px;
    margin: 0 8px;
`
const StyledImage2 = styled.img`
  width: 60px;
  height: 60px;
`

const Page1 = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [focusGuideId, setFocusGuideId] = useState('');
    const getImageForPage1 = () =>{
        if((currentPage === 1)){
            return <StyledImage src={edit}></StyledImage>
        }
        if(currentPage === 2){
            return <StyledImage src={done}></StyledImage>
        }
    }
    const getImageForPage2 = ()=>{
        if((currentPage === 1)){
            return null;
        }
        if(currentPage === 2){
            return <StyledImage src={edit}></StyledImage>
        }
    }
    const getPage = () =>{
        if(currentPage === 1){
            return <Page1Cont setFocusGuideId={setFocusGuideId}/>
        }else if(currentPage === 2){
            return <Page2 setFocusGuideId={setFocusGuideId}/>
        }
    }
    return (
      <MainContainer>
        <nav className="navbar">
          <img className="logo" src={logo}></img>
          <h1>Add your Professional</h1>
          <span className="completion">30% Complete</span>
          <ol>
            <li>
              <strong>Professional Details</strong>
              <br />
              {getImageForPage1()}
              <span>Personal Information</span>
            </li>
            <li>
              <strong>Job Details</strong>
              <br />
              {getImageForPage2()}
              <span>Add Compensation</span>
            </li>
          </ol>
        </nav>

        {getPage()}
        <GuidedTextContainer>
            <StyledImage2 src={giaIcon}></StyledImage2>
            <div className='text'>
                {guidedTexts[focusGuideId]}
            </div>
        </GuidedTextContainer>
        <footer>
          <StyledButton
            onClick={() => {
              setCurrentPage(1);
            }}>
            Back
          </StyledButton>
          <StyledButton
            onClick={() => {
              setCurrentPage(2);
            }}>
            Continue
          </StyledButton>
          <div className="gia-widget">
            <GiaWidget
              service={{
                environment: "development",
                platform: "NG",
              }}
              config={{test: "test"}}
              show={true}
              showWidgetLauncher={true}
              useUnauthorisedURL={true}
            />
          </div>
        </footer>
      </MainContainer>
    );
};

export default Page1;