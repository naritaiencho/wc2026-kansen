# 観戦HQ '26 — GitHubリポジトリ作成 + Vercelデプロイスクリプト
# gh CLI不要版: Windows資格情報マネージャーのGCMトークンでGitHub APIを直接呼ぶ
param([switch]$Deploy)

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$REPO_NAME = "wc2026-kansen"
$DESCRIPTION = "観戦HQ '26 — FIFAワールドカップ2026 日本語観戦コンパニオン(全104試合JST/DAZN放送区分/順位表/得点ランキング)"

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class CredMan2 {
  [DllImport("advapi32.dll", EntryPoint="CredReadW", CharSet=CharSet.Unicode, SetLastError=true)]
  public static extern bool CredRead(string target, uint type, uint flags, out IntPtr credentialPtr);
  [DllImport("advapi32.dll")]
  public static extern void CredFree(IntPtr cred);
  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
  public struct CREDENTIAL {
    public uint Flags; public uint Type; public string TargetName; public string Comment;
    public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
    public uint CredentialBlobSize; public IntPtr CredentialBlob; public uint Persist;
    public uint AttributeCount; public IntPtr Attributes; public string TargetAlias; public string UserName;
  }
}
"@

function Get-GitHubToken {
  $ptr = [IntPtr]::Zero
  if (-not [CredMan2]::CredRead("git:https://github.com", 1, 0, [ref]$ptr)) {
    throw "資格情報マネージャーから git:https://github.com を読み取れませんでした"
  }
  $cred = [System.Runtime.InteropServices.Marshal]::PtrToStructure($ptr, [type][CredMan2+CREDENTIAL])
  $bytes = New-Object byte[] $cred.CredentialBlobSize
  [System.Runtime.InteropServices.Marshal]::Copy($cred.CredentialBlob, $bytes, 0, $cred.CredentialBlobSize)
  [CredMan2]::CredFree($ptr)
  $raw = [System.Text.Encoding]::UTF8.GetString($bytes)
  if ($raw.Contains([char]0)) { $raw = [System.Text.Encoding]::Unicode.GetString($bytes) }
  return $raw.Trim([char]0, ' ').Trim()
}

$token = Get-GitHubToken
$headers = @{
  Authorization = "token $token"
  "User-Agent"  = "wc2026-kansen-deploy"
  Accept        = "application/vnd.github+json"
}

# --- 認証チェック ---
$resp = Invoke-WebRequest -Uri "https://api.github.com/user" -Headers $headers -UseBasicParsing
$me = $resp.Content | ConvertFrom-Json
Write-Output ("LOGIN: " + $me.login)
Write-Output ("SCOPES: " + $resp.Headers["X-OAuth-Scopes"])

if (-not $Deploy) {
  Write-Output "チェックのみ完了（デプロイは -Deploy を付けて実行）"
  exit 0
}

$owner = $me.login

# --- 1. リポジトリ作成（既存なら続行）---
try {
  $body = @{ name = $REPO_NAME; description = $DESCRIPTION; private = $false } | ConvertTo-Json
  Invoke-RestMethod -Method POST -Uri "https://api.github.com/user/repos" -Headers $headers -Body $body -ContentType "application/json" | Out-Null
  Write-Output "REPO: 作成しました -> https://github.com/$owner/$REPO_NAME"
} catch {
  $code = $_.Exception.Response.StatusCode.value__
  if ($code -eq 422) { Write-Output "REPO: 既に存在します（続行） -> https://github.com/$owner/$REPO_NAME" }
  else { throw }
}

# --- 2. git push ---
$remoteUrl = "https://github.com/$owner/$REPO_NAME.git"
$existing = git remote 2>$null
if ($existing -contains "origin") { git remote set-url origin $remoteUrl } else { git remote add origin $remoteUrl }
git branch -M master
git push -u origin master
Write-Output "PUSH: 完了 -> https://github.com/$owner/$REPO_NAME"
