document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.querySelector(".notes-container");
    const createBtn = document.querySelector(".btn");

    // Load notes from local storage
    function showNotes() {
        notesContainer.innerHTML = localStorage.getItem("notes") || "";
    }

    // Update local storage with current notes
    function updateStorage() {
        localStorage.setItem("notes", notesContainer.innerHTML);
    }

    // Initialize the app
    showNotes();

    // Create a new note
    createBtn.addEventListener("click", () => {
        const inputBox = document.createElement("p");
        const deleteIcon = document.createElement("i");
        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable", "true");
        deleteIcon.className = "fa-solid fa-trash-arrow-up";

        inputBox.appendChild(deleteIcon);

        notesContainer.appendChild(inputBox);

        updateStorage();
    });

    // Handle click events in the notes container
    notesContainer.addEventListener("click", (e) => {
        console.log(e.target.tagName);
        if (e.target.tagName === "I") {
            e.target.parentElement.remove();
            updateStorage();
        }
    });

    // Handle keyup events to save notes
    notesContainer.addEventListener("keyup", (e) => {
        if (e.target.classList.contains("input-box")) {
            updateStorage();
        }
    });

    // Prevent default behavior for Enter key and insert line break instead
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            document.execCommand("insertLineBreak");
            event.preventDefault();
        }
    });
});
