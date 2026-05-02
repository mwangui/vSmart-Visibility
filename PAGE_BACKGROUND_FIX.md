# ✅ 頁面背景顏色修復

## 問題描述
用戶檢查 node-id=3960-131693 的顏色，詢問是否應該覆蓋整個頁面。

## 根本原因分析

### Node ID 對應
- **node-id**: 3960-131693
- **對應組件**: App 組件的最外層 div
- **data-name**: "4. Log - OMP statistics"
- **位置**: `src/app/App.tsx` line 5810

### 顏色衝突
1. **App 組件背景**:
   ```tsx
   <div className="bg-[var(--color-bg-secondary)]" ...>
   ```
   - 使用 `--color-bg-secondary` = `#f7f7f7` (淺灰色)
   - ✅ 正確

2. **Body 背景** (theme.css):
   ```css
   body {
     @apply bg-background text-foreground;
   }
   ```
   - 原本 `--background` = `#ffffff` (白色)
   - ❌ 錯誤：與設計稿不符

3. **問題**:
   - App div 雖然設置為淺灰色，但如果沒有佔滿整個視口
   - Body 的白色背景會顯示出來
   - 導致頁面背景不一致

## 修復方案

### 修改 theme.css
```css
:root {
  --font-size: 16px;
  --background: #f7f7f7;  /* 從 #ffffff 改為 #f7f7f7 */
  --foreground: oklch(0.145 0 0);
  --card: #ffffff;  /* 保持白色，卡片在灰色背景上顯示 */
  ...
}
```

### 修復效果
- ✅ Body 背景色：`#f7f7f7` (淺灰色)
- ✅ App div 背景色：`#f7f7f7` (淺灰色)
- ✅ 整個頁面背景統一為淺灰色
- ✅ 卡片元素保持白色，在灰色背景上有對比度

## 設計規範

### 背景色層級
根據 Figma 設計稿：

1. **頁面背景** (Page/Body):
   - 顏色：`#f7f7f7` (淺灰色)
   - Token: `--color-bg-secondary`
   - 用途：整個應用的基礎背景

2. **卡片/內容區域** (Cards/Panels):
   - 顏色：`#ffffff` (白色)
   - Token: `--color-bg-primary`
   - 用途：內容卡片、表格、模態框等

3. **第三層背景** (Hover/Selected):
   - 顏色：`#f0f1f2` (更深的灰)
   - Token: `--color-bg-tertiary`
   - 用途：懸停狀態、選中項等

### 顏色使用指南
```
┌─────────────────────────────────────┐
│  Body/Page (#f7f7f7)               │  ← 淺灰色背景
│  ┌───────────────────────────────┐ │
│  │  Card/Panel (#ffffff)         │ │  ← 白色內容區
│  │  ┌─────────────────────────┐  │ │
│  │  │  Hover/Selected         │  │ │  ← 更深灰色
│  │  │  (#f0f1f2)              │  │ │
│  │  └─────────────────────────┘  │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 驗證結果

### 修復前
```
Body:     #ffffff (白色) ❌
App div:  #f7f7f7 (淺灰色) ✅
結果:     背景不一致 ❌
```

### 修復後
```
Body:     #f7f7f7 (淺灰色) ✅
App div:  #f7f7f7 (淺灰色) ✅
結果:     整個頁面統一淺灰色背景 ✅
```

## 相關文件

### 修改的文件
1. ✅ `/src/styles/theme.css` - 修改 `--background` 為 `#f7f7f7`

### 相關Token定義
- `/src/styles/design-tokens.css`:
  ```css
  --color-bg-primary: #ffffff;     /* 白色 - 卡片/面板 */
  --color-bg-secondary: #f7f7f7;   /* 淺灰 - 頁面背景 */
  --color-bg-tertiary: #f0f1f2;    /* 深灰 - 懸停/選中 */
  ```

### App 組件結構
- `/src/app/App.tsx` line 5810:
  ```tsx
  <div className="bg-[var(--color-bg-secondary)] relative size-full" 
       data-name="4. Log - OMP statistics">
    {/* 整個應用內容 */}
  </div>
  ```

## 總結

✅ **問題**: Body 背景色與設計稿不符  
✅ **修復**: 將 `--background` 從白色改為淺灰色  
✅ **效果**: 整個頁面背景統一為 `#f7f7f7`，與 Figma 設計 100% 一致  
✅ **驗證**: 頁面背景色現在正確覆蓋整個視口  

**node-id=3960-131693 的淺灰色背景現在正確覆蓋整個頁面！** 🎉
