<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yu Xiong | Radar, SAR, and Electromagnetic Scattering</title>
    <style>
        :root {
            --ink: #17202a;
            --muted: #617080;
            --paper: #f7f4ee;
            --card: #ffffff;
            --line: #d9dee5;
            --blue: #285f82;
            --blue-dark: #13364d;
            --teal: #4ca58a;
            --coral: #d56d57;
            --gold: #c69a3a;
            --shadow: 0 18px 45px rgba(22, 34, 43, 0.11);
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
            line-height: 1.65;
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
            padding: 0 14px;
            border: 1px solid rgba(255,255,255,0.35);
            border-radius: 999px;
            background: rgba(255,255,255,0.92);
            color: var(--blue-dark);
            box-shadow: 0 14px 34px rgba(0,0,0,0.18);
            cursor: pointer;
            font-weight: 820;
        }

        .hero {
            position: relative;
            overflow: hidden;
            min-height: 86vh;
            display: grid;
            align-items: center;
            background:
                linear-gradient(115deg, rgba(14, 31, 45, 0.96), rgba(17, 61, 80, 0.82)),
                radial-gradient(circle at 78% 25%, rgba(76, 165, 138, 0.35), transparent 30%),
                #142635;
            color: #fff;
        }

        .hero::before {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0.22;
            background-image:
                linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px);
            background-size: 54px 54px;
            mask-image: linear-gradient(to bottom, #000, transparent 92%);
        }

        .hero-inner {
            position: relative;
            width: min(1180px, calc(100% - 40px));
            margin: 0 auto;
            padding: 88px 0 64px;
            display: grid;
            grid-template-columns: minmax(0, 1.04fr) minmax(320px, 0.72fr);
            gap: 54px;
            align-items: center;
        }

        .eyebrow {
            margin: 0 0 16px;
            color: #a9dfcf;
            font-size: 0.82rem;
            font-weight: 760;
            letter-spacing: 0.18em;
            text-transform: uppercase;
        }

        h1 {
            margin: 0;
            font-size: clamp(3.2rem, 7vw, 6.8rem);
            line-height: 0.9;
            letter-spacing: 0;
        }

        .hero-summary {
            max-width: 760px;
            margin: 28px 0 0;
            color: rgba(255,255,255,0.82);
            font-size: clamp(1.03rem, 2vw, 1.28rem);
        }

        .hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 32px;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            padding: 0 18px;
            border-radius: 6px;
            border: 1px solid rgba(255,255,255,0.34);
            color: #fff;
            text-decoration: none;
            font-weight: 740;
            font-size: 0.96rem;
            transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }

        .btn:hover {
            transform: translateY(-2px);
            border-color: rgba(255,255,255,0.72);
            background: rgba(255,255,255,0.1);
        }

        .btn.primary {
            color: #102331;
            background: #a9dfcf;
            border-color: #a9dfcf;
        }

        .radar-card {
            position: relative;
            min-height: 420px;
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 8px;
            background:
                radial-gradient(circle at 50% 50%, rgba(169, 223, 207, 0.14) 0 1px, transparent 1px),
                linear-gradient(155deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04));
            background-size: 24px 24px, auto;
            box-shadow: 0 24px 70px rgba(0,0,0,0.32);
            overflow: hidden;
        }

        .radar-card::before,
        .radar-card::after {
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            border: 1px solid rgba(169, 223, 207, 0.36);
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }

        .radar-card::before {
            width: 70%;
            aspect-ratio: 1;
            box-shadow: 0 0 0 58px rgba(169, 223, 207, 0.06), 0 0 0 118px rgba(169, 223, 207, 0.04);
        }

        .radar-card::after {
            width: 10px;
            height: 10px;
            background: #a9dfcf;
            box-shadow: 82px -108px 0 var(--coral), -118px 72px 0 var(--gold), 128px 90px 0 #fff, -72px -96px 0 var(--teal);
        }

        .sweep {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 46%;
            height: 46%;
            transform-origin: left top;
            background: linear-gradient(40deg, rgba(169, 223, 207, 0.34), transparent 62%);
            clip-path: polygon(0 0, 100% 0, 0 100%);
            animation: scan 7s linear infinite;
        }

        @keyframes scan {
            to { transform: rotate(360deg); }
        }

        .metric-strip {
            position: absolute;
            left: 22px;
            right: 22px;
            bottom: 22px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

        .metric {
            padding: 14px;
            border-radius: 6px;
            background: rgba(11, 26, 38, 0.62);
            border: 1px solid rgba(255,255,255,0.16);
        }

        .metric strong {
            display: block;
            font-size: 1.2rem;
            line-height: 1.1;
        }

        .metric span {
            display: block;
            margin-top: 4px;
            color: rgba(255,255,255,0.68);
            font-size: 0.74rem;
            line-height: 1.35;
        }

        nav {
            position: sticky;
            top: 0;
            z-index: 10;
            background: rgba(247, 244, 238, 0.92);
            border-bottom: 1px solid rgba(23, 32, 42, 0.1);
            backdrop-filter: blur(16px);
        }

        .nav-inner {
            width: min(1180px, calc(100% - 40px));
            min-height: 58px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 22px;
        }

        .brand {
            font-weight: 850;
            color: var(--blue-dark);
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 6px;
        }

        .nav-links a {
            padding: 8px 10px;
            border-radius: 6px;
            color: #344454;
            text-decoration: none;
            font-weight: 720;
            font-size: 0.9rem;
        }

        .nav-links a:hover {
            background: #e9e2d5;
        }

        main {
            width: min(1180px, calc(100% - 40px));
            margin: 0 auto;
            padding: 68px 0 80px;
        }

        .section {
            margin-top: 76px;
        }

        .section:first-child {
            margin-top: 0;
        }

        .section-head {
            display: grid;
            grid-template-columns: minmax(180px, 0.32fr) minmax(0, 1fr);
            gap: 34px;
            align-items: start;
            margin-bottom: 26px;
        }

        .kicker {
            margin: 0;
            color: var(--coral);
            font-size: 0.8rem;
            font-weight: 850;
            letter-spacing: 0.15em;
            text-transform: uppercase;
        }

        h2 {
            margin: 0;
            color: var(--blue-dark);
            font-size: clamp(1.85rem, 3vw, 2.7rem);
            line-height: 1.08;
            letter-spacing: 0;
        }

        .lead {
            margin: 12px 0 0;
            color: var(--muted);
            max-width: 800px;
        }

        .two-col {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(300px, 0.72fr);
            gap: 28px;
        }

        .panel,
        .paper,
        .project {
            border: 1px solid rgba(23, 32, 42, 0.11);
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
            color: var(--blue-dark);
            font-size: 1.08rem;
            line-height: 1.35;
        }

        .panel p {
            margin: 0;
            color: var(--muted);
        }

        .timeline {
            display: grid;
            gap: 18px;
        }

        .time-item {
            position: relative;
            padding-left: 24px;
        }

        .time-item::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0.58em;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: var(--teal);
            box-shadow: 0 0 0 5px rgba(76, 165, 138, 0.12);
        }

        .time-item strong {
            display: block;
            color: var(--blue-dark);
        }

        .time-item span {
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
            border: 1px solid rgba(23, 32, 42, 0.11);
            border-radius: 999px;
            background: #fff;
            color: var(--muted);
            font-size: 0.84rem;
            font-weight: 760;
        }

        .paper-list {
            display: grid;
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
            border-radius: 6px;
            background: #eef5f2;
            color: var(--blue-dark);
            font-size: 0.83rem;
            font-weight: 860;
        }

        .paper-title {
            margin: 0;
            color: #17202a;
            font-size: 1.02rem;
            font-weight: 780;
            line-height: 1.38;
        }

        .authors {
            margin: 7px 0 0;
            color: #465666;
            font-size: 0.94rem;
        }

        .venue {
            margin: 5px 0 0;
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
            background: #f1ece2;
            color: #5a4931;
            font-size: 0.76rem;
            font-weight: 760;
        }

        .tag.accent {
            background: rgba(213, 109, 87, 0.12);
            color: #8d3c2d;
        }

        .tag.role {
            background: rgba(40, 95, 130, 0.12);
            color: #1b4c6d;
        }

        .highlight-name {
            color: var(--blue-dark);
            font-weight: 850;
        }

        .project-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
        }

        .project {
            padding: 22px;
        }

        .project p,
        .project li {
            color: var(--muted);
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
            gap: 12px;
        }

        .skill {
            padding: 16px;
            min-height: 102px;
            border-radius: 8px;
            background: #fff;
            border: 1px solid rgba(23, 32, 42, 0.11);
        }

        .skill strong {
            display: block;
            margin-bottom: 6px;
            color: var(--blue-dark);
        }

        .skill span {
            color: var(--muted);
            font-size: 0.9rem;
        }

        footer {
            padding: 34px 20px 48px;
            color: rgba(255,255,255,0.72);
            background: #152838;
            text-align: center;
        }

        @media (max-width: 900px) {
            .hero {
                min-height: auto;
            }

            .hero-inner,
            .two-col,
            .section-head {
                grid-template-columns: 1fr;
            }

            .hero-inner {
                padding-top: 68px;
            }

            .radar-card {
                min-height: 340px;
            }

            .project-grid,
            .skill-grid {
                grid-template-columns: 1fr;
            }

            .nav-inner {
                align-items: flex-start;
                flex-direction: column;
                padding: 12px 0;
            }

            .nav-links {
                justify-content: flex-start;
            }
        }

        @media (max-width: 560px) {
            .hero-inner,
            main,
            .nav-inner {
                width: min(100% - 28px, 1180px);
            }

            h1 {
                font-size: 3.1rem;
            }

            .hero-actions {
                flex-direction: column;
            }

            .btn {
                width: 100%;
            }

            .paper {
                grid-template-columns: 1fr;
            }

            .metric-strip {
                grid-template-columns: 1fr;
            }

            .radar-card {
                min-height: 440px;
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
                <p class="hero-summary" data-i18n="heroSummary">
                    Ph.D. student at the State Key Laboratory of Millimeter Waves, Southeast University. My work focuses on SAR interference suppression and imaging, airborne weather radar echo simulation, and electromagnetic scattering modeling for complex meteorological targets.
                </p>
                <div class="hero-actions">
                    <a class="btn primary" href="#publications" data-i18n="heroPublications">Publications</a>
                    <a class="btn" href="#projects" data-i18n="heroProjects">Research Projects</a>
                    <a class="btn" href="https://github.com/xiongyuup" target="_blank" rel="noopener">GitHub</a>
                </div>
            </div>

            <div class="radar-card" aria-label="Abstract radar signal visualization">
                <div class="sweep"></div>
                <div class="metric-strip">
                    <div class="metric">
                        <strong>21+</strong>
                        <span data-i18n="metricPapers">papers and manuscripts</span>
                    </div>
                    <div class="metric">
                        <strong>1/44</strong>
                        <span data-i18n="metricRank">master's program rank</span>
                    </div>
                    <div class="metric">
                        <strong>Open</strong>
                        <span data-i18n="metricOpen">scientific software</span>
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

    <main>
        <section class="section" id="about">
            <div class="section-head">
                <p class="kicker" data-i18n="profileKicker">Profile</p>
                <div>
                    <h2 data-i18n="profileTitle">Building radar algorithms from physics, data, and deployable software.</h2>
                    <p class="lead" data-i18n="profileLead">I am a student member of the Chinese Society of Aeronautics and Astronautics, the Chinese Institute of Electronics, and IEEE. My research connects microwave remote sensing, SAR signal processing, and scientific computing.</p>
                </div>
            </div>
            <div class="two-col">
                <div class="panel">
                    <h3 data-i18n="transferTitle">Technology Transfer</h3>
                    <p data-i18n="transferText">The self-developed weather radar echo simulation software has been deployed and is running stably at the Zhejiang Meteorological Service Center.</p>
                </div>
                <div class="panel">
                    <h3 data-i18n="openTitle">Open Source</h3>
                    <p data-i18n="openText">Co-developed TransitionMatrices.jl with Dr. Zihua Wu from Peking University, providing open tooling for light scattering and microwave remote-sensing forward modeling.</p>
                </div>
            </div>
        </section>

        <section class="section" id="education">
            <div class="section-head">
                <p class="kicker" data-i18n="educationKicker">Education</p>
                <div>
                    <h2 data-i18n="educationTitle">Academic Path</h2>
                    <p class="lead" data-i18n="educationLead">A research trajectory across electronic information, information and communication engineering, and radar remote sensing.</p>
                </div>
            </div>
            <div class="panel timeline">
                <div class="time-item">
                    <strong>Sep. 2025 - Present</strong>
                    <span data-i18n="eduPhd">Ph.D. student in Electronic Information, State Key Laboratory of Millimeter Waves, Southeast University.</span>
                </div>
                <div class="time-item">
                    <strong>Sep. 2022 - Jul. 2025</strong>
                    <span data-i18n="eduMaster">M.S. in Information and Communication Engineering, Civil Aviation University of China. Ranked 1/44 and awarded the National Scholarship.</span>
                </div>
                <div class="time-item">
                    <strong>Sep. 2018 - Jun. 2022</strong>
                    <span data-i18n="eduBachelor">B.E. in Electronic Information Engineering, Tianjin Chengjian University. GPA: 3.84/4.00, ranked 1/76, and awarded the National Scholarship.</span>
                </div>
            </div>
        </section>

        <section class="section" id="publications">
            <div class="section-head">
                <p class="kicker" data-i18n="pubKicker">Publications</p>
                <div>
                    <h2 data-i18n="pubTitle">Publications</h2>
                    <p class="lead" data-i18n="pubLead">All listed papers are sorted by Yu Xiong's position in the author list. Papers where Yu Xiong is corresponding author or first author excluding the advisor are specially marked.</p>
                </div>
            </div>
            <div class="paper-toolbar">
                <span data-i18n="pubSort">Sorted by author position</span>
                <span data-i18n="pubRole1">Role tags shown inline</span>
                <span id="publicationCount"></span>
            </div>
            <div class="paper-list" id="publicationList"></div>
        </section>

        <section class="section" id="projects">
            <div class="section-head">
                <p class="kicker" data-i18n="projectsKicker">Research</p>
                <div>
                    <h2 data-i18n="projectsTitle">Projects</h2>
                    <p class="lead" data-i18n="projectsLead">Representative research and engineering experiences across simulation, signal processing, and software deployment.</p>
                </div>
            </div>
            <div class="project-grid">
                <article class="project">
                    <h3 data-i18n="proj1Title">Fourier-MLP-Based Bicontinuous Medium Modeling and Radar Brightness Temperature Prediction</h3>
                    <p>Mar. 2023 - Present</p>
                    <ul>
                        <li data-i18n="proj1A">Proposed an MLP-based medium-structure modeling method with Fourier feature embedding.</li>
                        <li data-i18n="proj1B">Built Patch-Based Transformer and 3D U-Net networks for bicontinuous medium structure prediction.</li>
                        <li data-i18n="proj1C">Implemented brightness temperature prediction, particle-type classification, and dual-polarization radar-variable simulation.</li>
                    </ul>
                </article>

                <article class="project">
                    <h3 data-i18n="proj2Title">Airborne Weather Data Processing for Route Optimization under Severe Weather</h3>
                    <p>Sep. 2022 - Sep. 2024</p>
                    <ul>
                        <li data-i18n="proj2A">Implemented airborne polarimetric weather radar data simulation.</li>
                        <li data-i18n="proj2B">Prepared project reports, technical reports, and acceptance materials.</li>
                    </ul>
                </article>

                <article class="project">
                    <h3 data-i18n="proj3Title">Low-Altitude Windshear Wind-Speed Estimation for a New Radar System</h3>
                    <p>Sep. 2022 - Sep. 2024</p>
                    <ul>
                        <li data-i18n="proj3A">Studied low-altitude windshear and ground-clutter signal characteristics under an airborne array weather radar framework.</li>
                        <li data-i18n="proj3B">Developed adaptive windshear detection algorithms and wind-speed estimation methods.</li>
                        <li data-i18n="proj3C">Modeled and simulated ground-clutter echo signals.</li>
                    </ul>
                </article>

                <article class="project">
                    <h3 data-i18n="proj4Title">X-Band Radar Observation Strategy Simulation and Optimization</h3>
                    <p>Sep. 2022 - Sep. 2024</p>
                    <ul>
                        <li data-i18n="proj4A">Completed X-band weather radar echo simulation and severe-weather detection based on simulation results.</li>
                        <li data-i18n="proj4B">Maintained project environments on Kylin OS and supported stable WRF operation under Linux.</li>
                        <li data-i18n="proj4C">Implemented echo simulation based on pulse covariance matrices and Cholesky decomposition.</li>
                    </ul>
                </article>

                <article class="project">
                    <h3 data-i18n="proj5Title">Rainfall Electromagnetic Scattering Modeling and Simulation</h3>
                    <p>Sep. 2022 - Oct. 2023</p>
                    <ul>
                        <li data-i18n="proj5A">Studied how particle size, shape, and orientation distribution affect scattering characteristics.</li>
                        <li data-i18n="proj5B">Used the Invariant Imbedding T-Matrix method to simulate radar echoes.</li>
                        <li data-i18n="proj5C">Developed and open-sourced TransitionMatrices.jl.</li>
                    </ul>
                </article>

                <article class="project">
                    <h3 data-i18n="proj6Title">Airborne Weather Radar Target Recognition Technology</h3>
                    <p>Sep. 2022 - Jun. 2023</p>
                    <ul>
                        <li data-i18n="proj6A">Analyzed scattering characteristics of meteorological targets and used WRF for weather-event simulation.</li>
                        <li data-i18n="proj6B">Added practical engineering waveforms, including Chirp, FMCW, and phase-coded waveforms.</li>
                        <li data-i18n="proj6C">Built a polarimetric radar echo simulation verification system and a hydrometeor classification platform.</li>
                    </ul>
                </article>
            </div>
        </section>

        <section class="section" id="skills">
            <div class="section-head">
                <p class="kicker" data-i18n="skillsKicker">Toolbox</p>
                <div>
                    <h2 data-i18n="skillsTitle">Skills</h2>
                    <p class="lead" data-i18n="skillsLead">Programming, scientific computing, radar simulation, and embedded hardware experience.</p>
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
        </section>
    </main>

    <footer>
        <p data-i18n="footer">Yu Xiong | xiongyuup's personal homepage</p>
    </footer>

    <script>
        const translations = {
            en: {
                title: "Yu Xiong | Radar, SAR, and Electromagnetic Scattering",
                toggle: "中文",
                heroEyebrow: "Radar Remote Sensing | SAR Imaging | Electromagnetic Scattering",
                heroSummary: "Ph.D. student at the State Key Laboratory of Millimeter Waves, Southeast University. My work focuses on SAR interference suppression and imaging, airborne weather radar echo simulation, and electromagnetic scattering modeling for complex meteorological targets.",
                heroPublications: "Publications",
                heroProjects: "Research Projects",
                metricPapers: "papers and manuscripts",
                metricRank: "master's program rank",
                metricOpen: "scientific software",
                navAbout: "About",
                navEducation: "Education",
                navPublications: "Publications",
                navProjects: "Projects",
                navSkills: "Skills",
                profileKicker: "Profile",
                profileTitle: "Building radar algorithms from physics, data, and deployable software.",
                profileLead: "I am a student member of the Chinese Society of Aeronautics and Astronautics, the Chinese Institute of Electronics, and IEEE. My research connects microwave remote sensing, SAR signal processing, and scientific computing.",
                transferTitle: "Technology Transfer",
                transferText: "The self-developed weather radar echo simulation software has been deployed and is running stably at the Zhejiang Meteorological Service Center.",
                openTitle: "Open Source",
                openText: "Co-developed TransitionMatrices.jl with Dr. Zihua Wu from Peking University, providing open tooling for light scattering and microwave remote-sensing forward modeling.",
                educationKicker: "Education",
                educationTitle: "Academic Path",
                educationLead: "A research trajectory across electronic information, information and communication engineering, and radar remote sensing.",
                eduPhd: "Ph.D. student in Electronic Information, State Key Laboratory of Millimeter Waves, Southeast University.",
                eduMaster: "M.S. in Information and Communication Engineering, Civil Aviation University of China. Ranked 1/44 and awarded the National Scholarship.",
                eduBachelor: "B.E. in Electronic Information Engineering, Tianjin Chengjian University. GPA: 3.84/4.00, ranked 1/76, and awarded the National Scholarship.",
                pubKicker: "Publications",
                pubTitle: "Publications",
                pubLead: "All listed papers are sorted by Yu Xiong's position in the author list. Papers where Yu Xiong is corresponding author or first author excluding the advisor are specially marked.",
                pubSort: "Sorted by author position",
                pubRole1: "Role tags shown inline",
                pubCount: "21 entries",
                projectsKicker: "Research",
                projectsTitle: "Projects",
                projectsLead: "Representative research and engineering experiences across simulation, signal processing, and software deployment.",
                proj1Title: "Fourier-MLP-Based Bicontinuous Medium Modeling and Radar Brightness Temperature Prediction",
                proj1A: "Proposed an MLP-based medium-structure modeling method with Fourier feature embedding.",
                proj1B: "Built Patch-Based Transformer and 3D U-Net networks for bicontinuous medium structure prediction.",
                proj1C: "Implemented brightness temperature prediction, particle-type classification, and dual-polarization radar-variable simulation.",
                proj2Title: "Airborne Weather Data Processing for Route Optimization under Severe Weather",
                proj2A: "Implemented airborne polarimetric weather radar data simulation.",
                proj2B: "Prepared project reports, technical reports, and acceptance materials.",
                proj3Title: "Low-Altitude Windshear Wind-Speed Estimation for a New Radar System",
                proj3A: "Studied low-altitude windshear and ground-clutter signal characteristics under an airborne array weather radar framework.",
                proj3B: "Developed adaptive windshear detection algorithms and wind-speed estimation methods.",
                proj3C: "Modeled and simulated ground-clutter echo signals.",
                proj4Title: "X-Band Radar Observation Strategy Simulation and Optimization",
                proj4A: "Completed X-band weather radar echo simulation and severe-weather detection based on simulation results.",
                proj4B: "Maintained project environments on Kylin OS and supported stable WRF operation under Linux.",
                proj4C: "Implemented echo simulation based on pulse covariance matrices and Cholesky decomposition.",
                proj5Title: "Rainfall Electromagnetic Scattering Modeling and Simulation",
                proj5A: "Studied how particle size, shape, and orientation distribution affect scattering characteristics.",
                proj5B: "Used the Invariant Imbedding T-Matrix method to simulate radar echoes.",
                proj5C: "Developed and open-sourced TransitionMatrices.jl.",
                proj6Title: "Airborne Weather Radar Target Recognition Technology",
                proj6A: "Analyzed scattering characteristics of meteorological targets and used WRF for weather-event simulation.",
                proj6B: "Added practical engineering waveforms, including Chirp, FMCW, and phase-coded waveforms.",
                proj6C: "Built a polarimetric radar echo simulation verification system and a hydrometeor classification platform.",
                skillsKicker: "Toolbox",
                skillsTitle: "Skills",
                skillsLead: "Programming, scientific computing, radar simulation, and embedded hardware experience.",
                skill1Title: "Programming",
                skill2Title: "Platforms",
                skill2Text: "Linux, Kylin OS, Windows, HPC cluster deployment",
                skill3Title: "Research Tools",
                skill4Title: "Hardware",
                skill5Title: "Processing",
                skill5Text: "Wavelet transform, compressed sensing, fuzzy logic, deep learning",
                footer: "Yu Xiong | xiongyuup's personal homepage",
                labels: {
                    submitted: "Submitted",
                    published: "Published",
                    accepted: "Accepted",
                    tbd: "TBD",
                    new: "New",
                    first: "First author",
                    cofirstAdvisor: "First author excluding advisor",
                    corresponding: "Corresponding author",
                    chinese: "Chinese journal",
                    international: "International"
                }
            },
            zh: {
                title: "熊昱 | 个人主页",
                toggle: "English",
                heroEyebrow: "雷达遥感 | SAR 成像 | 电磁散射",
                heroSummary: "东南大学毫米波全国重点实验室电子信息博士研究生。研究方向包括 SAR 抗干扰成像、机载气象雷达回波仿真，以及复杂气象目标的电磁散射建模。",
                heroPublications: "科研成果",
                heroProjects: "科研项目",
                metricPapers: "论文与投稿",
                metricRank: "硕士专业排名",
                metricOpen: "开源科研软件",
                navAbout: "简介",
                navEducation: "教育经历",
                navPublications: "科研成果",
                navProjects: "项目经历",
                navSkills: "专业技能",
                profileKicker: "个人简介",
                profileTitle: "面向物理机理、数据建模与工程落地的雷达算法研究。",
                profileLead: "中国航空学会学生会员、中国电子学会学生会员、IEEE Student Member。研究围绕微波遥感、SAR 信号处理和科学计算展开。",
                transferTitle: "成果转化",
                transferText: "自主研发的气象雷达回波仿真软件已在浙江省气象服务中心部署并稳定运行。",
                openTitle: "开源贡献",
                openText: "与北京大学吴自华博士共同开发 TransitionMatrices.jl，为光散射和微波遥感前向建模提供开源工具。",
                educationKicker: "教育经历",
                educationTitle: "学术经历",
                educationLead: "围绕电子信息、信息与通信工程、雷达遥感逐步展开的研究路径。",
                eduPhd: "东南大学毫米波全国重点实验室，电子信息博士研究生。",
                eduMaster: "中国民航大学信息与通信工程硕士研究生，专业排名 1/44，获国家奖学金。",
                eduBachelor: "天津城建大学电子信息工程本科，GPA 3.84/4.00，专业排名 1/76，获国家奖学金。",
                pubKicker: "科研成果",
                pubTitle: "科研论文",
                pubLead: "论文按照熊昱在作者列表中的位置排序。熊昱为通信作者或除导师外第一作者的论文已在右侧标签中特别标注。",
                pubSort: "按作者位置排序",
                pubRole1: "身份标签已标注",
                pubCount: "共 21 项",
                projectsKicker: "科研经历",
                projectsTitle: "项目经历",
                projectsLead: "覆盖仿真建模、信号处理、平台部署与工程验证的代表性研究经历。",
                proj1Title: "基于 Fourier-MLP 的双连续介质建模与雷达亮温预测",
                proj1A: "提出基于 Fourier 特征嵌入的 MLP 介质结构建模方法。",
                proj1B: "构建 Patch-Based Transformer 与 3D U-Net 网络预测双连续介质结构。",
                proj1C: "实现亮温预测、粒子类型分类以及双极化雷达变量仿真。",
                proj2Title: "面向恶劣天气航路优化的机载气象数据处理",
                proj2A: "实现机载极化气象雷达数据仿真。",
                proj2B: "撰写项目报告、技术报告与验收材料。",
                proj3Title: "新型雷达低空风切变风速估计",
                proj3A: "研究机载阵列气象雷达体系下的低空风切变与地杂波信号特性。",
                proj3B: "开发自适应风切变检测算法与风速估计方法。",
                proj3C: "完成地杂波回波信号建模与仿真。",
                proj4Title: "X 波段雷达观测策略仿真与优化",
                proj4A: "完成 X 波段气象雷达回波仿真，并基于仿真结果开展灾害性天气检测。",
                proj4B: "维护麒麟系统项目环境，支持 WRF 在 Linux 下稳定运行。",
                proj4C: "实现基于脉冲协方差矩阵和 Cholesky 分解的回波仿真。",
                proj5Title: "降雨电磁散射特性建模与仿真",
                proj5A: "研究粒子尺寸、形状和取向分布对散射特性的影响。",
                proj5B: "使用不变嵌入 T 矩阵方法模拟雷达回波。",
                proj5C: "开发并开源 TransitionMatrices.jl。",
                proj6Title: "机载气象雷达目标识别技术",
                proj6A: "分析气象目标散射特性，并使用 WRF 完成天气事件仿真。",
                proj6B: "加入 Chirp、FMCW、相位编码等工程常用仿真波形。",
                proj6C: "搭建极化雷达回波仿真验证系统与降水粒子分类平台。",
                skillsKicker: "专业能力",
                skillsTitle: "技能",
                skillsLead: "涵盖编程、科学计算、雷达仿真和嵌入式硬件。",
                skill1Title: "编程语言",
                skill2Title: "系统平台",
                skill2Text: "Linux、麒麟系统、Windows、高性能计算集群部署",
                skill3Title: "科研工具",
                skill4Title: "硬件经验",
                skill5Title: "信号处理",
                skill5Text: "小波变换、压缩感知、模糊逻辑、深度学习",
                footer: "熊昱 | xiongyuup 个人主页",
                labels: {
                    submitted: "已投稿",
                    published: "已发表",
                    accepted: "已录用",
                    tbd: "待定",
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
                title: "Bicontinuous Medium Particle Modeling Based on Fourier-MLP and Accelerated Computation Method for Invariant Imbedding T-Matrix",
                zhTitle: "基于 Fourier-MLP 的双连续介质粒子建模及不变嵌入 T 矩阵加速计算方法",
                authors: ["J. Guo", "Y. Xiong", "H. Li", "Z. Wu", "Z. Sun"],
                venue: "Venue to be determined.",
                zhVenue: "待定。",
                tags: ["tbd", "corresponding", "international"],
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
                title: "Bicontinuous Medium Particle Modeling Based on Fourier-MLP and Accelerated Computation Method for Invariant Imbedding T-Matrix",
                zhTitle: "基于 Fourier-MLP 的双连续介质粒子建模及不变嵌入 T 矩阵加速计算方法",
                authors: ["J. Guo", "Y. Xiong", "H. Li", "Z. Wu", "Z. Sun"],
                venue: "Chinese journal paper, venue to be determined.",
                zhVenue: "中文期刊论文，待定。",
                tags: ["tbd", "corresponding", "chinese"],
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
                .sort((a, b) => a.position - b.position)
                .map((paper) => {
                    const title = lang === "zh" && paper.zhTitle ? paper.zhTitle : paper.title;
                    const venue = lang === "zh" && paper.zhVenue ? paper.zhVenue : paper.venue;
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

        function setLanguage(lang) {
            currentLang = lang;
            renderText(lang);
            renderPublications(lang);
        }

        document.getElementById("languageToggle").addEventListener("click", () => {
            setLanguage(currentLang === "en" ? "zh" : "en");
        });

        setLanguage("en");
    </script>
</body>
</html>
