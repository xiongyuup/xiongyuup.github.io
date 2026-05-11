<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yu Xiong | Personal Homepage</title>
    <style>
        :root {
            --bg-color: #fcfcfc;
            --text-main: #2c3e50;
            --text-muted: #5c6b7a;
            --link-color: #0366d6;
            --border-color: #eaecef;
            --accent-color: #f6f8fa;
            --card-bg: #ffffff;
        }

        * {
            box-sizing: border-box;
        }

        html,
        body {
            width: 100%;
            overflow-x: hidden;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        /* 强制使用百分比宽度，占据屏幕的 94%，绝对不会再显得很窄 */
        .container {
            width: 94%;
            max-width: none; /* 彻底取消最大宽度限制 */
            margin: 0 auto; /* 整体居中 */
            padding: 30px 10px;
        }

        header {
            text-align: center;
            padding: 8px 0 24px;
            border-bottom: 2px solid var(--border-color);
            margin-bottom: 30px;
        }

        h1 {
            font-size: 2.55em;
            margin: 0 0 10px;
            color: #1a202c;
            text-transform: none;
            letter-spacing: 0;
        }

        .subtitle {
            font-size: 1.13em;
            color: var(--text-muted);
            margin-bottom: 18px;
        }

        .social-links a {
            display: inline-block;
            margin: 0 10px 8px;
            color: var(--link-color);
            text-decoration: none;
            font-weight: 500;
        }

        .social-links a:hover {
            text-decoration: underline;
        }

        h2 {
            font-size: 1.5em;
            color: #1a202c;
            border-left: 4px solid var(--link-color);
            padding-left: 10px;
            margin-top: 38px;
            margin-bottom: 18px;
        }

        h3 {
            font-size: 1.18em;
            color: #2d3748;
            margin-top: 24px;
            margin-bottom: 10px;
        }

        ul {
            padding-left: 22px;
        }

        li {
            margin-bottom: 10px;
        }

        .paper-list {
            padding-left: 24px;
        }

        .paper-list li {
            margin-bottom: 15px;
            line-height: 1.52;
        }

        .highlight-name {
            font-weight: 700;
            color: #000;
        }

        .badge {
            display: inline-block;
            background-color: var(--accent-color);
            border: 1px solid var(--border-color);
            padding: 2px 7px;
            border-radius: 999px;
            font-size: 0.84em;
            color: var(--text-muted);
            margin-left: 5px;
            white-space: nowrap;
        }

        .rank-note {
            margin: -6px 0 18px 0;
            color: var(--text-muted);
            font-size: 0.96em;
        }

        .project-card {
            background: var(--card-bg);
            padding: 20px 24px;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.025);
        }

        .project-card h3 {
            margin-top: 0;
            color: var(--link-color);
        }

        .footer-quote {
            text-align: center;
            margin-top: 56px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            font-style: italic;
            color: var(--text-muted);
        }

        .language-toggle {
            position: fixed;
            top: 18px;
            right: 18px;
            z-index: 999;
            border: 1px solid var(--border-color);
            background: #ffffff;
            color: var(--link-color);
            padding: 9px 14px;
            border-radius: 999px;
            font-weight: 650;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0,0,0,0.08);
        }

        .language-toggle:hover {
            background: var(--accent-color);
        }

        .lang-block {
            display: none;
        }

        .lang-block.active {
            display: block;
        }

        @media (max-width: 768px) {
            .container {
                width: 98%;
                padding: 20px 10px;
            }

            .language-toggle {
                top: 12px;
                right: 12px;
                padding: 7px 11px;
                font-size: 0.9em;
            }

            h1 {
                font-size: 2.1em;
            }

            header {
                padding-top: 28px;
            }
            
            .project-card {
                padding: 16px 16px;
            }
        }
    </style>
</head>
<body>
<button class="language-toggle" id="languageToggle" type="button" aria-label="Switch language">中文</button>

<div class="container">
    <div id="en" class="lang-block active">
        <header>
            <h1>Yu Xiong</h1>
            <div class="subtitle">
                Student Member of the Chinese Society of Aeronautics and Astronautics | Student Member of the Chinese Institute of Electronics | IEEE Student Member<br>
                <strong>This is xiongyuup's personal homepage!</strong>
            </div>
            <div class="social-links">
                <a href="https://your-csdn-link.com" target="_blank" rel="noopener">🔗 CSDN Blog</a>
                <a href="https://github.com/xiongyuup" target="_blank" rel="noopener">🔗 GitHub</a>
            </div>
        </header>

        <section>
            <h2>🎓 Education</h2>
            <ul>
                <li><strong>Sep. 2025 - Present</strong> Ph.D. student in Electronic Information, State Key Laboratory of Millimeter Waves, Southeast University.</li>
                <li><strong>Sep. 2022 - Jul. 2025</strong> M.S. in Information and Communication Engineering, Civil Aviation University of China. Ranked 1/44 and awarded the National Scholarship.</li>
                <li><strong>Sep. 2018 - Jun. 2022</strong> B.E. in Electronic Information Engineering, Tianjin Chengjian University. GPA: 3.84/4.00, ranked 1/76, and awarded the National Scholarship.</li>
            </ul>
        </section>

        <section>
            <h2>🚀 Technology Transfer & Open Source</h2>
            <ul>
                <li><strong>Weather Radar Echo Simulation Software:</strong> The self-developed weather radar echo simulation software has been successfully deployed and is running stably at the Zhejiang Meteorological Service Center.</li>
                <li><strong>TransitionMatrices.jl:</strong> Co-developed with Dr. Zihua Wu from Peking University, this package has gained significant recognition in the field of light scattering and is fully open-sourced on GitHub.</li>
            </ul>
        </section>

        <section>
            <h2>🏆 Publications</h2>
            <p class="rank-note">Sorted by the position of Yu Xiong in the author list, not by publication year.</p>
            <h3>English Journal and Conference Papers</h3>
            <ul class="paper-list">
                <li>[1] <span class="highlight-name">Y. Xiong</span>, Y. Huang, K. Deng, Y. Mao, J. Li, X. Chen and S. Gu, "MR2S: Integrated RFI Suppression and SAR Imaging via Masked RAW–RC Sparsity," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">First author; advisor as corresponding author</span></li>

                <li>[2] <span class="highlight-name">Y. Xiong</span>, Y. Huang, Y. Mao, J. Li, K. Deng, X. Chen and S. Gu, "A RFI Suppression and Imaging Approach on Spaceborne SAR via Echo-Image Domain Filtering," submitted to <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">Submitted; first author</span></li>

                <li>[3] <span class="highlight-name">Y. Xiong</span> and Z. Wu, "TransitionMatrices.jl: An Open-Source IITM-Based Framework for Electromagnetic Scattering Simulation of Nonspherical Atmospheric Particles and Microwave Remote-Sensing Forward Modeling," submitted to <em>Computer Physics Communications</em>. <span class="badge">Under second review; first author; corresponding author</span></li>

                <li>[4] H. Li, <span class="highlight-name">Y. Xiong</span> and Y. Chen, "Simulation of Complex Meteorological Target Echoes for Airborne Dual-Polarization Weather Radar Based on Invariant Imbedding T-Matrix," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>, vol. 62, pp. 1-17, 2024, Art no. 5105817. <span class="badge">Published; advisor as first author</span> ✅</li>

                <li>[5] H. Li, <span class="highlight-name">Y. Xiong</span>, B. Zhang and Z. Wu, "Simulation of Precipitation Echoes From Airborne Dual-Polarization Weather Radar Based on a Fast Algorithm for Invariant Imbedding T-Matrix," in <em>IEEE Transactions on Radar Systems</em>, vol. 3, pp. 135-154, 2025. <span class="badge">Published; advisor as first author</span> ✅</li>

                <li>[6] J. Guo, <span class="highlight-name">Y. Xiong</span>, H. Li, Z. Wu and Z. Sun, "Bicontinuous Medium Particle Modeling Based on Fourier-MLP and Accelerated Computation Method for Invariant Imbedding T-Matrix," in <em>[TBD]</em>. <span class="badge">Submitted; corresponding author</span></li>

                <li>[7] J. Guo, <span class="highlight-name">Y. Xiong</span>, H. Li, S. Li and X. Ai, "Ground Clutter and Suppressive Interference Mitigation Method Based on SPCJS-PSTAP," in <em>[TBD]</em>. <span class="badge">Accepted; corresponding author</span></li>

                <li>[8] H. Li, B. Zhang, <span class="highlight-name">Y. Xiong</span> and R. Liang, "Simulation of Airborne Dual-Polarization Weather Radar Echoes from Inhomogeneous Ice-Phase Precipitation Particles Based on Monte Carlo Method," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">Accepted; corresponding author; advisor as first author</span></li>

                <li>[9] H. Li, B. Zhang, <span class="highlight-name">Y. Xiong</span>, "The Simulation of Airborne Weather Radar Echoes for Inhomogeneous Ice Crystals Based on the Bicontinuous Medium Approximation," in <em>2025 IEEE International Geoscience and Remote Sensing Symposium (IGARSS)</em>. <span class="badge">Accepted; advisor as first author</span></li>

                <li>[10] H. Li, X. Ai, Z. Liu, <span class="highlight-name">Y. Xiong</span>, "Intracloud Lightning Echo Simulation for the Airborne Weather Radar Based on Dielectric Breakdown Model," in <em>IEEE International Conference on Signal, Information and Data Processing 2024</em>. <span class="badge">Published; advisor as first author</span></li>

                <li>[11] K. Deng, Y. Huang, Z. Chen, L. Zhang, <span class="highlight-name">Y. Xiong</span> and B. Zhang, "A Hybrid Domain Algorithm for High-Speed High-Squint SAR Imaging with Curved Trajectory via Fifth-Order FNCS Processing," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">Accepted</span></li>

                <li>[12] S. Gu, Y. Huang, J. Li, Y. Mao, X. Chen, <span class="highlight-name">Y. Xiong</span>, Z. Chen and X. Yang, "RFI Mitigation for Spaceborne SAR via Maximizing Dynamic Residual Entropy," in <em>IEEE Transactions on Image Processing</em>.</li>
            </ul>

            <h3>Chinese Journal Papers</h3>
            <ul class="paper-list">
                <li>[13] J. Guo, <span class="highlight-name">Y. Xiong</span>, H. Li, Z. Wu, Z. Sun. Bicontinuous Medium Particle Modeling Based on Fourier-MLP and Accelerated Computation Method for Invariant Imbedding T-Matrix[J]. <em>[TBD]</em>. <span class="badge">Corresponding author</span></li>

                <li>[14] H. Li, F. Zhang, <span class="highlight-name">Y. Xiong</span>. Simulation of Rain Attenuation Echoes for Airborne Dual-Polarization Weather Radar Based on the T-Matrix Method[J]. <em>Fire Control Radar Technology</em>. <span class="badge">Accepted; advisor as first author</span></li>

                <li>[15] H. Li, Y. Chen, <span class="highlight-name">Y. Xiong</span>. Simulation of Meteorological Target Echoes for Airborne Dual-Polarization Phased Array Weather Radar[J]. <em>Systems Engineering and Electronics</em>, 2025, 47(01): 117-125. <span class="badge">Published; advisor as first author</span></li>

                <li>[16] H. Li, Q. Zhang, A. Zhou, <span class="highlight-name">Y. Xiong</span>. Low-Altitude Windshear Wind-Speed Estimation Based on Convolutional Neural Network STAP[J]. <em>Journal of Electronics &amp; Information Technology</em>, 2024, 46(08): 3193-3201. <span class="badge">Published; advisor as first author</span></li>
            </ul>
        </section>

        <section>
            <h2>🧪 Research Projects</h2>

            <div class="project-card">
                <h3>📌 [TBD] - Present: XXXX Radar System Development and Core Algorithm Optimization</h3>
                <ul>
                    <li>Participated in the core signal processing algorithm design for a classified XXXX project under complex electromagnetic environments.</li>
                    <li>Responsible for XXXX target feature extraction and modeling.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 [TBD] - [TBD]: Research on XXXX Target Recognition and Feature Extraction</h3>
                <ul>
                    <li>Developed distributed processing frameworks and hardware-in-the-loop simulation for XXXX data.</li>
                    <li>Proposed novel XXXX suppression methods to enhance detection performance.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 [TBD] - [TBD]: XXXX High-Performance Computing and Data Processing Platform</h3>
                <ul>
                    <li>Led the construction of the XXXX massive data processing platform and optimized the underlying computing architecture.</li>
                    <li>Achieved real-time rendering and processing of XXXX massive echo data.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 [TBD] - [TBD]: XXXX Advanced Signal Processing and Interference Mitigation</h3>
                <ul>
                    <li>Conducted in-depth research on XXXX interference mechanisms and established a complete simulation verification system.</li>
                    <li>Effectively improved the robustness and anti-interference capability of the XXXX system.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 Mar. 2023 - Present: Fourier-MLP-Based Bicontinuous Medium Modeling and Radar Brightness Temperature Prediction</h3>
                <ul>
                    <li>Proposed an MLP-based medium-structure modeling method with Fourier feature embedding.</li>
                    <li>Constructed Patch-Based Transformer and 3D U-Net networks to predict bicontinuous medium structures.</li>
                    <li>Implemented brightness temperature prediction, particle-type classification, and dual-polarization radar-variable simulation.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 Sep. 2022 - Sep. 2024: Airborne Weather Data Processing for Route Optimization under Severe Weather</h3>
                <ul>
                    <li>Implemented airborne polarimetric weather radar data simulation and prepared project reports, technical reports, and acceptance materials.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 Sep. 2022 - Sep. 2024: High-Safety Design and Low-Altitude Windshear Wind-Speed Estimation for a New Radar System</h3>
                <ul>
                    <li>Studied low-altitude windshear and ground-clutter signal characteristics under an airborne array weather radar framework.</li>
                    <li>Developed adaptive low-altitude windshear detection algorithms and wind-speed estimation methods.</li>
                    <li>Modeled and simulated ground-clutter echo signals.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 Sep. 2022 - Sep. 2024: X-Band Radar Observation Strategy Simulation and Optimization</h3>
                <ul>
                    <li>Completed X-band weather radar echo simulation and severe-weather detection based on simulation results.</li>
                    <li>Maintained project environments on Kylin OS and supported stable WRF operation under Linux.</li>
                    <li>Implemented echo simulation based on a pulse covariance matrix and Cholesky decomposition, including radial velocity and spectrum width.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 Sep. 2022 - Oct. 2023: Rainfall Electromagnetic Scattering Modeling and Simulation in Collaboration with Xidian University</h3>
                <ul>
                    <li>Studied the effects of particle size, shape, and orientation distribution on scattering characteristics.</li>
                    <li>Used the Invariant Imbedding T-Matrix method to simulate actual radar echoes.</li>
                    <li>Developed and open-sourced the high-performance modeling toolkit TransitionMatrices.jl.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 Sep. 2022 - Oct. 2023: Logistics Process Data Analysis and IoT Feasibility Study for Cargo Aircraft and Airport Infrastructure</h3>
                <ul>
                    <li>Participated in a collaborative project with Boeing as the student lead, coordinated project tasks, wrote IoT-related sections, and investigated IIC, CAN, serial communication, and other bus communication methods.</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 Sep. 2022 - Jun. 2023: Airborne Weather Radar Target Recognition Technology</h3>
                <p>Analyzed scattering characteristics of meteorological targets, simulated echoes of hail, rain, snow, and other weather targets ahead of aircraft during cruise, and used fuzzy logic and related algorithms for hydrometeor classification and detection.</p>
                <ul>
                    <li>Analyzed meteorological target scattering characteristics and used WRF for weather-event simulation.</li>
                    <li>Added practical engineering waveforms, including Chirp, FMCW, and phase-coded waveforms.</li>
                    <li>Studied airborne weather radar principles and built an airborne meteorological target echo simulation system.</li>
                    <li>Built a polarimetric radar echo simulation verification system and a hydrometeor classification platform.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2>💼 Skills</h2>
            <ul>
                <li><strong>Programming:</strong> Python, Julia, MATLAB, C, Verilog HDL.</li>
                <li><strong>Platforms:</strong> Linux, Kylin OS, Windows, and high-performance computing cluster deployment.</li>
                <li><strong>Research tools:</strong> WRF, NCL, TransitionMatrices.jl, MonteCarloRadiativeTransfer.jl, and a self-developed weather radar simulation platform.</li>
                <li><strong>Hardware:</strong> K210, OpenMV, ESP32, Raspberry Pi, Arduino, and 8051 microcontrollers.</li>
                <li><strong>Signal and image processing:</strong> Wavelet transform, compressed sensing, fuzzy logic, and deep learning.</li>
            </ul>
        </section>

        <div class="footer-quote">“This is xiongyuup's personal homepage!”</div>
    </div>

    <div id="zh" class="lang-block">
        <header>
            <h1>Yu Xiong</h1>
            <div class="subtitle">
                熊玉 | 中国航空学会学生会员 | 中国电子学会学生会员 | IEEE Student Member<br>
                <strong>这是 xiongyuup 的个人主页！</strong>
            </div>
            <div class="social-links">
                <a href="https://your-csdn-link.com" target="_blank" rel="noopener">🔗 访问我的 CSDN 博客</a>
                <a href="https://github.com/xiongyuup" target="_blank" rel="noopener">🔗 访问我的 GitHub 主页</a>
            </div>
        </header>

        <section>
            <h2>🎓 教育背景</h2>
            <ul>
                <li><strong>2025.09 - 至今</strong> 博士在读，电子信息，东南大学毫米波全国重点实验室。</li>
                <li><strong>2022.09 - 2025.07</strong> 硕士研究生，信息与通信工程，中国民航大学，专业排名 1/44，获国家奖学金。</li>
                <li><strong>2018.09 - 2022.06</strong> 本科，电子信息工程，天津城建大学，绩点 3.84/4，专业排名 1/76，获国家奖学金。</li>
            </ul>
        </section>

        <section>
            <h2>🚀 成果转化与开源贡献</h2>
            <ul>
                <li>独立自主开发的气象雷达回波仿真软件已在<strong>浙江省气象服务中心</strong>投入并稳定运行。</li>
                <li>与北京大学吴自华博士共同开发的 <strong>TransitionMatrices.jl</strong> 包受到光散射领域重大认可，现已在 GitHub 全面开源。</li>
            </ul>
        </section>

        <section>
            <h2>🏆 科研成果</h2>
            <p class="rank-note">按熊玉在作者列表中的位置排序，不再按发表时间排序。</p>
            <h3>英文与国际会议论文</h3>
            <ul class="paper-list">
                <li>[1] <span class="highlight-name">Y. Xiong</span>, Y. Huang, K. Deng, Y. Mao, J. Li, X. Chen and S. Gu, "MR2S: Integrated RFI Suppression and SAR Imaging via Masked RAW–RC Sparsity," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">第一作者，导师通信</span></li>

                <li>[2] <span class="highlight-name">Y. Xiong</span>, Y. Huang, Y. Mao, J. Li, K. Deng, X. Chen and S. Gu, "A RFI Suppression and Imaging Approach on Spaceborne SAR via Echo-Image Domain Filtering," submitted to <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">已投递，第一作者</span></li>

                <li>[3] <span class="highlight-name">Y. Xiong</span> and Z. Wu, "TransitionMatrices.jl: An Open-Source IITM-Based Framework for Electromagnetic Scattering Simulation of Nonspherical Atmospheric Particles and Microwave Remote-Sensing Forward Modeling," submitted to <em>Computer Physics Communications</em>. <span class="badge">二审中，第一作者，通信作者</span></li>

                <li>[4] H. Li, <span class="highlight-name">Y. Xiong</span> and Y. Chen, "Simulation of Complex Meteorological Target Echoes for Airborne Dual-Polarization Weather Radar Based on Invariant Imbedding T-Matrix," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>, vol. 62, pp. 1-17, 2024, Art no. 5105817. <span class="badge">已发表，导师一作</span> ✅</li>

                <li>[5] H. Li, <span class="highlight-name">Y. Xiong</span>, B. Zhang and Z. Wu, "Simulation of Precipitation Echoes From Airborne Dual-Polarization Weather Radar Based on a Fast Algorithm for Invariant Imbedding T-Matrix," in <em>IEEE Transactions on Radar Systems</em>, vol. 3, pp. 135-154, 2025. <span class="badge">已发表，导师一作</span> ✅</li>

                <li>[6] J. Guo, <span class="highlight-name">Y. Xiong</span>, H. Li, Z. Wu and Z. Sun, "Bicontinuous Medium Particle Modeling Based on Fourier-MLP and Accelerated Computation Method for Invariant Imbedding T-Matrix," in <em>[待定]</em>. <span class="badge">通信作者</span></li>

                <li>[7] J. Guo, <span class="highlight-name">Y. Xiong</span>, H. Li, S. Li and X. Ai, "Ground Clutter and Suppressive Interference Mitigation Method Based on SPCJS-PSTAP," in <em>[待定]</em>. <span class="badge">已录用，通信作者</span></li>

                <li>[8] H. Li, B. Zhang, <span class="highlight-name">Y. Xiong</span> and R. Liang, "Simulation of Airborne Dual-Polarization Weather Radar Echoes from Inhomogeneous Ice-Phase Precipitation Particles Based on Monte Carlo Method," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">已录用，通信作者，导师一作</span></li>

                <li>[9] H. Li, B. Zhang, <span class="highlight-name">Y. Xiong</span>, "The Simulation of Airborne Weather Radar Echoes for Inhomogeneous Ice Crystals Based on the Bicontinuous Medium Approximation," in <em>2025 IEEE International Geoscience and Remote Sensing Symposium (IGARSS)</em>. <span class="badge">已录用，导师一作</span></li>

                <li>[10] H. Li, X. Ai, Z. Liu, <span class="highlight-name">Y. Xiong</span>, "Intracloud Lightning Echo Simulation for the Airborne Weather Radar Based on Dielectric Breakdown Model," in <em>IEEE International Conference on Signal, Information and Data Processing 2024</em>. <span class="badge">已出版，导师一作</span></li>

                <li>[11] K. Deng, Y. Huang, Z. Chen, L. Zhang, <span class="highlight-name">Y. Xiong</span> and B. Zhang, "A Hybrid Domain Algorithm for High-Speed High-Squint SAR Imaging with Curved Trajectory via Fifth-Order FNCS Processing," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">已录用</span></li>

                <li>[12] S. Gu, Y. Huang, J. Li, Y. Mao, X. Chen, <span class="highlight-name">Y. Xiong</span>, Z. Chen and X. Yang, "RFI Mitigation for Spaceborne SAR via Maximizing Dynamic Residual Entropy," in <em>IEEE Transactions on Image Processing</em>.</li>
