document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const searchInput = document.querySelector(".search-input");
  const clearSearchBtn = document.querySelector(".clear-search-btn");
  const table = document.querySelector(".custom-table");
  const sortableHeaders = document.querySelectorAll(
    ".custom-table th.sortable"
  );
  const filterableHeaders = document.querySelectorAll(
    ".custom-table th.filterable"
  );
  const addTestcase = document.getElementById("add-testcase");
  const modal = document.getElementById("testcase-modal");

  addTestcase.addEventListener("click", () => (modal.style.display = "block"));

  // Sorting functionality
  sortableHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const sortBy = header.getAttribute("data-sort");
      const isAsc = header.classList.contains("asc");

      sortableHeaders.forEach((h) => h.classList.remove("asc", "desc"));
      header.classList.add(isAsc ? "desc" : "asc");

      sortTable(sortBy, !isAsc);
    });
  });

  // Filtering functionality
  filterableHeaders.forEach((header) => {
    const filterIcon = header.querySelector(".filter-icon");
    filterIcon.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent sorting when clicking on filter icon
      showFilterDropdown(header);
    });
  });

  // Search functionality
  searchInput.addEventListener("input", performSearch);
  clearSearchBtn.addEventListener("click", clearSearch);

  function sortTable(sortBy, ascending) {
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));

    rows.sort((a, b) => {
      const aValue = a.querySelector(
        `td:nth-child(${getColumnIndex(sortBy)})`
      ).textContent;
      const bValue = b.querySelector(
        `td:nth-child(${getColumnIndex(sortBy)})`
      ).textContent;

      if (sortBy === "id") {
        return ascending ? aValue - bValue : bValue - aValue;
      } else {
        return ascending
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });

    tbody.append(...rows);
  }

  function getColumnIndex(columnName) {
    const headers = Array.from(table.querySelectorAll("th"));
    return (
      headers.findIndex(
        (header) => header.getAttribute("data-sort") === columnName
      ) + 1
    );
  }

  function showFilterDropdown(header) {
    const existingDropdown = document.querySelector(".filter-dropdown");
    if (existingDropdown) {
      existingDropdown.remove();
    }

    const filterBy = header.getAttribute("data-filter");
    const columnIndex = getColumnIndex(filterBy);
    const uniqueValues = getUniqueValues(columnIndex);

    const dropdownTemplate = document.getElementById(
      "filter-dropdown-template"
    );
    const dropdown = dropdownTemplate.content
      .cloneNode(true)
      .querySelector(".filter-dropdown");

    const optionsContainer = dropdown.querySelector(".filter-options");
    uniqueValues.forEach((value) => {
      const option = document.createElement("div");
      option.classList.add("filter-option");
      option.innerHTML = `
                    <input type="checkbox" id="${value}" value="${value}">
                    <label for="${value}">${value}</label>
                `;
      optionsContainer.appendChild(option);
    });

    const applyFilterBtn = dropdown.querySelector(".btn-apply-filter");
    applyFilterBtn.addEventListener("click", () => applyFilter(columnIndex));

    const clearFilterBtn = dropdown.querySelector(".btn-clear-filter");
    clearFilterBtn.addEventListener("click", () => clearFilter(columnIndex));

    header.appendChild(dropdown);

    // Close dropdown when clicking outside
    document.addEventListener("click", closeFilterDropdown);
  }

  function getUniqueValues(columnIndex) {
    const values = new Set();
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const cell = row.querySelector(`td:nth-child(${columnIndex})`);
      values.add(cell.textContent.trim());
    });
    return Array.from(values);
  }

  function applyFilter(columnIndex) {
    const checkedValues = Array.from(
      document.querySelectorAll(".filter-option input:checked")
    ).map((checkbox) => checkbox.value);

    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const cell = row.querySelector(`td:nth-child(${columnIndex})`);
      const value = cell.textContent.trim();
      row.style.display = checkedValues.includes(value) ? "" : "none";
    });

    closeFilterDropdown();
  }

  function clearFilter(columnIndex) {
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      row.style.display = "";
    });

    closeFilterDropdown();
  }

  function closeFilterDropdown(event) {
    if (event && event.target.closest(".filter-dropdown")) return;
    const dropdown = document.querySelector(".filter-dropdown");
    if (dropdown) {
      dropdown.remove();
    }
    document.removeEventListener("click", closeFilterDropdown);
  }

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = table.querySelectorAll("tbody tr");

    rows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? "" : "none";
    });

    updateClearSearchButtonVisibility();
  }

  function clearSearch() {
    searchInput.value = "";
    const rows = table.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      row.style.display = "";
    });
    updateClearSearchButtonVisibility();
  }

  function updateClearSearchButtonVisibility() {
    clearSearchBtn.style.display = searchInput.value ? "block" : "none";
  }
});
