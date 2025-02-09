class TestcaseManager {
  constructor(workspaceId) {
    this.init(workspaceId).then(() => {
      document.dispatchEvent(new Event("testcaseListInit"));
    });
  }

  addTestcase(data) {
    apiClient.post("/api/testcases", data, (response) => {
      document.getElementById("testcase-modal").style.display = "none";
      this.testcaseList.push(response);
      document.dispatchEvent(new Event("testcaseListInit"));
    });
  }

  updateTestcase(id, data) {
    apiClient.put(`/api/testcases/${id}`, data, (response) => {
      this.testcaseList.forEach((testcase) => {
        if (testcase.id === id) {
          Object.assign(testcase, response);
        }
      });
      document.dispatchEvent(new Event("testcaseListInit"));
    });
  }

  getTestcaseList() {
    return this.testcaseList;
  }

  deleteTestcase(id) {
    apiClient.delete(`/api/testcases/${id}`, () => {
      this.testcaseList = this.testcaseList.filter(
        (testcase) => testcase["id"] != id
      );
      document.dispatchEvent(new Event("testcaseListInit"));
    });
  }

  async init(workspaceId) {
    try {
      this.testcaseList = await apiClient.get(`/api/testcases`, {
        workspaceId,
      });
    } catch (error) {
      console.error("Error fetching testcase list:", error);
    }
  }
}

class TestcaseView {
  constructor(testcaseManager) {
    this.testcaseManager = testcaseManager;
    this.testcaseStatusMap = Object.freeze({
      NOT_STARTED: `<span class="status-label-bg status-inactive">시작전</span>`,
      IN_PROGRESS: `<span class="status-label-bg status-active">진행중</span>`,
      BLOCKED: `<span class="status-label-bg status-pending">보류</span>`,
      ON_HOLD: `<span class="status-label-bg status-onhold">보류중</span>`,
      COMPLETED: `<span class="status-label-bg status-completed">완료</span>`,
      PASS: `<span class="status-label-bg status-pass">통과</span>`,
    });
    this.$testcaseTableBody = document.getElementById("testcase-table-body");
    this.$testcaseTableBody.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      const action = button.dataset.action;
      const id = button.dataset.id;

      switch (action) {
        case "update":
          testcaseManager.deleteTestcase(id);
          break;
        case "delete":
          testcaseManager.deleteTestcase(id);
          break;
        case "execute":
          location.href = `/testcases/execute?testcaseId=${id}`;
          break;
        default:
          console.log("Other element clicked.");
      }
    });
  }

  getTestcaseRow({
    id,
    name,
    category1,
    category2,
    category3,
    status,
    assignee,
  }) {
    return `<tr>
            <td>${id}</td>
            <td><b>${name}</b></td>
            <td>${category1}</td>
            <td>${category2}</td>
            <td>${category3}</td>
            <td>${this.getStatusLabel(status)}</td>
            <td class="align-center">
              <div class="user-label">
                <span>${assignee}</span>
              </div>
            </td>
            <td>
              <button class="btn btn-execute" data-action="execute" data-id='${id}'><i data-lucide="play"></i> Execute</button>
            </td>
            <td>
              <div class="action-buttons">
                <button class="btn btn-icon btn-primary" data-action="update" data-id='${id}' data-tooltip="Edit">
                  <i data-lucide="edit-2"></i>
                </button>
                <button class="btn btn-icon btn-danger" data-action="delete" data-id='${id}' name="delete-button" data-tooltip="Delete">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </td>
          </tr>`;
  }

  getStatusLabel(status) {
    const statusLabels = {
      NOT_STARTED: this.testcaseStatusMap.NOT_STARTED,
      IN_PROGRESS: this.testcaseStatusMap.IN_PROGRESS,
      BLOCKED: this.testcaseStatusMap.BLOCKED,
      ON_HOLD: this.testcaseStatusMap.ON_HOLD,
      COMPLETED: this.testcaseStatusMap.COMPLETED,
      PASS: this.testcaseStatusMap.PASS,
    };
    return statusLabels[status] || "Unknown Status";
  }

  drawTestcaseList() {
    this.$testcaseTableBody.innerHTML = ``;
    let node = ``;
    this.testcaseManager.getTestcaseList().forEach((testcase) => {
      node += this.getTestcaseRow(testcase);
    });
    this.$testcaseTableBody.insertAdjacentHTML("afterbegin", node);
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const testcaseManager = new TestcaseManager(urlParams.get("workspaceId"));
  const testcaseView = new TestcaseView(testcaseManager);

  const $addTestcaseButton = document.getElementById("add-testcase-button");
  const $testcaseModal = document.getElementById("testcase-modal");
  const $closeModalButton = document.getElementsByClassName("close")[0];
  const $testcaseSubmitButton = document.getElementById(
    "testcase-submit-button"
  );

  lucide.createIcons();
  document.addEventListener("testcaseListInit", () => {
    console.log("callback");
    testcaseView.drawTestcaseList();
  });
  $addTestcaseButton.addEventListener("click", () => {
    $testcaseModal.style.display = "block";
  });

  $closeModalButton.addEventListener("click", () => {
    $testcaseModal.style.display = "none";
  });

  $testcaseSubmitButton.addEventListener("click", () => {
    const name = document.getElementById("testcase-name").value;
    const category1 = document.getElementById("category1").value;
    const category2 = document.getElementById("category2").value;
    const category3 = document.getElementById("category3").value;
    const assignee = document.getElementById("testcase-assignee").value;
    const explanation = document.getElementById("testcase-explanation").value;
    const link = document.getElementById("testcase-link").value;
    const url = new URL(window.location);
    const workspaceId = url.searchParams.get("workspaceId");
    const data = {
      name,
      category1,
      category2,
      category3,
      assignee,
      explanation,
      link,
      url,
      workspaceId,
    };
    testcaseManager.addTestcase(data);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const category1 = document.getElementById("category1");
  const category2 = document.getElementById("category2");
  const category3 = document.getElementById("category3");
  const selectedCategoriesDisplay = document.getElementById(
    "selectedCategoriesDisplay"
  );

  // 카테고리 데이터 (실제 사용 시 서버에서 가져오거나 더 큰 데이터셋을 사용해야 합니다)
  const categoriesData = {
    개발: {
      웹: ["프론트엔드", "백엔드", "풀스택"],
      모바일: ["iOS", "Android", "크로스플랫폼"],
      데이터: ["데이터 분석", "머신러닝", "빅데이터"],
    },
    디자인: {
      그래픽: ["로고", "브랜딩", "일러스트레이션"],
      "UI/UX": ["웹 디자인", "앱 디자인", "프로토타이핑"],
      "3D": ["모델링", "애니메이션", "렌더링"],
    },
    마케팅: {
      디지털: ["소셜 미디어", "콘텐츠 마케팅", "SEO"],
      브랜드: ["브랜드 전략", "브랜드 아이덴티티", "브랜드 관리"],
      광고: ["온라인 광고", "오프라인 광고", "통합 마케팅"],
    },
  };

  // 1차 카테고리 옵션 추가
  Object.keys(categoriesData).forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    category1.appendChild(option);
  });

  // 1차 카테고리 선택 시 이벤트
  category1.addEventListener("change", function () {
    category2.innerHTML = '<option value="">선택해주세요</option>';
    category3.innerHTML = '<option value="">선택해주세요</option>';
    category3.disabled = true;

    if (this.value) {
      category2.disabled = false;
      Object.keys(categoriesData[this.value]).forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        category2.appendChild(option);
      });
    } else {
      category2.disabled = true;
    }
  });

  // 2차 카테고리 선택 시 이벤트
  category2.addEventListener("change", function () {
    category3.innerHTML = '<option value="">선택해주세요</option>';

    if (this.value) {
      category3.disabled = false;
      categoriesData[category1.value][this.value].forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        category3.appendChild(option);
      });
    } else {
      category3.disabled = true;
    }
  });
});

function setupAutocomplete(inputId, suggestionsId, data) {
  const input = document.getElementById(inputId);
  const suggestions = document.getElementById(suggestionsId);

  input.addEventListener("keydown", function () {
    const value = this.value.toLowerCase();
    suggestions.innerHTML = "";
    suggestions.style.display = "none";

    if (value.length > 0) {
      const matches = data.filter((item) => item.toLowerCase().includes(value));
      if (matches.length > 0) {
        matches.forEach((match) => {
          const div = document.createElement("div");
          div.textContent = match;
          div.addEventListener("click", () => {
            input.value = match;
            suggestions.style.display = "none";
          });
          suggestions.appendChild(div);
        });
        suggestions.style.display = "block";
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target !== input && e.target !== suggestions) {
      suggestions.style.display = "none";
    }
  });
}
const assignees = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Williams"];

document.addEventListener("DOMContentLoaded", () => {
  setupAutocomplete("testcase-assignee", "assignee-suggestions", assignees);
});
