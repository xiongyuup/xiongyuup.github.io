<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yu Xiong | Academic Homepage</title>
    <style>
        :root {
            --ink: #14212d;
            --muted: #5d6976;
            --soft: #eef3f5;
            --paper: #f8f6f1;
            --card: #ffffff;
            --navy: #102a3d;
            --blue: #255f83;
            --teal: #3c9a8a;
            --copper: #bd6f4a;
            --gold: #c7a04a;
            --line: rgba(20, 33, 45, 0.13);
            --shadow: 0 18px 50px rgba(16, 42, 61, 0.13);
            --wrap: min(1540px, calc(100vw - 56px));
        }

        * {
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            margin: 0;
            color: var(--ink);
            background: var(--paper);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }

        a {
            color: inherit;
        }

        .language-toggle {
            position: fixed;
            top: 18px;
            right: 18px;
            z-index: 30;
            min-height: 40px;
            padding: 0 16px;
            border: 1px solid rgba(255, 255, 255, 0.42);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.94);
            color: var(--navy);
            box-shadow: 0 18px 38px rgba(0,0,0,0.18);
            cursor: pointer;
            font-weight: 800;
        }

        .hero {
            position: relative;
            min-height: 92vh;
            color: #fff;
            overflow: hidden;
            background:
                linear-gradient(110deg, rgba(10, 24, 36, 0.98), rgba(18, 58, 78, 0.87) 58%, rgba(30, 76, 86, 0.78)),
                radial-gradient(circle at 78% 32%, rgba(60, 154, 138, 0.34), transparent 32%),
                #102a3d;
        }

        .hero::before {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0.2;
            background-image:
                linear-gradient(rgba(255,255,255,0.11) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.11) 1px, transparent 1px);
            background-size: 58px 58px;
            mask-image: linear-gradient(to bottom, #000 35%, transparent 100%);
        }

        .hero::after {
            content: "";
            position: absolute;
            right: -10vw;
            bottom: -20vw;
            width: 60vw;
            aspect-ratio: 1;
            border: 1px solid rgba(179, 225, 214, 0.2);
            border-radius: 50%;
            box-shadow:
                0 0 0 70px rgba(179, 225, 214, 0.04),
                0 0 0 150px rgba(179, 225, 214, 0.035),
                0 0 0 235px rgba(179, 225, 214, 0.025);
        }

        .hero-inner {
            position: relative;
            z-index: 1;
            width: var(--wrap);
            margin: 0 auto;
            min-height: 92vh;
            padding: 96px 0 52px;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(360px, 0.56fr);
            gap: 56px;
            align-items: center;
        }

        .eyebrow {
            margin: 0 0 18px;
            color: #b8e7dc;
            font-size: 0.82rem;
            font-weight: 850;
            letter-spacing: 0.17em;
            text-transform: uppercase;
        }

        h1 {
            margin: 0;
            font-size: clamp(4.2rem, 10vw, 10.4rem);
            line-height: 0.85;
            letter-spacing: 0;
        }

        .hero-summary {
            max-width: 900px;
            margin: 30px 0 0;
            color: rgba(255,255,255,0.82);
            font-size: clamp(1.04rem, 1.75vw, 1.34rem);
        }

        .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 34px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 46px;
            padding: 0 18px;
            border-radius: 7px;
            border: 1px solid rgba(255,255,255,0.34);
            color: #fff;
            text-decoration: none;
            font-weight: 760;
            transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .btn:hover {
            transform: translateY(-2px);
            border-color: rgba(255,255,255,0.78);
            background: rgba(255,255,255,0.1);
        }

        .btn.primary {
            color: #0e2a39;
            background: #b8e7dc;
            border-color: #b8e7dc;
        }

        .hero-panel {
            min-height: 520px;
            position: relative;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 8px;
            overflow: hidden;
            background:
                radial-gradient(circle at 50% 48%, rgba(184, 231, 220, 0.18) 0 1px, transparent 1px),
                linear-gradient(150deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04));
            background-size: 26px 26px, auto;
            box-shadow: 0 28px 90px rgba(0,0,0,0.36);
        }

        .hero-panel::before,
        .hero-panel::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 44%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
        }

        .hero-panel::before {
            width: 62%;
            aspect-ratio: 1;
            border: 1px solid rgba(184, 231, 220, 0.34);
            box-shadow:
                0 0 0 62px rgba(184, 231, 220, 0.055),
                0 0 0 126px rgba(184, 231, 220, 0.035);
        }

        .hero-panel::after {
            width: 11px;
            height: 11px;
            background: #b8e7dc;
            box-shadow:
                92px -118px 0 var(--copper),
                -122px 78px 0 var(--gold),
                142px 96px 0 #fff,
                -74px -104px 0 var(--teal);
        }

        .sweep {
            position: absolute;
            left: 50%;
            top: 44%;
            width: 46%;
            height: 46%;
            transform-origin: left top;
            background: linear-gradient(42deg, rgba(184, 231, 220, 0.35), transparent 64%);
            clip-path: polygon(0 0, 100% 0, 0 100%);
            animation: scan 7s linear infinite;
        }

        @keyframes scan {
            to { transform: rotate(360deg); }
        }

        .hero-stats {
            position: absolute;
            left: 24px;
            right: 24px;
            bottom: 24px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

        .stat {
            padding: 16px;
            border-radius: 7px;
            background: rgba(9, 24, 36, 0.7);
            border: 1px solid rgba(255,255,255,0.15);
        }

        .stat strong {
            display: block;
            font-size: 1.28rem;
            line-height: 1.08;
        }

        .stat span {
            display: block;
            margin-top: 5px;
            color: rgba(255,255,255,0.68);
            font-size: 0.74rem;
            line-height: 1.35;
        }

        nav {
            position: sticky;
            top: 0;
            z-index: 20;
            border-bottom: 1px solid rgba(16, 42, 61, 0.11);
            background: rgba(248, 246, 241, 0.93);
            backdrop-filter: blur(16px);
        }

        .nav-inner {
            width: var(--wrap);
            min-height: 60px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
        }

        .brand {
            color: var(--navy);
            text-decoration: none;
            font-weight: 900;
            letter-spacing: 0.03em;
        }

        .nav-links {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 6px;
        }

        .nav-links a {
            padding: 8px 10px;
            border-radius: 7px;
            color: #344454;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 760;
        }

        .nav-links a:hover {
            background: #e9e3d8;
        }

        .band {
            padding: 86px 0;
        }

        .band.alt {
            background: #e9eef0;
        }

        .band.dark {
            color: #fff;
            background: #102a3d;
        }

        .wrap {
            width: var(--wrap);
            margin: 0 auto;
        }

        .section-head {
            display: grid;
            grid-template-columns: minmax(180px, 0.28fr) minmax(0, 1fr);
            gap: 42px;
            align-items: start;
            margin-bottom: 30px;
        }

        .kicker {
            margin: 0;
            color: var(--copper);
            font-size: 0.8rem;
            font-weight: 900;
            letter-spacing: 0.15em;
            text-transform: uppercase;
        }

        .band.dark .kicker {
            color: #b8e7dc;
        }

        h2 {
            margin: 0;
            color: var(--navy);
            font-size: clamp(2rem, 3.1vw, 3.25rem);
            line-height: 1.06;
            letter-spacing: 0;
        }

        .band.dark h2 {
            color: #fff;
        }

        .lead {
            max-width: 980px;
            margin: 14px 0 0;
            color: var(--muted);
            font-size: 1.02rem;
        }

        .band.dark .lead {
            color: rgba(255,255,255,0.72);
        }

        .overview-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr 0.8fr;
            gap: 18px;
        }

        .panel,
        .paper,
        .project,
        .skill {
            border: 1px solid var(--line);
            border-radius: 8px;
            background: var(--card);
            box-shadow: var(--shadow);
        }

        .panel {
            padding: 28px;
        }

        .panel h3,
        .project h3 {
            margin: 0 0 12px;
            color: var(--navy);
            font-size: 1.08rem;
            line-height: 1.35;
        }

        .panel p,
        .panel li,
        .project p,
        .project li {
            color: var(--muted);
        }

        .timeline {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
        }

        .time-card {
            position: relative;
            min-height: 170px;
            padding: 26px;
            border-radius: 8px;
            background: var(--card);
            border: 1px solid var(--line);
            box-shadow: var(--shadow);
        }

        .time-card::before {
            content: "";
            position: absolute;
            left: 26px;
            top: 0;
            width: 42px;
            height: 4px;
            background: var(--teal);
        }

        .time-card strong {
            display: block;
            color: var(--navy);
            margin-bottom: 10px;
        }

        .time-card span {
            color: var(--muted);
        }

        .paper-toolbar {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 16px;
        }

        .paper-toolbar span {
            display: inline-flex;
            min-height: 30px;
            align-items: center;
            padding: 0 10px;
            border: 1px solid rgba(20, 33, 45, 0.13);
            border-radius: 999px;
            background: #fff;
            color: var(--muted);
            font-size: 0.84rem;
            font-weight: 760;
        }

        .paper-list {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            counter-reset: papers;
        }

        .paper {
            position: relative;
            display: grid;
            grid-template-columns: 54px minmax(0, 1fr);
            gap: 18px;
            padding: 22px;
            overflow: hidden;
        }

        .paper::before {
            counter-increment: papers;
            content: counter(papers, decimal-leading-zero);
            width: 42px;
            height: 42px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 7px;
            background: #edf5f3;
            color: var(--navy);
            font-size: 0.82rem;
            font-weight: 900;
        }

        .paper-title {
            margin: 0;
            color: var(--ink);
            font-size: 1.01rem;
            font-weight: 800;
            line-height: 1.42;
        }

        .authors {
            margin: 7px 0 0;
            color: #465666;
            font-size: 0.94rem;
        }

        .venue {
            margin: 6px 0 0;
            color: var(--muted);
            font-size: 0.92rem;
        }

        .tag-row {
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-top: 12px;
        }

        .tag {
            display: inline-flex;
            align-items: center;
            min-height: 24px;
            padding: 0 8px;
            border-radius: 999px;
            background: #f1eadf;
            color: #5d4930;
            font-size: 0.76rem;
            font-weight: 780;
        }

        .tag.accent {
            background: rgba(189, 111, 74, 0.13);
            color: #88442d;
        }

        .tag.role {
            background: rgba(37, 95, 131, 0.12);
            color: #1b4c6d;
        }

        .highlight-name {
            color: var(--navy);
            font-weight: 900;
        }

        .project-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
        }

        .project {
            padding: 22px;
            min-height: 255px;
        }

        .project .date {
            margin: 0 0 12px;
            color: var(--copper);
            font-size: 0.86rem;
            font-weight: 860;
        }

        .classified {
            background: linear-gradient(180deg, #ffffff, #f7fbfb);
            border-color: rgba(37, 95, 131, 0.2);
        }

        ul {
            margin: 12px 0 0;
            padding-left: 20px;
        }

        li {
            margin: 8px 0;
        }

        .skill-grid {
            display: grid;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: 14px;
        }

        .skill {
            padding: 18px;
            min-height: 112px;
        }

        .skill strong {
            display: block;
            margin-bottom: 7px;
            color: var(--navy);
        }

        .skill span {
            color: var(--muted);
            font-size: 0.9rem;
        }

        footer {
            padding: 42px 20px 54px;
            color: rgba(255,255,255,0.72);
            background: #0c2030;
            text-align: center;
        }

        @media (max-width: 1180px) {
            .hero-inner {
                grid-template-columns: 1fr;
            }

            .hero-panel {
                min-height: 380px;
            }

            .overview-grid,
            .timeline,
            .project-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .skill-grid {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }

        @media (max-width: 760px) {
            :root {
                --wrap: min(100vw - 28px, 1540px);
            }

            .hero,
            .hero-inner {
                min-height: auto;
            }

            .hero-inner {
                padding-top: 76px;
            }

            h1 {
                font-size: clamp(3.2rem, 18vw, 5rem);
            }

            .section-head,
            .overview-grid,
            .timeline,
            .paper-list,
            .project-grid,
            .skill-grid {
                grid-template-columns: 1fr;
            }

            .paper {
                grid-template-columns: 1fr;
            }

            .hero-stats {
                grid-template-columns: 1fr;
            }

            .hero-panel {
                min-height: 480px;
            }

            .nav-inner {
                align-items: flex-start;
                flex-direction: column;
                padding: 12px 0;
            }

            .nav-links {
                justify-content: flex-start;
            }

            .language-toggle {
                top: 12px;
                right: 12px;
            }
        }
    </style>
</head>
<body>
    <button class="language-toggle" id="languageToggle" type="button" aria-label="Switch language">中文</button>

    <section class="hero" id="top">
        <div class="hero-inner">
            <div>
                <p class="eyebrow" data-i18n="heroEyebrow">Radar Remote Sensing | SAR Imaging | Electromagnetic Scattering</p>
                <h1>Yu Xiong</h1>
                <p class="hero-summary" data-i18n="heroSummary">Ph.D. student at the State Key Laboratory of Millimeter Waves, Southeast University. My work focuses on SAR interference suppression and imaging, airborne weather radar echo simulation, and electromagnetic scattering modeling for complex meteorological targets.</p>
                <div class="hero-actions">
                    <a class="btn primary" href="#publications" data-i18n="heroPublications">Publications</a>
                    <a class="btn" href="#projects" data-i18n="heroProjects">Research Projects</a>
                    <a class="btn" href="https://github.com/xiongyuup" target="_blank" rel="noopener">GitHub</a>
                </div>
            </div>

            <div class="hero-panel" aria-label="Abstract radar signal visualization">
                <div class="sweep"></div>
                <div class="hero-stats">
                    <div class="stat">
                        <strong>20</strong>
                        <span data-i18n="metricPapers">papers and manuscripts</span>
                    </div>
                    <div class="stat">
                        <strong>11</strong>
                        <span data-i18n="metricProjects">research projects</span>
                    </div>
                    <div class="stat">
                        <strong>1/44</strong>
                        <span data-i18n="metricRank">master's program rank</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <nav aria-label="Primary navigation">
        <div class="nav-inner">
            <a class="brand" href="#top">YX</a>
            <div class="nav-links">
                <a href="#about" data-i18n="navAbout">About</a>
                <a href="#education" data-i18n="navEducation">Education</a>
                <a href="#publications" data-i18n="navPublications">Publications</a>
                <a href="#projects" data-i18n="navProjects">Projects</a>
                <a href="#skills" data-i18n="navSkills">Skills</a>
            </div>
        </div>
    </nav>

    <section class="band" id="about">
        <div class="wrap">
            <div class="section-head">
                <p class="kicker" data-i18n="profileKicker">Profile</p>
                <div>
                    <h2 data-i18n="profileTitle">Radar algorithms shaped by physics, data, and deployable systems.</h2>
                    <p class="lead" data-i18n="profileLead">Student member of the Chinese Society of Aeronautics and Astronautics, the Chinese Institute of Electronics, and IEEE. Research interests include microwave remote sensing, SAR signal processing, weather radar simulation, and scientific computing.</p>
                </div>
            </div>
            <div class="overview-grid">
                <div class="panel">
                    <h3 data-i18n="transferTitle">Technology Transfer</h3>
                    <p data-i18n="transferText">The self-developed weather radar echo simulation software has been deployed and is running stably at the Zhejiang Meteorological Service Center.</p>
                </div>
                <div class="panel">
                    <h3 data-i18n="openTitle">Open Source</h3>
                    <p data-i18n="openText">Co-developed TransitionMatrices.jl with Dr. Zihua Wu from Peking University for light scattering and microwave remote-sensing forward modeling.</p>
                </div>
                <div class="panel">
                    <h3 data-i18n="focusTitle">Research Focus</h3>
                    <p data-i18n="focusText">Integrated SAR imaging and RFI suppression, hydrometeor scattering simulation, and radar echo modeling under complex environments.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="band alt" id="education">
        <div class="wrap">
            <div class="section-head">
                <p class="kicker" data-i18n="educationKicker">Education</p>
                <div>
                    <h2 data-i18n="educationTitle">Academic Path</h2>
                    <p class="lead" data-i18n="educationLead">A research trajectory across electronic information, information and communication engineering, and radar remote sensing.</p>
                </div>
            </div>
            <div class="timeline">
                <div class="time-card">
                    <strong>Sep. 2025 - Present</strong>
                    <span data-i18n="eduPhd">Ph.D. student in Electronic Information, State Key Laboratory of Millimeter Waves, Southeast University.</span>
                </div>
                <div class="time-card">
                    <strong>Sep. 2022 - Jul. 2025</strong>
                    <span data-i18n="eduMaster">M.S. in Information and Communication Engineering, Civil Aviation University of China. Ranked 1/44 and awarded the National Scholarship.</span>
                </div>
                <div class="time-card">
                    <strong>Sep. 2018 - Jun. 2022</strong>
                    <span data-i18n="eduBachelor">B.E. in Electronic Information Engineering, Tianjin Chengjian University. GPA: 3.84/4.00, ranked 1/76, and awarded the National Scholarship.</span>
                </div>
            </div>
        </div>
    </section>

    <section class="band" id="publications">
        <div class="wrap">
            <div class="section-head">
                <p class="kicker" data-i18n="pubKicker">Publications</p>
                <div>
                    <h2 data-i18n="pubTitle">Publications</h2>
                    <p class="lead" data-i18n="pubLead">Sorted by Yu Xiong's position in the author list. Corresponding-author papers and papers where Yu Xiong is the first author excluding the advisor are marked inline.</p>
                </div>
            </div>
            <div class="paper-toolbar">
                <span data-i18n="pubSort">Sorted by author position</span>
                <span data-i18n="pubRole">Role tags shown inline</span>
                <span id="publicationCount"></span>
            </div>
            <div class="paper-list" id="publicationList"></div>
        </div>
    </section>

    <section class="band alt" id="projects">
        <div class="wrap">
            <div class="section-head">
                <p class="kicker" data-i18n="projectsKicker">Research</p>
                <div>
                    <h2 data-i18n="projectsTitle">Research Projects</h2>
                    <p class="lead" data-i18n="projectsLead">Representative research and engineering experiences, including classified projects shown with the original confidential placeholders.</p>
                </div>
            </div>
            <div class="project-grid" id="projectList"></div>
        </div>
    </section>

    <section class="band dark" id="skills">
        <div class="wrap">
            <div class="section-head">
                <p class="kicker" data-i18n="skillsKicker">Toolbox</p>
                <div>
                    <h2 data-i18n="skillsTitle">Skills</h2>
                    <p class="lead" data-i18n="skillsLead">Programming, scientific computing, radar simulation, embedded hardware, and signal/image processing.</p>
                </div>
            </div>
            <div class="skill-grid">
                <div class="skill">
                    <strong data-i18n="skill1Title">Programming</strong>
                    <span>Python, Julia, MATLAB, C, Verilog HDL</span>
                </div>
                <div class="skill">
                    <strong data-i18n="skill2Title">Platforms</strong>
                    <span data-i18n="skill2Text">Linux, Kylin OS, Windows, HPC cluster deployment</span>
                </div>
                <div class="skill">
                    <strong data-i18n="skill3Title">Research Tools</strong>
                    <span>WRF, NCL, TransitionMatrices.jl, MonteCarloRadiativeTransfer.jl</span>
                </div>
                <div class="skill">
                    <strong data-i18n="skill4Title">Hardware</strong>
                    <span>K210, OpenMV, ESP32, Raspberry Pi, Arduino, 8051 MCUs</span>
                </div>
                <div class="skill">
                    <strong data-i18n="skill5Title">Processing</strong>
                    <span data-i18n="skill5Text">Wavelet transform, compressed sensing, fuzzy logic, deep learning</span>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <p data-i18n="footer">Yu Xiong | xiongyuup's academic homepage</p>
    </footer>

    <script>
        const translations = {
            en: {
                title: "Yu Xiong | Academic Homepage",
                toggle: "中文",
                heroEyebrow: "Radar Remote Sensing | SAR Imaging | Electromagnetic Scattering",
                heroSummary: "Ph.D. student at the State Key Laboratory of Millimeter Waves, Southeast University. My work focuses on SAR interference suppression and imaging, airborne weather radar echo simulation, and electromagnetic scattering modeling for complex meteorological targets.",
                heroPublications: "Publications",
                heroProjects: "Research Projects",
                metricPapers: "papers and manuscripts",
                metricProjects: "research projects",
                metricRank: "master's program rank",
                navAbout: "About",
                navEducation: "Education",
                navPublications: "Publications",
                navProjects: "Projects",
                navSkills: "Skills",
                profileKicker: "Profile",
                profileTitle: "Radar algorithms shaped by physics, data, and deployable systems.",
                profileLead: "Student member of the Chinese Society of Aeronautics and Astronautics, the Chinese Institute of Electronics, and IEEE. Research interests include microwave remote sensing, SAR signal processing, weather radar simulation, and scientific computing.",
                transferTitle: "Technology Transfer",
                transferText: "The self-developed weather radar echo simulation software has been deployed and is running stably at the Zhejiang Meteorological Service Center.",
                openTitle: "Open Source",
                openText: "Co-developed TransitionMatrices.jl with Dr. Zihua Wu from Peking University for light scattering and microwave remote-sensing forward modeling.",
                focusTitle: "Research Focus",
                focusText: "Integrated SAR imaging and RFI suppression, hydrometeor scattering simulation, and radar echo modeling under complex environments.",
                educationKicker: "Education",
                educationTitle: "Academic Path",
                educationLead: "A research trajectory across electronic information, information and communication engineering, and radar remote sensing.",
                eduPhd: "Ph.D. student in Electronic Information, State Key Laboratory of Millimeter Waves, Southeast University.",
                eduMaster: "M.S. in Information and Communication Engineering, Civil Aviation University of China. Ranked 1/44 and awarded the National Scholarship.",
                eduBachelor: "B.E. in Electronic Information Engineering, Tianjin Chengjian University. GPA: 3.84/4.00, ranked 1/76, and awarded the National Scholarship.",
                pubKicker: "Publications",
                pubTitle: "Publications",
                pubLead: "Sorted by Yu Xiong's position in the author list. Corresponding-author papers and papers where Yu Xiong is the first author excluding the advisor are marked inline.",
                pubSort: "Sorted by author position",
                pubRole: "Role tags shown inline",
                pubCount: "20 entries",
                projectsKicker: "Research",
                projectsTitle: "Research Projects",
                projectsLead: "Representative research and engineering experiences, including classified projects shown with the original confidential placeholders.",
                skillsKicker: "Toolbox",
                skillsTitle: "Skills",
                skillsLead: "Programming, scientific computing, radar simulation, embedded hardware, and signal/image processing.",
                skill1Title: "Programming",
                skill2Title: "Platforms",
                skill2Text: "Linux, Kylin OS, Windows, HPC cluster deployment",
                skill3Title: "Research Tools",
                skill4Title: "Hardware",
                skill5Title: "Processing",
                skill5Text: "Wavelet transform, compressed sensing, fuzzy logic, deep learning",
                footer: "Yu Xiong | xiongyuup's academic homepage",
                labels: {
                    submitted: "Submitted",
                    published: "Published",
                    accepted: "Accepted",
                    new: "New",
                    first: "First author",
                    cofirstAdvisor: "First author excluding advisor",
                    corresponding: "Corresponding author",
                    chinese: "Chinese journal",
                    international: "International"
                }
            },
            zh: {
                title: "熊昱 | 学术主页",
                toggle: "English",
                heroEyebrow: "雷达遥感 | SAR 成像 | 电磁散射",
                heroSummary: "东南大学毫米波全国重点实验室电子信息博士研究生。研究方向包括 SAR 抗干扰成像、机载气象雷达回波仿真，以及复杂气象目标的电磁散射建模。",
                heroPublications: "科研成果",
                heroProjects: "科研项目",
                metricPapers: "论文与投稿",
                metricProjects: "科研项目",
                metricRank: "硕士专业排名",
                navAbout: "简介",
                navEducation: "教育经历",
                navPublications: "科研成果",
                navProjects: "项目经历",
                navSkills: "专业技能",
                profileKicker: "个人简介",
                profileTitle: "面向物理机理、数据建模与工程落地的雷达算法研究。",
                profileLead: "中国航空学会学生会员、中国电子学会学生会员、IEEE Student Member。研究方向包括微波遥感、SAR 信号处理、气象雷达仿真和科学计算。",
                transferTitle: "成果转化",
                transferText: "自主研发的气象雷达回波仿真软件已在浙江省气象服务中心部署并稳定运行。",
                openTitle: "开源贡献",
                openText: "与北京大学吴自华博士共同开发 TransitionMatrices.jl，用于光散射和微波遥感前向建模。",
                focusTitle: "研究方向",
                focusText: "SAR 成像与射频干扰抑制一体化、降水粒子散射仿真、复杂环境下雷达回波建模。",
                educationKicker: "教育经历",
                educationTitle: "学术经历",
                educationLead: "围绕电子信息、信息与通信工程、雷达遥感逐步展开的研究路径。",
                eduPhd: "东南大学毫米波全国重点实验室，电子信息博士研究生。",
                eduMaster: "中国民航大学信息与通信工程硕士研究生，专业排名 1/44，获国家奖学金。",
                eduBachelor: "天津城建大学电子信息工程本科，GPA 3.84/4.00，专业排名 1/76，获国家奖学金。",
                pubKicker: "科研成果",
                pubTitle: "科研论文",
                pubLead: "论文按照熊昱在作者列表中的位置排序。熊昱为通信作者或除导师外第一作者的论文已在标签中特别标注。",
                pubSort: "按作者位置排序",
                pubRole: "身份标签已标注",
                pubCount: "共 20 项",
                projectsKicker: "科研经历",
                projectsTitle: "项目经历",
                projectsLead: "覆盖仿真建模、信号处理、平台部署与工程验证的代表性经历，涉密项目保留原始 XXXX 占位表述。",
                skillsKicker: "专业能力",
                skillsTitle: "技能",
                skillsLead: "涵盖编程、科学计算、雷达仿真、嵌入式硬件与图像/信号处理。",
                skill1Title: "编程语言",
                skill2Title: "系统平台",
                skill2Text: "Linux、麒麟系统、Windows、高性能计算集群部署",
                skill3Title: "科研工具",
                skill4Title: "硬件经验",
                skill5Title: "信号处理",
                skill5Text: "小波变换、压缩感知、模糊逻辑、深度学习",
                footer: "熊昱 | xiongyuup 学术主页",
                labels: {
                    submitted: "已投稿",
                    published: "已发表",
                    accepted: "已录用",
                    new: "新增",
                    first: "第一作者",
                    cofirstAdvisor: "除导师外第一作者",
                    corresponding: "通信作者",
                    chinese: "中文期刊",
                    international: "英文/国际论文"
                }
            }
        };

        const publications = [
            {
                title: "MR2S: Integrated RFI Suppression and SAR Imaging via Masked RAW-RC Sparsity",
                authors: ["Y. Xiong", "Y. Huang", "K. Deng", "Y. Mao", "J. Li", "X. Chen", "S. Gu"],
                venue: "IEEE Transactions on Geoscience and Remote Sensing.",
                tags: ["first", "international"],
                position: 1
            },
            {
                title: "A RFI Suppression and Imaging Approach on Spaceborne SAR via Echo-Image Domain Filtering",
                authors: ["Y. Xiong", "Y. Huang", "Y. Mao", "J. Li", "K. Deng", "X. Chen", "S. Gu"],
                venue: "Submitted to IEEE Transactions on Geoscience and Remote Sensing.",
                tags: ["submitted", "first", "international"],
                position: 1
            },
            {
                title: "TransitionMatrices.jl: An Open-Source IITM-Based Framework for Electromagnetic Scattering Simulation of Nonspherical Atmospheric Particles and Microwave Remote-Sensing Forward Modeling",
                authors: ["Y. Xiong", "Z. Wu"],
                venue: "Submitted to Computer Physics Communications.",
                tags: ["submitted", "first", "corresponding", "international"],
                position: 1
            },
            {
                title: "Mask-Guided RAW-RC Coupling for Integrated SAR Imaging and RFI Suppression",
                authors: ["Y. Xiong", "K. Deng", "Y. Mao", "J. Li", "X. Chen", "S. Gu", "Y. Huang"],
                venue: "Submitted to CIE International Conference on Radar.",
                tags: ["submitted", "first", "international"],
                position: 1
            },
            {
                title: "Error-Propagation-Guided Budget-Aware Adaptive Discretization for IITM Simulations of Inhomogeneous Hydrometeors",
                authors: ["Y. Xiong", "Y. Huang", "S. Gu", "Z. Wu"],
                venue: "Submitted to Electromagnetic Science.",
                tags: ["submitted", "first", "international"],
                position: 1
            },
            {
                title: "Simulation of Complex Meteorological Target Echoes for Airborne Dual-Polarization Weather Radar Based on Invariant Imbedding T-Matrix",
                authors: ["H. Li", "Y. Xiong", "Y. Chen"],
                venue: "IEEE Transactions on Geoscience and Remote Sensing, vol. 62, pp. 1-17, 2024, Art no. 5105817.",
                tags: ["published", "cofirstAdvisor", "international"],
                position: 2
            },
            {
                title: "Simulation of Precipitation Echoes From Airborne Dual-Polarization Weather Radar Based on a Fast Algorithm for Invariant Imbedding T-Matrix",
                authors: ["H. Li", "Y. Xiong", "B. Zhang", "Z. Wu"],
                venue: "IEEE Transactions on Radar Systems, vol. 3, pp. 135-154, 2025.",
                tags: ["published", "cofirstAdvisor", "international"],
                position: 2
            },
            {
                title: "Automotive SAR Image Quality Enhancement via Autofocus and L1 Regularization",
                authors: ["K. Deng", "Y. Xiong", "Y. Mao", "J. Li", "Z. Chen", "Y. Huang"],
                venue: "Submitted to CIE International Conference on Radar.",
                tags: ["submitted", "international"],
                position: 2
            },
            {
                title: "基于 Fourier-MLP 的双连续介质粒子建模及不变嵌入 T 矩阵加速计算方法",
                enTitle: "Bicontinuous Medium Particle Modeling Based on Fourier-MLP and Accelerated Computation Method for Invariant Imbedding T-Matrix",
                authors: ["J. Guo", "Y. Xiong", "H. Li", "Z. Wu", "Z. Sun"],
                venue: "Submitted to Chinese Journal of Computational Physics.",
                zhVenue: "已投稿《计算物理》。",
                tags: ["submitted", "corresponding", "chinese"],
                position: 2
            },
            {
                title: "Ground Clutter and Suppressive Interference Mitigation Method Based on SPCJS-PSTAP",
                authors: ["J. Guo", "Y. Xiong", "H. Li", "S. Li", "X. Ai"],
                venue: "Venue to be determined.",
                zhVenue: "待定。",
                tags: ["accepted", "corresponding", "international"],
                position: 2
            },
            {
                title: "CISRNet: An End-to-End Complex-Valued Interference-Robust SAR Ship Recognition Network",
                authors: ["Z. Li", "Y. Mao", "Y. Xiong", "J. Li", "Y. Huang"],
                venue: "Manuscript / conference paper information to be updated.",
                zhVenue: "论文状态/会议期刊信息待补充。",
                tags: ["new", "international"],
                position: 3
            },
            {
                title: "Simulation of Airborne Dual-Polarization Weather Radar Echoes from Inhomogeneous Ice-Phase Precipitation Particles Based on Monte Carlo Method",
                authors: ["H. Li", "B. Zhang", "Y. Xiong", "R. Liang"],
                venue: "IEEE Transactions on Geoscience and Remote Sensing.",
                tags: ["accepted", "corresponding", "international"],
                position: 3
            },
            {
                title: "The Simulation of Airborne Weather Radar Echoes for Inhomogeneous Ice Crystals Based on the Bicontinuous Medium Approximation",
                authors: ["H. Li", "B. Zhang", "Y. Xiong"],
                venue: "2025 IEEE International Geoscience and Remote Sensing Symposium (IGARSS).",
                tags: ["accepted", "international"],
                position: 3
            },
            {
                title: "Simulation of Rain Attenuation Echoes for Airborne Dual-Polarization Weather Radar Based on the T-Matrix Method",
                zhTitle: "基于 T 矩阵的机载双极化气象雷达降雨衰减回波仿真",
                authors: ["H. Li", "F. Zhang", "Y. Xiong"],
                venue: "Fire Control Radar Technology.",
                zhVenue: "《火控雷达技术》。",
                tags: ["accepted", "chinese"],
                position: 3
            },
            {
                title: "Simulation of Meteorological Target Echoes for Airborne Dual-Polarization Phased Array Weather Radar",
                zhTitle: "机载双极化相控阵气象雷达气象目标回波仿真",
                authors: ["H. Li", "Y. Chen", "Y. Xiong"],
                venue: "Systems Engineering and Electronics, 2025, 47(01): 117-125.",
                zhVenue: "《系统工程与电子技术》，2025，47(01)：117-125。",
                tags: ["published", "chinese"],
                position: 3
            },
            {
                title: "Intracloud Lightning Echo Simulation for the Airborne Weather Radar Based on Dielectric Breakdown Model",
                authors: ["H. Li", "X. Ai", "Z. Liu", "Y. Xiong"],
                venue: "IEEE International Conference on Signal, Information and Data Processing 2024.",
                tags: ["published", "international"],
                position: 4
            },
            {
                title: "Low-Altitude Windshear Wind-Speed Estimation Based on Convolutional Neural Network STAP",
                zhTitle: "卷积神经网络 STAP 低空风切变风速估计",
                authors: ["H. Li", "Q. Zhang", "A. Zhou", "Y. Xiong"],
                venue: "Journal of Electronics & Information Technology, 2024, 46(08): 3193-3201.",
                zhVenue: "《电子与信息学报》，2024，46(08)：3193-3201。",
                tags: ["published", "chinese"],
                position: 4
            },
            {
                title: "A Meteorological Target Scattering Amplitude Calculation Method Based on a Fully Connected Feedforward Neural Network",
                authors: ["H. Li", "R. Liang", "C. Sang", "M. Jin", "Y. Xiong"],
                venue: "Manuscript / conference paper information to be updated.",
                zhVenue: "论文状态/会议期刊信息待补充。",
                tags: ["new", "international"],
                position: 5
            },
            {
                title: "A Hybrid Domain Algorithm for High-Speed High-Squint SAR Imaging with Curved Trajectory via Fifth-Order FNCS Processing",
                authors: ["K. Deng", "Y. Huang", "Z. Chen", "L. Zhang", "Y. Xiong", "B. Zhang"],
                venue: "IEEE Transactions on Geoscience and Remote Sensing.",
                tags: ["accepted", "international"],
                position: 5
            },
            {
                title: "RFI Mitigation for Spaceborne SAR via Maximizing Dynamic Residual Entropy",
                authors: ["S. Gu", "Y. Huang", "J. Li", "Y. Mao", "X. Chen", "Y. Xiong", "Z. Chen", "X. Yang"],
                venue: "IEEE Transactions on Image Processing.",
                tags: ["international"],
                position: 6
            }
        ];

        const projects = [
            {
                date: "XXXX.XX - XXXX.XX",
                title: "XXXX Radar System Development and Core Algorithm Optimization",
                zhTitle: "XXXX 雷达系统开发与核心算法优化",
                bullets: [
                    "Participated in the core signal processing algorithm design for a classified XXXX project under complex electromagnetic environments.",
                    "Responsible for XXXX target feature extraction and modeling."
                ],
                zhBullets: [
                    "参与复杂电磁环境下涉密 XXXX 项目的核心信号处理算法设计。",
                    "负责 XXXX 目标的特征提取与建模仿真工作。"
                ],
                classified: true
            },
            {
                date: "XXXX.XX - XXXX.XX",
                title: "Research on XXXX Target Recognition and Feature Extraction",
                zhTitle: "XXXX 目标识别与特征提取研究",
                bullets: [
                    "Developed distributed processing frameworks and hardware-in-the-loop simulation for XXXX data.",
                    "Proposed novel XXXX suppression methods to enhance detection performance."
                ],
                zhBullets: [
                    "开发面向 XXXX 数据的分布式处理框架及半实物仿真验证。",
                    "提出新型 XXXX 抑制方法，有效提升系统检测性能。"
                ],
                classified: true
            },
            {
                date: "XXXX.XX - XXXX.XX",
                title: "XXXX High-Performance Computing and Data Processing Platform",
                zhTitle: "XXXX 高性能计算与数据处理平台研制",
                bullets: [
                    "Led the construction of the XXXX massive data processing platform and optimized the underlying computing architecture.",
                    "Achieved real-time rendering and processing of XXXX massive echo data."
                ],
                zhBullets: [
                    "主导搭建 XXXX 海量数据处理平台，优化底层计算架构。",
                    "实现对 XXXX 海量回波数据的实时解算与渲染处理。"
                ],
                classified: true
            },
            {
                date: "XXXX.XX - XXXX.XX",
                title: "XXXX Advanced Signal Processing and Interference Mitigation",
                zhTitle: "XXXX 先进信号处理与抗干扰技术研究",
                bullets: [
                    "Conducted in-depth research on XXXX interference mechanisms and established a complete simulation verification system.",
                    "Improved the robustness and anti-interference capability of the XXXX system under complex scenarios."
                ],
                zhBullets: [
                    "深入研究 XXXX 干扰机理，并建立完整的仿真验证系统。",
                    "有效提升 XXXX 系统在复杂场景下的鲁棒性与抗干扰能力。"
                ],
                classified: true
            },
            {
                date: "Mar. 2023 - Present",
                zhDate: "2023.03 - 至今",
                title: "Fourier-MLP-Based Bicontinuous Medium Modeling and Radar Brightness Temperature Prediction",
                zhTitle: "基于 Fourier-MLP 的双连续介质结构建模与雷达亮温预测研究",
                bullets: [
                    "Proposed an MLP-based medium-structure modeling method with Fourier feature embedding.",
                    "Constructed Patch-Based Transformer and 3D U-Net networks to predict bicontinuous medium structures.",
                    "Implemented brightness temperature prediction, particle-type classification, and dual-polarization radar-variable simulation."
                ],
                zhBullets: [
                    "提出基于 Fourier 特征嵌入的 MLP 结构进行介质结构建模。",
                    "构建 Patch-Based Transformer 和 3D U-Net 网络预测双连续介质结构。",
                    "实现亮温预测、粒子类型分类以及双极化雷达变量模拟。"
                ]
            },
            {
                date: "Sep. 2022 - Sep. 2024",
                zhDate: "2022.09 - 2024.09",
                title: "Airborne Weather Data Processing for Route Optimization under Severe Weather",
                zhTitle: "面向恶劣天气下航路优化的机载气象数据处理技术研究",
                bullets: [
                    "Implemented airborne polarimetric weather radar data simulation.",
                    "Prepared project reports, technical reports, and acceptance materials."
                ],
                zhBullets: [
                    "实现机载极化气象雷达数据仿真。",
                    "撰写项目报告、技术报告以及验收汇报等材料。"
                ]
            },
            {
                date: "Sep. 2022 - Sep. 2024",
                zhDate: "2022.09 - 2024.09",
                title: "High-Safety Design and Low-Altitude Windshear Wind-Speed Estimation for a New Radar System",
                zhTitle: "高安全性设计方法在新型 XXXX 雷达的应用验证及风切变风速精确估计关键技术研究",
                bullets: [
                    "Studied low-altitude windshear and ground-clutter signal characteristics under an airborne array weather radar framework.",
                    "Developed adaptive low-altitude windshear detection algorithms and wind-speed estimation methods.",
                    "Modeled and simulated ground-clutter echo signals."
                ],
                zhBullets: [
                    "在机载阵列气象雷达体系下研究低空风切变和地杂波信号特性，实现自适应低空风切变检测算法和风速估计。",
                    "仿真机载阵列气象雷达低空风切变回波信号，完成 STAP 低空风切变检测算法研究。",
                    "实现地杂波回波信号建模与仿真。"
                ]
            },
            {
                date: "Sep. 2022 - Sep. 2024",
                zhDate: "2022.09 - 2024.09",
                title: "X-Band Radar Observation Strategy Simulation and Optimization",
                zhTitle: "X 波段雷达观测策略仿真与优化模块",
                bullets: [
                    "Completed X-band weather radar echo simulation and severe-weather detection based on simulation results.",
                    "Maintained project environments on Kylin OS and supported stable WRF operation under Linux.",
                    "Implemented echo simulation based on a pulse covariance matrix and Cholesky decomposition, including radial velocity and spectrum width."
                ],
                zhBullets: [
                    "完成 X 波段气象雷达回波仿真，并根据仿真结果进行灾害性天气检测。",
                    "负责项目环境在麒麟系统上的稳定运行，实现 WRF 在该系统下运行。",
                    "实现基于脉冲协方差矩阵 Cholesky 分解的回波仿真方法，完成径向速度和谱宽信息添加。"
                ]
            },
            {
                date: "Sep. 2022 - Oct. 2023",
                zhDate: "2022.09 - 2023.10",
                title: "Rainfall Electromagnetic Scattering Modeling and Simulation in Collaboration with Xidian University",
                zhTitle: "与西电合作：降雨电磁散射特性建模与模拟",
                bullets: [
                    "Studied the effects of particle size, shape, and orientation distribution on scattering characteristics.",
                    "Used the Invariant Imbedding T-Matrix method to simulate actual radar echoes.",
                    "Developed and open-sourced the high-performance modeling toolkit TransitionMatrices.jl."
                ],
                zhBullets: [
                    "研究不同粒子的尺寸、形状、取向分布对散射特性的影响。",
                    "使用不变嵌入 T 矩阵方法模拟实际雷达回波。",
                    "开发并开源 TransitionMatrices.jl 高性能建模工具包。"
                ]
            },
            {
                date: "Sep. 2022 - Oct. 2023",
                zhDate: "2022.09 - 2023.10",
                title: "Logistics Process Data Analysis and IoT Feasibility Study for Cargo Aircraft and Airport Infrastructure",
                zhTitle: "中国物流流程数据分析与物联网在货运飞机及机场基础设施应用的可行性协同研究",
                bullets: [
                    "Participated in a collaborative project with Boeing as the student lead.",
                    "Coordinated project tasks, wrote IoT-related sections, and investigated IIC, CAN, serial communication, and other bus communication methods."
                ],
                zhBullets: [
                    "参与与波音公司的合作项目，作为学生负责人统筹项目任务。",
                    "撰写物联网相关章节，深入了解 IIC、CAN、串口等各类总线通信方式。"
                ]
            },
            {
                date: "Sep. 2022 - Jun. 2023",
                zhDate: "2022.09 - 2023.06",
                title: "Airborne Weather Radar Target Recognition Technology",
                zhTitle: "机载气象雷达 xx 和 xxxx 识别技术研究",
                bullets: [
                    "Analyzed scattering characteristics of meteorological targets and used WRF for weather-event simulation.",
                    "Added practical engineering waveforms, including Chirp, FMCW, and phase-coded waveforms.",
                    "Studied airborne weather radar principles and built an airborne meteorological target echo simulation system.",
                    "Built a polarimetric radar echo simulation verification system and a hydrometeor classification platform."
                ],
                zhBullets: [
                    "分析气象目标散射特性，利用 WRF 实现气象事件预报模拟仿真。",
                    "增加工程实际使用的仿真波形，包括线性调频、调频连续波、相位编码。",
                    "研究机载气象雷达原理，构建机载气象目标回波仿真系统。",
                    "搭建极化雷达回波仿真验证系统和降水粒子分类平台。"
                ]
            }
        ];

        let currentLang = "en";

        function renderText(lang) {
            const t = translations[lang];
            document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
            document.title = t.title;
            document.getElementById("languageToggle").textContent = t.toggle;
            document.querySelectorAll("[data-i18n]").forEach((node) => {
                const key = node.getAttribute("data-i18n");
                if (t[key]) node.textContent = t[key];
            });
            document.getElementById("publicationCount").textContent = t.pubCount;
        }

        function renderPublications(lang) {
            const labels = translations[lang].labels;
            const list = document.getElementById("publicationList");
            list.innerHTML = publications
                .slice()
                .sort((a, b) => a.position - b.position)
                .map((paper) => {
                    const title = lang === "zh" ? (paper.zhTitle || paper.title) : paper.title;
                    const venue = lang === "zh" ? (paper.zhVenue || paper.venue) : paper.venue;
                    const authors = paper.authors
                        .map((author) => author === "Y. Xiong" ? `<span class="highlight-name">${author}</span>` : author)
                        .join(", ");
                    const tags = paper.tags
                        .map((tag) => `<span class="tag ${tag === "new" ? "accent" : ""} ${tag === "corresponding" || tag === "cofirstAdvisor" ? "role" : ""}">${labels[tag] || tag}</span>`)
                        .join("");
                    return `
                        <article class="paper">
                            <div>
                                <p class="paper-title">${title}</p>
                                <p class="authors">${authors}</p>
                                <p class="venue">${venue}</p>
                                <div class="tag-row">${tags}</div>
                            </div>
                        </article>
                    `;
                })
                .join("");
        }

        function renderProjects(lang) {
            const list = document.getElementById("projectList");
            list.innerHTML = projects
                .map((project) => {
                    const title = lang === "zh" ? (project.zhTitle || project.title) : project.title;
                    const date = lang === "zh" ? (project.zhDate || project.date) : project.date;
                    const bullets = lang === "zh" ? (project.zhBullets || project.bullets) : project.bullets;
                    return `
                        <article class="project ${project.classified ? "classified" : ""}">
                            <p class="date">${date}</p>
                            <h3>${title}</h3>
                            <ul>
                                ${bullets.map((item) => `<li>${item}</li>`).join("")}
                            </ul>
                        </article>
                    `;
                })
                .join("");
        }

        function setLanguage(lang) {
            currentLang = lang;
            renderText(lang);
            renderPublications(lang);
            renderProjects(lang);
        }

        document.getElementById("languageToggle").addEventListener("click", () => {
            setLanguage(currentLang === "en" ? "zh" : "en");
        });

        setLanguage("en");
    </script>
</body>
</html>
