document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation buttons and sections
    const buttons = document.querySelectorAll('.card-buttons button');
    const sections = document.querySelectorAll('.card-section');
    const card = document.querySelector('.card');

    // Function to switch sections
    function switchSection(targetSection) {
        sections.forEach(section => section.classList.remove('is-active'));
        buttons.forEach(button => button.classList.remove('is-active'));

        const targetElement = document.querySelector(targetSection);
        if (targetElement) targetElement.classList.add('is-active');

        const activeButton = document.querySelector(`button[data-section="${targetSection}"]`);
        if (activeButton) activeButton.classList.add('is-active');

        card.setAttribute('data-state', targetSection);
    }

    // Add click event listeners to navigation buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            switchSection(targetSection);
        });
    });

    // Initialize with about section active
    switchSection('#about');

    // Download CV functionality
    const downloadBtn = document.querySelector('.download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Download CV button clicked');
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = 'GENERATING...';
            this.disabled = true;

            // Create complete HTML CV document with download functionality
            const cvHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - Oladipupo Ismail Oluwatobi</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8f9fa;
            padding: 20px;
        }
        
        .download-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            gap: 10px;
        }
        
        .download-btn, .print-btn {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .print-btn {
            background: linear-gradient(135deg, #3498db, #2980b9);
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }
        
        .download-btn:hover, .print-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
        }
        
        .print-btn:hover {
            box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }
        
        .download-btn:disabled, .print-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
        }
        
        .cv-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border-radius: 15px;
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50, #3498db);
            color: white;
            padding: 50px 40px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        
        .header * {
            position: relative;
            z-index: 1;
        }
        
        .header h1 {
            font-size: 2.8em;
            margin-bottom: 15px;
            font-weight: 700;
            letter-spacing: 3px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .header .title {
            font-size: 1.3em;
            margin-bottom: 25px;
            opacity: 0.95;
            font-weight: 300;
        }
        
        .header .contact-info {
            font-size: 1em;
            opacity: 0.9;
            line-height: 1.8;
        }
        
        .content {
            padding: 50px 40px;
        }
        
        .section {
            margin-bottom: 45px;
        }
        
        .section-title {
            font-size: 2em;
            color: #2c3e50;
            border-bottom: 4px solid #3498db;
            padding-bottom: 12px;
            margin-bottom: 25px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 60px;
            height: 4px;
            background: #e74c3c;
        }
        
        .about-text {
            font-size: 1.15em;
            text-align: justify;
            line-height: 1.9;
            color: #555;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            padding: 30px;
            border-radius: 12px;
            border-left: 6px solid #3498db;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }
        
        .experience-item {
            background: #fff;
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            position: relative;
            overflow: hidden;
        }
        
        .experience-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: linear-gradient(to bottom, #3498db, #2c3e50);
        }
        
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 18px;
            flex-wrap: wrap;
        }
        
        .job-title {
            font-size: 1.4em;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 8px;
            line-height: 1.3;
        }
        
        .job-duration {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
            padding: 10px 18px;
            border-radius: 25px;
            font-size: 0.9em;
            font-weight: 600;
            box-shadow: 0 3px 10px rgba(52, 152, 219, 0.3);
            white-space: nowrap;
        }
        
        .company {
            font-size: 1.15em;
            color: #e74c3c;
            font-weight: 600;
            margin-bottom: 12px;
        }
        
        .job-description {
            color: #666;
            line-height: 1.8;
            font-size: 1.05em;
        }
        
        .contact-section {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            font-size: 1.1em;
            padding: 18px 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
            border-left: 4px solid #3498db;
        }
        
        .contact-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #3498db, #2980b9);
            border-radius: 50%;
            color: white;
            font-size: 12px;
            font-weight: bold;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
        }
        
        .contact-text {
            flex: 1;
            line-height: 1.5;
        }
        
        .contact-label {
            font-weight: 600;
            color: #2c3e50;
            margin-right: 8px;
        }
        
        .footer {
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            text-align: center;
            padding: 25px;
            font-size: 0.95em;
            position: relative;
        }
        
        .footer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: #3498db;
        }
        
        @media print {
            body { 
                background: white; 
                padding: 0; 
            }
            .cv-container { 
                box-shadow: none; 
                border-radius: 0;
            }
            .download-controls {
                display: none;
            }
        }
        
        @media (max-width: 768px) {
            .content {
                padding: 30px 20px;
            }
            .header {
                padding: 30px 20px;
            }
            .job-header { 
                flex-direction: column; 
            }
            .job-duration { 
                margin-top: 10px; 
                align-self: flex-start;
            }
            .header h1 {
                font-size: 2.2em;
            }
            .download-controls {
                position: relative;
                top: auto;
                right: auto;
                margin-bottom: 20px;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="download-controls">
        <!-- <button class="download-btn" onclick="downloadPDF()">
            📄 Download PDF
        </button> -->
        <button class="print-btn" onclick="window.print()">
            🖨️ Print
        </button>
    </div>

    <div class="cv-container" id="cv-content">
        <div class="header">
            <h1>OLADIPUPO ISMAIL OLUWATOBI</h1>
            <div class="title">Developer || Designer || Writer || Analyst</div>
            <div class="contact-info">
                <div>📧 ismailoladipupo43@gmail.com | 📱 09157886806 or 08144241324</div>
                <div>📍 No 83, Temidire Community Line 2, Arulogun Area, Ede, Osun State</div>
            </div>
        </div>

        <div class="content">
            <div class="section">
                <h2 class="section-title">About Me</h2>
                <p class="about-text">
                    I am a passionate and versatile Computer Science graduate with a keen interest in programming, graphics designing, and content writing. My journey in the world of technology has equipped me with a solid foundation in problem-solving and a creative mindset. With extensive experience in full-stack development, UI/UX design, and educational technology, I bring innovation and excellence to every project I undertake.
                </p>
            </div>

            <div class="section">
                <h2 class="section-title">Work Experience</h2>
                
                <div class="experience-item">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Full-Stack Developer</div>
                            <div class="company">GatesTek</div>
                        </div>
                        <div class="job-duration">2022 - Present</div>
                    </div>
                    <div class="job-description">
                        Responsible for the encompassing brand experience through coding. Develop and maintain responsive web applications using modern frameworks and technologies. Collaborate with cross-functional teams to deliver high-quality software solutions that meet client requirements and business objectives.
                    </div>
                </div>

                <div class="experience-item">
                    <div class="job-header">
                        <div>
                            <div class="job-title">UI/UX (Product) Designer</div>
                            <div class="company">GatesTek</div>
                        </div>
                        <div class="job-duration">2022 - Present</div>
                    </div>
                    <div class="job-description">
                        Create onboarding illustrations for Web and App Development. Design user-centered interfaces and interactive prototypes. Conduct user research and usability testing to improve user experience. Develop and maintain design systems to ensure consistency across products.
                    </div>
                </div>

                <div class="experience-item">
                    <div class="job-header">
                        <div>
                            <div class="job-title">IT Instructor</div>
                            <div class="company">Federal Girls' College, Kabba, Kogi State</div>
                        </div>
                        <div class="job-duration">2022 - 2023</div>
                    </div>
                    <div class="job-description">
                        Designed and implemented IT curriculum for students, Conducted training sessions, equipping students with fundamental IT skills and Fostered a positive learning environment and provided technical support.
                    </div>
                </div>

                <div class="experience-item">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Front End Developer and Content Writer</div>
                            <div class="company">Molababs Computer Institute</div>
                        </div>
                        <div class="job-duration">2018 - 2021</div>
                    </div>
                    <div class="job-description">
                        Translated design concepts into responsive and user-friendly web interfaces, Wrote engaging content for websites, blog posts, and promotional materials and Collaborated with cross-functional teams to enhance the user experience.
                    </div>
                </div>

                <div class="experience-item">
                    <div class="job-header">
                        <div>
                            <div class="job-title">Graphics Designer</div>
                            <div class="company">Molababs Computer Institute</div>
                        </div>
                        <div class="job-duration">2013 - 2017</div>
                    </div>
                    <div class="job-description">
                        Collaborated with clients to understand design requirements and deliver high-quality designs, Ensured brand consistency across various design projects and Developed visually compelling graphics using graphics Softwares.
                    </div>
                </div>
            </div>

            <div class="section">
                <h2 class="section-title">Contact Information</h2>
                <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <div><strong>Address:</strong> No 83, Temidire Community Line 2, Arulogun Area, Ede, Osun State</div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <div><strong>Phone:</strong> 09157886806 or 08144241324</div>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <div><strong>Email:</strong> ismailoladipupo43@gmail.com</div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Professional CV - Generated on ${new Date().toLocaleDateString()}</p>
        </div>
    </div>
</body>
</html>`;

            // Create and download the HTML file
            try {
                const blob = new Blob([cvHTML], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Oladipupo_Ismail_Oluwatobi_Professional_CV.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                // Clean up
                this.innerHTML = originalText;
                this.disabled = false;
                console.log('HTML file generated successfully');
            } catch (error) {
                console.error('HTML file generation failed:', error);
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Failed to generate HTML file. Please try again.');
            }
        });
    }
});