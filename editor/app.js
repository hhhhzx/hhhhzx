const defaultConfig = {
  profile: {
    username: "hhhhzx",
    title: "👋 Hi, I'm hhhhzx",
    subtitle: "热爱前端体验，也喜欢把后端逻辑打磨得可靠一点",
    badges: [
      {
        label: "Profile views",
        src: "https://komarev.com/ghpvc/?username=hhhhzx&label=Profile%20views&color=0e75b6&style=flat",
        alt: "profile views"
      },
      {
        label: "Focus Full Stack",
        src: "https://img.shields.io/badge/Focus-Full%20Stack-7c3aed?style=flat-square",
        alt: "focus"
      },
      {
        label: "Love Coding & Games",
        src: "https://img.shields.io/badge/Love-Coding%20%26%20Games-ff69b4?style=flat-square",
        alt: "love"
      }
    ],
    typingSvg: "https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1200&color=36BCF7&center=true&vCenter=true&width=640&lines=Vue+%2F+React+%2F+Spring+Boot;Keep+building%2C+keep+learning;Make+ideas+visible+with+code"
  },
  about: [
    "🔭 目前关注：前端工程化、全栈项目实践、交互体验优化",
    "🌱 正在学习：React 生态、Java 后端、接口设计与性能优化",
    "💬 可以聊聊：Vue / React / TypeScript / Spring Boot / 项目从 0 到 1",
    "🎮 兴趣爱好：游戏、折腾工具、把脑子里的点子做成能跑起来的东西",
    "✨ 小目标：写更清晰的代码，做更有温度的产品"
  ],
  contacts: [
    {
      label: "GitHub-hhhhzx",
      href: "https://github.com/hhhhzx",
      badge: "https://img.shields.io/badge/GitHub-hhhhzx-181717?style=for-the-badge&logo=github",
      alt: "GitHub profile"
    },
    {
      label: "Repositories-Projects",
      href: "https://github.com/hhhhzx?tab=repositories",
      badge: "https://img.shields.io/badge/Repositories-Projects-2563EB?style=for-the-badge&logo=github",
      alt: "GitHub repositories"
    },
    {
      label: "Message-Issue",
      href: "https://github.com/hhhhzx/hhhhzx/issues",
      badge: "https://img.shields.io/badge/Message-Issue-22C55E?style=for-the-badge&logo=github",
      alt: "Leave a message"
    }
  ],
  skills: [
    { title: "Frontend", icons: "vue,react,ts,js,vite,pinia,html,css", alt: "frontend skills" },
    { title: "Backend & Database", icons: "java,spring,mysql,redis,nodejs", alt: "backend skills" },
    { title: "Tools", icons: "git,github,docker,kubernetes,vim,vscode,androidstudio", alt: "tools" }
  ],
  dynamicShowcase: {
    enabled: true,
    src: "./assets/profile-animation.svg",
    alt: "animated developer card",
    width: "92%"
  },
  githubData: {
    activityGraph: {
      enabled: true,
      src: "https://github-readme-activity-graph.vercel.app/graph?username=hhhhzx&theme=tokyo-night&hide_border=true&area=true",
      alt: "GitHub activity graph"
    }
  },
  contributionSnake: {
    enabled: true,
    light: "https://raw.githubusercontent.com/hhhhzx/hhhhzx/output/github-contribution-grid-snake.svg",
    dark: "https://raw.githubusercontent.com/hhhhzx/hhhhzx/output/github-contribution-grid-snake-dark.svg",
    alt: "github contribution grid snake animation"
  },
  directions: [
    { name: "前端应用", keywords: "Vue3 / React / TypeScript / Vite", focus: "组件设计、状态管理、页面性能与工程化" },
    { name: "后端服务", keywords: "Spring Boot / Java / MySQL / Redis", focus: "接口设计、数据建模、缓存与稳定性" },
    { name: "DevOps & Tools", keywords: "Git / Docker / GitHub Actions", focus: "自动化流程、部署体验、开发效率" }
  ],
  projects: [
    {
      name: "hhhhzx",
      url: "https://github.com/hhhhzx/hhhhzx",
      description: "当前 GitHub Profile 仓库，用来展示个人主页、贡献动画和技术栈信息",
      tech: "Markdown / SVG / GitHub Actions"
    },
    {
      name: "更多项目",
      url: "https://github.com/hhhhzx?tab=repositories",
      description: "持续整理学习项目、前端练习、全栈实践和工具实验",
      tech: "Vue / React / Java / Spring Boot"
    },
    {
      name: "Coming Soon",
      url: "",
      description: "这里可以放你最想展示的 1～3 个项目，我可以继续帮你改成更像作品集的卡片",
      tech: "项目亮点 / 在线预览 / 技术方案"
    }
  ],
  goals: [
    "把项目 README 写得像产品说明书一样清楚",
    "多沉淀可复用组件、工具函数和实践笔记",
    "用更稳定的方式管理项目结构、接口文档和部署流程"
  ],
  footer: {
    title: "Thanks for visiting!",
    lines: ["愿代码保持清醒，愿灵感准时上线。", "如果你也喜欢把想法做成作品，欢迎一起交流。"]
  }
};

let config = structuredClone(defaultConfig);
const skillIconIds = Array.isArray(window.SKILL_ICON_IDS) ? window.SKILL_ICON_IDS : [];

const $ = (selector) => document.querySelector(selector);
const badgesList = $("#badgesList");
const skillsList = $("#skillsList");
const aboutList = $("#aboutList");
const contactsList = $("#contactsList");
const projectsList = $("#projectsList");
const output = $("#output");
const status = $("#status");
const form = $("#profileForm");
const projectCount = $("#projectCount");
const contactCount = $("#contactCount");
const aboutCount = $("#aboutCount");
const badgeCount = $("#badgeCount");
const skillCount = $("#skillCount");
const readmeLines = $("#readmeLines");

function mdText(value = "") {
  return String(value).replace(/\|/g, "\\|").trim();
}

function mdLink(label, url) {
  return url ? `[${mdText(label)}](${url})` : mdText(label);
}

function join(items = []) {
  return items.filter((item) => item !== undefined && item !== null).join("\n");
}

function section(title, body) {
  return body?.trim() ? `## ${title}\n\n${body.trim()}` : "";
}

function renderReadme(c) {
  const badges = c.profile.badges.map((badge) => `  <img src="${badge.src}" alt="${badge.alt}" />`).join("\n");
  const contacts = c.contacts.map((item) => join([
    `<a href="${item.href}">`,
    `  <img src="${item.badge}" alt="${item.alt}" />`,
    "</a>"
  ])).join("\n");

  const skills = c.skills.map((group) => join([
    `### ${group.title}`,
    "",
    "<p>",
    `  <img src="https://skillicons.dev/icons?i=${group.icons}" alt="${group.alt}" />`,
    "</p>"
  ])).join("\n\n");

  return `${join([
    "<!--",
    "  This README is generated from profile.config.json.",
    "  Edit the config or use editor/index.html, then run: node tools/generate-readme.js",
    "-->",
    "",
    "<div align=\"center\">",
    "",
    `# ${c.profile.title}`,
    "",
    `### ${c.profile.subtitle}`,
    "",
    "<p>",
    badges,
    "</p>",
    "",
    c.profile.typingSvg ? `<img src="${c.profile.typingSvg}" alt="typing intro" />` : "",
    "",
    "</div>",
    "",
    "---",
    "",
    section("🧭 关于我", c.about.map((item) => `- ${item}`).join("\n")),
    "",
    section("📫 联系我", join(["<div align=\"center\">", "", contacts, "", "</div>"])),
    "",
    section("🛠️ 技术栈", join(["<div align=\"center\">", "", skills, "", "</div>"])),
    "",
    c.dynamicShowcase.enabled ? section("✨ 动态展示", join([
      "<div align=\"center\">",
      "",
      `<img src="${c.dynamicShowcase.src}" alt="${c.dynamicShowcase.alt}" width="${c.dynamicShowcase.width}" />`,
      "",
      "</div>"
    ])) : "",
    "",
    c.githubData.activityGraph.enabled ? section("📊 GitHub 数据", join([
      "<div align=\"center\">",
      "",
      `<img src="${c.githubData.activityGraph.src}" alt="${c.githubData.activityGraph.alt}" />`,
      "",
      "</div>"
    ])) : "",
    "",
    c.contributionSnake.enabled ? section("🐍 贡献图", join([
      "<div align=\"center\">",
      "",
      "<picture>",
      `  <source media="(prefers-color-scheme: dark)" srcset="${c.contributionSnake.dark}" />`,
      `  <source media="(prefers-color-scheme: light)" srcset="${c.contributionSnake.light}" />`,
      `  <img alt="${c.contributionSnake.alt}" src="${c.contributionSnake.light}" />`,
      "</picture>",
      "",
      "</div>"
    ])) : "",
    "",
    section("🚀 项目方向", join([
      "| 方向 | 技术关键词 | 我在关注什么 |",
      "| --- | --- | --- |",
      ...c.directions.map((item) => `| ${mdText(item.name)} | ${mdText(item.keywords)} | ${mdText(item.focus)} |`)
    ])),
    "",
    section("🚩 代表项目", join([
      "| 项目 | 简介 | 技术栈 / 关键词 |",
      "| --- | --- | --- |",
      ...c.projects.map((item) => `| ${mdLink(item.name, item.url)} | ${mdText(item.description)} | ${mdText(item.tech)} |`)
    ])),
    "",
    section("🌟 最近想做得更好的事", c.goals.map((item) => `- ${item}`).join("\n")),
    "",
    "---",
    "",
    "<div align=\"center\">",
    "",
    `### ${c.footer.title}`,
    "",
    c.footer.lines.join("  \n"),
    "",
    "</div>"
  ])}\n`;
}

function escapeAttr(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function input(name, value, placeholder = "") {
  return `<input data-field="${name}" value="${escapeAttr(value)}" placeholder="${escapeAttr(placeholder)}" />`;
}

function parseIconIds(value = "") {
  return [...new Set(String(value)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean))];
}

function skillIconUrl(icons = "") {
  return `https://skillicons.dev/icons?i=${parseIconIds(icons).join(",")}`;
}

function renderSkillPicker(item, index) {
  const selected = new Set(parseIconIds(item.icons));
  const options = skillIconIds.map((id) => `
    <label class="icon-option" data-icon-id="${id}">
      <input type="checkbox" data-skill-option value="${id}" ${selected.has(id) ? "checked" : ""} />
      <span>${id}</span>
    </label>
  `).join("");

  return `
    <div class="skill-helper">
      <div class="skill-preview">
        <span>图片预览</span>
        <img src="${skillIconUrl(item.icons)}" alt="${escapeAttr(item.alt || item.title || "skills preview")}" />
      </div>
      <div class="skill-url">
        <span>生成链接</span>
        <code>${skillIconUrl(item.icons)}</code>
      </div>
      <input class="icon-search" data-icon-search placeholder="搜索 Icon ID，例如 docker / vue / androidstudio" />
      <div class="selected-icons">${parseIconIds(item.icons).map((id) => `<span>${id}</span>`).join("") || "<em>未选择图标</em>"}</div>
      <div class="icon-options" data-skill-options="${index}">
        ${options}
      </div>
    </div>
  `;
}

function syncSkillItemVisuals(item, iconsValue) {
  const selectedIds = parseIconIds(iconsValue);
  const selected = new Set(selectedIds);
  const preview = item.querySelector(".skill-preview img");
  const url = item.querySelector(".skill-url code");
  const selectedBox = item.querySelector(".selected-icons");

  item.querySelectorAll("[data-skill-option]").forEach((checkbox) => {
    checkbox.checked = selected.has(checkbox.value);
  });

  if (preview) preview.src = skillIconUrl(iconsValue);
  if (url) url.textContent = skillIconUrl(iconsValue);
  if (selectedBox) {
    selectedBox.innerHTML = selectedIds.map((id) => `<span>${id}</span>`).join("") || "<em>未选择图标</em>";
  }
}

function setStatus(message) {
  status.textContent = message;
}

function renderList() {
  form.title.value = config.profile.title;
  form.subtitle.value = config.profile.subtitle;
  form.typingSvg.value = config.profile.typingSvg;

  badgesList.innerHTML = config.profile.badges.map((item, index) => `
    <div class="item" data-type="badge" data-index="${index}">
      <div class="row">
        ${input("label", item.label, "标签名称，例如 Focus Full Stack")}
        ${input("alt", item.alt, "图片说明")}
      </div>
      ${input("src", item.src, "徽章图片地址，例如 shields.io 链接")}
      <button type="button" data-remove>删除</button>
    </div>
  `).join("");

  skillsList.innerHTML = config.skills.map((item, index) => `
    <div class="item" data-type="skill" data-index="${index}">
      <div class="row">
        ${input("title", item.title, "分组标题，例如 Frontend")}
        ${input("alt", item.alt, "图片说明")}
      </div>
      ${input("icons", item.icons, "图标 ID，用英文逗号分隔，例如 vue,react,ts")}
      ${renderSkillPicker(item, index)}
      <button type="button" data-remove>删除</button>
    </div>
  `).join("");

  aboutList.innerHTML = config.about.map((item, index) => `
    <div class="item" data-type="about" data-index="${index}">
      ${input("value", item, "关于我的一行内容")}
      <button type="button" data-remove>删除</button>
    </div>
  `).join("");

  contactsList.innerHTML = config.contacts.map((item, index) => `
    <div class="item" data-type="contact" data-index="${index}">
      <div class="row">
        ${input("label", item.label, "按钮名称")}
        ${input("href", item.href, "链接")}
      </div>
      ${input("badge", item.badge, "徽章图片链接")}
      ${input("alt", item.alt, "图片说明")}
      <button type="button" data-remove>删除</button>
    </div>
  `).join("");

  projectsList.innerHTML = config.projects.map((item, index) => `
    <div class="item" data-type="project" data-index="${index}">
      <div class="row">
        ${input("name", item.name, "项目名")}
        ${input("url", item.url, "项目链接")}
      </div>
      ${input("description", item.description, "简介")}
      ${input("tech", item.tech, "技术栈")}
      <button type="button" data-remove>删除</button>
    </div>
  `).join("");

  updateOutput();
}

function updateFromDom(event) {
  const target = event.target;
  if (!target.matches("input")) return;
  if (target.matches("[data-skill-option], [data-icon-search]")) return;

  config.profile.title = form.title.value;
  config.profile.subtitle = form.subtitle.value;
  config.profile.typingSvg = form.typingSvg.value;

  const item = target.closest(".item");
  if (item) {
    const index = Number(item.dataset.index);
    const field = target.dataset.field;
    if (item.dataset.type === "badge") config.profile.badges[index][field] = target.value;
    if (item.dataset.type === "skill") {
      config.skills[index][field] = target.value;
      if (field === "icons") syncSkillItemVisuals(item, target.value);
    }
    if (item.dataset.type === "about") config.about[index] = target.value;
    if (item.dataset.type === "contact") config.contacts[index][field] = target.value;
    if (item.dataset.type === "project") config.projects[index][field] = target.value;
  }

  updateOutput();
}

function updateOutput() {
  output.value = renderReadme(config);
  projectCount.textContent = config.projects.length;
  contactCount.textContent = config.contacts.length;
  aboutCount.textContent = config.about.length;
  badgeCount.textContent = config.profile.badges.length;
  skillCount.textContent = config.skills.length;
  readmeLines.textContent = output.value.split("\n").length;
  setStatus("Updated");
}

function download(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener("click", async (event) => {
  const add = event.target.dataset.add;
  if (add === "badge") config.profile.badges.push({
    label: "New Badge",
    src: "https://img.shields.io/badge/New-Badge-38BDF8?style=flat-square",
    alt: "new badge"
  });
  if (add === "skill") config.skills.push({
    title: "New Skills",
    icons: "vue,react,ts",
    alt: "new skills"
  });
  if (add === "about") config.about.push("✨ 新增内容");
  if (add === "contact") config.contacts.push({
    label: "New Contact",
    href: "https://github.com/hhhhzx",
    badge: "https://img.shields.io/badge/New-Contact-38BDF8?style=for-the-badge",
    alt: "New contact"
  });
  if (add === "project") config.projects.push({
    name: "New Project",
    url: "",
    description: "项目简介",
    tech: "技术栈"
  });
  if (add) {
    renderList();
    setStatus("Added");
  }

  if (event.target.matches("[data-remove]")) {
    const item = event.target.closest(".item");
    const index = Number(item.dataset.index);
    if (item.dataset.type === "badge") config.profile.badges.splice(index, 1);
    if (item.dataset.type === "skill") config.skills.splice(index, 1);
    if (item.dataset.type === "about") config.about.splice(index, 1);
    if (item.dataset.type === "contact") config.contacts.splice(index, 1);
    if (item.dataset.type === "project") config.projects.splice(index, 1);
    renderList();
    setStatus("Removed");
  }

  if (event.target.id === "loadSample") {
    config = structuredClone(defaultConfig);
    renderList();
    setStatus("Sample loaded");
  }

  if (event.target.id === "copyReadme") {
    await navigator.clipboard.writeText(output.value);
    setStatus("Copied");
  }

  if (event.target.id === "downloadReadme") {
    download("README.md", output.value);
    setStatus("README downloaded");
  }

  if (event.target.id === "downloadConfig") {
    download("profile.config.json", JSON.stringify(config, null, 2));
    setStatus("Config downloaded");
  }
});

form.addEventListener("input", updateFromDom);

form.addEventListener("input", (event) => {
  const target = event.target;
  if (!target.matches("[data-icon-search]")) return;

  const item = target.closest(".item");
  const keyword = target.value.trim().toLowerCase();
  item.querySelectorAll(".icon-option").forEach((option) => {
    const id = option.dataset.iconId;
    option.hidden = keyword && !id.includes(keyword);
  });
});

form.addEventListener("change", (event) => {
  const target = event.target;
  if (!target.matches("[data-skill-option]")) return;

  const item = target.closest(".item");
  const index = Number(item.dataset.index);
  const checked = [...item.querySelectorAll("[data-skill-option]:checked")].map((inputEl) => inputEl.value);
  const iconsValue = checked.join(",");
  config.skills[index].icons = iconsValue;

  const iconsInput = item.querySelector('[data-field="icons"]');

  iconsInput.value = iconsValue;
  syncSkillItemVisuals(item, iconsValue);

  updateOutput();
  setStatus("Skills updated");
});

$("#importConfig").addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;

  try {
    config = JSON.parse(await file.text());
    renderList();
    setStatus("Config imported");
  } catch (error) {
    setStatus("Import failed");
    alert(`配置文件解析失败：${error.message}`);
  }
});

renderList();
