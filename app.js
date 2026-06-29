/* -------------------------------------------------------------
 * LA ROCHE-POSAY - CLINICAL & STRATEGIC SPA SCRIPT
 * Native Javascript Core Logic for Premium Web Portal
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initScrollSpy();
    initCitations();
    initMatrixSwitcher();
    initDiarySimulator();
    initSkinScanner();
    initCheckoutFlow();
});

/* ==========================================================================
   1. SCROLL SPY & NAVIGATION
   ========================================================================== */
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    function checkActiveSection() {
        let scrollPosition = window.scrollY + 120; // Offset for sticky navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll listener
    window.addEventListener('scroll', checkActiveSection);
    // Initial check
    checkActiveSection();
}

/* ==========================================================================
   2. CITATIONS & TOOLTIPS SYSTEM
   ========================================================================== */
const citationDatabase = {
    "4": "文獻來源:《全球皮膚醫學微生態白皮書》，指出現代生活壓力與外部污染引發微生物屏障受損。",
    "5": "競品分析: 基礎開架品牌(如雅漾、理膚寶水常規系列)多鎖定基礎保濕，缺乏多靶點修護配方。",
    "6": "臨床報告: 理膚寶水溫泉水配方，經 45 項臨床試驗證實具有顯著抗炎與表皮修復作用。",
    "11": "客群畫像: 理事會報告指出，25-40歲受試者中88%面臨季節交替性敏感與過度醫美修護需求。",
    "12": "戰略定位: 理膚寶水宣示拒絕低價平替競爭，聚焦提供高濃度高安全性的「微生態配方科技」。",
    "13": "產品機理: 菸鹼醯胺(Vitamin B3)可誘導神經醯胺自體合成，厚實肌膚物理角質層。",
    "16": "財務精算: 長期使用無效開架產品的「試錯成本」為本處方籤產品的 3.8 倍以上。",
    "17": "通路整合: 整合屈臣氏、康是美等專業藥師通路與連鎖皮膚科診所，建構全通路生態。",
    "18": "溝通策略: 捨棄電視硬廣，轉向社群社群如 Threads 數位社群，進行高知識科普溝通。",
    "21": "場景數據: 雷射、微針術後水分流失率(TEWL)將激增150%，為屏障受損黃金修復期。",
    "25": "理化成分: 高達 4% 的菸鹼醯胺結合專利微生態科技 AP+M，可減少金黃色葡萄球菌黏附。",
    "27": "理化報告: 熬夜使皮質醇分泌激增，造成表皮細胞緊密連接(Tight Junctions)功能受損。",
    "28": "社群聆聽: Threads 數據分析顯示，95% 以上敏感肌用戶在深夜發文抱怨突發性泛紅發癢。",
    "30": "檢測專利: 專業皮膚分析儀(SOP-3)具備多光譜攝影，能預判皮下2毫米的潛在紅斑區。",
    "32": "健檢標準: 國際皮膚屏障研究學會(ISBS)推薦以 TEWL 水分流失值量化肌膚底層破損度。",
    "33": "諮詢指引: 藥師解讀報告標準：紅斑度大於45%需開立修護A處方，大於60%需加強B處方。",
    "34": "方案對接: 臨床處方建議：洗臉後第一步先用微生態化妝水充當「細胞推進液」，活化吸收通道。",
    "35": "首購閉環: 行銷轉換漏斗顯示，附贈「隨身修護急救包」首購轉化率可提升42.8%。",
    "36": "留存指標: 要求季度回檢能使消費者 LTV(生命週期價值)提升 2.4 倍，並確保修復效果穩定。",
    "39": "通路沉澱: 線上數位檢測引流至實體店，完成 O2O 閉環，提升顧客的忠誠度與信賴感。",
    "40": "行銷矩陣: CRM 系統將在換季、寒流、高溫等環境因素劇烈變化前，自動發送防禦簡訊。",
    "46": "通路綜述: 整合性大健康管理平台，將皮膚護理從消費行為轉向「預防醫學」領域。",
    "56": "微生態報告: 表皮菌群多樣性(Microbiome Diversity)在塗抹微生態機能液第7天起顯著回升。"
};

function initCitations() {
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'cite-tooltip';
    document.body.appendChild(tooltip);

    const badges = document.querySelectorAll('.cite-badge');

    badges.forEach(badge => {
        const citeNum = badge.textContent.replace('cite: ', '').trim();
        const tooltipText = citationDatabase[citeNum] || `文獻引註 [cite: ${citeNum}]`;

        // Mouse hover desktop
        badge.addEventListener('mouseenter', (e) => {
            tooltip.textContent = tooltipText;
            tooltip.classList.add('show');
            positionTooltip(badge, tooltip);
        });

        badge.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });

        // Click mobile support
        badge.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            tooltip.textContent = tooltipText;
            tooltip.classList.toggle('show');
            positionTooltip(badge, tooltip);
        });
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', () => {
        tooltip.classList.remove('show');
    });
}

function positionTooltip(badge, tooltip) {
    const badgeRect = badge.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position tooltip above the badge
    let top = badgeRect.top + window.scrollY - tooltipRect.height - 10;
    let left = badgeRect.left + window.scrollX + (badgeRect.width / 2) - (tooltipRect.width / 2);

    // Prevent screen overflow
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    if (badgeRect.top < tooltipRect.height + 20) {
        // Show below badge if there's no room above
        top = badgeRect.bottom + window.scrollY + 10;
        tooltip.style.setProperty('--tooltip-arrow-direction', 'down');
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

/* ==========================================================================
   3. INTERACTIVE 4P/4C MATRIX SWITCHER
   ========================================================================== */
const matrixData = {
    p4: [
        {
            title: "產品對接 Moat 1",
            icon: "fa-prescription-bottle-medical",
            body: "含有<strong>菸鹼醯胺、甘油及微量元素</strong>的機能液，具備抗炎、抗氧化及促進表皮癒合的臨床實證，定位為醫美級「屏障重組精華液」。",
            meta: "4P 產品戰略 (Product)"
        },
        {
            title: "價值定價 Moat 2",
            icon: "fa-tags",
            body: "拒絕平替價格戰，採取醫學價值定價。透過高修復率與高安全性，降低顧客在使用開架低效產品時付出的「隱形成本」與「焦慮時間」。",
            meta: "4P 價格戰略 (Price)"
        },
        {
            title: "通路生態 Moat 3",
            icon: "fa-hospital",
            body: "線上提供精準檢測與線上處方卡申領，線下無縫導流整合至全台核心合作藥局、醫美診所與居家護理流程中，達成高密度的全通路覆蓋。",
            meta: "4P 通路戰略 (Place)"
        }
    ],
    c4: [
        {
            title: "消費者需求 Cost 1",
            icon: "fa-face-frown-open",
            body: "鎖定 25-40 歲深受泛紅、乾燥、脫皮、粉刺痘痘或醫美雷射術後肌膚脆弱困擾的兩性都市族群，直擊其「急需穩況」的心理需求。",
            meta: "4C 顧客需求 (Customer Value)"
        },
        {
            title: "消費者成本 Cost 2",
            icon: "fa-scale-unbalanced-flip",
            body: "徹底杜絕因盲目試錯、使用不當保養品而引發的膚況反覆惡化代價，以極致的安全與專業，將消費者的「毀容隱形成本」降至最低。",
            meta: "4C 消費者成本 (Cost)"
        },
        {
            title: "消費者溝通 Cost 3",
            icon: "fa-comments",
            body: "捨棄單向廣告，在 Threads、IG 設立線上顧問，深夜即時回應突發性膚況焦慮，以「戰友」姿態建立深厚的品牌情感連結。",
            meta: "4C 溝通互動 (Communication)"
        }
    ]
};

function initMatrixSwitcher() {
    const tabBtns = document.querySelectorAll('.matrix-tab-btn');
    const matrixCards = document.querySelectorAll('.matrix-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabType = btn.getAttribute('data-matrix');
            const data = matrixData[tabType];

            // Animate transition
            matrixCards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    const cardTitle = card.querySelector('.matrix-card-title');
                    const cardBody = card.querySelector('.matrix-card-body');
                    const cardMeta = card.querySelector('.matrix-card-meta');

                    cardTitle.innerHTML = `<i class="fa-solid ${data[index].icon}"></i> ${data[index].title}`;
                    cardBody.innerHTML = data[index].body;
                    cardMeta.innerHTML = data[index].meta;

                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 200 + index * 50);
            });
        });
    });
}

/* ==========================================================================
   4. 28-DAY DIARY SIMULATOR
   ========================================================================== */
const diaryData = {
    w1: {
        moisture: 35,
        redness: 68,
        healthyCells: 2,
        damagedCells: 10,
        desc: "初期使用 (Day 1 - 7)：機能水重組角質含水量，肌膚表皮泛紅敏感依然存在，微生態平衡與微生物菌群開始微調。"
    },
    w2: {
        moisture: 55,
        redness: 45,
        healthyCells: 5,
        damagedCells: 7,
        desc: "中期修復 (Day 8 - 14)：菸鹼醯胺促使神經醯胺生成，破損屏障開始癒合，自體水分流失率降低，肌膚刺痛感消退。"
    },
    w3: {
        moisture: 72,
        redness: 28,
        healthyCells: 9,
        damagedCells: 3,
        desc: "後期穩況 (Day 15 - 21)：新生角質層屏障增厚，局部泛紅發炎症狀收縮，微生態防禦系統成型，對外界環境耐受度提高。"
    },
    w4: {
        moisture: 88,
        redness: 15,
        healthyCells: 12,
        damagedCells: 0,
        desc: "修護完成 (Day 22 - 28)：85%以上受試者達到健康指標，肌膚含水量回歸極佳數值，發炎細胞受控，重拾原生健康狀態。"
    }
};

function initDiarySimulator() {
    const weekBtns = document.querySelectorAll('.week-btn');
    const moistureVal = document.getElementById('moisture-val');
    const moistureBar = document.getElementById('moisture-bar');
    const rednessVal = document.getElementById('redness-val');
    const rednessBar = document.getElementById('redness-bar');
    const diaryDesc = document.getElementById('diary-desc');
    const cellMatrix = document.getElementById('cell-matrix');

    function updateDiary(weekKey) {
        const data = diaryData[weekKey];
        
        // Update texts & bars
        moistureVal.textContent = `${data.moisture}%`;
        moistureBar.style.width = `${data.moisture}%`;
        
        rednessVal.textContent = `${data.redness}%`;
        rednessBar.style.width = `${data.redness}%`;
        
        diaryDesc.textContent = data.desc;

        // Redraw cell matrix
        cellMatrix.innerHTML = '';
        
        // Generate healthy cells
        for (let i = 0; i < data.healthyCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell-node cell-healthy';
            cell.innerHTML = '<i class="fa-solid fa-shield-halved"></i>';
            cell.setAttribute('title', '健康角質屏障');
            cellMatrix.appendChild(cell);
        }
        
        // Generate damaged cells
        for (let i = 0; i < data.damagedCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell-node cell-damaged';
            cell.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
            cell.setAttribute('title', '受損發炎細胞');
            cellMatrix.appendChild(cell);
        }
    }

    weekBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            weekBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const week = btn.getAttribute('data-week');
            updateDiary(week);
        });
    });

    // Load initial week 1
    updateDiary('w1');
}

/* ==========================================================================
   5. SKIN DIAGNOSTIC SCANNER (SOP SIMULATOR)
   ========================================================================== */
function initSkinScanner() {
    const symptomLabels = document.querySelectorAll('.tester-checkbox-label');
    const scanBtn = document.getElementById('btn-start-scan');
    const scanSpinner = document.getElementById('scan-spinner');
    const scanline = document.getElementById('scanline');
    const scanLog = document.getElementById('scan-log');
    const sopStepCards = document.querySelectorAll('.sop-step-card');

    // Handle symptom selection style
    symptomLabels.forEach(label => {
        const checkbox = label.querySelector('input');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    });

    // Scan simulation trigger
    scanBtn.addEventListener('click', () => {
        const selectedSymptoms = Array.from(document.querySelectorAll('.tester-checkbox-label input:checked'))
            .map(cb => cb.value);

        if (selectedSymptoms.length === 0) {
            scanLog.innerHTML = `<span style="color: var(--lrp-accent);">[ERROR] 檢測失敗：請至少選擇一項目前的肌膚症狀。</span>`;
            return;
        }

        // Stepper transition to Step 2 (Medical analysis)
        sopStepCards.forEach(card => card.classList.remove('active'));
        sopStepCards[1].classList.add('active'); // Step 2

        // Visual scan animation
        scanBtn.disabled = true;
        scanBtn.textContent = '肌膚光譜分析中...';
        scanSpinner.style.display = 'block';
        scanline.style.display = 'block';
        
        let progress = 0;
        scanLog.innerHTML = `<span class="log-highlight">[SYSTEM] 初始化高光譜紫外光皮膚分析儀...</span><br>`;

        const logs = [
            "發射 365nm UV 光譜，擷取皮下黑色素分布...",
            "測定表皮水分流失率 (TEWL) 中...",
            "檢測皮脂腺活躍度與毛孔發炎狀態...",
            "分析表皮微生態多樣性與益生菌種比例...",
            "比對理膚寶水臨床實驗資料庫 (N=100,000)..."
        ];

        let logIndex = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress % 20 === 0 && logIndex < logs.length) {
                scanLog.innerHTML += `> ${logs[logIndex]}<br>`;
                logIndex++;
            }

            if (progress >= 100) {
                clearInterval(interval);
                finishDiagnosis(selectedSymptoms);
            }
        }, 300);
    });

    function finishDiagnosis(symptoms) {
        scanSpinner.style.display = 'none';
        scanline.style.display = 'none';
        scanBtn.disabled = false;
        scanBtn.innerHTML = '<i class="fa-solid fa-microscope"></i> 重新執行肌膚檢測';

        // Stepper transition to Step 3 (Solution coupling)
        sopStepCards.forEach(card => card.classList.remove('active'));
        sopStepCards[2].classList.add('active');

        // Logic to determine prescription based on checked symptoms
        // If they checked severe symptoms (medical beauty laser, severe scaling, severe redness), give B. Else give A.
        const requiresPkgB = symptoms.includes('laser') || symptoms.includes('peeling');
        
        let packageTitle = '';
        let packageCode = '';
        let recoveryPath = '';
        
        if (requiresPkgB) {
            packageTitle = '【處方 B】極效專利溫泉水術後穩況組';
            packageCode = 'pkg_b';
            recoveryPath = '專利溫泉水，快速降溫、抗炎並促進纖維母細胞癒合';
        } else {
            packageTitle = '【處方 A】明星化妝水微生態平衡組';
            packageCode = 'pkg_a';
            recoveryPath = '重組菸鹼醯胺微生態平衡，提升物理防禦';
        }

        // Print final diagnosis report
        scanLog.innerHTML = `
            <span class="log-success">[✓] 檢測分析完成 (SOP Standardized Report)</span><br>
            ------------------------------------------<br>
            • 表皮障壁指數: <span class="log-highlight">${requiresPkgB ? '38% (重度破損)' : '56% (輕中度破損)'}</span><br>
            • 水分流失率 TEWL: <span class="log-highlight">${requiresPkgB ? '34.8 g/h/m² (高度漏水)' : '22.5 g/h/m² (輕度漏水)'}</span><br>
            • 微生態多樣度: <span class="log-highlight">${requiresPkgB ? '42% (菌群嚴重失衡)' : '65% (菌群中度失衡)'}</span><br>
            ------------------------------------------<br>
            <span class="log-success">【分析藥師推薦方案】</span><br>
            <span class="log-highlight" style="color: #38BDF8;">${packageTitle}</span><br>
            機理對接：${recoveryPath}。<br><br>
            <button id="btn-apply-rx" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem; margin-top: 8px;">
                <i class="fa-solid fa-cart-shopping"></i> 套用此處方並跳轉結帳
            </button>
        `;

        // Event listener for recommended CTA
        document.getElementById('btn-apply-rx').addEventListener('click', () => {
            // Check correct radio button
            const radioBtn = document.getElementById(packageCode);
            if (radioBtn) {
                radioBtn.checked = true;
                // Trigger change event to update totals
                radioBtn.dispatchEvent(new Event('change'));
            }

            // Check scene context checkboxes matching symptoms
            if (symptoms.includes('laser')) {
                document.getElementById('scene_laser').checked = true;
                document.getElementById('scene_laser').dispatchEvent(new Event('change'));
            }
            if (symptoms.includes('redness')) {
                document.getElementById('scene_redness').checked = true;
                document.getElementById('scene_redness').dispatchEvent(new Event('change'));
            }
            if (symptoms.includes('dry')) {
                document.getElementById('scene_stress').checked = true;
                document.getElementById('scene_stress').dispatchEvent(new Event('change'));
            }

            // Scroll smoothly to order form
            document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   6. CHECKOUT FLOW & DIGITAL PRESCRIPTION MODAL
   ========================================================================== */
const packagesInfo = {
    pkg_a: {
        name: "【處方 A】明星化妝水微生態平衡組",
        price: 1280,
        details: "微生態科技 AP+M 重組表皮微生物防禦線，協同維他命B3與甘油進行雙重鎖水與快速退紅降躁。",
        morningRoutine: "晨間洗臉 $\\rightarrow$ 【處方A】明星微生態水 (浸潤細胞吸水通道) $\\rightarrow$ 理膚寶水B5防禦隔离乳。",
        nightRoutine: "夜間洗臉 $\\rightarrow$ 【處方A】明星微生態水 (厚敷3分鐘) $\\rightarrow$ B5彈潤修復精華 $\\rightarrow$ B5全面修復霜。"
    },
    pkg_b: {
        name: "【處方 B】極效專利溫泉水術後穩況組",
        price: 1450,
        details: "專利硒微量元素理療溫泉水，極速舒緩降溫，緩解表皮刺痛脫皮，修復表皮緊密連接結構。",
        morningRoutine: "晨間理療溫泉水輕噴 $\\rightarrow$ 局部厚敷 B5全面修復霜 $\\rightarrow$ 物理防曬隔離。",
        nightRoutine: "夜間潔面 $\\rightarrow$ 理療溫泉水浸濕敷容 (5分鐘) $\\rightarrow$ 勻抹 B5全面修復霜 (建立保濕密封艙)。"
    }
};

function initCheckoutFlow() {
    const sceneCheckboxes = document.querySelectorAll('.scene-selectors input[type="checkbox"]');
    const pkgRadios = document.querySelectorAll('input[name="pkg"]');
    const orderForm = document.getElementById('checkout-form');
    
    // Summary DOM components
    const subtotalText = document.getElementById('summary-subtotal');
    const grandtotalText = document.getElementById('summary-grandtotal');
    const morningStepText = document.getElementById('summary-morning-step');
    const nightStepText = document.getElementById('summary-night-step');
    
    // Modal DOM components
    const modal = document.getElementById('rx-modal');
    const closeBtn = document.querySelector('.modal-close-btn');
    const btnCancelModal = document.getElementById('btn-cancel-modal');
    const btnPrintModal = document.getElementById('btn-print-modal');

    // Contextual Scene Engagement Checkboxes
    sceneCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const label = cb.closest('label');
            if (cb.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }

            // Dynamic rule-of-thumb mapping:
            // If they check "Medical Laser", we proactively recommend/highlight Package B
            const isLaserChecked = document.getElementById('scene_laser').checked;
            if (isLaserChecked) {
                // Highlight pkg_b
                document.getElementById('pkg_b').checked = true;
                updateOrderSummary('pkg_b');
            } else {
                // Default to pkg_a if no laser
                const checkedRadio = document.querySelector('input[name="pkg"]:checked').id;
                updateOrderSummary(checkedRadio);
            }
        });
    });

    // Package Radio selection
    pkgRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            // Toggle container classes
            document.querySelectorAll('.prescription-card').forEach(card => {
                card.classList.remove('selected');
            });
            radio.closest('.prescription-card').classList.add('selected');

            updateOrderSummary(radio.id);
        });
    });

    function updateOrderSummary(pkgId) {
        const pkg = packagesInfo[pkgId];
        
        // Update summary values
        subtotalText.textContent = `NT$ ${pkg.price.toLocaleString()}`;
        grandtotalText.textContent = `NT$ ${pkg.price.toLocaleString()}`;
        
        // Format LaTeX tags out for browser view
        const cleanMorning = pkg.morningRoutine.replace(/\\\rightarrow/g, ' ➔ ').replace(/\$/g, '');
        const cleanNight = pkg.nightRoutine.replace(/\\\rightarrow/g, ' ➔ ').replace(/\$/g, '');
        
        morningStepText.innerHTML = `<strong>晨間步驟：</strong>${cleanMorning}`;
        nightStepText.innerHTML = `<strong>夜間步驟：</strong>${cleanNight}`;
    }

    // Trigger initial calculation
    updateOrderSummary('pkg_a');

    // Form Submission (Trigger Electronic Care Prescription Modal)
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Inputs
        const userName = document.getElementById('user-name').value.trim();
        const userPhone = document.getElementById('user-phone').value.trim();
        const activePkgId = document.querySelector('input[name="pkg"]:checked').id;
        const activePkg = packagesInfo[activePkgId];

        // Format validation checks
        if (!userName) {
            alert('請輸入保養者姓名');
            return;
        }
        if (!/^09\d{8}$/.test(userPhone)) {
            alert('行動電話格式錯誤，請輸入 09 開頭之 10 碼數字');
            return;
        }

        // Populate Prescription Modal Data
        document.getElementById('rx-username').textContent = userName;
        document.getElementById('rx-userphone').textContent = userPhone;
        document.getElementById('rx-id').textContent = `LRP-RX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
        document.getElementById('rx-date').textContent = new Date().toLocaleDateString('zh-TW');
        
        document.getElementById('rx-pkg-title').textContent = activePkg.name;
        document.getElementById('rx-pkg-details').textContent = activePkg.details;
        
        const cleanMorningRx = activePkg.morningRoutine.replace(/\\\rightarrow/g, ' ➔ ').replace(/\$/g, '');
        const cleanNightRx = activePkg.nightRoutine.replace(/\\\rightarrow/g, ' ➔ ').replace(/\$/g, '');
        
        document.getElementById('rx-morning-list').innerHTML = `
            <li><i class="fa-solid fa-sun"></i> <strong>晨間：</strong>${cleanMorningRx}</li>
        `;
        document.getElementById('rx-night-list').innerHTML = `
            <li><i class="fa-solid fa-moon"></i> <strong>夜間：</strong>${cleanNightRx}</li>
        `;

        // Calculate next checkup date (SOP 3 months from now)
        const checkupDate = new Date();
        checkupDate.setMonth(checkupDate.getMonth() + 3);
        document.getElementById('rx-checkup-date').textContent = checkupDate.toLocaleDateString('zh-TW');

        // Show Modal
        modal.classList.add('show');
    });

    // Close Modal Event Handlers
    function closeModal() {
        modal.classList.remove('show');
    }
    
    closeBtn.addEventListener('click', closeModal);
    btnCancelModal.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Print Electronic Receipt Prescription
    btnPrintModal.addEventListener('click', () => {
        window.print();
    });
}
