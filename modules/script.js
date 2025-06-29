        // Tab functionality
        const tabGroups = document.querySelectorAll('[data-tab-group]');
        tabGroups.forEach(group => {
            const buttons = group.querySelectorAll('.tab-button');
            const groupName = group.dataset.tabGroup;
            const contents = document.querySelectorAll(`.tab-content[data-tab-group="${groupName}"]`);

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const tabId = button.dataset.tab;
                    contents.forEach(content => {
                        if (content.id === tabId) {
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    });
                });
            });
        });

        // Chart.js instances
        new Chart(document.getElementById('competitionRadarChart'), {
            type: 'radar',
            data: {
                labels: ['Scale', 'Scope', 'Speed'],
                datasets: [{
                    label: 'Digital Leader',
                    data: [9, 8, 9],
                    fill: true,
                    backgroundColor: 'rgba(67, 129, 180, 0.2)',
                    borderColor: '#4381b4',
                    pointBackgroundColor: '#4381b4'
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                scales: { r: { beginAtZero: true, max: 10 } }
            }
        });
        
        new Chart(document.getElementById('ctoSkillsChart'), {
            type: 'radar',
            data: {
                labels: ['Strategic Thinking', 'Innovation', 'External Focus', 'People Mgmt', 'Financial Acumen', 'Communication', 'Digital Acumen', 'Cross-Functional'],
                datasets: [{
                    label: 'CTO Skill Importance',
                    data: [10, 9, 9, 8, 7, 9, 10, 8],
                    fill: true,
                    backgroundColor: 'rgba(69, 123, 157, 0.2)',
                    borderColor: '#457b9d',
                    pointBackgroundColor: '#457b9d'
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { r: { beginAtZero: true, max: 10 } }
            }
        });
        
        new Chart(document.getElementById('techStrategyRadarChart'), {
            type: 'radar',
            data: {
                labels: ['Microservices', 'Zero Downtime', 'Real-time Analytics', 'Secure Architecture', 'Agility', 'Modularity'],
                datasets: [{
                    label: 'Strategic Importance',
                    data: [9, 8, 8, 10, 9, 9],
                    fill: true,
                    backgroundColor: 'rgba(230, 57, 70, 0.2)',
                    borderColor: '#e63946',
                    pointBackgroundColor: '#e63946',
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { r: { beginAtZero: true, max: 10, ticks: { display: false } } }
            }
        });


        new Chart(document.getElementById('productivityChart'), {
            type: 'bar',
            data: {
                labels: ['Drug Discovery', 'Content Creation', 'Email Drafting', 'L&D Content', 'Protein Folding'],
                datasets: [{
                    label: 'Productivity Gain (X times faster)',
                    data: [2, 25, 5, 8, 1000000],
                    backgroundColor: 'rgba(78, 179, 146, 0.6)',
                    borderColor: '#4eb392',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: {
                        type: 'logarithmic',
                        ticks: {
                            callback: function(value, index, values) {
                                if (value === 1000000) return '1M';
                                if (value === 1000) return '1K';
                                if (value > 100) return null;
                                return value;
                            }
                        }
                    }
                }
            }
        });
        
        new Chart(document.getElementById('facilityCostChart'), {
            type: 'line',
            data: {
                labels: [1, 5, 10, 15, 20, 25, 30],
                datasets: [
                    {
                        label: 'Inventory Cost',
                        data: [20, 35, 50, 65, 80, 95, 110],
                        borderColor: '#e74c3c',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: 'Transportation Cost',
                        data: [100, 60, 40, 30, 25, 28, 35],
                        borderColor: '#2ecc71',
                        fill: false,
                        tension: 0.4
                    },
                    {
                        label: 'Facility Cost',
                        data: [15, 75, 150, 225, 300, 375, 450],
                        borderColor: '#f39c12',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: 'Total Cost',
                        data: [135, 120, 140, 180, 250, 340, 450],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Cost Trade-Offs in Facility Network Design',
                        font: { size: 16 }
                    }
                },
                scales: {
                    x: { title: { display: true, text: 'Number of Facilities' } },
                    y: { title: { display: true, text: 'Relative Cost' }, beginAtZero: true }
                }
            }
        });

        new Chart(document.getElementById('investmentMixChart'), {
            type: 'doughnut',
            data: {
                labels: ['Sustain', 'Scale', 'Transform'],
                datasets: [{
                    data: [50, 30, 20],
                    backgroundColor: ['#457b9d', '#4eb392', '#e63946'],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
            }
        });


        // Gemini API functionality
        const generateBtn = document.getElementById('generate-summary-btn');
        const outputContainer = document.getElementById('summary-output');
        const moduleSelect = document.getElementById('module-select');

        generateBtn.addEventListener('click', async () => {
            const selectedModule = moduleSelect.value;
            
            outputContainer.innerHTML = '<p class="text-center text-gray-500 animate-pulse">💡 Generating your key takeaways...</p>';
            outputContainer.classList.remove('hidden');
            generateBtn.disabled = true;
            generateBtn.classList.add('opacity-50');

            const prompt = `As a course instructor summarizing a CTO Programme, provide a concise summary of the key concepts and most important takeaways for a CTO from the module titled: '${selectedModule}'.

Base your summary on general business and technology leadership principles exemplified in the course.

Structure the response using markdown with the following two sections:
**Key Concepts:** (List 2-3 of the most important frameworks or ideas introduced in this module).
**Actionable Insight for a CTO:** (Provide a single, powerful takeaway that a CTO can directly apply to their work).

Keep the language clear, strategic, and direct.`;

            try {
                let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
                const payload = { contents: chatHistory };
                const apiKey = "";
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);

                const result = await response.json();
                
                if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text;
                
                     const formattedHtml = text
                       .replace(/\*\*(.*?):\*\*/g, '</ul><h3 class="subsection-title mt-4">$1</h3><ul>')
                       .split('\n')
                       .map(line => {
                            line = line.trim();
                            if (line.startsWith('* ')) {
                                return `<li class="text-content">${line.substring(2)}</li>`;
                            }
                            if(line && !line.startsWith('**')){
                               return `<p class="text-content">${line}</p>`
                            }
                            return '';
                        }).join('').replace('</ul><ul>', '<ul>');

                    outputContainer.innerHTML = `<div class="prose max-w-none">${formattedHtml}</ul></div>`;
                } else {
                    throw new Error("Invalid response structure from API.");
                }

            } catch (error) {
                console.error("Summary generation error:", error);
                outputContainer.innerHTML = `<p class="text-center text-red-600">Sorry, could not generate a summary. Please try again.</p>`;
            } finally {
                generateBtn.disabled = false;
                generateBtn.classList.remove('opacity-50');
            }
        });

        // Mobile menu toggle
        const menuBtn = document.getElementById('menu-btn');
        const navLinks = document.getElementById('nav-links');
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('hidden');
            });

            // collapse menu when a link is selected (useful on mobile)
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.add('hidden');
                });
            });
        }

        // Back to top button functionality
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.remove('hidden');
                } else {
                    backToTopBtn.classList.add('hidden');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
