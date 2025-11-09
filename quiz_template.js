// Reusable quiz engine
class QuizEngine {
    constructor(questions, quizTitle) {
        this.questions = questions;
        this.quizTitle = quizTitle;
        this.currentQuestion = 0;
        this.userAnswers = [];
        this.score = 0;
        this.answered = false;
        this.startTime = Date.now();
    }

    loadQuestion() {
        this.answered = false;
        const q = this.questions[this.currentQuestion];
        const container = document.getElementById('quizContainer');
        
        let html = `
            <div class="question-card">
                <div class="question-header">
                    <span class="question-number">Question ${this.currentQuestion + 1}/${this.questions.length}</span>
                    <span class="difficulty ${q.difficulty}">${q.difficulty.toUpperCase()}</span>
                </div>
                <div class="topic-tag">${q.topic}</div>
                <div class="question-text">${q.question}</div>
                ${q.code ? `<div class="code-block">${this.escapeHtml(q.code)}</div>` : ''}
                <div class="options">
        `;
        
        q.options.forEach((option, index) => {
            html += `
                <div class="option" onclick="quiz.selectOption(${index})">
                    <input type="radio" name="answer" id="option${index}" value="${index}">
                    <label for="option${index}">${this.escapeHtml(option)}</label>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="explanation" id="explanation">
                    <h3>💡 Explanation:</h3>
                    <p>${q.explanation}</p>
                    ${q.tip ? `<div class="tip">💡 <strong>Pro Tip:</strong> ${q.tip}</div>` : ''}
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        document.getElementById('prevBtn').style.display = this.currentQuestion > 0 ? 'block' : 'none';
        document.getElementById('checkBtn').style.display = 'block';
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('checkBtn').disabled = true;
        
        this.updateProgress();
    }

    selectOption(index) {
        if (this.answered) return;
        
        document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        document.querySelectorAll('.option')[index].classList.add('selected');
        document.getElementById(`option${index}`).checked = true;
        document.getElementById('checkBtn').disabled = false;
    }

    checkAnswer() {
        if (this.answered) return;
        
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) return;
        
        this.answered = true;
        const selectedIndex = parseInt(selected.value);
        const q = this.questions[this.currentQuestion];
        
        this.userAnswers[this.currentQuestion] = selectedIndex;
        
        const options = document.querySelectorAll('.option');
        options[q.correct].classList.add('correct');
        
        if (selectedIndex !== q.correct) {
            options[selectedIndex].classList.add('incorrect');
        } else {
            this.score++;
        }
        
        document.getElementById('explanation').classList.add('show');
        document.getElementById('checkBtn').style.display = 'none';
        
        if (this.currentQuestion < this.questions.length - 1) {
            document.getElementById('nextBtn').style.display = 'block';
        } else {
            document.getElementById('nextBtn').innerHTML = '🏁 Finish Quiz';
            document.getElementById('nextBtn').style.display = 'block';
        }
        
        options.forEach(opt => opt.style.pointerEvents = 'none');
    }

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion < this.questions.length) {
            this.loadQuestion();
        } else {
            this.showResults();
        }
    }

    prevQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.loadQuestion();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        const progressBar = document.getElementById('progressBar');
        progressBar.style.width = progress + '%';
        progressBar.textContent = `${this.currentQuestion + 1}/${this.questions.length}`;
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const timeTaken = Math.round((Date.now() - this.startTime) / 1000 / 60);
        
        let performance = "";
        let performanceColor = "";
        
        if (percentage >= 90) {
            performance = "Outstanding! 🌟";
            performanceColor = "#28a745";
        } else if (percentage >= 75) {
            performance = "Great Job! 🎉";
            performanceColor = "#17a2b8";
        } else if (percentage >= 60) {
            performance = "Good Work! 👍";
            performanceColor = "#ffc107";
        } else {
            performance = "Keep Practicing! 💪";
            performanceColor = "#dc3545";
        }
        
        const topicScores = {};
        const difficultyScores = {};
        
        this.questions.forEach((q, index) => {
            if (!topicScores[q.topic]) {
                topicScores[q.topic] = { correct: 0, total: 0 };
            }
            if (!difficultyScores[q.difficulty]) {
                difficultyScores[q.difficulty] = { correct: 0, total: 0 };
            }
            
            topicScores[q.topic].total++;
            difficultyScores[q.difficulty].total++;
            
            if (this.userAnswers[index] === q.correct) {
                topicScores[q.topic].correct++;
                difficultyScores[q.difficulty].correct++;
            }
        });
        
        let topicHTML = '<div class="topic-breakdown">';
        for (const [topic, scores] of Object.entries(topicScores)) {
            const topicPercentage = Math.round((scores.correct / scores.total) * 100);
            topicHTML += `
                <div class="topic-card">
                    <div class="topic-name">${topic}</div>
                    <div class="topic-score">${scores.correct}/${scores.total} (${topicPercentage}%)</div>
                </div>
            `;
        }
        topicHTML += '</div>';
        
        let difficultyHTML = '<div class="difficulty-breakdown">';
        for (const [difficulty, scores] of Object.entries(difficultyScores)) {
            const diffPercentage = Math.round((scores.correct / scores.total) * 100);
            difficultyHTML += `
                <div class="difficulty-card ${difficulty}">
                    <div class="diff-name">${difficulty.toUpperCase()}</div>
                    <div class="diff-score">${scores.correct}/${scores.total} (${diffPercentage}%)</div>
                </div>
            `;
        }
        difficultyHTML += '</div>';
        
        document.getElementById('quizContainer').style.display = 'none';
        document.querySelector('.buttons').style.display = 'none';
        document.querySelector('.progress-bar').style.display = 'none';
        
        const resultsHTML = `
            <h2 style="color: #333; margin-bottom: 30px;">${this.quizTitle} Complete! 🎊</h2>
            <div class="score-circle">
                <div class="score-text">${percentage}%</div>
            </div>
            <div class="performance" style="color: ${performanceColor};">${performance}</div>
            <div class="feedback">
                <h3 style="color: #333; margin-bottom: 15px;">Your Score: ${this.score} out of ${this.questions.length}</h3>
                <p style="color: #666; font-size: 1.1em; margin-bottom: 10px;">
                    Time taken: ${timeTaken} minutes
                </p>
                <p style="color: #666; font-size: 1.1em;">
                    ${percentage >= 75 ? 
                        "Excellent! You have a strong understanding of this topic. Ready for the next challenge!" :
                        "Good effort! Review the explanations for questions you missed. Practice makes perfect!"}
                </p>
            </div>
            <h3 style="margin: 30px 0 15px 0; color: #333;">Performance by Topic:</h3>
            ${topicHTML}
            <h3 style="margin: 30px 0 15px 0; color: #333;">Performance by Difficulty:</h3>
            ${difficultyHTML}
            <div style="display: flex; gap: 15px; margin-top: 30px; justify-content: center;">
                <button class="btn btn-secondary" onclick="window.location.href='devops_hub.html'" style="width: auto; padding: 15px 40px;">
                    ⬅ Back to Hub
                </button>
                <button class="btn btn-primary" onclick="location.reload()" style="width: auto; padding: 15px 40px;">
                    🔄 Retake Quiz
                </button>
            </div>
        `;
        
        const results = document.getElementById('results');
        results.innerHTML = resultsHTML;
        results.classList.add('show');
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}
