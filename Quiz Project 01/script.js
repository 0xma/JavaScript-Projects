class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.total = questions.length;
        this.index = 0;
        this.correct = 0;
        this.wrong = 0;
        this.quesBox = document.getElementById("quesBox");
        this.optionInputs = document.querySelectorAll(".options");
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.index === this.total) {
            return this.endQuiz();
        }
        this.resetOptions();
        const data = this.questions[this.index];
        this.quesBox.innerText = `${this.index + 1}. ${data.question}`;
        this.optionInputs.forEach((input) => {
            const label = input.nextElementSibling;
            label.innerText = data[input.value];
        });
    }

    submitQuiz() {
        const selectedAnswer = this.getSelectedAnswer();

        if (selectedAnswer) {
            const correctAnswer = this.questions[this.index].correct;
            selectedAnswer === correctAnswer ? this.correct++ : this.wrong++;
            this.index++;
            this.loadQuestion();
        } else {
            alert("Please select an answer before submitting.");
        }
    }

    getSelectedAnswer() {
        return [...this.optionInputs].find(input => input.checked)?.value;
    }

    resetOptions() {
        this.optionInputs.forEach(input => {
            input.checked = false;
        });
    }

    endQuiz() {
        document.getElementById("box").innerHTML = `
            <div style="text-align: center">
                <h3>Thank you for playing the quiz</h3>
                <h2>${this.correct} / ${this.total} are correct</h2>
            </div>
        `;
    }
}

// Initialize the quiz
document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            "question": "Which of the following is considered a passive reconnaissance action?",
            "a": "Searching through the local paper",
            "b": "Calling Human Resources",
            "c": "Using the nmap -sT command",
            "d": "Conducting a man-in-the-middle attack",
            "correct": "a",
        },
        {
            "question": "Which encryption was selected by NIST as the principal method for providing confidentiality after the DES algorithm?",
            "a": "3DES",
            "b": "Twofish",
            "c": "RC4",
            "d": "AES",
            "correct": "d",
        },
        {
            "question": "What tool is able to conduct a man-in-the-Middle Attack on an 802.3 environment?",
            "a": "Ettercap",
            "b": "Cain & Abel",
            "c": "Wireshark",
            "d": "Nmap",
            "correct": "b",
        },
        {
            "question": "What is the difference between a traditional firewall and an IPS?",
            "a": "Firewalls do not generate logs",
            "b": "IPS cannot drop packets",
            "c": "IPS does not follow rules",
            "d": "IPS can dissect packets",
            "correct": "d",
        },
        {
            "question": "Why is it important to scan your target network slowly?",
            "a": "To avoid alerting the IDS",
            "b": "It is not necessary to scan the network slowly",
            "c": "To evade the firewall",
            "d": "Services may not have started, so starting slowly ensures that you capture services that started late.",
            "correct": "a",
        }
    ];

    const quiz = new Quiz(questions);

    document.querySelector('button').addEventListener('click', () => quiz.submitQuiz());
});
