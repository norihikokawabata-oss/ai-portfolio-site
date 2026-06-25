# AI活用実績ポートフォリオサイト Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 業務でのAI(Claude Code)活用実績10点を、ヒーロー(ベントーグリッド)+タブ絞り込み一覧の1ページサイトとして実装し、GitHub Pagesに公開する。

**Architecture:** React + TypeScript + Vite のSPA。作品データは `src/data/works.ts` に集約し、純粋関数 `filterWorks` でタブ絞り込みを行う。表示は `Header → HeroBento → WorksGallery(タブ+グリッド) → Footer` の4コンポーネント構成。カードクリックで `WorkModal` をオーバーレイ表示。配色はYAML(`docs/design-tokens/corporate-blue-clean.yaml`)の値をCSS変数化して使用。

**Tech Stack:** React 18, TypeScript, Vite, Vitest + @testing-library/react(ロジック・インタラクションのテスト), gh-pages(デプロイ)

---

## 設計書との対応

このプランは [`docs/superpowers/specs/2026-06-25-ai-portfolio-site-design.md`](../specs/2026-06-25-ai-portfolio-site-design.md) を実装する。

- 設計書 §2(全体構成・カテゴリ振り分け) → Task 4(データモデル)
- 設計書 §3(インタラクション) → Task 9, 10(ギャラリー・モーダル)
- 設計書 §4(データ構造) → Task 4
- 設計書 §5(技術構成・配色) → Task 1, 2
- 設計書 §6(テスト・確認) → Task 13, 14

## File Structure

```
ai-portfolio-site/
├── src/
│   ├── assets/works/         # 10枚の作品画像
│   ├── styles/
│   │   └── tokens.css        # 配色YAMLをCSS変数化
│   ├── data/
│   │   ├── works.ts          # Work型・データ配列
│   │   └── works.test.ts
│   ├── utils/
│   │   ├── filterWorks.ts    # タブ絞り込みの純粋関数
│   │   └── filterWorks.test.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroBento.tsx
│   │   ├── WorkCard.tsx
│   │   ├── WorksGallery.tsx
│   │   ├── WorksGallery.test.tsx
│   │   ├── WorkModal.tsx
│   │   ├── WorkModal.test.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── App.css
│   └── main.tsx
├── docs/                      # 設計書・プラン(既存)
├── package.json
├── vite.config.ts
├── vitest.config.ts
└── .gitignore
```

---

### Task 1: プロジェクトの足場(Vite + React + TypeScript)

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.css`, `.gitignore`

- [ ] **Step 1: Viteテンプレートでプロジェクトを作成**

カレントディレクトリは `C:\Users\norih\ai-portfolio-site`(git初期化済み)。既存の `docs/` を壊さないよう、一時ディレクトリに作ってからファイルを移すのではなく、Viteのスキャフォールドを直接ここに展開する。

Run: `npm create vite@latest . -- --template react-ts`

確認プロンプトが出た場合は「現在のディレクトリに作成」を選択する(既存ファイルである `docs/` は上書きされない)。

- [ ] **Step 2: 依存をインストール**

Run: `npm install`

- [ ] **Step 3: テスト関連の依存を追加**

Run: `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`

- [ ] **Step 4: `vitest.config.ts` を作成**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
  },
});
```

- [ ] **Step 5: `src/test-setup.ts` を作成**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 6: `package.json` の `scripts` に `test` を追加**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  }
}
```

(既存の `dev`/`build`/`preview` はVite生成のものを維持し、`test` のみ追加する)

- [ ] **Step 7: 開発サーバーが起動することを確認**

Run: `npm run dev`
Expected: `Local: http://localhost:5173/` が表示される。確認後 Ctrl+C で停止。

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vite.config.ts vitest.config.ts tsconfig.json tsconfig.node.json index.html src .gitignore
git commit -m "chore: Vite+React+TSの足場を構築しVitestを導入"
```

---

### Task 2: 配色トークンをCSS変数化

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/App.css`(既存生成ファイルの内容を置き換え)

- [ ] **Step 1: `docs/design-tokens/corporate-blue-clean.yaml` の値をCSS変数として書き出す**

`src/styles/tokens.css`:

```css
:root {
  /* base */
  --color-bg: #FAFBFF;
  --color-surface: #F0F4FC;
  --color-surface-alt: #E6ECFA;

  /* primary / accent */
  --color-primary: #7C93D9;
  --color-on-primary: #1F2A44;
  --color-accent: #93C5FD;
  --color-accent-soft: #E0ECFB;

  /* text */
  --color-text-heading: #283447;
  --color-text-body: #4B5868;
  --color-text-muted: #7C8798;

  /* semantic */
  --color-positive: #86C99B;
  --color-negative: #F0A8A8;

  /* border / shape */
  --color-border: #E1E7F2;
  --radius-md: 10px;
  --shadow-subtle: 0 1px 3px rgba(31, 42, 68, 0.08);
}
```

- [ ] **Step 2: `src/App.css` をグローバルレイアウト用に置き換え**

```css
@import "./styles/tokens.css";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text-body);
  font-family: "Hiragino Sans", "Noto Sans JP", system-ui, sans-serif;
}

.page {
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px 16px 64px;
}
```

- [ ] **Step 3: `src/main.tsx` で `App.css` がimportされていることを確認(Vite生成のままでよい)**

Run: 目視確認のみ。`src/main.tsx` に `import "./App.css"` または `App.tsx` 側に同等のimportがあること。

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.css src/App.css
git commit -m "style: 配色トークンYAMLをCSS変数として導入"
```

---

### Task 3: 作品画像をアセットとして配置

**Files:**
- Create: `src/assets/works/*.png`(10ファイル)

- [ ] **Step 1: ディレクトリを作成し10枚をコピー**

Run(PowerShellではなくBashツールでcp、ファイル名は半角英数のIDに変更して扱いやすくする):

```bash
mkdir -p src/assets/works
cp "C:/Users/norih/Desktop/★画像★/今までの成果/財務ダッシュボード作成.png" src/assets/works/financial-dashboard.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/MBTI診断ツール.png" src/assets/works/mbti-diagnosis.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/MBTIチームビルディングツール.png" src/assets/works/mbti-team-builder.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/テトリス.png" src/assets/works/tetris.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/ホームページ作成.png" src/assets/works/homepage-lp.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/経営戦略立案.png" src/assets/works/management-strategy.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/Skill作成.png" src/assets/works/skill-creation.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/Sub Agent駆動.png" src/assets/works/subagent-driven.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/拡張機能利用.png" src/assets/works/extensions-usage.png
cp "C:/Users/norih/Desktop/★画像★/今までの成果/Claude in Cromeブラウザ自動操作.png" src/assets/works/claude-in-chrome.png
```

- [ ] **Step 2: 10ファイルが存在することを確認**

Run: `ls src/assets/works | wc -l`
Expected: `10`

- [ ] **Step 3: Commit**

```bash
git add src/assets/works
git commit -m "asset: 成果物スクリーンショット10点を追加"
```

---

### Task 4: 作品データモデル(`Work`型とデータ配列)

**Files:**
- Create: `src/data/works.ts`
- Test: `src/data/works.test.ts`

- [ ] **Step 1: 失敗するテストを書く**

`src/data/works.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { works } from "./works";

describe("works data", () => {
  it("contains exactly 10 works", () => {
    expect(works).toHaveLength(10);
  });

  it("has exactly 5 hero works", () => {
    const heroWorks = works.filter((w) => w.isHero);
    expect(heroWorks).toHaveLength(5);
  });

  it("has exactly 6 business-category works and 4 knowhow-category works", () => {
    const business = works.filter((w) => w.category === "business");
    const knowhow = works.filter((w) => w.category === "knowhow");
    expect(business).toHaveLength(6);
    expect(knowhow).toHaveLength(4);
  });

  it("has unique ids", () => {
    const ids = works.map((w) => w.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every work has a non-empty title, thumbnail and description", () => {
    for (const w of works) {
      expect(w.title.length).toBeGreaterThan(0);
      expect(w.thumbnail.length).toBeGreaterThan(0);
      expect(w.description.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: テストを実行し失敗を確認**

Run: `npx vitest run src/data/works.test.ts`
Expected: FAIL(`works.ts` が存在しない、または `works` がエクスポートされていない)

- [ ] **Step 3: `src/data/works.ts` を実装**

```ts
import financialDashboard from "../assets/works/financial-dashboard.png";
import mbtiDiagnosis from "../assets/works/mbti-diagnosis.png";
import mbtiTeamBuilder from "../assets/works/mbti-team-builder.png";
import tetris from "../assets/works/tetris.png";
import homepageLp from "../assets/works/homepage-lp.png";
import managementStrategy from "../assets/works/management-strategy.png";
import skillCreation from "../assets/works/skill-creation.png";
import subagentDriven from "../assets/works/subagent-driven.png";
import extensionsUsage from "../assets/works/extensions-usage.png";
import claudeInChrome from "../assets/works/claude-in-chrome.png";

export type WorkCategory = "business" | "knowhow";

export interface Work {
  id: string;
  title: string;
  category: WorkCategory;
  isHero: boolean;
  thumbnail: string;
  description: string;
}

export const works: Work[] = [
  {
    id: "financial-dashboard",
    title: "ANA財務ダッシュボード",
    category: "business",
    isHero: true,
    thumbnail: financialDashboard,
    description:
      "ANAホールディングス(9202)の決算短信・有報5年分と中期経営戦略をもとに、収益性・安全性・効率性などを多角的に可視化。React+TypeScript+Chart.jsで構築しGitHub Pagesで公開。",
  },
  {
    id: "mbti-diagnosis",
    title: "MBTI64診断ツール",
    category: "business",
    isHero: true,
    thumbnail: mbtiDiagnosis,
    description: "MBTIを64パターンに細分化し、自己分析・適職診断を行うWebアプリ。",
  },
  {
    id: "mbti-team-builder",
    title: "MBTI64チームビルダー",
    category: "business",
    isHero: true,
    thumbnail: mbtiTeamBuilder,
    description:
      "メンバーのMBTI64コードからチーム相性をレーダーチャート・相性マトリクスで可視化し、改善アドバイスまで提示するツール。",
  },
  {
    id: "tetris",
    title: "テトリス",
    category: "business",
    isHero: true,
    thumbnail: tetris,
    description: "ブラウザで動くレトロ風(ネオングリーン)テトリス。スコア・レベル・NEXT表示まで実装。",
  },
  {
    id: "homepage-lp",
    title: "ホームページ作成(LP)",
    category: "business",
    isHero: true,
    thumbnail: homepageLp,
    description: "商品(ギター)の選び方を提案するランディングページ。トンマナ統一されたマーケティングページの制作例。",
  },
  {
    id: "management-strategy",
    title: "経営戦略立案",
    category: "business",
    isHero: false,
    thumbnail: managementStrategy,
    description: "Obsidian上でAI/事業の経営戦略をドキュメント化(運用ルール・トラッキング枠組み等を含む体系的なノート群)。",
  },
  {
    id: "skill-creation",
    title: "Skill作成",
    category: "knowhow",
    isHero: false,
    thumbnail: skillCreation,
    description: "カスタムSkillを実装し、テストカバレッジ・code-reviewerの指摘対応まで含めた導入プロセスの記録。",
  },
  {
    id: "subagent-driven",
    title: "Sub Agent駆動開発",
    category: "knowhow",
    isHero: false,
    thumbnail: subagentDriven,
    description: "Sub Agentに開発を任せ、テスト結果やレビュー指摘とその対応を記録した実践ログ。",
  },
  {
    id: "extensions-usage",
    title: "拡張機能利用",
    category: "knowhow",
    isHero: false,
    thumbnail: extensionsUsage,
    description: "Claude Codeの設定ファイルをプロジェクトレベル/ユーザーレベルで使い分ける構成の整理。",
  },
  {
    id: "claude-in-chrome",
    title: "Claude in Chromeブラウザ自動操作",
    category: "knowhow",
    isHero: false,
    thumbnail: claudeInChrome,
    description: "Claude in Chrome拡張を使ったブラウザ自動操作の入門・検証ログ。",
  },
];
```

- [ ] **Step 4: テストを再実行し成功を確認**

Run: `npx vitest run src/data/works.test.ts`
Expected: PASS(5件すべて)

- [ ] **Step 5: Commit**

```bash
git add src/data/works.ts src/data/works.test.ts
git commit -m "feat: 作品データモデルと10件のデータを追加"
```

---

### Task 5: タブ絞り込みロジック(`filterWorks`)

**Files:**
- Create: `src/utils/filterWorks.ts`
- Test: `src/utils/filterWorks.test.ts`

- [ ] **Step 1: 失敗するテストを書く**

`src/utils/filterWorks.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { filterWorks } from "./filterWorks";
import { works } from "../data/works";

describe("filterWorks", () => {
  it('returns all 10 works when tab is "all"', () => {
    expect(filterWorks(works, "all")).toHaveLength(10);
  });

  it('returns only business-category works when tab is "business"', () => {
    const result = filterWorks(works, "business");
    expect(result).toHaveLength(6);
    expect(result.every((w) => w.category === "business")).toBe(true);
  });

  it('returns only knowhow-category works when tab is "knowhow"', () => {
    const result = filterWorks(works, "knowhow");
    expect(result).toHaveLength(4);
    expect(result.every((w) => w.category === "knowhow")).toBe(true);
  });
});
```

- [ ] **Step 2: テストを実行し失敗を確認**

Run: `npx vitest run src/utils/filterWorks.test.ts`
Expected: FAIL(`filterWorks.ts` が存在しない)

- [ ] **Step 3: 実装**

`src/utils/filterWorks.ts`:

```ts
import type { Work, WorkCategory } from "../data/works";

export type WorksTab = "all" | WorkCategory;

export function filterWorks(works: Work[], tab: WorksTab): Work[] {
  if (tab === "all") return works;
  return works.filter((w) => w.category === tab);
}
```

- [ ] **Step 4: テストを再実行し成功を確認**

Run: `npx vitest run src/utils/filterWorks.test.ts`
Expected: PASS(3件すべて)

- [ ] **Step 5: Commit**

```bash
git add src/utils/filterWorks.ts src/utils/filterWorks.test.ts
git commit -m "feat: タブ絞り込みのfilterWorksを追加"
```

---

### Task 6: `Header` コンポーネント

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: 実装(テスト不要 — 静的表示のみのため)**

`src/components/Header.tsx`:

```tsx
export function Header() {
  return (
    <header
      style={{
        textAlign: "center",
        padding: "32px 0 24px",
        borderBottom: "1px solid var(--color-border)",
        marginBottom: "32px",
      }}
    >
      <h1 style={{ color: "var(--color-text-heading)", margin: 0, fontSize: "28px" }}>
        ばたやん
      </h1>
      <p style={{ color: "var(--color-text-muted)", marginTop: "8px" }}>
        Claude Codeで業務AI活用
      </p>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: Headerコンポーネントを追加"
```

---

### Task 7: `WorkCard` コンポーネント

**Files:**
- Create: `src/components/WorkCard.tsx`

- [ ] **Step 1: 実装**

`src/components/WorkCard.tsx`:

```tsx
import type { Work } from "../data/works";

interface WorkCardProps {
  work: Work;
  onSelect: (work: Work) => void;
  variant?: "hero-main" | "hero-sub" | "grid";
}

export function WorkCard({ work, onSelect, variant = "grid" }: WorkCardProps) {
  const isHeroMain = variant === "hero-main";
  return (
    <button
      type="button"
      onClick={() => onSelect(work)}
      aria-label={`${work.title}の詳細を開く`}
      style={{
        position: "relative",
        border: isHeroMain ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        padding: 0,
        cursor: "pointer",
        background: "none",
        height: "100%",
        width: "100%",
      }}
    >
      <img
        src={work.thumbnail}
        alt={work.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: variant === "grid" ? "var(--color-accent-soft)" : "var(--color-primary)",
          color: "var(--color-on-primary)",
          fontSize: "12px",
          padding: "4px 8px",
          textAlign: "left",
        }}
      >
        {work.title}
      </span>
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/WorkCard.tsx
git commit -m "feat: WorkCardコンポーネントを追加"
```

---

### Task 8: `HeroBento` コンポーネント

**Files:**
- Create: `src/components/HeroBento.tsx`

- [ ] **Step 1: 実装**

`src/components/HeroBento.tsx`:

```tsx
import type { Work } from "../data/works";
import { WorkCard } from "./WorkCard";

interface HeroBentoProps {
  heroWorks: Work[]; // isHero===true の5件をこの順で渡す(先頭がメインカード)
  onSelect: (work: Work) => void;
}

export function HeroBento({ heroWorks, onSelect }: HeroBentoProps) {
  const [main, ...sub] = heroWorks;

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr",
        gap: "12px",
        height: "360px",
        marginBottom: "40px",
      }}
    >
      <div style={{ gridRow: "span 2" }}>
        <WorkCard work={main} onSelect={onSelect} variant="hero-main" />
      </div>
      {sub.map((work) => (
        <div key={work.id}>
          <WorkCard work={work} onSelect={onSelect} variant="hero-sub" />
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroBento.tsx
git commit -m "feat: HeroBentoコンポーネントを追加"
```

---

### Task 9: `WorksGallery` コンポーネント(タブ + グリッド)

**Files:**
- Create: `src/components/WorksGallery.tsx`
- Test: `src/components/WorksGallery.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`src/components/WorksGallery.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WorksGallery } from "./WorksGallery";
import { works } from "../data/works";

describe("WorksGallery", () => {
  it("shows all 10 works when the page loads", () => {
    render(<WorksGallery works={works} onSelect={vi.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(10 + 3); // 10カード + 3タブボタン
  });

  it('shows only business works after clicking "業務アプリ・成果物" tab', () => {
    render(<WorksGallery works={works} onSelect={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: "業務アプリ・成果物" }));
    const businessCount = works.filter((w) => w.category === "business").length;
    expect(screen.getAllByRole("button")).toHaveLength(businessCount + 3);
  });

  it("calls onSelect with the clicked work", () => {
    const onSelect = vi.fn();
    render(<WorksGallery works={works} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("button", { name: `${works[0].title}の詳細を開く` }));
    expect(onSelect).toHaveBeenCalledWith(works[0]);
  });
});
```

- [ ] **Step 2: テストを実行し失敗を確認**

Run: `npx vitest run src/components/WorksGallery.test.tsx`
Expected: FAIL(`WorksGallery.tsx` が存在しない)

- [ ] **Step 3: 実装**

`src/components/WorksGallery.tsx`:

```tsx
import { useState } from "react";
import type { Work } from "../data/works";
import { filterWorks, type WorksTab } from "../utils/filterWorks";
import { WorkCard } from "./WorkCard";

interface WorksGalleryProps {
  works: Work[];
  onSelect: (work: Work) => void;
}

const TABS: { value: WorksTab; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "business", label: "業務アプリ・成果物" },
  { value: "knowhow", label: "Claude Code 開発ノウハウ" },
];

export function WorksGallery({ works, onSelect }: WorksGalleryProps) {
  const [tab, setTab] = useState<WorksTab>("all");
  const visibleWorks = filterWorks(works, tab);

  return (
    <section>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            style={{
              borderRadius: "14px",
              padding: "6px 14px",
              border: "none",
              cursor: "pointer",
              background: tab === t.value ? "var(--color-accent-soft)" : "var(--color-surface)",
              color: tab === t.value ? "var(--color-text-heading)" : "var(--color-text-muted)",
              fontWeight: tab === t.value ? "bold" : "normal",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
        }}
      >
        {visibleWorks.map((work) => (
          <div key={work.id} style={{ height: "140px" }}>
            <WorkCard work={work} onSelect={onSelect} variant="grid" />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: テストを再実行し成功を確認**

Run: `npx vitest run src/components/WorksGallery.test.tsx`
Expected: PASS(3件すべて)

- [ ] **Step 5: Commit**

```bash
git add src/components/WorksGallery.tsx src/components/WorksGallery.test.tsx
git commit -m "feat: WorksGallery(タブ絞り込み一覧)を追加"
```

---

### Task 10: `WorkModal` コンポーネント

**Files:**
- Create: `src/components/WorkModal.tsx`
- Test: `src/components/WorkModal.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`src/components/WorkModal.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { WorkModal } from "./WorkModal";
import { works } from "../data/works";

describe("WorkModal", () => {
  it("renders nothing when work is null", () => {
    const { container } = render(<WorkModal work={null} onClose={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("shows the work's title and description when a work is given", () => {
    render(<WorkModal work={works[0]} onClose={vi.fn()} />);
    expect(screen.getByText(works[0].title)).toBeInTheDocument();
    expect(screen.getByText(works[0].description)).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    const onClose = vi.fn();
    render(<WorkModal work={works[0]} onClose={onClose} />);
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: テストを実行し失敗を確認**

Run: `npx vitest run src/components/WorkModal.test.tsx`
Expected: FAIL(`WorkModal.tsx` が存在しない)

- [ ] **Step 3: 実装**

`src/components/WorkModal.tsx`:

```tsx
import type { Work } from "../data/works";

interface WorkModalProps {
  work: Work | null;
  onClose: () => void;
}

export function WorkModal({ work, onClose }: WorkModalProps) {
  if (!work) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(31, 42, 68, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-bg)",
          borderRadius: "var(--radius-md)",
          maxWidth: "560px",
          width: "90%",
          padding: "24px",
          boxShadow: "var(--shadow-subtle)",
        }}
      >
        <img
          src={work.thumbnail}
          alt={work.title}
          style={{ width: "100%", borderRadius: "var(--radius-md)", marginBottom: "16px" }}
        />
        <h2 style={{ color: "var(--color-text-heading)", marginBottom: "8px" }}>{work.title}</h2>
        <p style={{ color: "var(--color-text-body)" }}>{work.description}</p>
        <button
          type="button"
          onClick={onClose}
          style={{
            marginTop: "16px",
            background: "var(--color-primary)",
            color: "var(--color-on-primary)",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          閉じる
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: テストを再実行し成功を確認**

Run: `npx vitest run src/components/WorkModal.test.tsx`
Expected: PASS(3件すべて)

- [ ] **Step 5: Commit**

```bash
git add src/components/WorkModal.tsx src/components/WorkModal.test.tsx
git commit -m "feat: WorkModal(拡大画像+説明文)を追加"
```

---

### Task 11: `Footer` コンポーネント

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: 実装**

`src/components/Footer.tsx`:

```tsx
export function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "32px 0",
        marginTop: "48px",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-text-muted)",
        fontSize: "14px",
      }}
    >
      <p>norihikokawabata@gmail.com</p>
      <p>
        <a href="https://github.com/norihikokawabata-oss" style={{ color: "var(--color-primary)" }}>
          GitHub
        </a>
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: Footerコンポーネントを追加"
```

---

### Task 12: `App` でコンポーネントを組み立てる

**Files:**
- Modify: `src/App.tsx`(Vite生成のデモコードを置き換え)

- [ ] **Step 1: 実装**

`src/App.tsx`:

```tsx
import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { HeroBento } from "./components/HeroBento";
import { WorksGallery } from "./components/WorksGallery";
import { WorkModal } from "./components/WorkModal";
import { Footer } from "./components/Footer";
import { works, type Work } from "./data/works";

const heroWorks = works.filter((w) => w.isHero);

function App() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  return (
    <div className="page">
      <Header />
      <HeroBento heroWorks={heroWorks} onSelect={setSelectedWork} />
      <WorksGallery works={works} onSelect={setSelectedWork} />
      <Footer />
      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </div>
  );
}

export default App;
```

- [ ] **Step 2: 既存テストがすべて通ることを確認**

Run: `npm run test`
Expected: PASS(全テストスイート)

- [ ] **Step 3: 開発サーバーで目視確認**

Run: `npm run dev`
Expected: ブラウザで `http://localhost:5173/` を開き、ヒーロー5枚→タブ→グリッド10枚→フッターの順で表示され、カードクリックでモーダルが開閉することを確認。確認後 Ctrl+C で停止。

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: Header/HeroBento/WorksGallery/Footer/WorkModalを組み立てる"
```

---

### Task 13: レスポンシブ確認・調整

**Files:**
- Modify: `src/components/HeroBento.tsx`, `src/App.css`

- [ ] **Step 1: モバイル幅でのレイアウト崩れに対応するメディアクエリを追加**

`src/App.css` に追記:

```css
@media (max-width: 640px) {
  .page {
    padding: 16px 12px 48px;
  }
}
```

`src/components/HeroBento.tsx` の `<section>` の `style` をモバイル時に1カラムへ切り替えるため、インラインstyleをCSSクラス + メディアクエリに置き換える:

`src/App.css` に追記:

```css
.hero-bento {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  height: 360px;
  margin-bottom: 40px;
}

@media (max-width: 640px) {
  .hero-bento {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 160px);
    height: auto;
  }
}
```

`src/components/HeroBento.tsx` を更新:

```tsx
import type { Work } from "../data/works";
import { WorkCard } from "./WorkCard";

interface HeroBentoProps {
  heroWorks: Work[];
  onSelect: (work: Work) => void;
}

export function HeroBento({ heroWorks, onSelect }: HeroBentoProps) {
  const [main, ...sub] = heroWorks;

  return (
    <section className="hero-bento">
      <div style={{ gridRow: "span 2" }}>
        <WorkCard work={main} onSelect={onSelect} variant="hero-main" />
      </div>
      {sub.map((work) => (
        <div key={work.id}>
          <WorkCard work={work} onSelect={onSelect} variant="hero-sub" />
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: ブラウザの幅を375px相当に変更して目視確認**

Run: `npm run dev` → ブラウザDevToolsでモバイルプレビュー(375px幅)に切り替え
Expected: ヒーローが2カラムに折り返り、横スクロールが発生しないこと。

- [ ] **Step 3: 既存テストが壊れていないことを確認**

Run: `npm run test`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/App.css src/components/HeroBento.tsx
git commit -m "style: モバイル幅でのヒーローレイアウトを調整"
```

---

### Task 14: ビルド確認とGitHub Pagesデプロイ設定

**Files:**
- Modify: `package.json`, `vite.config.ts`
- Create: `.github/.gitkeep` は不要(deploy はローカルから `gh-pages` パッケージ経由)

- [ ] **Step 1: `gh-pages` を追加**

Run: `npm install -D gh-pages`

- [ ] **Step 2: `vite.config.ts` に `base` を設定**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/ai-portfolio-site/",
});
```

(リポジトリ名が確定したらこの値をリポジトリ名に合わせる)

- [ ] **Step 3: `package.json` の `scripts` に `predeploy`/`deploy` を追加**

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

- [ ] **Step 4: 本番ビルドが成功することを確認**

Run: `npm run build`
Expected: `dist/` が生成され、エラーなく終了する。

- [ ] **Step 5: `npm run preview` で本番ビルドを実機相当で確認**

Run: `npm run preview`
Expected: 表示されたURLでヒーロー・タブ・モーダルがすべて正しく動作する(ANA財務ダッシュボードで発生した「ビルド時のみ起きる不具合」の再発防止のため、`npm run dev` だけでなく必ず本番ビルドでも確認する)。

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.ts
git commit -m "build: GitHub Pagesデプロイ設定(gh-pages)を追加"
```

- [ ] **Step 7: GitHubリポジトリ作成・デプロイ(ユーザー確認必須)**

これはリモートへの公開操作のため、実行前に必ずユーザーへ「新規リポジトリ名」「公開設定(public/private)」を確認してから行う。確認後:

```bash
git remote add origin https://github.com/<確定したリポジトリ名>.git
git push -u origin master
npm run deploy
```

---

## Self-Review Notes

- **Spec coverage:** 設計書§2(全体構成・カテゴリ振り分け)→Task 4/8/9、§3(インタラクション)→Task 9/10、§4(データ構造)→Task 4、§5(技術構成・配色)→Task 1/2/14、§6(テスト確認)→Task 12 Step 3, Task 13, Task 14 Step 5。すべて対応済み。
- **Placeholder scan:** 各ステップに実コード・実コマンドを記載済み。「TODO」「後で実装」等の記述なし。
- **Type consistency:** `Work`/`WorkCategory`/`WorksTab` の型はTask 4→5→9→10→12で一貫して同じ名前・形を使用していることを確認済み。`onSelect: (work: Work) => void` のシグネチャも全コンポーネントで統一。
