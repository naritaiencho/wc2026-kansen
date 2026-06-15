import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'jp.naritai.wctecho',
  appName: 'ワールドカップ手帳',
  webDir: 'dist',
  server: {
    // 既定かつ推奨。webDir を https://localhost ルートで配信（セキュアコンテキスト）。
    androidScheme: 'https',
  },
};

export default config;
