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

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            line-height: 1.6;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        .container {
            width: 98%;
            max-width: 1900px;
            margin: 0 auto;
            padding: 28px 8px;
        }

        header {
            text-align: center;
            padding-bottom: 28px;
            border-bottom: 2px solid var(--border-color);
            margin-bottom: 34px;
        }

        h1 {
            font-size: 2.55em;
            margin: 0 0 10px;
            color: #1a202c;
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
            padding: 18px 20px;
            border-radius: 10px;
            border: 1px solid var(--border-color);
            margin-bottom: 18px;
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
                width: 96%;
                padding: 22px 4px;
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
            <h2>🏆 Publications</h2>
            <p class="rank-note">Sorted by the position of Yu Xiong in the author list, not by publication year.</p>
            <h3>English Journal and Conference Papers</h3>
            <ul class="paper-list">
                <li>[1] <span class="highlight-name">Y. Xiong</span>, Y. Huang, K. Deng, Y. Mao, J. Li, X. Chen and S. Gu, "MR2S: Integrated RFI Suppression and SAR Imaging via Masked RAW–RC Sparsity," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">First author; advisor as corresponding author</span></li>

                <li>[2] <span class="highlight-name">Y. Xiong</span> and Z. Wu, "TransitionMatrices.jl: An Open-Source IITM-Based Framework for Electromagnetic Scattering Simulation of Nonspherical Atmospheric Particles and Microwave Remote-Sensing Forward Modeling," submitted to <em>Computer Physics Communications</em>. <span class="badge">Under second review; first author; corresponding author</span></li>

                <li>[3] H. Li, <span class="highlight-name">Y. Xiong</span> and Y. Chen, "Simulation of Complex Meteorological Target Echoes for Airborne Dual-Polarization Weather Radar Based on Invariant Imbedding T-Matrix," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>, vol. 62, pp. 1-17, 2024, Art no. 5105817. <span class="badge">Published; advisor as first author</span> ✅</li>

                <li>[4] H. Li, <span class="highlight-name">Y. Xiong</span>, B. Zhang and Z. Wu, "Simulation of Precipitation Echoes From Airborne Dual-Polarization Weather Radar Based on a Fast Algorithm for Invariant Imbedding T-Matrix," in <em>IEEE Transactions on Radar Systems</em>, vol. 3, pp. 135-154, 2025. <span class="badge">Published; advisor as first author</span> ✅</li>

                <li>[5] J. Guo, <span class="highlight-name">Y. Xiong</span>, H. Li, S. Li and X. Ai, "Ground Clutter and Suppressive Interference Mitigation Method Based on SPCJS-PSTAP," in <em>[TBD]</em>. <span class="badge">Accepted; corresponding author</span></li>

                <li>[6] H. Li, B. Zhang, <span class="highlight-name">Y. Xiong</span> and R. Liang, "Simulation of Airborne Dual-Polarization Weather Radar Echoes from Inhomogeneous Ice-Phase Precipitation Particles Based on Monte Carlo Method," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">Accepted; corresponding author; advisor as first author</span></li>

                <li>[7] H. Li, B. Zhang, <span class="highlight-name">Y. Xiong</span>, "The Simulation of Airborne Weather Radar Echoes for Inhomogeneous Ice Crystals Based on the Bicontinuous Medium Approximation," in <em>2025 IEEE International Geoscience and Remote Sensing Symposium (IGARSS)</em>. <span class="badge">Accepted; advisor as first author</span></li>

                <li>[8] H. Li, X. Ai, Z. Liu, <span class="highlight-name">Y. Xiong</span>, "Intracloud Lightning Echo Simulation for the Airborne Weather Radar Based on Dielectric Breakdown Model," in <em>IEEE International Conference on Signal, Information and Data Processing 2024</em>. <span class="badge">Published; advisor as first author</span></li>

                <li>[9] K. Deng, Y. Huang, Z. Chen, L. Zhang, <span class="highlight-name">Y. Xiong</span> and B. Zhang, "A Hybrid Domain Algorithm for High-Speed High-Squint SAR Imaging with Curved Trajectory via Fifth-Order FNCS Processing," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">Accepted</span></li>

                <li>[10] S. Gu, Y. Huang, J. Li, Y. Mao, X. Chen, <span class="highlight-name">Y. Xiong</span>, Z. Chen and X. Yang, "RFI Mitigation for Spaceborne SAR via Maximizing Dynamic Residual Entropy," in <em>IEEE Transactions on Image Processing</em>.</li>
            </ul>

            <h3>Chinese Journal Papers</h3>
            <ul class="paper-list">
                <li>[11] H. Li, F. Zhang, <span class="highlight-name">Y. Xiong</span>. Simulation of Rain Attenuation Echoes for Airborne Dual-Polarization Weather Radar Based on the T-Matrix Method[J]. <em>Fire Control Radar Technology</em>. <span class="badge">Accepted; advisor as first author</span></li>

                <li>[12] H. Li, Y. Chen, <span class="highlight-name">Y. Xiong</span>. Simulation of Meteorological Target Echoes for Airborne Dual-Polarization Phased Array Weather Radar[J]. <em>Systems Engineering and Electronics</em>, 2025, 47(01): 117-125. <span class="badge">Published; advisor as first author</span></li>

                <li>[13] H. Li, Q. Zhang, A. Zhou, <span class="highlight-name">Y. Xiong</span>. Low-Altitude Windshear Wind-Speed Estimation Based on Convolutional Neural Network STAP[J]. <em>Journal of Electronics &amp; Information Technology</em>, 2024, 46(08): 3193-3201. <span class="badge">Published; advisor as first author</span></li>
            </ul>
        </section>

        <section>
            <h2>🧪 Research Projects</h2>
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
            <h1>熊玉</h1>
            <div class="subtitle">
                中国航空学会学生会员 | 中国电子学会学生会员 | IEEE Student Member<br>
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
            <h2>🏆 科研成果</h2>
            <p class="rank-note">按熊玉在作者列表中的位置排序，不再按发表时间排序。</p>
            <h3>英文与国际会议论文</h3>
            <ul class="paper-list">
                <li>[1] <span class="highlight-name">Y. Xiong</span>, Y. Huang, K. Deng, Y. Mao, J. Li, X. Chen and S. Gu, "MR2S: Integrated RFI Suppression and SAR Imaging via Masked RAW–RC Sparsity," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">第一作者，导师通信</span></li>

                <li>[2] <span class="highlight-name">Y. Xiong</span> and Z. Wu, "TransitionMatrices.jl: An Open-Source IITM-Based Framework for Electromagnetic Scattering Simulation of Nonspherical Atmospheric Particles and Microwave Remote-Sensing Forward Modeling," submitted to <em>Computer Physics Communications</em>. <span class="badge">二审中，第一作者，通信作者</span></li>

                <li>[3] H. Li, <span class="highlight-name">Y. Xiong</span> and Y. Chen, "Simulation of Complex Meteorological Target Echoes for Airborne Dual-Polarization Weather Radar Based on Invariant Imbedding T-Matrix," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>, vol. 62, pp. 1-17, 2024, Art no. 5105817. <span class="badge">已发表，导师一作</span> ✅</li>

                <li>[4] H. Li, <span class="highlight-name">Y. Xiong</span>, B. Zhang and Z. Wu, "Simulation of Precipitation Echoes From Airborne Dual-Polarization Weather Radar Based on a Fast Algorithm for Invariant Imbedding T-Matrix," in <em>IEEE Transactions on Radar Systems</em>, vol. 3, pp. 135-154, 2025. <span class="badge">已发表，导师一作</span> ✅</li>

                <li>[5] J. Guo, <span class="highlight-name">Y. Xiong</span>, H. Li, S. Li and X. Ai, "Ground Clutter and Suppressive Interference Mitigation Method Based on SPCJS-PSTAP," in <em>[待定]</em>. <span class="badge">已录用，通信作者</span></li>

                <li>[6] H. Li, B. Zhang, <span class="highlight-name">Y. Xiong</span> and R. Liang, "Simulation of Airborne Dual-Polarization Weather Radar Echoes from Inhomogeneous Ice-Phase Precipitation Particles Based on Monte Carlo Method," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">已录用，通信作者，导师一作</span></li>

                <li>[7] H. Li, B. Zhang, <span class="highlight-name">Y. Xiong</span>, "The Simulation of Airborne Weather Radar Echoes for Inhomogeneous Ice Crystals Based on the Bicontinuous Medium Approximation," in <em>2025 IEEE International Geoscience and Remote Sensing Symposium (IGARSS)</em>. <span class="badge">已录用，导师一作</span></li>

                <li>[8] H. Li, X. Ai, Z. Liu, <span class="highlight-name">Y. Xiong</span>, "Intracloud Lightning Echo Simulation for the Airborne Weather Radar Based on Dielectric Breakdown Model," in <em>IEEE International Conference on Signal, Information and Data Processing 2024</em>. <span class="badge">已出版，导师一作</span></li>

                <li>[9] K. Deng, Y. Huang, Z. Chen, L. Zhang, <span class="highlight-name">Y. Xiong</span> and B. Zhang, "A Hybrid Domain Algorithm for High-Speed High-Squint SAR Imaging with Curved Trajectory via Fifth-Order FNCS Processing," in <em>IEEE Transactions on Geoscience and Remote Sensing</em>. <span class="badge">已录用</span></li>

                <li>[10] S. Gu, Y. Huang, J. Li, Y. Mao, X. Chen, <span class="highlight-name">Y. Xiong</span>, Z. Chen and X. Yang, "RFI Mitigation for Spaceborne SAR via Maximizing Dynamic Residual Entropy," in <em>IEEE Transactions on Image Processing</em>.</li>
            </ul>

            <h3>中文期刊论文</h3>
            <ul class="paper-list">
                <li>[11] 李海, 张富强, <span class="highlight-name">熊玉</span>. 基于T矩阵的机载双极化气象雷达降雨衰减回波仿真[J]. <em>火控雷达技术</em>. <span class="badge">已录用，导师一作</span></li>

                <li>[12] 李海, 陈禹同, <span class="highlight-name">熊玉</span>. 机载双极化相控阵气象雷达气象目标回波仿真[J]. <em>系统工程与电子技术</em>, 2025, 47(01): 117-125. <span class="badge">已发表，导师一作</span></li>

                <li>[13] 李海, 张强, 周桉宇, <span class="highlight-name">熊玉</span>. 卷积神经网络STAP低空风切变风速估计[J]. <em>电子与信息学报</em>, 2024, 46(08): 3193-3201. <span class="badge">已发表，导师一作</span></li>
            </ul>
        </section>

        <section>
            <h2>🧪 科研经历</h2>
            <div class="project-card">
                <h3>📌 2023.03 - 至今 基于Fourier-MLP的双连续介质结构建模与雷达亮温预测研究</h3>
                <ul>
                    <li>提出基于Fourier特征嵌入的MLP结构进行介质结构建模。</li>
                    <li>构建Patch-Based Transformer 和 3D U-Net网络预测双连续介质结构。</li>
                    <li>实现亮温预测、粒子类型分类以及双极化雷达变量模拟。</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 2022.09 - 2024.09 面向恶劣天气下航路优化的机载气象数据处理技术研究（天津市自然基金重点项目）</h3>
                <ul>
                    <li>实现机载极化气象雷达数据仿真，撰写项目报告、技术报告以及验收汇报等材料。</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 2022.09 - 2024.09 高安全性设计方法在新型XXXX雷达的应用验证及风切变风速精确估计关键技术研究（国家重点研发计划子课题）</h3>
                <ul>
                    <li>在机载阵列气象雷达体系下，研究低空风切变和地杂波信号特性，实现自适应的低空风切变检测算法，进行机载气象雷达的低空风切变风速估计。</li>
                    <li>仿真机载阵列气象雷达低空风切变回波信号，完成STAP低空风切变检测算法研究。</li>
                    <li>实现地杂波回波信号建模与仿真。</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 2022.09 - 2024.09 X波段雷达观测策略仿真与优化模块（期间前往浙江省气象服务中心交流）</h3>
                <ul>
                    <li>完成X波段气象雷达回波仿真，并且根据仿真结果进行灾害性天气检测。</li>
                    <li>在掌握Linux系统的基础上，负责项目所有环境在麒麟系统上的稳定运行，实现该系统下WRF的运行。</li>
                    <li>实现基于脉冲协方差矩阵Cholesky的回波仿真方法，完成回波数据中径向速度、谱宽信息的添加。</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 2022.09 - 2023.10 与西电合作：降雨电磁散射特性建模与模拟</h3>
                <ul>
                    <li>研究不同粒子的尺寸、形状、取向分布对散射特性的影响。</li>
                    <li>使用不变嵌入T矩阵方法（IITM）模拟实际雷达回波。</li>
                    <li>开发并开源 TransitionMatrices.jl 高性能建模工具包。</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 2022.09 - 2023.10 中国物流流程数据分析与物联网在货运飞机及机场基础设施应用的可行性协同研究</h3>
                <ul>
                    <li>与波音公司合作项目，作为学生负责人，统筹领导，撰写物联网相关章节，深入了解IIC、CAN、串口等各类总线通信方式。</li>
                </ul>
            </div>

            <div class="project-card">
                <h3>📌 2022.09 - 2023.06 机载气象雷达 xx 和 xxxx 识别技术研究（工信部）</h3>
                <p>分析气象目标的散射特性特征，仿真飞机巡航阶段飞行前方冰雹、雨、雪等气象目标的回波数据，利用模糊逻辑等算法对不同类型降水粒子进行分类和检测，实现航路危险气象的预测和规避。</p>
                <ul>
                    <li>分析气象目标的散射特性特征，利用WRF实现气象事件预报模拟仿真。</li>
                    <li>增加了工程上实际使用的仿真波形，包括线性调频（Chirp）、调频连续波（FMCW）、相位编码（CODE）。</li>
                    <li>研究机载气象雷达原理，构建了机载气象目标回波仿真系统。</li>
                    <li>搭建了极化雷达回波仿真验证系统和降水粒子分类平台。</li>
                </ul>
            </div>
        </section>

        <section>
            <h2>💼 专业技能</h2>
            <ul>
                <li><strong>编程语言：</strong> Python, Julia, MATLAB, C, Verilog HDL。</li>
                <li><strong>系统平台：</strong> Linux, 麒麟系统, Windows, 高性能计算集群部署。</li>
                <li><strong>科研工具：</strong> WRF, NCL, TransitionMatrices.jl, MonteCarloRadiativeTransfer.jl, 自研气象雷达仿真平台。</li>
                <li><strong>硬件经验：</strong> K210, OpenMV, ESP32, 树莓派, Arduino, 51单片机。</li>
                <li><strong>图像/信号处理：</strong> 小波变换、压缩感知、模糊逻辑、深度学习。</li>
            </ul>
        </section>

        <div class="footer-quote">“这是 xiongyuup 的个人主页！”</div>
    </div>
</div>

<script>
    const toggleButton = document.getElementById('languageToggle');
    const englishBlock = document.getElementById('en');
    const chineseBlock = document.getElementById('zh');

    function setLanguage(lang) {
        const isChinese = lang === 'zh';
        englishBlock.classList.toggle('active', !isChinese);
        chineseBlock.classList.toggle('active', isChinese);
        toggleButton.textContent = isChinese ? 'English' : '中文';
        document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
        document.title = isChinese ? '熊玉 | 个人主页' : 'Yu Xiong | Personal Homepage';
        localStorage.setItem('homepage-language', lang);
    }

    toggleButton.addEventListener('click', () => {
        const currentLang = chineseBlock.classList.contains('active') ? 'zh' : 'en';
        setLanguage(currentLang === 'en' ? 'zh' : 'en');
    });

    setLanguage(localStorage.getItem('homepage-language') || 'en');
</script>
</body>
</html>
