import React, { useEffect, useState } from 'react';
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaHome, FaUser, FaGraduationCap, FaLaptopCode, FaEnvelope, FaBriefcase } from "react-icons/fa";

import image from '../Image/main.jpeg';
import menubar from '../Image/menubar.png';
import resume from '../Image/priya_resum.pdf';
import cancel from '../Image/cancel.png';
import py from '../Image/py.jpeg';
import database from '../Image/database.png';
import bac from '../Image/bac.jpeg';
import da from '../Image/da.jpeg';
import ai from '../Image/ai.jpeg';
import home from '../Image/home.png'
import email from '../Image/email.png'
import phone from '../Image/phone.png'

// ---------marquee images---------

import api from '../Image/api.png';
import sql from '../Image/sql.png';
import mongodb from '../Image/mongodb.png';
import excel from '../Image/excel.png';
import po from '../Image/po.png';
import tab from '../Image/tab.png';
import postman from '../Image/postman.png';

// -------------------------------------------------

import styles from '../css/Interface.module.css'

const useTypingEffect = (texts, speed) => {
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[textIndex];
      setCurrentText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(typingTimeout);
  }, [currentText, isDeleting, textIndex, texts, speed]);

  return currentText;
};

const Interface = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const texts = ["Python Developer", "Backend Developer", "Data Analyst"];
  const typingSpeed = 100;
  const typedText = useTypingEffect(texts, typingSpeed);
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);

        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };
  return (
    <>
      {/* Header */}
      <div
        className={`fixed top-0 left-0 w-full z-10 shadow-md transition-all duration-500 ${darkMode
            ? "bg-gray-900 text-white"
            : "bg-white text-gray-900"
          }`}
      >
        <div className='h-[10%] p-2 flex justify-between items-center md:p-4'>
          <h1 className='text-2xl font-bold text-blue-600'>Portfolio</h1>
          <nav className='hidden md:flex gap-6 text-lg items-center'>
            <a href="#home" className='flex flex-col items-center gap-1 hover:text-blue-400 transition-colors text-sm'>
              <FaHome className="text-lg" />
              <span>Home</span>
            </a>
            <a href="#about" className='flex flex-col items-center gap-1 hover:text-blue-400 transition-colors text-sm'>
              <FaUser className="text-lg" />
              <span>About</span>
            </a>
            <a href="#experience" className='flex flex-col items-center gap-1 hover:text-blue-400 transition-colors text-sm'>
              <FaBriefcase className="text-lg" />
              <span>Experience</span>
            </a>
            <a href="#education" className='flex flex-col items-center gap-1 hover:text-blue-400 transition-colors text-sm'>
              <FaGraduationCap className="text-lg" />
              <span>Education</span>
            </a>
            <a href="#skills" className='flex flex-col items-center gap-1 hover:text-blue-400 transition-colors text-sm'>
              <FaLaptopCode className="text-lg" />
              <span>Skills</span>
            </a>
            <a href="#contact" className='flex flex-col items-center gap-1 hover:text-blue-400 transition-colors text-sm'>
              <FaEnvelope className="text-lg" />
              <span>Contact</span>
            </a>
            <button
              onClick={toggleTheme}
              className="text-3xl ml-2"
            >
              {darkMode ? <MdDarkMode /> : <MdLightMode />}
            </button>
          </nav>
          <img src={menubar} alt="Menu" className='w-6 h-5 md:hidden cursor-pointer' onClick={toggleSidebar} />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`w-full min-h-screen relative overflow-x-hidden transition-all duration-500 ${darkMode
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-800"
          }`}
      >

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-8/12 bg-gray-200 text-gray-900 z-20 transition-transform duration-400 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <nav className='flex flex-col p-10 w-full h-full gap-6 text-lg relative'>
            <img src={cancel} alt="Close Menu" className='absolute right-3 top-3 w-6 cursor-pointer' onClick={toggleSidebar} />
            <a href="#home" className='flex items-center gap-3 hover:text-blue-400 transition-colors' onClick={toggleSidebar}>
              <FaHome /> Home
            </a>
            <a href="#about" className='flex items-center gap-3 hover:text-blue-400 transition-colors' onClick={toggleSidebar}>
              <FaUser /> About
            </a>
            <a href="#experience" className='flex items-center gap-3 hover:text-blue-400 transition-colors' onClick={toggleSidebar}>
              <FaBriefcase /> Experience
            </a>
            <a href="#education" className='flex items-center gap-3 hover:text-blue-400 transition-colors' onClick={toggleSidebar}>
              <FaGraduationCap /> Education
            </a>
            <a href="#skills" className='flex items-center gap-3 hover:text-blue-400 transition-colors' onClick={toggleSidebar}>
              <FaLaptopCode /> Skills
            </a>
            <a href="#contact" className='flex items-center gap-3 hover:text-blue-400 transition-colors' onClick={toggleSidebar}>
              <FaEnvelope /> Contact
            </a>
            <button
              onClick={toggleTheme}
              className="text-3xl ml-4 hover:text-blue-500 transition"
            >
              {darkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </nav>
        </div>

        {/* Hero Section */}
        <div
          id="home"
          className={`flex flex-col md:flex-row min-h-screen pt-16 md:pt-20 p-5 transition-all duration-500 ${darkMode ? "bg-gray-900" : ""
            }`}
        >
          <div className='flex-1 flex justify-center items-center'>
            <img
              src={image}
              alt="Profile"
              className="rounded-full shadow-lg object-cover object-center w-72 h-72 md:w-[300px] md:h-[300px]"
            />
          </div>
          <div className='flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left'>
            <h1 className='text-2xl md:text-4xl font-bold'>Hello Everyone!</h1>
            <h2 className='text-xl md:text-3xl font-semibold mt-2'>
              I'm <span className='text-blue-600'>Priyanka</span>
            </h2>
            <p className='mt-2 text-lg md:text-2xl text-green-600'>{typedText}|</p>
            <p className='mt-4 text-sm md:text-lg max-w-md'>
              I am a passionate Python Backend Developer with strong knowledge of Python, SQL, MongoDB and Django. I enjoy building secure, scalable and user-friendly applications, and I am eager to contribute to real-world software development projects.
            </p>
            <div className='mt-6 flex gap-6'>
              <a href={resume} download="priya_resume.pdf" className='bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition'>
                Download CV
              </a>
              <a href="mailto:sekarpriyanka212@gmail.com" className='bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition'>
                Hire Me
              </a>
            </div>
          </div>
        </div>


        {/* About Section */}
        <div
          id="about"
          className={`w-full flex justify-center items-center py-20 px-5 transition-all duration-500 ${darkMode ? "bg-[#1e293b]" : "bg-white"
            }`}
        >
          <div className='max-w-5xl w-full'>
            <div className='text-center'>
              <p
                className={`tracking-[10px] text-xl ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                ABOUT ME
              </p>
              <h1
                className={`mt-10 text-3xl md:text-4xl font-bold underline ${darkMode ? "text-white" : "text-gray-900"
                  }`}
              >
                Who Am I?
              </h1>
            </div>
            <div
              className={`mt-6 text-lg leading-relaxed text-center ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              <h1 className={darkMode ? "text-white" : "text-gray-800"}>
                Hi! I am Priyanka
              </h1>
            </div>
            <div className='mt-10 grid grid-cols-2 md:grid-cols-5 gap-6'>

              <div className={`flex flex-col items-center p-4 transform hover:-translate-y-1 rounded-xl shadow-lg transition-all duration-300 ${darkMode
                  ? "bg-[#334155] hover:bg-[#475569] text-white"
                  : "bg-white hover:bg-gray-100 text-gray-900"
                }`}>
                <img src={py} alt="Python Developer" className='w-16 h-16' />
                <h1 className={`mt-2 text-sm font-semibold md:text-xl ${darkMode ? "text-white" : "text-gray-800"
                  }`}>Python Developer</h1>
              </div>

              <div className={`flex flex-col items-center p-4 transform hover:-translate-y-1 rounded-xl shadow-lg transition-all duration-300 ${darkMode
                  ? "bg-[#334155] hover:bg-[#475569] text-white"
                  : "bg-white hover:bg-gray-100 text-gray-900"
                }`}>
                <img src={bac} alt="Backend Developer" className='w-16 h-16' />
                <h1 className={`mt-2 text-sm font-semibold md:text-xl ${darkMode ? "text-white" : "text-gray-800"
                  }`}>Backend Developer</h1>
              </div>

              <div className={`flex flex-col items-center p-4 transform hover:-translate-y-1 rounded-xl shadow-lg transition-all duration-300 ${darkMode
                  ? "bg-[#334155] hover:bg-[#475569] text-white"
                  : "bg-white hover:bg-gray-100 text-gray-900"
                }`}>
                <img src={da} alt="Data Analyst" className='w-16 h-16' />
                <h1 className={`mt-2 text-sm font-semibold md:text-xl ${darkMode ? "text-white" : "text-gray-800"
                  }`}>Data Analyst</h1>
              </div>

              <div className={`flex flex-col items-center p-4 transform hover:-translate-y-1 rounded-xl shadow-lg transition-all duration-300 ${darkMode
                  ? "bg-[#334155] hover:bg-[#475569] text-white"
                  : "bg-white hover:bg-gray-100 text-gray-900"
                }`}>
                <img src={database} alt="Database Management" className='w-16 h-16' />
                <h1 className={`mt-2 text-sm font-semibold md:text-xl ${darkMode ? "text-white" : "text-gray-800"
                  }`}>Database Management</h1>
              </div>

              <div className={`flex flex-col items-center p-4 transform hover:-translate-y-1 rounded-xl shadow-lg transition-all duration-300 ${darkMode
                  ? "bg-[#334155] hover:bg-[#475569] text-white"
                  : "bg-white hover:bg-gray-100 text-gray-900"
                }`}>
                <img src={ai} alt="Ai Agent Developer" className='w-16 h-16' />
                <h1 className={`mt-2 text-sm font-semibold md:text-xl ${darkMode ? "text-white" : "text-gray-800"
                  }`}>Ai Agent Developer</h1>
              </div>
            </div>
          </div>
        </div>


        {/* --------------------About Us section finish Here----------------- */}

        {/* Experience Section */}
        <div
          id="experience"
          className={`w-full flex justify-center flex-col items-center transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
            }`}
        >
          <div className="w-full h-full py-20 px-5 flex items-center flex-col md:px-20 max-w-5xl">
            <div className='text-center'>
              <p className={`tracking-[10px] text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                EXPERIENCE
              </p>
              <h1 className={`mt-5 text-3xl md:text-4xl font-bold underline ${darkMode ? "text-white" : "text-gray-800"
                }`}>
                Work Experience
              </h1>
            </div>

            <div className="relative border-l border-blue-500 mt-12 ml-4 md:ml-0 w-full space-y-12">

              {/* Experience 1 */}
              <div className="relative pl-8 md:pl-10">
                <span className="absolute -left-[11px] top-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center ring-4 ring-blue-200 dark:ring-blue-900">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </span>
                <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${darkMode ? "bg-[#334155] text-white" : "bg-white text-gray-800"
                  }`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Python Backend Developer</h2>
                      <p className={`text-base font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Digitaly AI Tech Solution</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      Dec 2025 - May 2026 (6 Months)
                    </span>
                  </div>
                  <ul className={`list-disc list-inside space-y-2 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <li>Developed and optimized scalable backend web services and REST APIs using Python and Django.</li>
                    <li>Designed and managed MongoDB and SQL databases to ensure fast retrieval speeds and high availability.</li>
                    <li>Implemented secure user authentication and server-side business logic for client solutions.</li>
                  </ul>
                </div>
              </div>

              {/* Experience 2 */}
              <div className="relative pl-8 md:pl-10">
                <span className="absolute -left-[11px] top-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center ring-4 ring-green-200 dark:ring-green-900">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </span>
                <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${darkMode ? "bg-[#334155] text-white" : "bg-white text-gray-800"
                  }`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-green-600 dark:text-green-400">Data Analyst Intern</h2>
                      <p className={`text-base font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Pumo Technovation</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
                      Jun 2025 - Sep 2025 (3 Months)
                    </span>
                  </div>
                  <ul className={`list-disc list-inside space-y-2 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <li>Created and deployed interactive visual reports and operational dashboards in Power BI and Tableau.</li>
                    <li>Wrote complex SQL queries to clean, filter, and extract critical business metrics from databases.</li>
                    <li>Conducted data processing and statistical analysis to assist decision-making processes.</li>
                  </ul>
                </div>
              </div>

              {/* Experience 3 */}
              <div className="relative pl-8 md:pl-10">
                <span className="absolute -left-[11px] top-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center ring-4 ring-red-200 dark:ring-red-900">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </span>
                <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${darkMode ? "bg-[#334155] text-white" : "bg-white text-gray-800"
                  }`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Python Intern</h2>
                      <p className={`text-base font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Mech Tech Research Foundation, Pudukkottai</p>
                    </div>
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
                      Jun 2024 - Jul 2024 (1 Month)
                    </span>
                  </div>
                  <ul className={`list-disc list-inside space-y-2 text-sm md:text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    <li>Developed core Python scripts for data manipulation and research automation.</li>
                    <li>Built deep understanding of key programming principles including data structures and OOP concepts.</li>
                    <li>Assisted research engineers in automating manual workflows and formatting scientific data.</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ------------------------Education Section------------------------- */}


        <div
          id="education"
          className={`w-full min-h-screen flex justify-center flex-col items-center overscroll-x-auto transition-all duration-500 ${darkMode
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-900"
            }`}
        >
          <div className="w-full h-full py-20 px-5 flex items-center flex-col md:px-20">
            <div className='text-center mt-1 md:mt-0'>
              <p className={`tracking-[10px] text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>EDUCATION</p>
              <h1 className={`mt-5 text-3xl md:text-4xl font-bold underline ${darkMode ? "text-white" : "text-gray-800"
                }`}>My Education</h1>
            </div>

            <div className='mt-10 w-full space-y-8'>

              {/* Post Graduation */}
              <div className={`shadow-md rounded-lg transition-all ${darkMode ? "bg-gray-800" : "bg-white"
                }`}>
                <div
                  className='flex justify-between items-center p-5 bg-red-500 cursor-pointer rounded-t-lg'
                  onClick={() => toggleSection('postGrad')}
                >
                  <h1 className='text-white text-xl font-semibold'>POST GRADUATION</h1>
                  <span className='text-white text-2xl'>{activeSection === 'postGrad' ? '-' : '+'}</span>
                </div>
                {activeSection === 'postGrad' && (
                  <div className={`p-5 rounded-b-lg transition-all ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50"
                    }`}>
                    <h1 className={darkMode ? "text-white text-lg font-semibold" : "text-gray-800 text-lg font-semibold"}>MASTER OF COMPUTER APPLICATION</h1>
                    <ul className={`list-disc list-inside mt-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      <li>J.J. College of Arts & Science</li>
                      <li>Year of Passing: 2025</li>
                      <li>CGPA: 9.16</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Under Graduation */}
              <div className={`shadow-md rounded-lg transition-all ${darkMode ? "bg-gray-800" : "bg-white"
                }`}>
                <div
                  className='flex justify-between items-center p-5 bg-blue-500 cursor-pointer rounded-t-lg'
                  onClick={() => toggleSection('underGrad')}
                >
                  <h1 className='text-white text-xl font-semibold'>UNDER GRADUATION</h1>
                  <span className='text-white text-2xl'>{activeSection === 'underGrad' ? '-' : '+'}</span>
                </div>
                {activeSection === 'underGrad' && (
                  <div className={`p-5 rounded-b-lg transition-all ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50"
                    }`}>
                    <h1 className={darkMode ? "text-white text-lg font-semibold" : "text-gray-800 text-lg font-semibold"}>BACHELOR OF INFORMATION TECHNOLOGY</h1>
                    <ul className={`list-disc list-inside mt-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      <li>Arumugam Pillai Seethai Ammal College</li>
                      <li>Year of Passing: 2023</li>
                      <li>CGPA: 9.26</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* HSC */}
              <div className={`shadow-md rounded-lg transition-all ${darkMode ? "bg-gray-800" : "bg-white"
                }`}>
                <div
                  className='flex justify-between items-center p-5 bg-green-500 cursor-pointer rounded-t-lg'
                  onClick={() => toggleSection('hsc')}
                >
                  <h1 className='text-white text-xl font-semibold'>HSC</h1>
                  <span className='text-white text-2xl'>{activeSection === 'hsc' ? '-' : '+'}</span>
                </div>
                {activeSection === 'hsc' && (
                  <div className={`p-5 rounded-b-lg transition-all ${darkMode ? "bg-gray-700 text-white" : "bg-gray-50"
                    }`}>
                    <h1 className={darkMode ? "text-white text-lg font-semibold" : "text-gray-800 text-lg font-semibold"}>Computer Science with Mathematics </h1>
                    <ul className={`list-disc list-inside mt-2 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                      <li>Nagappa Maruthappa Government Girls Higher Secondary School</li>
                      <li>Year of Passing: 2020</li>
                      <li>Percentage: 73 %</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------Education section finish here-------------------------- */}

        {/* ---------------------------skill section---------------------------------- */}


        <div
          id="skills"
          className={`w-full transition-all duration-500 ${darkMode
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900"
            }`}
        >
          <div className='w-full h-full' >
            <div className='flex justify-center'>
              <h1 className={`text-lg mt-24 tracking-[10px] ${darkMode ? "text-gray-300" : "text-gray-600"
                }`}>Skills</h1>
            </div>
            <div className={`mt-10 py-5 ${darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}>
              <div className='overflow-x-auto whitespace-nowrap'>
                <div className={styles.marquee}>
                  <img src={py} alt="python Icon" className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block' />
                  <img src={excel} alt="excel Icon" className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block' />
                  <img src={mongodb} alt="MongoDB Icon" className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block' />
                  <img src={po} alt="powerbi Icon" className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block' />
                  <img src={sql} alt="sql Icon" className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block' />
                  <img src={api} alt="api Icon" className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block' />
                  <img src={tab} alt="tableau Icon" className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block' />
                  <img src={postman} alt="Postman Icon" className='w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block' />
                  {/* Repeat for infinite marquee */}
                  <img src={py} alt="python Icon" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block" />
                  <img src={excel} alt="excel Icon" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block" />
                  <img src={mongodb} alt="MongoDB Icon" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block" />
                  <img src={po} alt="Power BI Icon" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block" />
                  <img src={sql} alt="SQL Icon" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block" />
                  <img src={api} alt="REST API Icon" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block" />
                  <img src={tab} alt="Tableau Icon" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block" />
                  <img src={postman} alt="Postman Icon" className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain inline-block" />
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-6'>
              <div className='p-4'>
                <h1 className='text-xl font-semibold mb-4'>BACKEND DEVLOPMENT</h1>
                <div className='mb-4'>
                  <h2 className='font-medium flex justify-between'>
                    PYTHON <span>95%</span>
                  </h2>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className='mb-4'>
                  <h2 className='font-medium flex justify-between'>
                    Django <span>95%</span>
                  </h2>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className='mb-4'>
                  <h2 className='font-medium flex justify-between'>
                    Rest API <span>95%</span>
                  </h2>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
              <div className='p-4'>
                <h1 className='text-xl font-semibold mb-4'>DATABASE</h1>
                <div className='mb-4'>
                  <h2 className='font-medium flex justify-between'>
                    SQL <span>93%</span>
                  </h2>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div className='mb-4'>
                  <h2 className='font-medium flex justify-between'>
                    MONGODB <span>93%</span>
                  </h2>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
              <div className='p-4'>
                <h1 className='text-xl font-semibold mb-4'>DATA ANALYST</h1>
                <div className='mb-4'>
                  <h2 className='font-medium flex justify-between'>
                    POWER BI <span>85%</span>
                  </h2>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className='mb-4'>
                  <h2 className='font-medium flex justify-between'>
                    TABLEAU <span>85%</span>
                  </h2>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className='mb-4'>
                  <h2 className='font-medium flex justify-between'>
                    EXCEL <span>85%</span>
                  </h2>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div className='bg-blue-500 h-2 rounded-full' style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------------------------------------------------ */}

        {/* ------------------------------------------------------------------------------------------------------------------ */}

        <div
          id="contact"
          className={`w-full min-h-screen flex items-center justify-center md:px-10 py-10 transition-all duration-500 ${darkMode
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-900"
            }`}
        >
          <div
            className={`max-w-4xl w-full overflow-hidden p-8 rounded-lg shadow-lg transition-all duration-500 ${darkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
              }`}
          >
            <div className="text-center mb-8">
              <h1 className={`text-xl tracking-[10px] ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Contact</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <img src={home} alt="Home-Icon" className="w-8 h-8 mr-4" />
                  <div>
                    <h1 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-700"
                      }`}>Our Location</h1>
                    <a href="https://www.google.com/maps/search/Velanippatti,Kattambu+Post,Thiruppathur+Taluk,Sivagangai+District+630210" target="_blank" rel="noopener noreferrer" className={`${darkMode ? "text-gray-300" : "text-gray-600"} hover:underline`}>No:340, Velanippati, Thiruppathur - 630210</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src={phone} alt="Phone-Icon" className="w-8 h-8 mr-4" />
                  <div>
                    <h1 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-700"
                      }`}>Phone Number</h1>
                    <a href="tel:+91 6369871074" className={`${darkMode ? "text-gray-300" : "text-gray-600"} hover:underline`}>+91 6369871074</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src={email} alt="E-mail Icon" className="w-8 h-8 mr-4" />
                  <div>
                    <h1 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-700"
                      }`}>Email Address</h1>
                    <a href="mailto:sekarpriyanka212@gmail.com" className={`${darkMode ? "text-gray-300" : "text-gray-600"} hover:underline`}>sekarpriyanka212@gmail.com</a>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"
                      }`}>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-black border-gray-300"
                        }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"
                      }`}>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-black border-gray-300"
                        }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={`block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"
                      }`}>Phone:</label>
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-black border-gray-300"
                        }`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"
                        }`}
                    >
                      Message:
                    </label>

                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${darkMode
                          ? "bg-gray-700 text-white border-gray-600"
                          : "bg-white text-black border-gray-300"
                        }`}
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="px-5 bg-blue-600 py-1 text-white rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default Interface;
