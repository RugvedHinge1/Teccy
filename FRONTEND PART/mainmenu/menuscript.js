    function showCard(topic) {
      // Hide all cards first
      const allCards = document.querySelectorAll('.card');
      allCards.forEach(card => card.style.display = 'none');

      const topicKey = topic.toLowerCase();

      // Check for diagnosed level
      // This key matches what diagnosis.html saves: localStorage.setItem('userDiagnosedLevel_' + selectedTopic, diagnosedLevel);
      const level = localStorage.getItem('userDiagnosedLevel_' + topicKey);

      const diagnosisCard = document.getElementById(`card-diagnosis-${topicKey}`);
      const practiceCard = document.getElementById(`card-practice-${topicKey}`);
      const levelBadge = document.getElementById(`level-badge-${topicKey}`);

      if (level && practiceCard) {
        // User has already diagnosed: Show Practice Hub
        practiceCard.style.display = 'block';
        if (levelBadge) {
          levelBadge.textContent = 'Level: ' + level;
          // Optional: Color code level
          if (level === 'Beginner') levelBadge.style.backgroundColor = '#28a745'; // Green
          else if (level === 'Intermediate') levelBadge.style.backgroundColor = '#ffc107'; // Yellow
          else if (level === 'Pro') levelBadge.style.backgroundColor = '#dc3545'; // Red
        }
      } else if (diagnosisCard) {
        // No diagnosis yet: Show Start Diagnosis
        diagnosisCard.style.display = 'block';
      }
    }

    // default topic
    showCard('Algebra');

    let currentLevelStep = 'current'; // 'current' or 'target'
    let selectedCurrentLevel = null;
    let selectedTargetLevel = null;
    const levels = ['Beginner', 'Intermediate', 'Pro'];

    function initLevelModal() {
      const modal = document.getElementById('levelModal');
      const hasLevels = localStorage.getItem('userCurrentLevel') && localStorage.getItem('userTargetLevel');

      if (!hasLevels) {
        modal.classList.add('show');
        renderLevelButtons();
      }
    }

    function renderLevelButtons() {
      const container = document.getElementById('levelButtons');
      container.innerHTML = '';

      levels.forEach(level => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.textContent = level;
        btn.onclick = () => selectLevel(level);
        container.appendChild(btn);
      });
    }

    function selectLevel(level) {
      const buttons = document.querySelectorAll('.level-btn');
      buttons.forEach(btn => btn.classList.remove('selected'));

      event.target.classList.add('selected');

      if (currentLevelStep === 'current') {
        selectedCurrentLevel = level;
      } else {
        selectedTargetLevel = level;
      }

      document.getElementById('nextLevelBtn').disabled = false;
    }

    function nextLevelStep() {
      if (currentLevelStep === 'current') {
        currentLevelStep = 'target';
        document.getElementById('modalTitle').textContent = 'What level would you like to reach?';
        document.getElementById('modalDescription').textContent = 'Select your target skill level';
        document.getElementById('nextLevelBtn').textContent = 'Start Learning';
        document.getElementById('nextLevelBtn').disabled = true;
        selectedCurrentLevel = null;
        renderLevelButtons();
      } else {
        // Save to localStorage
        localStorage.setItem('userCurrentLevel', selectedCurrentLevel);
        localStorage.setItem('userTargetLevel', selectedTargetLevel);
        document.getElementById('levelModal').classList.remove('show');
      }
    }

    function startPractice(topic) {
      // 1. Try to get specific topic diagnosed level (e.g., 'userDiagnosedLevel_algebra')
      // 2. Fallback to overall diagnosed level ('userDiagnosedLevel')
      // 3. Fallback to self-assessed level ('userCurrentLevel')
      // 4. Default to 'Beginner'

      const topicKey = topic.toLowerCase();
      const specificLevel = localStorage.getItem('userDiagnosedLevel_' + topicKey);
      const overallLevel = localStorage.getItem('userDiagnosedLevel');
      const selfLevel = localStorage.getItem('userCurrentLevel');

      const level = specificLevel || overallLevel || selfLevel || 'Beginner';

      const url = `http://localhost:8501/?topic=${topic}&level=${level}`;
      window.open(url, '_blank');
    }

    document.getElementById('nextLevelBtn').addEventListener('click', nextLevelStep);

    // Initialize on page load
    window.addEventListener('load', initLevelModal);

    