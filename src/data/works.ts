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
  tags: string[];
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
    tags: ["React", "TypeScript", "Chart.js"],
  },
  {
    id: "mbti-diagnosis",
    title: "MBTI64診断ツール",
    category: "business",
    isHero: true,
    thumbnail: mbtiDiagnosis,
    description: "MBTIを64パターンに細分化し、自己分析・適職診断を行うWebアプリ。",
    tags: ["自己分析", "適職診断"],
  },
  {
    id: "mbti-team-builder",
    title: "MBTI64チームビルダー",
    category: "business",
    isHero: true,
    thumbnail: mbtiTeamBuilder,
    description:
      "メンバーのMBTI64コードからチーム相性をレーダーチャート・相性マトリクスで可視化し、改善アドバイスまで提示するツール。",
    tags: ["レーダーチャート", "相性マトリクス"],
  },
  {
    id: "tetris",
    title: "テトリス",
    category: "business",
    isHero: true,
    thumbnail: tetris,
    description: "ブラウザで動くレトロ風(ネオングリーン)テトリス。スコア・レベル・NEXT表示まで実装。",
    tags: ["ブラウザゲーム", "レトロUI"],
  },
  {
    id: "homepage-lp",
    title: "ホームページ作成(LP)",
    category: "business",
    isHero: true,
    thumbnail: homepageLp,
    description: "商品(ギター)の選び方を提案するランディングページ。トンマナ統一されたマーケティングページの制作例。",
    tags: ["ランディングページ", "マーケティング"],
  },
  {
    id: "management-strategy",
    title: "経営戦略立案",
    category: "business",
    isHero: false,
    thumbnail: managementStrategy,
    description: "Obsidian上でAI/事業の経営戦略をドキュメント化(運用ルール・トラッキング枠組み等を含む体系的なノート群)。",
    tags: ["Obsidian", "経営戦略"],
  },
  {
    id: "skill-creation",
    title: "Skill作成",
    category: "knowhow",
    isHero: false,
    thumbnail: skillCreation,
    description: "カスタムSkillを実装し、テストカバレッジ・code-reviewerの指摘対応まで含めた導入プロセスの記録。",
    tags: ["Claude Code Skill", "テスト駆動"],
  },
  {
    id: "subagent-driven",
    title: "Sub Agent駆動開発",
    category: "knowhow",
    isHero: false,
    thumbnail: subagentDriven,
    description: "Sub Agentに開発を任せ、テスト結果やレビュー指摘とその対応を記録した実践ログ。",
    tags: ["Sub Agent", "レビュー対応"],
  },
  {
    id: "extensions-usage",
    title: "拡張機能利用",
    category: "knowhow",
    isHero: false,
    thumbnail: extensionsUsage,
    description: "Claude Codeの設定ファイルをプロジェクトレベル/ユーザーレベルで使い分ける構成の整理。",
    tags: ["CLAUDE.md", "設定管理"],
  },
  {
    id: "claude-in-chrome",
    title: "Claude in Chromeブラウザ自動操作",
    category: "knowhow",
    isHero: false,
    thumbnail: claudeInChrome,
    description: "Claude in Chrome拡張を使ったブラウザ自動操作の入門・検証ログ。",
    tags: ["Claude in Chrome", "ブラウザ自動操作"],
  },
];
