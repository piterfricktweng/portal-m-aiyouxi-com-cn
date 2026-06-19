const contentSections = [
  { id: 'news', title: '新闻动态', keywords: ['新游', '版本更新', '爱游戏', '活动公告'], items: [] },
  { id: 'guides', title: '攻略专题', keywords: ['新手教程', '技巧', '爱游戏', '秘籍'], items: [] },
  { id: 'reviews', title: '评测中心', keywords: ['评分', '爱游戏', '深度评测', '玩家体验'], items: [] },
  { id: 'community', title: '社区互动', keywords: ['论坛', '爱游戏', '玩家故事', '同人'], items: [] }
];

const tagIndex = {
  '爱游戏': ['news', 'guides', 'reviews', 'community'],
  '新游': ['news'],
  '版本': ['news'],
  '教程': ['guides'],
  '技巧': ['guides'],
  '评测': ['reviews'],
  '评分': ['reviews'],
  '社区': ['community'],
  '玩家': ['community', 'reviews']
};

const portalUrl = 'https://portal-m-aiyouxi.com.cn';

const sampleGameData = {
  name: '爱游戏·幻境',
  genre: '角色扮演',
  tags: ['爱游戏', '冒险', '策略'],
  publishDate: '2025-03-01',
  source: portalUrl
};

function searchSections(query) {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  const matchedIds = new Set();

  for (const [tag, sectionIds] of Object.entries(tagIndex)) {
    if (tag.toLowerCase().includes(lowerQuery)) {
      sectionIds.forEach(id => matchedIds.add(id));
    }
  }

  contentSections.forEach(section => {
    if (section.title.toLowerCase().includes(lowerQuery)) {
      matchedIds.add(section.id);
    }
    section.keywords.forEach(kw => {
      if (kw.toLowerCase().includes(lowerQuery)) {
        matchedIds.add(section.id);
      }
    });
  });

  return contentSections.filter(s => matchedIds.has(s.id));
}

function filterByKeyword(keyword) {
  const normalized = keyword.trim();
  if (!normalized) return [];

  return contentSections.filter(section =>
    section.keywords.some(kw => kw === normalized)
  );
}

function getAllKeywords() {
  const all = new Set();
  contentSections.forEach(s => s.keywords.forEach(kw => all.add(kw)));
  return Array.from(all);
}

function buildSectionHtml(sectionId) {
  const section = contentSections.find(s => s.id === sectionId);
  if (!section) return '<div>未知分区</div>';
  return `<div class="content-section" data-section="${section.id}">
    <h2>${section.title}</h2>
    <ul class="keyword-list">${section.keywords.map(kw => `<li>${kw}</li>`).join('')}</ul>
    <p>更多内容请访问 <a href="${portalUrl}" target="_blank">爱游戏门户</a></p>
  </div>`;
}

function searchAndRender(query) {
  const results = searchSections(query);
  const container = document.createElement('div');
  container.className = 'search-results';

  if (results.length === 0) {
    container.innerHTML = '<p>未找到相关内容</p>';
    return container;
  }

  results.forEach(section => {
    const el = document.createElement('div');
    el.innerHTML = buildSectionHtml(section.id);
    container.appendChild(el.firstElementChild);
  });

  return container;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    contentSections,
    tagIndex,
    portalUrl,
    sampleGameData,
    searchSections,
    filterByKeyword,
    getAllKeywords,
    buildSectionHtml,
    searchAndRender
  };
}