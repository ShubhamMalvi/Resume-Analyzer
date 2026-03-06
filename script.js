document.getElementById("resumeForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const fileInput = document.getElementById("resumeFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a file.");
        return;
    }

    // Check file type
    if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        fileInput.value = "";
        return;
    }

    const formData = new FormData();
    const jobDesc = document.getElementById("jobDesc").value;

    formData.append("resume", file);
    formData.append("jobDesc", jobDesc);

    fetch("/api/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log("Server Response:", data); 
        localStorage.setItem("result", JSON.stringify(data));
        window.location.href = "result.html";
    })
    .catch(err => console.error(err));

});