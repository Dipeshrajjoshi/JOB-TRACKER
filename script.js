// ===============================
// LOAD DATA (AUTO-SAVE)
// ===============================
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

const jobList = document.getElementById("jobList");

// ===============================
// SAVE TO LOCAL STORAGE
// ===============================
function saveToStorage() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

// ===============================
// RENDER TABLE (LIVE CSV VIEW)
// ===============================
function renderJobs() {
  jobList.innerHTML = "";

  const statusFilter = filterStatus.value;
  const roleFilter = filterRole.value;

  jobs
    .filter(j => !statusFilter || j.status === statusFilter)
    .filter(j => !roleFilter || j.type === roleFilter)
    .forEach((job, index) => {
      jobList.innerHTML += `
        <tr>
          <td>${job.company}</td>
          <td>${job.role}</td>
          <td>${job.type}</td>
          <td>
            <select
              class="status-${job.status}"
              onchange="updateStatus(${index}, this.value, this)"
            >
              <option ${job.status === "Applied" ? "selected" : ""}>Applied</option>
              <option ${job.status === "Interview" ? "selected" : ""}>Interview</option>
              <option ${job.status === "Rejected" ? "selected" : ""}>Rejected</option>
              <option ${job.status === "Offer" ? "selected" : ""}>Offer</option>
            </select>
          </td>
          <td>${job.date}</td>
          <td>
            <a href="${job.resume}" target="_blank">View</a>
          </td>
          <td class="delete" onclick="deleteJob(${index})">Delete</td>
        </tr>
      `;
    });

  saveToStorage();
}

// ===============================
// ADD NEW JOB
// ===============================
document.getElementById("jobForm").addEventListener("submit", function (e) {
  e.preventDefault();

  jobs.push({
    company: company.value,
    role: role.value,
    type: roleType.value,
    status: status.value,
    date: date.value,
    resume: resume.value
  });

  this.reset();
  renderJobs();
});

// ===============================
// UPDATE STATUS (INLINE EDIT)
// ===============================
function updateStatus(index, newStatus, selectEl) {
  jobs[index].status = newStatus;

  // Update color class dynamically
  selectEl.className = `status-${newStatus}`;

  saveToStorage();
}

// ===============================
// DELETE JOB
// ===============================
function deleteJob(index) {
  jobs.splice(index, 1);
  renderJobs();
}

// ===============================
// EXPORT CSV (UPDATED SNAPSHOT)
// ===============================
function exportCSV() {
  let csv = "Company,Role,Type,Status,Date,Resume\n";

  jobs.forEach(j => {
    csv += `${j.company},${j.role},${j.type},${j.status},${j.date},${j.resume}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "job_applications.csv";
  link.click();
}

// ===============================
// IMPORT CSV (MERGE, NOT REPLACE)
// ===============================
csvInput.addEventListener("change", function () {
  const reader = new FileReader();

  reader.onload = e => {
    const importedJobs = e.target.result
      .split("\n")
      .slice(1)
      .filter(l => l.trim())
      .map(line => {
        const [company, role, type, status, date, resume] = line.split(",");
        return { company, role, type, status, date, resume };
      });

    jobs = [...jobs, ...importedJobs];
    renderJobs();
  };

  reader.readAsText(this.files[0]);
});

// ===============================
// FILTERS
// ===============================
filterStatus.onchange = renderJobs;
filterRole.onchange = renderJobs;

// ===============================
// INITIAL LOAD
// ===============================
renderJobs();
