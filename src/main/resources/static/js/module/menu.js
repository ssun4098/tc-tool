document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle")
    const menuToggleIcon = document.getElementById("menu-toggle-icon")
    const navbar = document.querySelector(".navbar")
    const itemList = document.getElementById("item-list")
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
    const navItems = document.querySelectorAll(".nav-list > li:not(.dropdown)")

    lucide.createIcons()

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("collapsed")
        const isCollapsed = navbar.classList.contains("collapsed")
        document.getElementById("menu-toggle-icon").setAttribute("data-lucide", isCollapsed ? "chevron-right" : "chevron-left")
        setTimeout(() => {
            lucide.createIcons();
        }, 1);
    })

      navItems.forEach((item) => {
        item.addEventListener("click", () => {
          navItems.forEach((navItem) => navItem.classList.remove("active"))
          item.classList.add("active")
        })
      })

        // Event listeners for dropdown toggles
    dropdownToggles.forEach((toggle) => {
          toggle.addEventListener("click", (e) => {
            e.preventDefault()
            const parent = toggle.parentElement
            parent.classList.toggle("active")
            const dropdownIcon = toggle.querySelector(".dropdown-icon")
            dropdownIcon.setAttribute("data-lucide", parent.classList.contains("active") ? "chevron-up" : "chevron-down")
            lucide.createIcons()
          })
    })
})