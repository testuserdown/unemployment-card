// src/App.jsx
import { useState } from "react";
import { TemplatesSection } from "./components/templates";
import "./home.css";
import "./components/index.scss";
import { RiTwitterXFill, RiUploadCloudFill } from "react-icons/ri";
import { templates } from "./context/data";
import { saveCardAsImage } from "./context/service";

const ENV = window.__ENV || {};
const title = ENV.TITLE || "UNEMPLOYMENT CLUB COMPANY";
export function App() {
  const [activeTemplate, setActiveTemplate] = useState(1);
  const [formData, setFormData] = useState({
    avatar: null,
    avatarPreview: null,
    name: "",
    previousJob: "",
    unemploymentPeriod: "",
  });
  const [cardGenerated, setCardGenerated] = useState(false);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
          avatarPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCardGenerated(true);
  };

  const handleReset = () => {
    setCardGenerated(false);
    setFormData({
      avatar: null,
      avatarPreview: null,
      name: "",
      previousJob: "",
      unemploymentPeriod: "",
    });
  };

  const downloadCard = async () => {
    const cardElement = document.querySelector(".result-card");
    saveCardAsImage(cardElement);
  };

  const selectedTemplate = templates.find((tpl) => tpl.id === activeTemplate);

  return (
    <div className="df fdc aic gap-20 main-container">
      <div className="w100 df fdc aic gap-10 main-title">
        <button
          className="button-86 df aic gap-10"
          onClick={() => window.open(ENV.X, "_blank")}
        >
          Follow X
        </button>
        <h1>{title}</h1>
        <p>
          A place to share your AI-generated unemployment stories and
          experiences.
        </p>
      </div>

      {!cardGenerated ? (
        <div className="w100 df fdc aic form">
          <p>Get your AI-generated unemployment Card</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="avatar" className="avatar-label">
              <label>Upload Avatar</label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatar}
                required
              />
              <span className="df aic jcc icon">
                {formData.avatarPreview ? (
                  <img src={formData.avatarPreview} alt="preview" />
                ) : (
                  <RiUploadCloudFill />
                )}
              </span>
            </label>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="previousJob">Previous Job</label>
              <input
                type="text"
                id="previousJob"
                placeholder="Enter your previous job title"
                value={formData.previousJob}
                onChange={handleInput}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="unemploymentPeriod">Unemployment Period</label>
              <input
                type="text"
                id="unemploymentPeriod"
                placeholder="e.g., 6 months"
                value={formData.unemploymentPeriod}
                onChange={handleInput}
                required
              />
            </div>
            <button type="submit" style={{ display: "none" }}>
              Generate Card
            </button>
          </form>
          <TemplatesSection
            active={activeTemplate}
            setActive={setActiveTemplate}
          />
          <button onClick={handleSubmit} className="button-86">
            Generate Card
          </button>
        </div>
      ) : (
        <div className="df fdc aic result">
          <h2>
            Your AI-Generated <span>Unemployment Card</span>
          </h2>
          <div
            className={`card ${selectedTemplate.className} result-card`}
            style={{ backgroundImage: `url(${selectedTemplate.bg})` }}
          >
            <h3>UNEMPLOYMENT CLUB</h3>
            <img className="avatar" src={formData.avatarPreview} alt="user" />
            <div className="info">
              <div className="group">
                <div className="label">Name</div>
                <div className="name">{formData.name}</div>
              </div>
              <div className="group">
                <div className="label">Previous Job</div>
                <div className="job">{formData.previousJob}</div>
              </div>
              <div className="group">
                <div className="label">Unemployment Period</div>
                <div className="duration">{formData.unemploymentPeriod}</div>
              </div>
            </div>
          </div>
          <div className="df aic gap-20" style={{ marginTop: "1.5rem" }}>
            <button onClick={handleReset} className="button-86">
              Create Another
            </button>
            <button onClick={downloadCard} className="button-86">
              Download
            </button>
          </div>
        </div>
      )}

      <div className="background"></div>
    </div>
  );
}
