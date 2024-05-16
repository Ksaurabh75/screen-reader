import React, {useState} from 'react';
import styled from 'styled-components';
import logo from './image.png'
import done from './done.png';
import edit from './edit.png';
import SpeechInput from './SpeechInput'
import { GenericTextInputSection, GenericRadioInputSection } from './GenericInputSection';
import GiaWidget from '@globalization-partners/gia-widget';
import giaIcon from './GiaIcon.png';
import PDFViewer from './PdfViewer';

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
const Page4 = (props) => {
  return (<div data-pdfviewer-id="viewer1">
    <PDFViewer
      setEmbedStatus={(value) => {
        console.log(value);
      }}
    />
  </div>);
}
const BasicBlog =(props) => {
    const [makeEditable, setMakeEditable] = useState(false);
    const [title, setTitle] = useState("Re: Daniel's Jo");
    // generate same state variables for the fields legal name, start date, annual salary, sign on bonus, annual bonus, pension, annual leave, notice period
    // set the default values for the fields
    // make the fields editable
    // add a save button
    // on click of save button, save the values to the state variables
    // on click of edit button, make the fields editable
    // generate the code for the above steps

    const [legalName, setLegalName] = useState("Daniel rhea");
    const [startDate, setStartDate] = useState("04/06/2023");
    const [annualSalary, setAnnualSalary] = useState("$145,000");
    const [signOnBonus, setSignOnBonus] = useState("$3,000");
    const [annualBonus, setAnnualBonus] = useState("20%");
    const [pension, setPension] = useState("6% Employer Contributions");
    const [annualLeave, setAnnualLeave] = useState("25 Days");
    const [noticePeriod, setNoticePeriod] = useState("1 Month");
    const [jobTitle, setJobTitle] = useState("Technical Solutions Architect");
    const [editing, setEditing] = useState(false);

    return (
      <section
        id="basicBlog"
        className="section"
        height="100vh"
        style={{
          width: "100%",
          height:"100%",
          padding: "24px 24px 184px 24px",
          borderRadius: "12px",
          border: "1px solid #DAE0E7",
          background: "linear-gradient(214.21deg, rgb(225, 223, 163) 15.63%,rgb(0, 200, 224) 85%)",
          color: `#272E35`,
        }}
        data-cw-section-identifier="document-root"
      >
        <h1
          style={{
            fontFamily: "PolySans",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: 24,
          }}
        >
          {title}
        </h1>
        <button type="button" onClick={() => setTitle("Re: Daniel's Jo")}>
          Change title
        </button>
        <button
          onClick={() => {
            setEditing(false);
          }}
        >
          save
        </button>
        <div data-cw-section-identifier="introduction">
          <p
            style={{
              width: 524,
              fontFamily: "PolySans",
              fontStyle: "normal",
              fontWeight: 300,
              fontSize: 16,
              marginBottom: 23,
              marginTop: 23,
            }}
          >
            Please see below certain terms and conditions which would be
            included in a formal Employment Contract from Globalization
            Partners, United Kingdom.
          </p>
          <p
            style={{
              width: 524,
              fontFamily: "PolySans",
              fontStyle: "normal",
              fontWeight: 300,
              fontSize: 16,
              marginBottom: 23,
              marginTop: 23,
            }}
          >
            These Job Details is not a legally binding contract, and you should
            therefore not take any steps to resign from your current employment
            on the basis of this.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            width: 524,
            alignItems: "center",
          }}
          data-cw-section-identifier="personal-info-header"
        >
          <p
            style={{
              width: 473,
              height: 22,
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 12,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Personal Information
          </p>
          <span
            onClick={() => {
              // setMakeEditable(true);
              setEditing(true);
            }}
            style={{
              color: "#0000FF",
              alignItems: "flex-start",
              gap: 8,
              fontSize: "14px",
              fontFamily: "PolySans",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Edit
          </span>
        </div>
        <hr style={{ height: 0, color: "#DAE0E7", alignSelf: "stretch" }} />
        <div
          style={{
            display: "flex",
            gap: 18,
            alignItems: "center",
          }}
          data-cw-section-identifier="personal-info"
        >
          <p
            style={{
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Legal Name:
          </p>
          {editing ? (
            <input
              type="text"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
            />
          ) : (
            <span
              contentEditable={makeEditable}
              style={{
                width: 238,
                justifyContent: "center",
                flexDirection: "column",
                height: "26px",
                fontSize: 18,
                fontFamily: "PolySans",
                fontWeight: 300,
              }}
            >
              {legalName}
            </span>
          )}
        </div>

        {/* Section 2 */}

        <div
          style={{
            display: "flex",
            width: 524,
            alignItems: "center",
            marginTop: 24,
          }}
          data-cw-section-identifier="job-info-header"
        >
          <p
            style={{
              width: 473,
              height: 22,
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 12,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Job Information
          </p>
          <span
            onClick={() => {
              // setMakeEditable(true);
              setEditing(true);
            }}
            style={{
              color: "#0000FF",
              alignItems: "flex-start",
              gap: 8,
              fontSize: "14px",
              fontFamily: "PolySans",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Edit
          </span>
        </div>
        <hr style={{ height: 0, color: "#DAE0E7", alignSelf: "stretch" }} />
        <div
          style={{ display: "flex", alignItems: "center", gap: 18 }}
          data-cw-section-identifier="job-info"
        >
          <div
            style={{
              display: "flex",
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
            }}
          >
            Job Title:
          </div>
          {editing ? (
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          ) : (
            <span
              contentEditable={makeEditable}
              style={{
                width: 238,
                justifyContent: "center",
                flexDirection: "column",
                height: "26px",
                fontSize: 18,
                fontFamily: "PolySans",
                fontWeight: 300,
              }}
            >
              {jobTitle}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 24,
          }}
          data-cw-section-identifier="job-info"
        >
          <p
            style={{
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Start Date:
          </p>
          {editing ? (
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          ) : (
            <span
              contentEditable={makeEditable}
              style={{
                width: 238,
                justifyContent: "center",
                flexDirection: "column",
                height: "26px",
                fontSize: 18,
                fontFamily: "PolySans",
                fontWeight: 300,
              }}
            >
              {startDate}
            </span>
          )}
        </div>

        {/* Section 3 */}

        <div
          style={{
            display: "flex",
            width: 524,
            alignItems: "center",
            marginTop: 24,
          }}
          data-cw-section-identifier="compensation-info-header"
        >
          {editing ? (
            <input
              type="text"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
            />
          ) : (
            <p
              style={{
                width: 473,
                height: 22,
                flexDirection: "column",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 12,
                fontFamily: "PolySans",
                fontWeight: 600,
                margin: "0px",
              }}
            >
              Compensation
            </p>
          )}
          <span
            style={{
              color: "#0000FF",
              alignItems: "flex-start",
              gap: 8,
              fontSize: "14px",
              fontFamily: "PolySans",
              fontWeight: 600,
            }}
          >
            Edit
          </span>
        </div>
        <hr style={{ height: 0, color: "#DAE0E7", alignSelf: "stretch" }} />
        <div
          style={{ display: "flex", alignItems: "center", gap: 18 }}
          data-cw-section-identifier="compensation-info"
        >
          <p
            style={{
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Annual Salary:
          </p>
          {editing ? (
            <input
              type="text"
              value={annualSalary}
              onChange={(e) => setAnnualSalary(e.target.value)}
            />
          ) : (
            <span
              style={{
                width: 238,
                justifyContent: "center",
                flexDirection: "column",
                height: "26px",
                fontSize: 18,
                fontFamily: "PolySans",
                fontWeight: 300,
                margin: "0px",
              }}
            >
              {annualSalary}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 24,
          }}
          data-cw-section-identifier="compensation-info"
        >
          <p
            style={{
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Sign On Bonus:
          </p>
          {editing ? (
            <input
              type="text"
              value={signOnBonus}
              onChange={(e) => setSignOnBonus(e.target.value)}
            />
          ) : (
            <span
              style={{
                width: 238,
                justifyContent: "center",
                flexDirection: "column",
                height: "26px",
                fontSize: 18,
                fontFamily: "PolySans",
                fontWeight: 300,
                margin: "0px",
              }}
            >
              {signOnBonus}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 24,
          }}
          data-cw-section-identifier="compensation-info"
        >
          <span
            style={{
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
            }}
          >
            Annual Bonus:
          </span>
          {editing ? (
            <input
              type="text"
              value={annualBonus}
              onChange={(e) => setAnnualBonus(e.target.value)}
            />
          ) : (
            <span
              style={{
                width: 238,
                justifyContent: "center",
                flexDirection: "column",
                height: "26px",
                fontSize: 18,
                fontFamily: "PolySans",
                fontWeight: 300,
              }}
            >
              {annualBonus}
            </span>
          )}
        </div>

        {/* Section 4 */}

        <div
          style={{
            display: "flex",
            width: 524,
            alignItems: "center",
            marginTop: 24,
          }}
          data-cw-section-identifier="benefit-info-header"
        >
          <p
            style={{
              width: 473,
              height: 22,
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 12,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Benefits
          </p>
          <span
            style={{
              color: "#0000FF",
              alignItems: "flex-start",
              gap: 8,
              fontSize: "14px",
              fontFamily: "PolySans",
              fontWeight: 600,
            }}
          >
            Edit
          </span>
        </div>
        <hr style={{ height: 0, color: "#DAE0E7", alignSelf: "stretch" }} />
        <div
          style={{ display: "flex", alignItems: "center", gap: 18 }}
          data-cw-section-identifier="benefit-info"
        >
          <p
            style={{
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Pension:
          </p>
          <p
            style={{
              width: 238,
              justifyContent: "center",
              flexDirection: "column",
              height: "26px",
              fontSize: 18,
              fontFamily: "PolySans",
              fontWeight: 300,
              margin: "0px",
            }}
          >
            6% Employer Contributions
          </p>
        </div>

        {/* Section 5 */}

        <div
          style={{
            display: "flex",
            width: 524,
            alignItems: "center",
            marginTop: 24,
          }}
          data-cw-section-identifier="leave-info-header"
        >
          <p
            style={{
              width: 473,
              height: 22,
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 12,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Leave Entitlement
          </p>
          <span
            style={{
              color: "#0000FF",
              alignItems: "flex-start",
              gap: 8,
              fontSize: "14px",
              fontFamily: "PolySans",
              fontWeight: 600,
            }}
          >
            Edit
          </span>
        </div>
        <hr style={{ height: 0, color: "#DAE0E7", alignSelf: "stretch" }} />
        <div
          style={{ display: "flex", alignItems: "center", gap: 18 }}
          data-cw-section-identifier="leave-info"
        >
          <p
            style={{
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Annual Leave:
          </p>
          <p
            style={{
              width: 238,
              justifyContent: "center",
              flexDirection: "column",
              height: "26px",
              fontSize: 18,
              fontFamily: "PolySans",
              fontWeight: 300,
              margin: "0px",
            }}
          >
            25 Days
          </p>
        </div>

        {/* Section 6 */}

        <div
          style={{
            display: "flex",
            width: 524,
            alignItems: "center",
            marginTop: 24,
          }}
          data-cw-section-identifier="termination-info-header"
        >
          <p
            style={{
              width: 473,
              height: 22,
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 12,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Employement Termination
          </p>
          <span
            style={{
              color: "#0000FF",
              alignItems: "flex-start",
              gap: 8,
              fontSize: "14px",
              fontFamily: "PolySans",
              fontWeight: 600,
            }}
          >
            Edit
          </span>
        </div>
        <hr style={{ height: 0, color: "#DAE0E7", alignSelf: "stretch" }} />
        <div
          style={{ display: "flex", alignItems: "center", gap: 18 }}
          data-cw-section-identifier="termination-info"
        >
          <p
            style={{
              width: 154,
              fontSize: 20,
              fontFamily: "PolySans",
              fontWeight: 600,
              margin: "0px",
            }}
          >
            Notice Period:
          </p>
          <span
            style={{
              width: 238,
              justifyContent: "center",
              flexDirection: "column",
              height: "26px",
              fontSize: 18,
              fontFamily: "PolySans",
              fontWeight: 300,
            }}
            data-testid="notice-period-value"
          >
            1 Month
          </span>
        </div>
        <hr
          style={{
            height: 0,
            color: "#DAE0E7",
            alignSelf: "stretch",
            marginTop: 24,
          }}
        />
        <p
          style={{
            justifyContent: "center",
            fontSize: 16,
            fontFamily: "PolySans",
            fontWeight: 300,
            width: 524,
            marginTop: 24,
          }}
          data-cw-section-identifier="disclaimer"
        >
          Provided the terms above are acceptable, we will proceed to provide
          you with a formal Employment Contract, which contains additional
          terms, including terms which govern your obligations as an employee,
          your post-employment obligations, and terms relating to the cessation
          of your employment.
        </p>
      </section>
    );
};

const Page1 = (props) => {
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
        } else if(currentPage === 3){
            return <BasicBlog/>
        } else if(currentPage === 4){
            return <Page4/>
        
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
              setCurrentPage((page)=>{
                return page + 1;
              });
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
              query={props.selectedText}
            />
          </div>
        </footer>
      </MainContainer>
    );
};

export default Page1;