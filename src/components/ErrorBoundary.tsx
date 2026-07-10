import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/** 描画時の例外を捕捉し、真っ白な画面の代わりにフォールバックUIを表示する */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>問題が発生しました</h1>
          <p style={{ color: "var(--color-text-on-light-muted)", lineHeight: 1.8 }}>
            ページの読み込み中にエラーが発生しました。
            <br />
            お手数ですが、ページを再読み込みしてください。
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
